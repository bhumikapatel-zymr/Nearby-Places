import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController,
  Loading
} from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DetailmapPage } from '../detailmap/detailmap';
import { RoutemapPage } from '../routemap/routemap';
/**
 * Generated class for the FavouritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  favitems: any;
  items: any;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public afd: AngularFireDatabase, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {

    this.getitem();
  }

  ionViewDidLoad() {


  }
  getitem() {
    this.loading = this.loadingCtrl.create({
    });
    this.loading.present();
    this.firebaseProvider.getfavItems().then(data => {
      this.favitems = data;
      this.loading.dismiss();
      console.log("snapshot.val().name", this.favitems);
    });
  }
  gotodetailpage(infoWindowContent: string, infoWindowContent1: string) {
    this.navCtrl.push(RoutemapPage, {
      firstPassed: infoWindowContent,
      secondPassed: infoWindowContent1,
    });
  }
  removeItem(item: any) {

    this.afd.list('/favitems').remove(item);
    this.getitem();
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);

  }

}
