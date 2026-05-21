import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Expand from '@arcgis/core/widgets/Expand';

import * as satellite from 'satellite.js';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import Geometry from '@arcgis/core/geometry/Geometry';
import Polygon from '@arcgis/core/geometry/Polygon';
import { IssService, SatelliteData } from '../../services/iss.service';
import { VisibilitySearchComponent, VisibilitySearchParams } from '../../components/visibility-search/visibility-search.component';

@Component({
  selector: 'app-satellites-3d',
  standalone: true,
  imports: [CommonModule, VisibilitySearchComponent],
  templateUrl: './satellites-3d.component.html',
  styleUrl: './satellites-3d.component.scss'
})
export class Satellites3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sceneViewNode', { static: true }) private sceneViewEl!: ElementRef;
  @ViewChild('visibilityWidgetContainer') private visibilityWidgetContainer!: ElementRef;

  public view: SceneView | null = null;
  public viewReady = false;
  private issService = inject(IssService);
  private issLiveGraphic: Graphic | null = null;
  private celestrakGraphics: Graphic[] = [];

  public visibilityResults: { satellite: string, time: Date, altitude: number }[] = [];
  public isSearching = false;

  constructor() {
    effect(() => {
      const pos = this.issService.issLive3DPosition();
      if (pos) {
        this.updateISSLiveMarker(pos.latitude, pos.longitude);
      }
    });

    effect(() => {
      const sats = this.issService.celestrakSatellites();
      if (sats.length > 0 && this.view) {
        this.renderCelestrakSatellites(sats);
      }
    });
  }

  ngAfterViewInit() {
    this.issService.startLive3DTracking();
    this.initMap();
  }

  async initMap() {
    try {
      const map = new Map({
        basemap: 'satellite'
      });

      this.view = new SceneView({
        container: this.sceneViewEl.nativeElement,
        map: map,
        qualityProfile: 'high',
        camera: { 
          position: { longitude: 0, latitude: 0, z: 25000000 } 
        },
        environment: {
          lighting: {
            type: 'sun',
            date: new Date()
          },
          atmosphereEnabled: true,
          starsEnabled: true,
        }
      });

      await this.view.when();
      
      this.viewReady = true;

      // Wait a tick for Angular to render the component in the template
      setTimeout(() => {
        if (this.visibilityWidgetContainer && this.view) {
          const expand = new Expand({
            view: this.view,
            content: this.visibilityWidgetContainer.nativeElement,
            expandIcon: 'search',
            expandTooltip: 'Ricerca visibilità satelliti',
            group: 'top-right',
            expanded: false
          });
          this.view.ui.add(expand, 'top-right');
          
          // Remove display: none from the parent container
          const hiddenContainer = document.getElementById('hidden-container');
          if (hiddenContainer) {
            hiddenContainer.style.display = 'block';
          }
          
          // Ensure the widget container is visible
          this.visibilityWidgetContainer.nativeElement.style.display = 'block';
          
          // Listen to the expand event to force widget rendering
          expand.watch('expanded', (isExpanded) => {
            if (isExpanded) {
              setTimeout(() => {
                // Force a dimension recalculation for the sketch widget
                window.dispatchEvent(new Event('resize'));
                
                // Force re-render of all calcite components inside the widget
                const widgetEl = this.visibilityWidgetContainer.nativeElement;
                if (widgetEl) {
                  // Remove display: none from any shadow dom or hidden elements
                  const calciteEls = widgetEl.querySelectorAll('*');
                  calciteEls.forEach((el: any) => {
                    if (el.tagName.toLowerCase().startsWith('calcite-') && el.componentOnReady) {
                      el.componentOnReady().then(() => {
                        if (typeof el.forceUpdate === 'function') {
                          el.forceUpdate();
                        }
                      });
                    }
                  });
                }
              }, 300); // Increased delay to ensure expand animation is finished
            }
          });
        }
      }, 500);

      // Move the camera away to see the globe
      this.view.goTo({
        center: [0, 0],
        zoom: 2,
        tilt: 0
      });

      // If satellites have already been loaded in the service
      const sats = this.issService.celestrakSatellites();
      if (sats.length > 0) {
        this.renderCelestrakSatellites(sats);
      }
      
    } catch (error) {
      console.error('Error loading 3D scene: ', error);
    }
  }

  updateISSLiveMarker(latitude: number, longitude: number) {
    if (!this.view) return;

    // API doesn't provide altitude, setting ~400km (ISS average)
    const altitude = 400000; 

    const point = new Point({
      longitude,
      latitude,
      z: altitude
    });

    if (!this.issLiveGraphic) {
      this.issLiveGraphic = new Graphic({
        geometry: point,
        symbol: new SimpleMarkerSymbol({
          color: [226, 119, 40, 0.9], // Orange like in the 2D tracker
          outline: {
            color: [255, 255, 255],
            width: 2
          },
          size: "10px"
        }),
        attributes: {
          name: "ISS (LIVE API)"
        },
        popupTemplate: {
          title: "{name}",
          content: "Tracciamento in tempo reale tramite API open-notify.org"
        }
      });
      
      this.view.graphics.add(this.issLiveGraphic);
    } else {
      this.issLiveGraphic.geometry = point;
    }
  }

  renderCelestrakSatellites(sats: SatelliteData[]) {
    if (!this.view) return;
    
    // Remove old ones if any
    if (this.celestrakGraphics.length > 0) {
      this.view.graphics.removeMany(this.celestrakGraphics);
      this.celestrakGraphics = [];
    }

    const date = new Date();
    
    sats.forEach(sat => {
      try {
        const satrec = satellite.twoline2satrec(sat.tleLine1, sat.tleLine2);
        const positionAndVelocity = satellite.propagate(satrec, date);
        const positionEci = positionAndVelocity?.position;
        
        if (positionEci && typeof positionEci !== 'boolean') {
          const gmst = satellite.gstime(date);
          const positionGd = satellite.eciToGeodetic(positionEci, gmst);
          
          const longitude = satellite.degreesLong(positionGd.longitude);
          const latitude = satellite.degreesLat(positionGd.latitude);
          const altitude = positionGd.height * 1000; // In meters
  
          if (!isNaN(longitude) && !isNaN(latitude) && !isNaN(altitude)) {
            const point = new Point({
              longitude,
              latitude,
              z: altitude
            });
  
            const graphic = new Graphic({
              geometry: point,
              symbol: new SimpleMarkerSymbol({
                color: [0, 255, 255, 0.8], // Cyan
                outline: {
                  color: [255, 255, 255],
                  width: 1
                },
                size: "4px" // Slightly smaller size for generic satellites
              }),
              attributes: {
                name: sat.name
              },
              popupTemplate: {
                title: "{name}",
                content: "Satellite calcolato dai dati Celestrak TLE."
              }
            });
            this.celestrakGraphics.push(graphic);
          }
        }
      } catch (e) {
        // Ignore satellites with malformed TLE data or calculation errors
      }
    });

    this.view.graphics.addMany(this.celestrakGraphics);
  }

  onVisibilitySearch(params: VisibilitySearchParams) {
    if (!params.geometry) {
      alert('Per favore, disegna una geometria sulla mappa.');
      return;
    }
    if (params.satelliteIds.length === 0) {
      alert('Per favore, seleziona almeno un satellite.');
      return;
    }

    this.isSearching = true;
    this.visibilityResults = [];

    const startMs = new Date(params.startDate).getTime();
    const endMs = new Date(params.endDate).getTime();
    const stepMs = 60 * 1000; // 1 minute

    const allSats = this.issService.celestrakSatellites();
    const targetSats = allSats.filter(sat => params.satelliteIds.includes(sat.name));

    if (targetSats.length === 0) {
      alert('Impossibile trovare i dati TLE per i satelliti selezionati. Prova a selezionare satelliti dinamici.');
      this.isSearching = false;
      return;
    }

    // Execute asynchronously to avoid blocking the UI
    setTimeout(() => {
      const results: { satellite: string, time: Date, altitude: number }[] = [];

      for (const sat of targetSats) {
        try {
          const satrec = satellite.twoline2satrec(sat.tleLine1, sat.tleLine2);

          for (let timeMs = startMs; timeMs <= endMs; timeMs += stepMs) {
            const date = new Date(timeMs);
            const positionAndVelocity = satellite.propagate(satrec, date);
            const positionEci = positionAndVelocity?.position;

            if (positionEci && typeof positionEci !== 'boolean') {
              const gmst = satellite.gstime(date);
              const positionGd = satellite.eciToGeodetic(positionEci, gmst);

              const longitude = satellite.degreesLong(positionGd.longitude);
              const latitude = satellite.degreesLat(positionGd.latitude);
              const altitude = positionGd.height; // in km

              if (!isNaN(longitude) && !isNaN(latitude)) {
                // Project to ground (z=0)
                let point = new Point({
                  longitude,
                  latitude,
                  z: 0,
                  spatialReference: { wkid: 4326 }
                });

                // If user geometry is in Web Mercator, project the point
                if (params.geometry!.spatialReference.isWebMercator) {
                  point = webMercatorUtils.geographicToWebMercator(point) as Point;
                }

                // 50km buffer
                const buffer = geometryEngine.geodesicBuffer(point, 50, 'kilometers');

                let intersects = false;
                if (Array.isArray(buffer)) {
                  intersects = buffer.some(b => geometryEngine.intersects(b, params.geometry as any));
                } else if (buffer) {
                  intersects = geometryEngine.intersects(buffer as any, params.geometry as any);
                }

                // Intersection check
                if (intersects) {
                  results.push({
                    satellite: sat.name,
                    time: date,
                    altitude: Math.round(altitude)
                  });
                }
              }
            }
          }
        } catch (e) {
          console.error(`Calculation error for satellite ${sat.name}`, e);
        }
      }

      this.visibilityResults = results;
      this.isSearching = false;
    }, 100);
  }

  ngOnDestroy() {
    this.issService.stopLive3DTracking();
    if (this.view) {
      this.view.destroy();
    }
  }
}
