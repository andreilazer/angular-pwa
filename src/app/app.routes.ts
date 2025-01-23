import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CachedRouteComponent } from './cached-route/cached-route.component';
import { NonCachedRouteComponent } from './non-cached-route/non-cached-route.component';

export const routes: Routes = [
  {
      path: '',
      component: DashboardComponent
  },
  {
    path: 'cached-route',
    component: CachedRouteComponent
  },
  {
    path: 'non-cached-route',
    component: NonCachedRouteComponent
  }
];
