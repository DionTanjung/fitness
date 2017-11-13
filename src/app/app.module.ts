import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { homePopover } from '../pages/home/popover';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { DatabaseProvider } from '../providers/database/database';
import { ModalContentPage } from '../pages/login/modal';
import { ModalWorkOutPage } from '../pages/workout/modal';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ModalContentPage,
    ModalWorkOutPage,
    homePopover
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ModalContentPage,
    ModalWorkOutPage,
    homePopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    SQLite,
    SQLitePorter,
    DatabaseProvider
  ]
})
export class AppModule {}
