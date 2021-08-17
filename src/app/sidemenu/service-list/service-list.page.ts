import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})
export class ServiceListPage implements OnInit {

  serviceList = [];

  constructor(private platform:Platform,
    private router:Router) { }

  ngOnInit() {

    // this.serviceList = [{
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
    this.router.navigate(["/service-request"]);
  }

}
