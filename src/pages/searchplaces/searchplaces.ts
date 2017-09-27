import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the SearchplacesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchplaces',
  templateUrl: 'searchplaces.html',
})
export class SearchplacesPage {

  searchTerm: string = '';
  items: any;
  searchControl: FormControl;
  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataProvider, public viewCtrl: ViewController) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchplacesPage');
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();

    });
  }
  Selectplace(selectItem: string) {
    var pagename: string = selectItem;
    console.log('selectItem', pagename);
    this.viewCtrl.dismiss(selectItem); //Send back the form object when closeModal is called
  }
  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {

    this.items = this.dataService.filterItems(this.searchTerm);

  }

}
