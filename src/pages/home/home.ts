import { Component,ViewChild ,ElementRef } from '@angular/core';
import { NavController ,ModalController ,Events,Platform} from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
declare var google;
import { Facebook } from '@ionic-native/facebook'
import { FavouritesPage } from '../favourites/favourites';
import { SearchplacesPage } from '../searchplaces/searchplaces';
import { DetailmapPage } from '../detailmap/detailmap';
import { RoutemapPage } from '../routemap/routemap';
import { TabspagePage } from '../tabspage/tabspage';
import { SliderPage } from '../slider/slider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places : Array<any> ;
  dictplaces : any;
  results : Array<any>
  infoWindows: any;
  name: String;
  address: String;

  selectedplaces: String;
latitude :any;
longitude:any;
pages: Array<{title: string, component: any}>;

  constructor(public navCtrl: NavController,private plt: Platform,private geolocation : Geolocation,public facebook: Facebook,public modalCtrl: ModalController,public events: Events) {

    this.infoWindows = [];
    this.pages = [
   { title: 'Map', component: TabspagePage },
   { title: 'favourites', component: FavouritesPage },
  { title: 'Logout', component: SliderPage },
 ];
  }
  ionViewDidEnter(){
    this.plt.ready().then(() => {

      this.getUserPosition();
    });
  }
  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.currentPos = pos;
        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
}
getRestaurants(latLng)
{
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
        location : latLng,
        radius : 1000 , // 5 miles in metres
        types: [this.selectedplaces],
        fillColor: '#AA0000'
    };
    return new Promise((resolve,reject)=>{
        service.nearbySearch(request,function(results,status){
            if(status === google.maps.places.PlacesServiceStatus.OK)
            {
              console.log("result",results)
                resolve(results);
            }else
            {
                reject(status);
            }

        });
    });

}

addMap(lat,long)
{
    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getRestaurants(latLng).then((results : Array<any>)=>{
        this.places = results;
        for(let i = 0 ;i < results.length ; i++)
        {
            this.createMarker(results[i]);
            this.dictplaces =results[i];
            this.name = this.dictplaces["name"];
            this.address = this.dictplaces["vicinity"];
            this.latitude = this.dictplaces["lat"];
            this.longitude = this.dictplaces["lng"];
            console.log("this.address",this.address)

        }


    },(status)=>console.log(status));
    this.events.publish('data:created', this.places);

}

createMarker(place)
{
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
    });
    marker.setMap(this.map);
    this.addInfoWindowToMarker(marker);


}

addInfoWindowToMarker(marker) {

  var infoWindowContent = this.name;
  var infoWindowContent1 = this.address;

  console.log("infowindow",infoWindowContent)
  var infoWindow = new google.maps.InfoWindow({
    content:  `<p id = "myid"> `+ infoWindowContent + '     ' +  infoWindowContent1 + `</p>`

  });
  marker.addListener('click', () => {
    this.closeAllInfoWindows()
    infoWindow.open(this.map, marker);
    document.getElementById('myid').addEventListener('click', () => {

      var navOptions = {
      animation: 'ios-transition'
 };
       this.navCtrl.push(RoutemapPage, {
      firstPassed: infoWindowContent,
      secondPassed: infoWindowContent1,

    },navOptions)
        });
  });

  this.infoWindows.push(infoWindow);
}

test()
{
  alert('test');

}

closeAllInfoWindows() {
  for(let window of this.infoWindows) {
    window.close();
  }
}
searchpage()
{
  let searchplacesmodel = this.modalCtrl.create(SearchplacesPage);
  searchplacesmodel.present();
  searchplacesmodel.onDidDismiss(data=>{
       this.selectedplaces = data
       console.log("selectedplaces =>", this.selectedplaces)
       console.log("selectedplaces =>", this.selectedplaces)

       this.getUserPosition();

   })
}





}
