import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
    setTimeout( ()=>{

    
      let loginDB = JSON.parse(localStorage.getItem("AWRLogin"));
        if(loginDB)
        {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        }
        else
        {
          this.router.navigateByUrl('/login', { replaceUrl: true });
          // this.router.navigate([
          //   "otp",
          //   JSON.stringify("xyz")
          // ]);
        }
      
    }, 2000)
  }

}
