import { Component } from '@angular/core';
import { IonicPage,NavController,NavParams,PopoverController} from 'ionic-angular';
import { homePopover } from './popover';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private popoverCtrl: PopoverController) {
    
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

  openPopover(event){
    let p = this.popoverCtrl.create(homePopover);
    p.present({
      ev:event
    });
  }

}
