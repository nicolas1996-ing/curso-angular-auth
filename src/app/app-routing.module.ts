import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { RedirectsGuard } from '@guards/redirects.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RedirectsGuard], // si ya existe una sesion activa no deja crear una nueva
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    canActivate: [AuthGuard], // protege todos los componentes asociados al modulo
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
