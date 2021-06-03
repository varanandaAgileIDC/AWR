import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AlertController, MenuController, ModalController, Platform } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { MapPage } from '../modals/map/map.page';
import { ApiService } from '../services/api.service';
import * as moment from "moment";

declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  startField:any;
  startDate:any;

  endField:any;
  endDate:any;

  loginDB:any;
  
  constructor(private platform:Platform,
    private router:Router,
    private alertCtrl:AlertController,
    public appComponent:AppComponent,
    private modalCtrl:ModalController,
    private datePicker:DatePicker,
    public apiService:ApiService,
    private menuCtrl:MenuController) {
      this.menuCtrl.enable(true);
    }

    ionViewWillEnter() {
      this.menuCtrl.enable(true);
    }
  

  ionViewDidEnter(){

    this.menuCtrl.enable(true);

    this.loginDB = JSON.parse(localStorage.getItem("AWRLogin"));
        if(this.loginDB)
        {

          this.appComponent.name = this.loginDB["userdata"].first_name + " " + this.loginDB["userdata"].last_name;

        }

    let matrixData = JSON.parse(localStorage.getItem("matrixDetails"));
    if(matrixData)
    {

      this.apiService.matrixDistance = matrixData["distance"];
      this.apiService.matrixTime = matrixData["duration"];
   
    }
   
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log("Back press handler!");
      if (this.router["routerState"].snapshot.url == "/tabs/tab1")
      {
        this.presentConfirm();
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

  async pickUpLocation()
  { 
    this.apiService.addressPopUp = "pickUp";  
    const modal = await this.modalCtrl.create({
        component: MapPage,
        cssClass: "map-modal",
        showBackdrop: true,
      });
      modal.onWillDismiss().then((data) => {
        console.log(data);
      });
      modal.present();
    

  }
  async dropOffLocation()
  {
    this.apiService.addressPopUp = "dropOff";  
    const modal = await this.modalCtrl.create({
      component: MapPage,
      cssClass: "map-modal",
      showBackdrop: true,
    });
    modal.onWillDismiss().then((data) => {
      console.log(data);
    });
    modal.present();

  }

  startTrip()
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
  
          //  var d = (this.startDate.getDate() < 10 ? '0' : '') + this.startDate.getDate();
          //  var m = this.getMonth( this.startDate);
          //  var y = this.startDate.getFullYear();
          //  this.startSelectedDate = d + "-" + m + "-" + y;

           let newDate = moment(response, "MM:DD:YYYY");
           let momentDate = newDate.format("MMM DD YYYY")

           let time = moment(response, "HH-MM A");
           let momentTime = time.format("hh:mm a");

           this.startField = momentDate + ", " + momentTime; 
           

            }
  
          },
          (error) => {
            console.log("error response", error);
          }
        );
  }


  endTrip()
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
              this.endDate = response;
  
          //  var d = (this.startDate.getDate() < 10 ? '0' : '') + this.startDate.getDate();
          //  var m = this.getMonth( this.startDate);
          //  var y = this.startDate.getFullYear();
          //  this.startSelectedDate = d + "-" + m + "-" + y;

           let newDate = moment(response, "MM:DD:YYYY");
           let momentDate = newDate.format("MMM DD YYYY")

           let time = moment(response, "HH-MM A");
           let momentTime = time.format("hh:mm a");

           this.endField = momentDate + ", " + momentTime; 
          

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
 
}
