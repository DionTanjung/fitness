import { Component } from '@angular/core';
import { ViewController,NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
    template: `
        <ion-list>
            <button ion-item (click)="close()">Akun Saya</button>
            <button ion-item (click)="logOut()">Keluar</button>
        </ion-list>
    `
  })
 
export class homePopover {
    constructor(private localStorage: Storage, private navCtrl:NavController, public viewCtrl: ViewController) {

    }

    logOut() {
        this.clearSession();
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot(LoginPage);
        this.navCtrl.popToRoot();
    }

    clearSession(){
        this.localStorage.remove('session').then(()=>{
            console.log('session is removed');
        });    
    }

    close(){
        this.viewCtrl.dismiss();        
    }

}