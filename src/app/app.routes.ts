import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component')
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component')
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders.component')
  },
  {
    path: 'images',
    loadComponent: () => import('./pages/images/images.component')
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
