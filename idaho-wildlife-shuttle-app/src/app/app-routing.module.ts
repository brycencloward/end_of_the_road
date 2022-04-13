import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen',
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./pages/splash-screen/splash-screen.module').then( m => m.SplashScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
    , canLoad: [AuthGuard] // this adds the auth-guard fuctionality to any desired page
  },
  {
    path: 'shuttle-reservation',
    loadChildren: () => import('./pages/shuttle-reservation/shuttle-reservation.module').then( m => m.ShuttleReservationPageModule)
    , canLoad: [AuthGuard]
  },
  {
    path: 'reservations',
    loadChildren: () => import('./pages/reservations/reservations.module').then( m => m.ReservationsPageModule)
    , canLoad: [AuthGuard]
  },
  {
    path: 'pay-pal-web',
    loadChildren: () => import('./pages/pay-pal-web/pay-pal-web.module').then( m => m.PayPalWebPageModule)
    , canLoad: [AuthGuard]
  },
  {
    path: 'cancelpolicy',
    loadChildren: () => import('./pages/cancelpolicy/cancelpolicy.module').then( m => m.CancelpolicyPageModule)
  },
  {
    path: 'movecar',
    loadChildren: () => import('./pages/movecar/movecar.module').then( m => m.MovecarPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
