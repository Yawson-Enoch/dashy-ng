import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { dashboardRouteGuard } from './core/dashboard-route.guard';
import { DashboardTasksComponent } from './dashboard/dashboard-tasks/dashboard-tasks.component';
import { DashboardIndexComponent } from './dashboard/dashboard-index/dashboard-index.component';
import { DashboardRouteComponent } from './dashboard/dashboard-route/dashboard-route.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    component: DashboardRouteComponent,
    canActivateChild: [dashboardRouteGuard],
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardIndexComponent,
      },
      {
        path: 'tasks',
        title: 'Tasks',
        component: DashboardTasksComponent,
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: NotFoundComponent,
  },
];
