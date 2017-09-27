import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { DetailmapPage } from '../detailmap/detailmap';

/**
 * Generated class for the RoutemapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-routemap',
  templateUrl: 'routemap.html',
})
export class RoutemapPage {

  public firstParam;
  public secondParam;
  public sourcelat: any;
  public sourcelong: any;
  public destinationplaces:string = "";
  autocompleteItems;
  autocomplete;
  public shouldHide: boolean;
  errorMessage;
  service = new google.maps.places.AutocompleteService();

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private zone: NgZone) {
    this.firstParam = navParams.get("firstPassed");
    this.secondParam = navParams.get("secondPassed");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutemapPage');
  }
  chooseItem(item: any) {
    this.autocomplete.query = item
    this.destinationplaces = this.autocomplete.query;
    this.shouldHide = true;

  }

  updateSearch() {

    this.errorMessage = null;
    this.shouldHide = false;
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {} }, function(predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function() {
        predictions.forEach(function(prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });

  }
  //convert Address string to lat and long

  /*geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    alert("lat: " + this.latitude + ", long: " + this.longitude);
   });
 }*/

  ngOnInit() {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
  search() {
        if(this.destinationplaces.length > 0 &&  this.firstParam.length > 0)
        {
          this.errorMessage = null;

    this.navCtrl.push(DetailmapPage, {
      firstPassed: this.destinationplaces,
      secondPassed: this.firstParam + this.secondParam,

    })
  }
  else
  {
    this.errorMessage = 'Please enter text';
        return;
  }

}
  pop()
  {
    this.navCtrl.popToRoot();
  }

}
