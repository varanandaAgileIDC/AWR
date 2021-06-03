import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;

  map: any;
  address:any;
  marker: any;
  matrixDetails:any;

  constructor(private modalCtrl:ModalController,
    private platform:Platform,private geoLocation:Geolocation,
    public apiService:ApiService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
     
      let mapOptions = {
        zoom:0,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geoLocation.getCurrentPosition().then(pos => {

      
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(13);


        let geocoder = new google.maps.Geocoder;
        let latlng = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        geocoder.geocode({'location': latlng}, (results, status) => {

   console.log(results); // read data from here

    this.address = String(results[0].formatted_address);

    const infowindow = new google.maps.InfoWindow({
      content: this.address,
    });

    infowindow.open(this.map, this.marker);

      }).catch((error) => {

        console.log('Error getting location', error);
      });


      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        //icon: this.icon,
        optimized: false,
        label: {
          text: this.address,//pos.coords.latitude + ',' + pos.coords.longitude,
          color: 'red',
        }

      });

      // this.map.event.addListener(this.marker, 'click', function() {
      //   infowindow.open(this.map,this.marker);
      // });

      // this.map.event.addListener(this.map, 'click', function(event) {
      //   this.placeMarker(this.map, event.latLng);
      // });


    });

    this.map.addListener("click", (e) => {
     
      this.placeMarkerAndPanTo(e.latLng, this.map);
    });

  });
}


placeMarkerAndPanTo(latLng, map) {
  
  this.marker.setMap(null)
  this.marker = null;

  let geocoder = new google.maps.Geocoder;
  geocoder.geocode({'location': latLng}, (results, status) => {

console.log(results); // read data from here

this.address = String(results[0].formatted_address);


console.log(latLng.lat);
this.marker = new google.maps.Marker({
  position: latLng,
  map: map,
});
//map.pan
this.marker.setMap(this.map)

const infowindow = new google.maps.InfoWindow({
  content: this.address,
});



infowindow.open(this.map, this.marker);



}).catch((error) => {

  console.log('Error getting location', error);
});

}

   placeMarker(map, location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    var infowindow = new google.maps.InfoWindow({
      content: 'Latitude: ' + location.lat() +
      '<br>Longitude: ' + location.lng()
    });
    infowindow.open(map,marker);
  }

  done()
  {
    
    if(this.apiService.addressPopUp=="pickUp")
    {
      this.apiService.pickUpLocation = this.address;
    }
    else if(this.apiService.addressPopUp=="dropOff")
    {
      this.apiService.dropOffLocation = this.address;
    }

    if(this.apiService.pickUpLocation && this.apiService.dropOffLocation)
    {

      //this.findDistanceAndTime();
      //calling the calcDistance function and passing callback function reference
 this.matrixDetails = this.calcDistance(this.apiService.pickUpLocation,this.apiService.dropOffLocation,this.Callback_calcDistance);

this.apiService.showLoader();
 setTimeout( ()=>{

  this.apiService.hideLoader();
  let matrixData = JSON.parse(localStorage.getItem("matrixDetails"));
  if(matrixData)
  {

    this.apiService.matrixDistance = matrixData["distance"];
    this.apiService.matrixTime = matrixData["duration"];
   

  }
  
}, 5000)


    }

    this.modalCtrl.dismiss();
  }
  cancel()
  {
    this.modalCtrl.dismiss();
  }

  findDistanceAndTime()
  {
    const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
    const matrixOptions = {
      origins: [this.apiService.pickUpLocation], // technician locations
      destinations: [this.apiService.dropOffLocation], // customer address
      travelMode: 'DRIVING',
      //unitSystem: new google.maps.UnitSystem.IMPERIAL
    };

    // Call Distance Matrix service
    this.matrixDetails = service.getDistanceMatrix(matrixOptions, this.callback)

}

    
    // Callback function used to process Distance Matrix response
     callback(response, status) {
    
      console.log(response);  
      if (status !== "OK") {
        alert("Error with distance matrix");
        return;
      }
      else
      {
    
        let distanceStr  = response["rows"][0]["elements"][0]["distance"]["text"]; 
        //this.apiService.matrixDistance = distanceStr.replace("mi","");
        // let number = Number(matrixDistance);
        // this.matrixDistance = (number * 1.6093).toFixed(2);
       // this.apiService.matrixTime = response["rows"][0]["elements"][0]["duration"]["text"]; 

        // this.apiservice.matrixDistance = this.matrixDistance;
        // this.apiservice.matrixTime = this.matrixTime;
        
        console.log(response);    
      }

}


 calcDistance(origin1,destinationB,ref_Callback_calcDistance){
  var geocoder = new google.maps.Geocoder();
  var service = new google.maps.DistanceMatrixService();
  var temp_duration = 0;
  var temp_distance = 0;
  var testres;
  service.getDistanceMatrix(
      {
          origins: [origin1],
          destinations: [destinationB],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
      }, function(response, status) {
          if (status !== google.maps.DistanceMatrixStatus.OK) {
              alert('Error was: ' + status);
              testres= {"duration":0,"distance":0};
          } else {
            
              testres= {"duration":response["rows"][0]["elements"][0]["duration"]["text"],"distance":response["rows"][0]["elements"][0]["distance"]["text"]};

              if(typeof ref_Callback_calcDistance === 'function'){
                  //calling the callback function
                  ref_Callback_calcDistance(testres)
              }
          }////
      }
  );
}

 Callback_calcDistance(testres) {
   
   localStorage.setItem("matrixDetails", JSON.stringify(testres));
//do something with testres
}





}
