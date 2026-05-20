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
    // Effetto reattivo: ogni volta che l'array history cambia, si aggiorna la mappa
    effect(() => {
      const history = this.issService.history();
      if (history.length > 0) {
        this.updateMarkers(history);
      }
    });

    // Effetto reattivo: quando si passa il mouse su una riga
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
        basemap: 'streets-vector' // Puoi cambiare in "streets-vector", "satellite", ecc.
      });

      this.view = new MapView({
        container: this.mapViewEl.nativeElement,
        map: map,
        center: [0, 0],
        zoom: 3
      });

      // Simbolo giallo per l'hover
      const hoverSymbol = new SimpleMarkerSymbol({
        color: [255, 204, 0], // Giallo
        outline: {
          color: [255, 255, 255], // Bianco
          width: 2
        },
        size: "16px" // Leggermente più grande
      });

      this.hoverGraphic = new Graphic({
        symbol: hoverSymbol,
        visible: false // Nascosto di default
      });

      this.view.graphics.add(this.hoverGraphic);

      await this.view.when();
      
    } catch (error) {
      console.error('Errore nel caricamento della mappa: ', error);
    }
  }

  updateMarkers(history: any[]) {
    if (!this.view) return;

    // Убираем старые точки, чтобы перерисовать их с правильными стилями
    if (this.historyGraphics.length > 0) {
      this.view.graphics.removeMany(this.historyGraphics);
    }

    this.historyGraphics = history.map((pos, index) => {
      const isLatest = index === 0;
      
      const symbol = new SimpleMarkerSymbol({
        color: isLatest ? [226, 119, 40] : [226, 119, 40, 0.5], // Полупрозрачные для истории
        outline: {
          color: [255, 255, 255],
          width: isLatest ? 2 : 1
        },
        size: isLatest ? "14px" : "10px" // Меньший размер для истории
      });

      return new Graphic({
        geometry: new Point({
          longitude: pos.longitude,
          latitude: pos.latitude
        }),
        symbol: symbol
      });
    });

    // Добавляем все точки на карту
    this.view.graphics.addMany(this.historyGraphics);

    // Centra la mappa solo la prima volta
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
