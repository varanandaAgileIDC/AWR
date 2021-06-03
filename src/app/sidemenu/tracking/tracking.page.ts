import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var google;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {


  @ViewChild('map', { static: false }) mapElement: ElementRef;

  map: any;
  currentMapTrack = null;

  distance:any;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  
  matrixDistance:any;
  matrixTime:any;
  distanceStr:any;

 
  positionSubscription: Subscription;

  constructor(private platform:Platform,
    private router:Router,
    private geolocation:Geolocation, private locationAccuracy:LocationAccuracy, private androidPerm:AndroidPermissions) { }

  ngOnInit() {

    this.platform.ready().then(() => {
      this.loadHistoricRoutes();
 
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geolocation.getCurrentPosition().then(pos => {

      
         
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);

      }).catch((error) => {

        

        console.log('Error getting location', error);
      });
    });

   // Locations of landmarks
   const dakota = {lat:12.991992, lng:76.104787};
   const frick = {lat:13.056618, lng:76.264898};

  const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
  const matrixOptions = {
    origins: [dakota], // technician locations
    destinations: [frick], // customer address
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };
  
  // Call Distance Matrix service
 let matrixDetails =  service.getDistanceMatrix(matrixOptions, callback);
 

  // Callback function used to process Distance Matrix response
  function callback(response, status) {
  
    console.log(response);  
    if (status !== "OK") {
      alert("Error with distance matrix");
      return;
    }
    else
    {
    
      this.distanceStr  = response["rows"][0]["elements"][0]["distance"]["text"]; 
      let matrixDistance = this.distanceStr.replace("mi","");
      let number = Number(matrixDistance);
      this.matrixDistance = (number * 1.6093).toFixed(2);
      this.matrixTime = response["rows"][0]["elements"][0]["duration"]["text"]; 
      console.log(matrixDistance);    
    }
          
  }

  }

  ionViewDidEnter(){
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
   
      console.log("Back press handler!");
     this.router.navigate(["/tabs"]);
    });
  }


  loadHistoricRoutes() {

    let tracksDB = JSON.parse(localStorage.getItem("routes"));
 
      if (tracksDB) {
        this.previousTracks = tracksDB;
      }
    
  }


  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
 
    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p) => p['coords'] !== undefined) //Filter Out Errors
      )
      .subscribe(data => {

        setTimeout(() => {
          this.trackedRoute.push({ lat: data['coords'].latitude, lng: data['coords'].longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });
 
  }
 
  redrawPath(path) {

    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {

      console.log('origin',path[0].lat,path[0].lng)

      console.log('destination',path[path.length-1].lat,path[path.length-1].lng)

     this.distance =  this.getDistanceFromLatLonInKm(path[0].lat,path[0].lng,path[path.length-1].lat,path[path.length-1].lng) + 'km';

      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

stopTracking() {
let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
this.previousTracks.push(newRoute);
localStorage.setItem('routes', JSON.stringify(this.previousTracks));

this.isTracking = false;
this.positionSubscription.unsubscribe();
this.currentMapTrack.setMap(null);
}

showHistoryRoute(route) {
this.redrawPath(route);
}



getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
var R = 6371; // Radius of the earth in km
var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
var dLon = this.deg2rad(lon2-lon1); 
var a = 
  Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
  Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c; // Distance in km
return d.toFixed(0);
}


deg2rad(degrees)
{
var pi = Math.PI;
return degrees * (pi/180);
}

}
