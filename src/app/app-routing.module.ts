import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidartokenGuard } from './guards/validartoken.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import ('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate:[ValidartokenGuard],
    canLoad:[ValidartokenGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
