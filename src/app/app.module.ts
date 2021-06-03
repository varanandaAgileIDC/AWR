import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { Toast } from '@ionic-native/toast/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Pedometer } from '@ionic-native/pedometer/ngx';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { DocumentScanner } from '@ionic-native/document-scanner/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    Toast,
    Geolocation,
    ImagePicker,
    PhotoViewer,
    Camera,
    Pedometer,
    DeviceMotion,
    LocationAccuracy,
    AndroidPermissions,
    //DocumentScanner,
    DatePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
