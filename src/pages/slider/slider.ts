import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Facebook } from '@ionic-native/facebook'
import { FirebaseListObservable, FirebaseOperation } from 'angularfire2/database';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import 'firebase/auth';
import 'firebase/database';
import { RegistrationPage } from '../registration/registration';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { TabspagePage } from '../tabspage/tabspage';
import { FavouritesPage } from '../favourites/favourites';


/**
 * Generated class for the SliderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  userProfile: any = null;
  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams, public facebook: Facebook, private googlePlus: GooglePlus, public authData: AuthProvider,
    public formBuilder: FormBuilder, public alertCtrl: AlertController,
    public loadingController: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required,
      EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  goToHome() {
    //this.navCtrl.push(HomePage);
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
            alert(JSON.stringify(success))
            this.navCtrl.setRoot(TabspagePage);
          });

      }).catch((error) => { console.log(error) });

  }
  GoogleLogin() {

    if (this.platform.is('android')) {
      this.googlePlus.login({
        'webClientId': '421530495782-ltdvlj7m6o8ucabvtqs1tkbmi7cnf2ji.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        this.navCtrl.setRoot(TabspagePage);
      })
        .catch(err => {

        });
    }
    if (this.platform.is('ios')) {
      this.googlePlus.login({
        'webClientId': '421530495782-ltdvlj7m6o8ucabvtqs1tkbmi7cnf2ji.apps.googleusercontent.com',
        'offline': true
      }).then(res => {
        this.navCtrl.setRoot(TabspagePage);
        alert("hey")
      })
        .catch(err => {
          alert("hello")

        });
    }

  }
  registration() {
    this.navCtrl.push(RegistrationPage)
  }

  loginUser() {
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      let loading = this.loadingController.create({ content: "Logging in \n please wait..." });
      loading.present();
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          loading.dismissAll();
          this.navCtrl.setRoot(TabspagePage);

          console.log("authData", authData)
        }, error => {
          loading.present().then(() => {
            loading.dismiss();
          });
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });


    }
  }



}
