import { Routes } from '@angular/router';
import { IssTrackerComponent } from './pages/iss-tracker/iss-tracker.component';
import { Satellites3dComponent } from './pages/satellites-3d/satellites-3d.component';

export const routes: Routes = [
  { path: '', redirectTo: 'iss', pathMatch: 'full' },
  { path: 'iss', component: IssTrackerComponent },
  { path: 'satellites-3d', component: Satellites3dComponent }
];
