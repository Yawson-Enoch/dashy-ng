import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { dashboardRouteGuard } from './core/dashboard-route.guard';

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
    canActivateChild: [dashboardRouteGuard],
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
  {
    path: '**',
    title: 'Page Not Found',
    component: NotFoundComponent,
  },
];
