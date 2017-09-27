import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/



@Injectable()
export class FirebaseProvider {
  favItems: FirebaseListObservable<any[]>;

  constructor(public http: Http, public afd: AngularFireDatabase) {
  }

  addfavItem(name, vicinity, icon) {

    //  this.afd.list('/favItems/').push(latlong);

    this.favItems = this.afd.list('/favitems/');
    var items = ({
      'name': name,
      'vicinity': vicinity,
      'icon': icon
    })

    this.favItems.push(items);
  }

  getfavItems(): Promise<any> {
    //console.log("",this.afd.list('/favitems'));
    //  return this.afd.list('/favitems')
    return new Promise(resolve => {
      this.afd.list('/favitems').subscribe(data => {
        resolve(data);
      })
    })
  }

}
