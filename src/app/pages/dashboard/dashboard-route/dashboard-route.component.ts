import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-route',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-route.component.html',
})
export class DashboardRouteComponent {}
