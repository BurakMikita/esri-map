import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

import { IssService } from '../../services/iss.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  private issService = inject(IssService);

  private view: MapView | null = null;
  private historyGraphics: Graphic[] = [];
  private hoverGraphic: Graphic | null = null;
  private isInitialCentered = false;

  constructor() {
    // Reactive effect: updates the map every time the history array changes
    effect(() => {
      const history = this.issService.history();
      if (history.length > 0) {
        this.updateMarkers(history);
      }
    });

    // Reactive effect: when hovering over a row
    effect(() => {
      const hovered = this.issService.hoveredPosition();
      this.updateHoverMarker(hovered);
    });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  async initMap() {
    try {
      const map = new Map({
        basemap: 'streets-vector' // You can change to "streets-vector", "satellite", etc.
      });

      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        map: map,
        center: [0, 0],
        zoom: 3
      });

      // Yellow symbol for hover
      const hoverSymbol = new SimpleMarkerSymbol({
        color: [255, 204, 0], // Yellow
        outline: {
          color: [255, 255, 255], // White
          width: 2
        },
        size: "16px" // Slightly larger
      });

      this.hoverGraphic = new Graphic({
        symbol: hoverSymbol,
        visible: false // Hidden by default
      });

      this.view.graphics.add(this.hoverGraphic);

      await this.view.when();
      
    } catch (error) {
      console.error('Error loading the map: ', error);
    }
  }

  updateMarkers(history: any[]) {
    if (!this.view) return;

    // Remove old points to redraw them with correct styles
    if (this.historyGraphics.length > 0) {
      this.view.graphics.removeMany(this.historyGraphics);
    }

    this.historyGraphics = history.map((pos, index) => {
      const isLatest = index === 0;
      
      const symbol = new SimpleMarkerSymbol({
        color: isLatest ? [226, 119, 40] : [226, 119, 40, 0.5], // Semi-transparent for history
        outline: {
          color: [255, 255, 255],
          width: isLatest ? 2 : 1
        },
        size: isLatest ? "14px" : "10px" // Smaller size for history
      });

      return new Graphic({
        geometry: new Point({
          longitude: pos.longitude,
          latitude: pos.latitude
        }),
        symbol: symbol,
        attributes: {
          name: "ISS",
          time: new Date(pos.timestamp * 1000).toLocaleString()
        },
        popupTemplate: {
          title: "Stazione Spaziale Internazionale",
          content: "Latitudine: {latitude}<br>Longitudine: {longitude}<br>Data e ora: {time}"
        }
      });
    });

    // Add all points to the map
    this.view.graphics.addMany(this.historyGraphics);

    // Center the map only the first time
    if (!this.isInitialCentered && history.length > 0) {
      const latest = history[0];
      this.view.center = [latest.longitude, latest.latitude] as any;
      this.view.zoom = 4;
      this.isInitialCentered = true;
    }
  }

  updateHoverMarker(pos: any) {
    if (this.view && this.hoverGraphic) {
      if (pos) {
        const point = new Point({
          longitude: pos.longitude,
          latitude: pos.latitude
        });
        this.hoverGraphic.geometry = point;
        this.hoverGraphic.visible = true;
      } else {
        this.hoverGraphic.visible = false;
      }
    }
  }

  ngOnDestroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}
