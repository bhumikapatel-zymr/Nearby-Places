import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {
  public paramData: any;
  items: any;

  constructor(public http: Http) {

    this.items = [
      { title: 'accounting' },
      { title: 'airport' },
      { title: 'amusement_park' },
      { title: 'aquarium' },
      { title: 'art_gallery' },
      { title: 'atm' },
      { title: 'bakery' },
      { title: 'bank' },
      { title: 'bar' },
      { title: 'beauty_salon' },
      { title: 'bicycle_store' },
      { title: 'book_store' },
      { title: 'bowling_alley' },
      { title: 'bus_station' },
      { title: 'cafe' },
      { title: 'campground' },
      { title: 'car_dealer' },
      { title: 'car_rental' },
      { title: 'car_repair' },
      { title: 'car_wash' },
      { title: 'casino' },
      { title: 'cemetery' },
      { title: 'church' },
      { title: 'city_hall' },
      { title: 'clothing_store' },
      { title: 'convenience_store' },
      { title: 'courthouse' },
      { title: 'dentist' },
      { title: 'department_store' },
      { title: 'doctor' },
      { title: 'electrician' },
      { title: 'electronics_store' },
      { title: 'embassy' },
      { title: 'fire_station' },
      { title: 'florist' },
      { title: 'funeral_home' },
      { title: 'furniture_store' },
      { title: 'gas_station' },
      { title: 'gym' },
      { title: 'hair_care' },
      { title: 'hardware_store' },
      { title: 'hindu_temple' },
      { title: 'home_goods_store' },
      { title: 'hospital' },
      { title: 'insurance_agency' },
      { title: 'jewelry_store' },
      { title: 'lawyer' },
      { title: 'laundry' },
      { title: 'library' },
      { title: 'liquor_store' },
      { title: 'local_government_office' },
      { title: 'locksmith' },
      { title: 'lodging' },
      { title: 'meal_delivery' },
      { title: 'meal_takeaway' },
      { title: 'mosque' },
      { title: 'movie_theater' },
      { title: 'movie_rental' },
      { title: 'moving_company' },
      { title: 'museum' },
      { title: 'night_club' },
      { title: 'painter' },
      { title: 'park' },
      { title: 'parking' },
      { title: 'pet_store' },
      { title: 'pharmacy' },
      { title: 'physiotherapist' },
      { title: 'plumber' },
      { title: 'police' },
      { title: 'post_office' },
      { title: 'real_estate_agency' },
      { title: 'restaurant' },
      { title: 'roofing_contractor' },
      { title: 'rv_park' },
      { title: 'school' },
      { title: 'shoe_store' },
      { title: 'shopping_mall' },
      { title: 'spa' },
      { title: 'stadium' },
      { title: 'storage' },
      { title: 'store' },
      { title: 'subway_station' },
      { title: 'synagogue' },
      { title: 'taxi_stand' },
      { title: 'train_station' },
      { title: 'transit_station' },
      { title: 'travel_agency' },
      { title: 'university' },
      { title: 'veterinary_care' },
      { title: 'zoo' }

    ]

  }

  filterItems(searchTerm) {

    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

}
