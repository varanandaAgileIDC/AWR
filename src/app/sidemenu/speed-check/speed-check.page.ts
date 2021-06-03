import { Router } from "@angular/router";
import { Component, NgZone, OnInit } from "@angular/core";
import { IPedometerData, Pedometer } from "@ionic-native/pedometer/ngx";

import {
  DeviceMotion,
  DeviceMotionAccelerationData,
} from "@ionic-native/device-motion/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform, ToastController } from "@ionic/angular";

@Component({
  selector: "app-speed-check",
  templateUrl: "./speed-check.page.html",
  styleUrls: ["./speed-check.page.scss"],
})
export class SpeedCheckPage implements OnInit {
  speedValue: any;
  PedometerData: any;
  distance: any;

  stepCount: any = 0;
  start: boolean;

  constructor(
    private pedometer: Pedometer,
    private deviceMotion: DeviceMotion,
    private geolocation: Geolocation,
    private ngZoneCtrl: NgZone,
    private platform: Platform,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    //this.fnGetPedoUpdate();

    var lastTimestamp;
    var speedX = 0,
      speedY = 0,
      speedZ = 0;
    window.addEventListener(
      "devicemotion",
      function (event) {
        //debugger;

        var currentTime = new Date().getTime();
        if (lastTimestamp === undefined) {
          //debugger;

          lastTimestamp = new Date().getTime();
          return; //ignore first call, we need a reference time
        }
        //  m/s² / 1000 * (miliseconds - miliseconds)/1000 /3600 => km/h (if I didn't made a mistake)
        //speedX += event.acceleration.x / 1000 * ((currentTime - lastTimestamp)/1000)/3600;
        //... same for Y and Z

        //debugger;

        lastTimestamp = currentTime;
      },
      false
    );

    //this.speedValue = speedX;

    this.pedometer
      .isDistanceAvailable()
      .then((available: boolean) => {
      

        console.log(available);
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.pedometer.startPedometerUpdates().subscribe((data: IPedometerData) => {
      

      console.log(data);

      this.stepCount = "Stepcount is : " + data.numberOfSteps;
      this.distance = "Distance is : " + data.numberOfSteps * 0.000762;
    });

    // Get the device current acceleration
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => {
     

        console.log(error);
      }
    );

    var currentTime = new Date().getTime();
    // Watch device acceleration
    var subscription = this.deviceMotion
      .watchAcceleration()
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
    

        console.log(acceleration);

        this.distance =
          ((acceleration.x / 1000) * ((currentTime - lastTimestamp) / 1000)) /
          3600;

        //this.speedValue = speedX;
      });

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude
        this.speedValue = resp.coords.speed;
      })
      .catch((error) => {
        //debugger;

        console.log("Error getting location", error);
      });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.speedValue = data["coords"].speed;

      console.log("Error getting location", data);

      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    
      console.log("Back press handler!");
      this.router.navigate(["/tabs"]);
    });
  }

  fnGetPedoUpdate() {
    // if (this.platformCtrl.is('android')) {
    this.pedometer.startPedometerUpdates().subscribe((PedometerData) => {
      

      this.PedometerData = PedometerData;
      this.ngZoneCtrl.run(() => {
     

        this.stepCount = "Stepcount is : " + this.PedometerData.numberOfSteps;
        this.distance =
          "Distance is : " + PedometerData.numberOfSteps * 0.000762;

        console.log(PedometerData);

        // this.startDate = new Date(this.PedometerData.startDate);
        // this.endDate = new Date(this.PedometerData.endDate);
      });
    });
    this.start = true;
    this.fnTost("Please Walk🚶‍to Get Pedometer Update.");
    // }else{
    //   this.fnTost('This application needs to be run on📱device');
    // }
  }

  fnStopPedoUpdate() {
   
    this.pedometer.stopPedometerUpdates();
    this.start = false;
  }
  async fnTost(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: "bottom",
      duration: 3000,
    });
    (await toast).present();
  }
}
