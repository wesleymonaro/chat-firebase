import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

import { SignupPage } from './../pages/signup/signup';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';

const firebaseAppConfig : FirebaseAppConfig = {
    apiKey: "AIzaSyCvI6cdRxsFtQei70islw2HioAiN4t3PKo",
    authDomain: "ionic2-firebase-chat-7e814.firebaseapp.com",
    databaseURL: "https://ionic2-firebase-chat-7e814.firebaseio.com",
    storageBucket: "ionic2-firebase-chat-7e814.appspot.com",
    messagingSenderId: "867278605639"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
