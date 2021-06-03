import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { ActionSheetController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/services/api.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import * as moment from "moment";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-break-down',
  templateUrl: './break-down.page.html',
  styleUrls: ['./break-down.page.scss'],
})
export class BreakDownPage implements OnInit {

  images = [];
  vehicleNumbers = [];
  loginDB:any;
  description:any;
  breakDownDate:any;
  displayDate:any;
  startDate:any;

  lat:any;
  lng:any;

  breakdownTypes = [];
  breakdownTypeId:any;

  constructor(private platform:Platform,
    private router:Router,private imagePicker:ImagePicker,
     private actionSheetController:ActionSheetController,
    private photoViewer:PhotoViewer,private camera:Camera,
    public apiService:ApiService,
    private datePicker:DatePicker,
    private geolocation:Geolocation) { }



  ngOnInit() {

    this.vehicleNumbers = [{
      vehicleNumber:"A 92868",
      name:"Lamborghini Diablo"
    },
    {
      vehicleNumber:"A 93868",
      name:"Ford Raptor"
    },
    {
      vehicleNumber:"A 94868",
      name:"Ferrari Testarossa",
    },
    {
      vehicleNumber:"A 95868",
      name:"Porsche 911 Carrera"
    },
    {
      vehicleNumber:"A 92868",
      name:"Jensen Interceptor"
    },
    {
      vehicleNumber:"A 93868",
      name:"Lamborghini Huracán"
    },
    {
      vehicleNumber:"A 94868",
      name:"Ferrari 812 Superfast",
    },
    {
      vehicleNumber:"A 95868",
      name:"Jeep Gladiator"
    }]

  }

  ionViewDidEnter(){


    this.loginDB = JSON.parse(localStorage.getItem("AWRLogin"));

    this.lookUp();

    this.geolocation.getCurrentPosition().then(pos => {



      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude

    }).catch((error) => {



      console.log('Error getting location', error);
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {

      console.log("Back press handler!");
     this.router.navigate(["/tabs"]);
    });
  }

  async getImage()
  {


    const actionSheet = await this.actionSheetController.create({
      header: 'Upload images from',
      buttons: [{
        text: 'Gallery',
        icon: 'images',
        handler: () => {

          this.selectImage();

        }
      }, {
        text: 'camera',
        icon: 'camera',
        handler: () => {


          this.takePicture();

        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  selectVehicle()
  {
    this.router.navigate(["/customer-vehicles"]);
    this.apiService.fromWhichPage = "break-down";
  }

  selectImage()
  {


      // this.imagePicker.getPictures({
      //   maximumImagesCount: 15,
      //   outputType: 1

      // }).then(selectedImg => {
      //   selectedImg.forEach(i =>
      //     {

      //       debugger;

      //       this.images.push("data:image/jpeg;base64," + i)

      //       debugger;

      //       console.log(this.images);

      //     });
      // },
      // (err) => {

      //   debugger

      //   console.log(err);

      // })

      this.imagePicker.getPictures({
         maximumImagesCount: 15,
         outputType: 1
        }).then((results) => {

          if(results=="OK")
          {

          }
          else {

            for (var i = 0; i < results.length; i++) {

                this.images.push("data:image/jpeg;base64," + results[i])

                  console.log('Image URI: ' + results[i]);
              }

          }
          debugger

          console.log('Images: ' + this.images);

      }, (err) => { });
    debugger

  }


    takePicture() {




      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):

       console.log(imageData);


       if(imageData==null || imageData=="")
       {



       }
       else
       {

        this.images.push("data:image/jpeg;base64," + imageData);

       }



      }, (err) => {

       // Handle error
      });



    }


zoom(image)
{

  this.photoViewer.show(image, '', {share: false});


}

pickDate()
  {
      this.datePicker
        .show({
          date: new Date(),
          mode: "date",
          minDate: this.platform.is("android")
            ? new Date()
            : new Date().valueOf(),
          allowOldDates: false,
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        })
        .then(
          (response) => {
            let date = new Date();

            let month = response.getMonth()+1;
            let month1 = date.getMonth()+1;

            if (response.getDate() == date.getDate() && month==month1)
            {
              response = date;
            }

            if (response < date) {
              this.apiService.nativeToast(
                "Please select today or future date"
              );
            } else {
              this.startDate = response;

           var d = (this.startDate.getDate() < 10 ? '0' : '') + this.startDate.getDate();
           var m = this.getMonth( this.startDate);
           var y = this.startDate.getFullYear();
           this.breakDownDate = y + "-" + m + "-" + d;

           let newDate = moment(response, "MM:DD:YYYY");
           let momentDate = newDate.format("MMM DD YYYY")

           let time = moment(response, "HH-MM A");
           let momentTime = time.format("hh:mm a");

           this.displayDate = momentDate + ", " + momentTime;


            }

          },
          (error) => {
            console.log("error response", error);
          }
        );
  }

  getMonth(date) {
    var month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
  }

  lookUp()
{


debugger
  this.apiService.getMethod("api/lookupvalues/BREAKDOWN_TYPE","").then((response) => {
    debugger
    console.log(response);
    if(response["status"]="S")
    {

      this.breakdownTypes = response["vehicletypes"];

    }
    },
    (error) => {
    debugger
    console.log(error);
    this.apiService.nativeToast(error.error.message);
    });

}

selectType(event)
  {

    debugger
    this.breakdownTypeId = event.target.value.k;
    debugger

  }


submit()
{

  let PostData = {
    vehicle_id:this.apiService.selectedVehicle.id,
    customer_id:this.loginDB["userdata"].id,
    breakdown_type_id:this.breakdownTypeId,
    breakdown_date:this.breakDownDate,
    latitude:this.lat,
    longitude:this.lng,
    images:this.images,
    description:this.description,
  }
debugger
  this.apiService.postMethod("api/vehiclebreakdown?",PostData).then((response) => {
    debugger
    console.log(response);
    if(response["status"]="S")
    {
      this.apiService.nativeToast(response["message"]);
      this.router.navigate(["/breakdown-list"]);
    }
    },
    (error) => {
    debugger
    console.log(error);
    this.apiService.nativeToast(error.error.message);
    });

}


}
