import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapComponent } from './components/map/map.component';
import { IssService } from './services/iss.service';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Mappa ISS (Stazione Spaziale Internazionale)');
  
  private issService = inject(IssService);

  ngOnInit() {
    this.issService.startTracking();
  }

  ngOnDestroy() {
    this.issService.stopTracking();
  }
}
