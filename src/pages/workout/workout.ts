import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController , NavParams } from 'ionic-angular';
import { ModalWorkOutPage } from './modal';
/**
 * Generated class for the WorkoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workout',
  templateUrl: 'workout.html',
})
export class WorkoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkoutPage');
  }

  public registerModal(){
    let modal = this.modalCtrl.create(ModalWorkOutPage);
    modal.present();
  }  

}
