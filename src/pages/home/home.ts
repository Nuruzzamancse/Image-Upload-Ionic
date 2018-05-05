import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController} from 'ionic-angular';
import { ImagesProvider} from "../../providers/images/images";
import { Camera} from "@ionic-native/camera";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  images: any = [];

  constructor(
              public navCtrl: NavController,
              private imagesProvider: ImagesProvider,
              private camera: Camera,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController)
  {
    this.reloadImages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  reloadImages(){
    this.imagesProvider.getImages().subscribe(data=>{
      this.images = data;
    })
  }

  deleteImage(img){
    this.imagesProvider.deleteImage(img).subscribe(data=>{
      this.reloadImages();
    })


  }

  openImage(img){
    let modal = this.modalCtrl.create('PreviewModalPage', { img: img });
    modal.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      let modal = this.modalCtrl.create('UploadModalPage', { data: imagePath });
      modal.present();
      modal.onDidDismiss(data => {
        if (data && data.reload) {
          this.reloadImages();
        }
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }
}

