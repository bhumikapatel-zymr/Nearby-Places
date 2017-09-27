import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { TabspagePage } from '../pages/tabspage/tabspage';

import { HomePage } from '../pages/home/home';
import { SliderPage } from '../pages/slider/slider';
import { AngularFireAuth } from 'angularfire2/auth';
import { FavouritesPage } from '../pages/favourites/favourites';
import { ListviewPage } from '../pages/listview/listview';
import { ItemSliding } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;
  menu: any;
  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, public authData: AuthProvider) {

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        authObserver.unsubscribe();
        this.rootPage = TabspagePage;
        this.pages = [
          { title: 'Map', component: TabspagePage },
          { title: 'favourites', component: FavouritesPage },
          { title: 'Logout', component: SliderPage },
        ];
      } else {
        this.rootPage = SliderPage;
        authObserver.unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPageMap() {
    this.rootPage = TabspagePage;
  }
  openPageFavourite() {
    this.rootPage = FavouritesPage;
  }
  openPageLogout() {
    this.rootPage = SliderPage;


  }

}
