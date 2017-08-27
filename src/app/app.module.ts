import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { ChatPage } from './../pages/chat/chat';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { SigninPage } from './../pages/signin/signin';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods } from 'angularfire2';

import { SignupPage } from './../pages/signup/signup';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';
import { ChatService } from '../providers/chat.service';
import { MessageService } from '../providers/message.service';

const firebaseAppConfig : FirebaseAppConfig = {
    apiKey: "AIzaSyCvI6cdRxsFtQei70islw2HioAiN4t3PKo",
    authDomain: "ionic2-firebase-chat-7e814.firebaseapp.com",
    databaseURL: "https://ionic2-firebase-chat-7e814.firebaseio.com",
    storageBucket: "ionic2-firebase-chat-7e814.appspot.com",
    messagingSenderId: "867278605639"
  };

  const firebaseAuthConfig = {
    provider : AuthProviders.Custom,
    method : AuthMethods.Password
  }

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
