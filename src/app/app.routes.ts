import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardRouteComponent } from './pages/dashboard/dashboard-route/dashboard-route.component';
import { DashboardIndexComponent } from './pages/dashboard/dashboard-index/dashboard-index.component';
import { DashboardTasksComponent } from './pages/dashboard/dashboard-tasks/dashboard-tasks.component';

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
