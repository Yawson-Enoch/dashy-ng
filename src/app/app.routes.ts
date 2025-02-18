import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard-route/dashboard-route.component').then(
        (c) => c.DashboardRouteComponent
      ),
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard-index/dashboard-index.component').then(
            (c) => c.DashboardIndexComponent
          ),
      },
      {
        path: 'tasks',
        title: 'Tasks',
        loadComponent: () =>
          import('./dashboard/dashboard-tasks/dashboard-tasks.component').then(
            (c) => c.DashboardTasksComponent
          ),
      },
    ],
  },
];
