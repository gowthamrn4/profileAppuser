import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { ProfileComponent } from './profile/profile.component';
export const firebaseConfig = {
  // apiKey: "AIzaSyAvQxBxD30yENBAl-pPmIf2bmDjMIpVSv4",
  //   authDomain: "profileapp-f45c3.firebaseapp.com",
  //   databaseURL: "https://profileapp-f45c3.firebaseio.com",
  //   projectId: "profileapp-f45c3",
  //   storageBucket: "profileapp-f45c3.appspot.com",
  //   messagingSenderId: "999070293949"
  // apiKey: "AIzaSyCwUnQgyap7XSXgggv2jQ-kgWMPLk5FUoo",
  // authDomain: "profileapp-ca795.firebaseapp.com",
  // databaseURL: "https://profileapp-ca795.firebaseio.com",
  // projectId: "profileapp-ca795",
  // storageBucket: "profileapp-ca795.appspot.com",
  // messagingSenderId: "611182222414",
  // appId: "1:611182222414:web:21f32002b58d042e"

  apiKey: "AIzaSyCwUnQgyap7XSXgggv2jQ-kgWMPLk5FUoo",
  authDomain: "profileapp-ca795.firebaseapp.com",
  databaseURL: "https://profileapp-ca795.firebaseio.com",
  projectId: "profileapp-ca795",
  storageBucket: "profileapp-ca795.appspot.com",
  messagingSenderId: "611182222414",
  appId: "1:611182222414:web:21f32002b58d042e"
};

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AngularFireAuth, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
