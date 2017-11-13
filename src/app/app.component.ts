import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.checkSession();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /*
    check 
  */
  checkSession(){
    this.storage.get('session').then(s=>{
      if(s!=null){
        this.rootPage = HomePage;     
      }else{
        this.rootPage = LoginPage;
      }
    })
  }

}

