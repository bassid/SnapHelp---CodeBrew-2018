import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';

import { PhotoPage } from '../photo/photo';
import { ProfilePage } from '../profile/profile';

const cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.height,
  camera: 'rear',
  tapPhoto: true,
  previewDrag: true,
  toBack: true,
  alpha: 1
};

const pictureOpts: CameraPreviewPictureOptions = {
  quality: 85,
  // height: (window.screen.height) - 20
}

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  public picture: string;
  public photos: any = [];
  
  constructor(private cameraPreview: CameraPreview, public modalCtrl: ModalController, 
    public navCtrl: NavController) { }
  
  ngAfterViewInit() {
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => { 
        // alert(err);
      });
  }

  takePicture() {
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(this.picture);
    }, (err) => {
      alert(err);
    });
  }

  goToPhoto() {
    let modal = this.modalCtrl.create(PhotoPage, { photos: this.photos });

    modal.onDidDismiss((data) => {

      if (data) {
        this.photos = data;
        this.picture = this.photos[0];
      }

    })

    modal.present();
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

}
