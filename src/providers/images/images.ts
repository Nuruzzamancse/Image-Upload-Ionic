import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";

/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagesProvider {

  apiUrl = 'http://localhost:3000/';

  constructor(
    public http: Http,
    private transfer: FileTransfer
  ) {
    console.log('Hello ImagesProvider Provider');
  }

  getImages(){
    return this.http.get(this.apiUrl + 'images')
      .map( res => res.json());
  }
  

  deleteImage(img){
    return this.http.delete(this.apiUrl + 'images/' +img._id);
  }

  uploadImage(img, desc){
    let url = this.apiUrl + 'images';

    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {'desc': desc}
    }

    const fileTransfer: FileTransferObject = this.transfer.create();

    return fileTransfer.upload(targetPath, url, options);
  }
}
