import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ListviewPage } from '../listview/listview';
import { SliderPage } from '../slider/slider';

/**
 * Generated class for the TabspagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabspage',
  templateUrl: 'tabspage.html',
})
export class TabspagePage {

  tab1Root: any = HomePage;
  tab2Root: any = ListviewPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabspagePage');
  }

}
