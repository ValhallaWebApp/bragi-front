import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./modules/gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],  // Protegge la rotta 'Admin' con l'AuthGuard
    canLoad: [AuthGuard]       // Evita di caricare il modulo se l'utente non è autenticato
  },
  {
    path: 'who',
    loadChildren: () =>
      import('./modules/who/who.module').then((m) => m.WhoModule),
  },
  { path: 'contact', loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule) },
  { path: 'gallery3d', loadChildren: () => import('./modules/gallery3d/gallery3d.module').then(m => m.Gallery3dModule) },
  { path: 'mostre', loadChildren: () => import('./modules/mostre/mostre.module').then(m => m.MostreModule) },
  { path: 'payment', loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
