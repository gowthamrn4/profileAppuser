// Modules import
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
// Route definition
const  appRoutes:  Routes  = [
  {  path:  'profile/:id', component: ProfileComponent }
  , { path: '**', pathMatch: 'prefix', redirectTo: 'login' }
];

@NgModule({
imports: [
RouterModule.forRoot(appRoutes)
],
providers: [
],
exports: [
RouterModule
]
})
export class AppRoutingModule { }
