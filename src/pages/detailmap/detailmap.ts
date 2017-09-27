import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
declare var google;
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { RoutemapPage } from '../routemap/routemap';



@IonicPage()
@Component({
  selector: 'page-detailmap',
  templateUrl: 'detailmap.html',
})
export class DetailmapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;

  geocoder = new google.maps.Geocoder;
  public sourcelat: any;
  public sourcelong: any;
  public firstParam;
  public secondParam;
  options: GeolocationOptions;
  currentPos: Geoposition;

  constructor(public app1: App, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private launchNavigator: LaunchNavigator) {

    this.firstParam = navParams.get("firstPassed");
    this.secondParam = navParams.get("secondPassed");
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailmapPage');
    //  this.startNavigating();
    this.getUserPosition();
  }
  getUserPosition() {
    this.options = {
      enableHighAccuracy: false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {

      this.currentPos = pos;

      console.log(pos);
      this.loadMap(pos.coords.latitude, pos.coords.longitude);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
      ;
    })
  }
  loadMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.startNavigating();

  }
  startNavigating() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
      origin: this.firstParam,
      destination: this.secondParam,
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
        alert("Please insert proper places")
      }
    });
  }
  navigate() {
    let options: LaunchNavigatorOptions = {
      start: this.firstParam
    };

    this.launchNavigator.navigate(this.secondParam, options)
      .then(
      success => alert('Launched navigator'),
      error => alert('Error launching navigator: ' + error)
      );
  }
  pop() {
    this.navCtrl.popTo(RoutemapPage);
  }
}
