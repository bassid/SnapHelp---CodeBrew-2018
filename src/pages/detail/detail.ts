import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import moment from 'moment';

import { faker } from 'faker';

declare var google;


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  myData: AngularFireList<any>;

  category: any;
  desc: any;
  photoList: any = [];
  // public Ref: firebase.database.Reference;

  map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  geocoder: any;
  markers: any = [];
  placesService: any;
  saveDisabled: boolean;
  posLoc: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, public afDatabase: AngularFireDatabase,
    public alertCtrl: AlertController) {

    // this.myData = afDatabase.list('/incidents');
    this.photoList = this.navParams.get('photos');
  }

  goToPhotos() {
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
    this.location();
  }

  location() {
    // Get current location
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }

      this.posLoc = pos;

      // Create map options
      let latLng = new google.maps.LatLng(pos.lat, pos.lng);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeID: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false
      }

      // Create map
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Create marker options
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: 'Me!'
      });

      // Create marker
      this.markers.push(marker);
      this.map.setCenter(latLng);
    });
  }



  submit() {
    if (!this.category) {
      let alert = this.alertCtrl.create({
        title: 'No category!',
        subTitle: 'Please select a category for your situation',
        buttons: ['Ok']
      });
      alert.present();
    }
    else {

      let currentDateTime = moment().format("MM-DD-YYYY HH:mm:ss");
      var person = "Riya" /* faker.fake("{{name.firstName}} {{name.lastName}}"); */

      this.myData = this.afDatabase.list(`/incidents`);

      const data = {
        name: person,
        location: JSON.stringify(this.posLoc),
        description: this.desc,
        tag: this.category,
        dateTime: currentDateTime,
        images: this.photoList
      };

      const pushRef = this.myData.push(data);

      pushRef.set(data).then(function () {

        /* let alert = this.alertCtrl.create({
          title: 'Help is on the way!',
          subTitle: 'Your issue has been recorded',
          buttons: ['Done']
        });
        alert.present() */

        alert("Help is on the way!");

      });
      this.navCtrl.popAll();
    }
    
  }

}
