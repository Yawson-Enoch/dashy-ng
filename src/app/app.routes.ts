import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardRouteComponent } from './dashboard/dashboard-route/dashboard-route.component';
import { DashboardIndexComponent } from './dashboard/dashboard-index/dashboard-index.component';
import { DashboardTasksComponent } from './dashboard/dashboard-tasks/dashboard-tasks.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardRouteComponent,
    children: [
      { path: '', title: 'Dashboard', component: DashboardIndexComponent },
      { path: 'tasks', title: 'Tasks', component: DashboardTasksComponent },
    ],
  },
];
