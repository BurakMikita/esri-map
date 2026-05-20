import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

import { IssService } from '../../services/iss.service';

@Component({
  selector: 'app-satellites-3d',
  imports: [CommonModule],
  templateUrl: './satellites-3d.component.html',
  styleUrl: './satellites-3d.component.scss'
})
export class Satellites3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sceneViewNode', { static: true }) private sceneViewEl!: ElementRef;

  private view: SceneView | null = null;
  private issService = inject(IssService);
  private issLiveGraphic: Graphic | null = null;

  constructor() {
    effect(() => {
      const pos = this.issService.issLive3DPosition();
      if (pos) {
        this.updateISSLiveMarker(pos.latitude, pos.longitude);
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
      
      // Allontana la telecamera per vedere il globo
      this.view.goTo({
        center: [0, 0],
        zoom: 2,
        tilt: 0
      });
      
    } catch (error) {
      console.error('Errore nel caricamento della scena 3D: ', error);
    }
  }

  updateISSLiveMarker(latitude: number, longitude: number) {
    if (!this.view) return;

    // L'API non fornisce altitudine, impostiamo ~400km (media della ISS)
    const altitude = 40; 

    const point = new Point({
      longitude,
      latitude,
      z: altitude
    });

    if (!this.issLiveGraphic) {
      this.issLiveGraphic = new Graphic({
        geometry: point,
        symbol: new SimpleMarkerSymbol({
          color: [226, 119, 40, 0.9], // Arancione come nel tracker 2D
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

  ngOnDestroy() {
    this.issService.stopLive3DTracking();
    if (this.view) {
      this.view.destroy();
    }
  }
}
