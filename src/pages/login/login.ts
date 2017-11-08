import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ModalController , NavParams } from 'ionic-angular';
import { ModalContentPage } from './modal';
import { CouchbaseLite } from '@ionic-native/couchbase-lite';
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
  url:string;

  constructor(private couchbase: CouchbaseLite, public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,  public formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      password: ['', Validators.compose([Validators.required])]
    });
    this.initMethod();
  }

  initMethod() {
     this.couchbase.getURL().then((url)=> {
       console.log(url);
         this.url = url;
     })
  }
  getUrl() {
       return this.url;
  }

  loginForm(value:any){
    if(this.form.valid) {
      console.log(value);
    }
    // this.navCtrl.push('HomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public registerModal(){
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.present();
  }  



}


