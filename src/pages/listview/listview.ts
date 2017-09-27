import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ListviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listview',
  templateUrl: 'listview.html',
})
export class ListviewPage {

  places: Array<any>;
  loading: Loading;
  favItems: FirebaseListObservable<any[]>;
  location: any;
  location1: any;

  lat: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public events: Events, public loadingController: LoadingController, public firebaseProvider: FirebaseProvider) {
    this.events.subscribe('data:created', (data) => {
      console.log("data is", data);

      this.places = data;
    });
  }
  ngOnInit() {


  }
  addtofav(name: string, vicinity: string, icon: string) {
    this.firebaseProvider.addfavItem(name, vicinity, icon);
    let toast = this.toastCtrl.create({   // you can change text olor and backgrounf color in variable.css file
      message: 'Successfully added',
      duration: 1000,
      position: "top"
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListviewPage');

  }

}
