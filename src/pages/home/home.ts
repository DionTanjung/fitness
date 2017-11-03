import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  /* go to menu page
    @var index => index menu
  */
  openMenu(index){
    if (index==1){
      this.navCtrl.push('WorkoutPage');
    }else if(index==2){
      this.navCtrl.push('HistoryPage'); 
    }else{
      this.navCtrl.push('ReportPage');
      
    }
  }

}
