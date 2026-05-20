import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MapComponent } from '../../components/map/map.component';
import { IssService } from '../../services/iss.service';

@Component({
  selector: 'app-iss-tracker',
  imports: [SidebarComponent, MapComponent],
  templateUrl: './iss-tracker.component.html',
  styleUrl: './iss-tracker.component.scss'
})
export class IssTrackerComponent implements OnInit, OnDestroy {
  private issService = inject(IssService);

  ngOnInit() {
    this.issService.startTracking();
  }

  ngOnDestroy() {
    this.issService.stopTracking();
  }
}
