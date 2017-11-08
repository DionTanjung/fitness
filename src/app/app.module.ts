import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ModalContentPage } from '../pages/login/modal';
import { ModalWorkOutPage } from '../pages/workout/modal';

import { CouchbaseLite } from '@ionic-native/couchbase-lite';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ModalContentPage,
    ModalWorkOutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ModalContentPage,
    ModalWorkOutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    CouchbaseLite
  ]
})
export class AppModule {}
