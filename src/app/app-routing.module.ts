import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NologinGuard } from '../guards/nologin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { PruebaGuard } from '../guards/prueba.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/login/home.module').then( m => m.HomePageModule), canActivate : [NologinGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'entrada',
    loadChildren: () => import('./pages/entrada/entrada.module').then( m => m.EntradaPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'salida',
    loadChildren: () => import('./pages/salida/salida.module').then( m => m.SalidaPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'dotacion',
    loadChildren: () => import('./pages/dotacion/dotacion.module').then( m => m.DotacionPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'cambio',
    loadChildren: () => import('./pages/cambio/cambio.module').then( m => m.CambioPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'inventario',
    loadChildren: () => import('./pages/inventario/inventario.module').then( m => m.InventarioPageModule), canActivate : [AuthGuard, PruebaGuard]
  },
  {
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule), canActivate : [AuthGuard, ]
  },
  {
    path: 'reporte',
    loadChildren: () => import('./pages/reporte/reporte.module').then( m => m.ReportePageModule), canActivate : [AuthGuard, PruebaGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
