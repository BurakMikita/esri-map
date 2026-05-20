import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssService } from '../../services/iss.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  issService = inject(IssService);
}
