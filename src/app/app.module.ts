import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation'
import { Facebook } from '@ionic-native/facebook'
import { DataProvider } from '../providers/data/data';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrationPage } from '../pages/registration/registration';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SearchplacesPage } from '../pages/searchplaces/searchplaces';
import { DetailmapPage } from '../pages/detailmap/detailmap';
import { ListviewPage } from '../pages/listview/listview';
import { TabspagePage } from '../pages/tabspage/tabspage';
import { RoutemapPage } from '../pages/routemap/routemap';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { FirebaseProvider } from './../providers/firebase/firebase';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { SliderPage } from '../pages/slider/slider';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpModule } from '@angular/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
var firebaseConfig = {
  apiKey: "AIzaSyAcwE0whOZADueWjGU6nv2s_EB4J0SKT70",
  authDomain: "ionic-components-177512.firebaseapp.com",
  databaseURL: "https://ionic-components-177512.firebaseio.com",
  projectId: "ionic-components-177512",
  storageBucket: "ionic-components-177512.appspot.com",
  messagingSenderId: "421530495782"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SliderPage,
    RegistrationPage,
    FavouritesPage,
    SearchplacesPage,
    DetailmapPage,
    ListviewPage,
    TabspagePage,
    RoutemapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    }),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SliderPage,
    RegistrationPage,
    FavouritesPage,
    SearchplacesPage,
    DetailmapPage,
    ListviewPage,
    TabspagePage
    , RoutemapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GooglePlus,
    AuthProvider,
    DataProvider,
    NativeGeocoder,
    LaunchNavigator,
    DataProvider,
    FirebaseProvider


  ]
})
export class AppModule { }
