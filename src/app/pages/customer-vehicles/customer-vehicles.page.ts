import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-vehicles',
  templateUrl: './customer-vehicles.page.html',
  styleUrls: ['./customer-vehicles.page.scss'],
})
export class CustomerVehiclesPage implements OnInit {

  loginDB:any;
  customerVehicles = [];

  constructor(private platform:Platform,private router:Router,
    public apiService:ApiService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){

    this.loginDB = JSON.parse(localStorage.getItem("AWRLogin"));
    if(this.loginDB)
    {

    this.vehicles();

    }
   
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      
      console.log("Back press handler!");

      if(this.apiService.fromWhichPage=="service-request")
      {
        this.router.navigate(["/service-request"]);
      }
      else if(this.apiService.fromWhichPage=="break-down")
      {
        this.router.navigate(["/break-down"]);
      }
      else
      {
        this.router.navigate(["/tabs"]);
      }

    });
  }

  vehicles() {
    this.apiService.getMethod("api/customervehicles/"+this.loginDB["userdata"].id,"").then((response) => {
      debugger
      console.log(response);
      if(response["status"]="S")
      {
        this.customerVehicles = response["customervehicles"];
      }
      },
      (error) => {
      debugger
      console.log(error);
      this.apiService.nativeToast(error.error.message);
      });
  }

  selectVehicle(vehicle)
  {

    this.apiService.selectedVehicle = vehicle;

    if(this.apiService.fromWhichPage=="service-request")
    {
      this.router.navigate(["/service-request"]);
    }
    else if(this.apiService.fromWhichPage=="break-down")
    {
      this.router.navigate(["/break-down"]);
    }
    

  }

}
