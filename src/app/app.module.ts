import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { PhotoPage } from '../pages/photo/photo';
import { DetailPage } from '../pages/detail/detail';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview } from '@ionic-native/camera-preview';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Firebase API config removed for security purposes
export const firebaseConfig = {
  apiKey: "",
   authDomain: "",
   databaseURL: "",
   projectId: "",
   storageBucket: "",
   messagingSenderId: ""
};


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    PhotoPage,
    DetailPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    PhotoPage,
    DetailPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
