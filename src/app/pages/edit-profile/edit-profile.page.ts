import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { Platform, ActionSheetController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

  users:any;

  constructor(private platform:Platform,
    private router:Router,
    private actionSheetController:ActionSheetController,
    public apiService:ApiService,
    private camera:Camera,
    private alertCtrl:AlertController) { }

  ngOnInit() {

    let loginDB = JSON.parse(localStorage.getItem("AWRLogin"));
        if(loginDB)
        {

          debugger
          this.users = loginDB["userdata"];

        }

  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
     
      console.log("Back press handler!");
      if (this.router["routerState"].snapshot.url == "/tabs/tab1")
      {
        this.presentConfirm();
      }
      else
      {
        this.router.navigate(["/tabs"]);
      }
     
    });
  }


  async presentConfirm() {

    let alert = await this.alertCtrl.create({
      //header: "Confirmation Alert",
      message: "Are you sure you want to exit?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes clicked");
            navigator["app"].exitApp();
          },
        },
      ],
    });
    await alert.present();
  }

  async pickImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "select image",
      buttons: [
        {
          text: "Photo Library",
          icon: "images",
          handler: () => {
            this.accessGallery();
          },
        },
        {
          text: "camera",
          icon: "camera",
          handler: () => {
            this.takePicture();
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  accessGallery() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        correctOrientation: true,
      })
      .then(
        (imageData) => {
        
          console.log(imageData);

          if (imageData == null || imageData == "") {
          } else {
            //     let filename = imageData.substring(imageData.lastIndexOf('/')+1);
            // let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
            //      //then use the method reasDataURL  btw. var_picture is ur image variable
            //      this.file.readAsDataURL(path, filename).then(res=>{

            //       console.log(res);

            //       this.users.picture = res;

            //       });

            // this.filePath.resolveNativePath(imageData)
            //   .then(filePath => {

            //     let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //     let currentName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.lastIndexOf('?'));
            //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            //   });

            this.users.avatar = "data:image/jpeg;base64," + imageData;
            this.apiService.profileImage = this.users.avatar;
           // this.openImageResizer();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // // Create a new name for the image
  // private createFileName() {
  //   var d = new Date(),
  //     n = d.getTime(),
  //     newFileName = n + ".jpg";

  //   return newFileName;
  // }

  // // Copy the image to a local folder
  // private copyFileToLocalDir(namePath, currentName, newFileName) {
  //   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {

  //     this.lastImage = newFileName;

  //     if (this.lastImage) {

  //       this.updateProfile()

  //     }

  //     console.log(this.lastImage)
  //   }, error => {

  //     console.log(error)

  //   });
  // }

  // Always get the accurate path to your apps folder
  // public pathForImage(img) {
  //   if (img === null) {
  //     return "";
  //   } else {
  //     return cordova.file.dataDirectory + img;
  //   }
  // }

  takePicture() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        correctOrientation: true,
      })
      .then(
        (imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):

          console.log(imageData);

          if (imageData == null || imageData == "") {
          } else {
            // this.filePath.resolveNativePath(imageData)
            //   .then(filePath => {

            //     var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
            //     var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
            //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            //   });

            this.users.avatar = "data:image/jpeg;base64," + imageData;
            this.apiService.profileImage = this.users.avatar;

            //this.openImageResizer();
          }
        },
        (err) => {
          // Handle error
          console.log(err);
        }
      );
  }

}
