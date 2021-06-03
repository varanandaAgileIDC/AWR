import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'otp/:data',
    loadChildren: () => import('./pages/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./sidemenu/tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
    path: 'speed-check',
    loadChildren: () => import('./sidemenu/speed-check/speed-check.module').then( m => m.SpeedCheckPageModule)
  },
  {
    path: 'break-down',
    loadChildren: () => import('./sidemenu/break-down/break-down.module').then( m => m.BreakDownPageModule)
  },
  {
    path: 'document-scan',
    loadChildren: () => import('./sidemenu/document-scan/document-scan.module').then( m => m.DocumentScanPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./modals/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./sidemenu/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'service-request',
    loadChildren: () => import('./sidemenu/service-request/service-request.module').then( m => m.ServiceRequestPageModule)
  },
  {
    path: 'breakdown-list',
    loadChildren: () => import('./sidemenu/breakdown-list/breakdown-list.module').then( m => m.BreakdownListPageModule)
  },
  {
    path: 'service-list',
    loadChildren: () => import('./sidemenu/service-list/service-list.module').then( m => m.ServiceListPageModule)
  },
  {
    path: 'customer-vehicles',
    loadChildren: () => import('./pages/customer-vehicles/customer-vehicles.module').then( m => m.CustomerVehiclesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
