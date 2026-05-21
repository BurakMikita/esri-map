import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import SceneView from '@arcgis/core/views/SceneView';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Geometry from '@arcgis/core/geometry/Geometry';
import { IssService } from '../../services/iss.service';

export interface VisibilitySearchParams {
  geometry: Geometry | null;
  startDate: string;
  endDate: string;
  satelliteIds: string[];
}

@Component({
  selector: 'app-visibility-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visibility-search.component.html',
  styleUrl: './visibility-search.component.scss'
})
export class VisibilitySearchComponent implements OnInit, OnDestroy {
  @Input() view!: SceneView;
  @Output() search = new EventEmitter<VisibilitySearchParams>();

  @ViewChild('sketchContainer', { static: true }) sketchContainer!: ElementRef;

  startDate: string = '';
  endDate: string = '';
  selectedSatellites: string[] = [];

  // Mock list of satellites (static ones)
  staticSatellites = [
    { id: 'ISS (ZARYA)', name: 'ISS (ZARYA)' },
    { id: 'SUOMI NPP', name: 'SUOMI NPP' },
    { id: 'LANDSAT 8', name: 'LANDSAT 8' },
    { id: 'NOAA 20', name: 'NOAA 20' }
  ];

  availableSatellites: { id: string, name: string }[] = [...this.staticSatellites];

  private graphicsLayer!: GraphicsLayer;
  private sketchWidget!: Sketch;
  private issService = inject(IssService);

  constructor() {
    effect(() => {
      const dynamicSats = this.issService.celestrakSatellites();
      const dynamicMapped = dynamicSats.map(sat => ({
        id: sat.name, // Using name as ID since we don't have NORAD ID explicitly parsed
        name: sat.name + ' (Dynamic)'
      }));
      
      // Combine static and dynamic
      this.availableSatellites = [...this.staticSatellites, ...dynamicMapped];
    });
  }

  ngOnInit() {
    // Initialize dates to today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    this.startDate = today.toISOString().slice(0, 16);
    this.endDate = tomorrow.toISOString().slice(0, 16);

    this.initSketch();
  }

  private initSketch() {
    if (!this.view) return;

    // If the map is not ready yet, try again shortly
    if (!this.view.map) {
      setTimeout(() => this.initSketch(), 100);
      return;
    }

    this.graphicsLayer = new GraphicsLayer({
      title: 'Search Geometry'
    });
    this.view.map.add(this.graphicsLayer);

    // Wait for the container to be visible in the DOM
    setTimeout(() => {
      if (this.sketchContainer && this.sketchContainer.nativeElement) {
        // Clear any previous instances
        if (this.sketchWidget) {
          this.sketchWidget.destroy();
        }
        
        // Force container dimensions before initializing
        this.sketchContainer.nativeElement.style.width = '100%';
        this.sketchContainer.nativeElement.style.display = 'block';
        
        this.sketchWidget = new Sketch({
          layer: this.graphicsLayer,
          view: this.view,
          container: this.sketchContainer.nativeElement,
          creationMode: 'single',
          availableCreateTools: ['point', 'polyline', 'polygon', 'rectangle', 'circle'],
          visibleElements: {
            createTools: {
              point: true,
              polyline: true,
              polygon: true,
              rectangle: true,
              circle: true
            },
            selectionTools: {
              "lasso-selection": false,
              "rectangle-selection": false
            },
            settingsMenu: false,
            undoRedoMenu: true
          }
        });
        
        // Force a dimension recalculation when the sketch is created
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          
          // Also force an update of the calcite layout
          document.querySelectorAll('calcite-action').forEach(el => {
            if ((el as any).componentOnReady) {
              (el as any).componentOnReady().then(() => {
                if (typeof (el as any).forceUpdate === 'function') {
                  (el as any).forceUpdate();
                }
              });
            }
          });
        }, 300);
      }
    }, 500);
  }

  onSearch() {
    let geometry: Geometry | null = null;
    if (this.graphicsLayer && this.graphicsLayer.graphics.length > 0) {
      geometry = this.graphicsLayer.graphics.getItemAt(0)?.geometry as Geometry | null;
    }

    this.search.emit({
      geometry,
      startDate: this.startDate,
      endDate: this.endDate,
      satelliteIds: this.selectedSatellites
    });
  }

  ngOnDestroy() {
    if (this.sketchWidget) {
      this.sketchWidget.destroy();
    }
    if (this.graphicsLayer) {
      this.view?.map?.remove(this.graphicsLayer);
    }
  }
}
