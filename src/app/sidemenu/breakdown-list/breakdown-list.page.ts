import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-breakdown-list',
  templateUrl: './breakdown-list.page.html',
  styleUrls: ['./breakdown-list.page.scss'],
})
export class BreakdownListPage implements OnInit {
  complaintList = [];
  constructor(private platform:Platform,
    private router:Router,
    private apiService:ApiService) { }

    ngOnInit() {

      // this.complaintList = [{
      //   vehicleNumber:"A 92868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"General Service"
      // },
      // {
      //   vehicleNumber:"A 93868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"Cleaning"
      // },
      // {
      //   vehicleNumber:"A 94868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"Oil Change"
      // },
      // {
      //   vehicleNumber:"A 95868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"Engine Service"
      // },{
      //   vehicleNumber:"A 92868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"General Service"
      // },
      // {
      //   vehicleNumber:"A 93868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"Cleaning"
      // },
      // {
      //   vehicleNumber:"A 94868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"Oil Change"
      // },
      // {
      //   vehicleNumber:"A 95868",
      //   date:"02-06-2021 02:30 PM",
      //   description:"Engine Service"
      // }]
  
    }
  

  ionViewDidEnter(){
   
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      
      console.log("Back press handler!");
     this.router.navigate(["/tabs"]);
    });
  }

  serviceRequest()
  {
    debugger
    this.apiService.selectedVehicle = "";
    this.router.navigate(["/break-down"]);
  }

}
