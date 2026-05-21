import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  inject,
  effect,
  ChangeDetectorRef,
  NgZone,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import type { ArcgisScene } from '@arcgis/map-components/components/arcgis-scene';
import '@arcgis/map-components/components/arcgis-scene';
import '@arcgis/map-components/components/arcgis-expand';

import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

import * as satellite from 'satellite.js';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import { IssService, SatelliteData } from '../../services/iss.service';
import { VisibilitySearchComponent, VisibilitySearchParams } from '../../components/visibility-search/visibility-search.component';

@Component({
  selector: 'app-satellites-3d',
  standalone: true,
  imports: [CommonModule, VisibilitySearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './satellites-3d.component.html',
  styleUrl: './satellites-3d.component.scss',
})
export class Satellites3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scene') private sceneEl!: ElementRef<ArcgisScene>;

  public view: SceneView | null = null;
  private issService = inject(IssService);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);
  private issLiveGraphic: Graphic | null = null;
  private celestrakGraphics: Graphic[] = [];
  private sceneConfigured = false;

  public visibilityResults: { satellite: string; time: Date; altitude: number }[] = [];
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
  }

  async onSceneViewReady(): Promise<void> {
    if (this.sceneConfigured) return;

    try {
      const scene = this.sceneEl.nativeElement;
      await scene.viewOnReady();

      this.view = scene.view;
      this.sceneConfigured = true;

      this.view.qualityProfile = 'high';
      this.view.environment = {
        lighting: {
          type: 'sun',
          date: new Date(),
        },
        atmosphereEnabled: true,
        starsEnabled: true,
      };

      await this.view.goTo({
        center: [0, 0],
        zoom: 2,
        tilt: 0,
      });

      this.ngZone.run(() => this.cdr.detectChanges());

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

    const altitude = 400000;

    const point = new Point({
      longitude,
      latitude,
      z: altitude,
    });

    if (!this.issLiveGraphic) {
      this.issLiveGraphic = new Graphic({
        geometry: point,
        symbol: new SimpleMarkerSymbol({
          color: [226, 119, 40, 0.9],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
          size: '10px',
        }),
        attributes: {
          name: 'ISS (LIVE API)',
        },
        popupTemplate: {
          title: '{name}',
          content: 'Tracciamento in tempo reale tramite API open-notify.org',
        },
      });

      this.view.graphics.add(this.issLiveGraphic);
    } else {
      this.issLiveGraphic.geometry = point;
    }
  }

  renderCelestrakSatellites(sats: SatelliteData[]) {
    if (!this.view) return;

    if (this.celestrakGraphics.length > 0) {
      this.view.graphics.removeMany(this.celestrakGraphics);
      this.celestrakGraphics = [];
    }

    const date = new Date();

    sats.forEach((sat) => {
      try {
        const satrec = satellite.twoline2satrec(sat.tleLine1, sat.tleLine2);
        const positionAndVelocity = satellite.propagate(satrec, date);
        const positionEci = positionAndVelocity?.position;

        if (positionEci && typeof positionEci !== 'boolean') {
          const gmst = satellite.gstime(date);
          const positionGd = satellite.eciToGeodetic(positionEci, gmst);

          const longitude = satellite.degreesLong(positionGd.longitude);
          const latitude = satellite.degreesLat(positionGd.latitude);
          const altitude = positionGd.height * 1000;

          if (!isNaN(longitude) && !isNaN(latitude) && !isNaN(altitude)) {
            const point = new Point({
              longitude,
              latitude,
              z: altitude,
            });

            const graphic = new Graphic({
              geometry: point,
              symbol: new SimpleMarkerSymbol({
                color: [0, 255, 255, 0.8],
                outline: {
                  color: [255, 255, 255],
                  width: 1,
                },
                size: '4px',
              }),
              attributes: {
                name: sat.name,
              },
              popupTemplate: {
                title: '{name}',
                content: 'Satellite calcolato dai dati Celestrak TLE.',
              },
            });
            this.celestrakGraphics.push(graphic);
          }
        }
      } catch {
        // Ignore satellites with malformed TLE data
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
    const stepMs = 60 * 1000;

    const allSats = this.issService.celestrakSatellites();
    const targetSats = allSats.filter((sat) => params.satelliteIds.includes(sat.name));

    if (targetSats.length === 0) {
      alert('Impossibile trovare i dati TLE per i satelliti selezionati. Prova a selezionare satelliti dinamici.');
      this.isSearching = false;
      return;
    }

    setTimeout(() => {
      const results: { satellite: string; time: Date; altitude: number }[] = [];

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
              const altitude = positionGd.height;

              if (!isNaN(longitude) && !isNaN(latitude)) {
                let point = new Point({
                  longitude,
                  latitude,
                  z: 0,
                  spatialReference: { wkid: 4326 },
                });

                if (params.geometry!.spatialReference.isWebMercator) {
                  point = webMercatorUtils.geographicToWebMercator(point) as Point;
                }

                const buffer = geometryEngine.geodesicBuffer(point, 50, 'kilometers');

                let intersects = false;
                if (Array.isArray(buffer)) {
                  intersects = buffer.some((b) => geometryEngine.intersects(b, params.geometry as any));
                } else if (buffer) {
                  intersects = geometryEngine.intersects(buffer as any, params.geometry as any);
                }

                if (intersects) {
                  results.push({
                    satellite: sat.name,
                    time: date,
                    altitude: Math.round(altitude),
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
    this.view = null;
  }
}
