import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ModalController , NavParams,AlertController  } from 'ionic-angular';
import { ModalContentPage } from './modal';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form : FormGroup;

  constructor(private localStorage: Storage, private alertCtrl: AlertController, private db:DatabaseProvider, public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,  public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      password: ['', Validators.compose([Validators.required])]
    });
  } 

  loginForm(value:any){
    if(this.form.valid) {
      let searchQuery = 'SELECT * FROM userAccount WHERE username="'+value.username+'"';
      this.db.searchDB(searchQuery).then((r)=>{
        if(r!=null){
          if(r[0].password==value.password){
              this.navCtrl.setRoot(HomePage); 
              this.saveSession(value.username);             
          }else{
            this.presentAlert();
          }
          // let query='DROP TABLE userAccount';
          // this.db.clearDB(query).then((r)=>{
          //   console.log('deleted');
          // })
        }else{
          this.presentAlert();
        }
        this.db.getDB('userAccount').then((f)=>{
          console.log(f);
        })
        this.db.getDB('userProfile').then((f)=>{
          console.log(f);
        })
      },(e)=>{
        console.log('Error' + JSON.stringify(e));
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public registerModal(){
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
  }  

  saveSession(username){
    this.localStorage.set('session',username);
  }

  // getSession(){
  //   this.localStorage.get('session').then(s=>{
  //     if(s!=null){
  //       this.navCtrl.setRoot('HomePage');    
  //     }
  //   })
  // }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Log in failed',
      subTitle: 'Check your username and password',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}


