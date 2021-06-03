import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  submitted = false;


  constructor( private router: Router,
    private apiService:ApiService,
    private http:HttpClient,
    private platform:Platform,
    private alertCtrl:AlertController,
    private formBuilder:FormBuilder,
    private menuCtrl:MenuController) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", Validators.required],
    });

   }

   ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  xyz()
  {
    this.apiService.nativeToast("xyz");
  }

  ionViewDidEnter(){
   
    //this.register();
    // this.otp();
    // this.awr();

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    
      console.log("Back press handler!");
      if (this.router["routerState"].snapshot.url == "/login")
      {
        this.presentConfirm();
      }else if (this.router["routerState"].snapshot.url == "/tabs/tab1")
      {
        this.presentConfirm();
      }
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
   
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
    
      console.log(this.loginForm.value);
      this.login(this.loginForm.value);
    }
  }

  login(formData) {
  
    let PostData = {
      email:formData.email,
      password:formData.password,
      usertype:"customer"
    }

    this.apiService.postMethod("api/login?",PostData).then((response) => {
      
      console.log(response);

      if(response["userdata"].status==0)
      {
        this.apiService.nativeToast("These credentials do not match our records");
      }
      else
      {
        this.loginForm.reset();
        localStorage.setItem("AWRLogin", JSON.stringify(response));
        this.router.navigate(['/tabs']);
      }

      },
      (error) => {
    
      console.log(error);
      this.apiService.nativeToast(error.error.message);
      });

  }

  register()
  {
    // this.apiService.postRequest("api/register?customer_type=personal&first_name=Sunil s&last_name=kumar&mobile=9999999999&email=sunil5555@agileidc.com&nationality=&address=kurubarahalli&password=test1234&confirmpassword=test1234&smsemail=0&terms=1&newsletter=0&contact_name=Sunil Kumar N&contact_title=Mr&company_name=AgileIDC&position=Manager").subscribe((response) => {
    //   debugger;
    //   console.log(response);
    //   });

    this.router.navigateByUrl('/register');
  }

  // otp()
  // {
  //   this.apiService.postRequest("api/validateotp?email=sunil5555@agileidc.com&otp=407215").subscribe((response) => {
  //     debugger;
  //     console.log(response);
  //     });
  // }

  // awr() {
   
  //   const httpOptions = {};
  //   this.http
  //     .post("http://3.7.140.167:8086/api/register?customer_type=personal&first_name=Sunil s&last_name=kumar&mobile=9999999999&email=sunil5555@agileidc.com&nationality=&address=kurubarahalli&password=test1234&confirmpassword=test1234&smsemail=0&terms=1&newsletter=0&contact_name=Sunil Kumar N&contact_title=Mr&company_name=AgileIDC&position=Manager", httpOptions)
  //     .subscribe(
  //       (data) => {
  //       debugger
  //       },
  //       (error) => {
  //         debugger
  //       }
  //     );
  // }

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

  forgotPassword() {
    this.alertCtrl.create({
      //header: 'Prompt Alert',
      subHeader: 'Forgot Password',
      //message: 'Forgot Password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Please enter registered email',
          
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
           
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done',
          handler: (data: any) => {
           
            console.log('sending Information', data);

            let valideMail = this.validateEmail(data.email);

            if(data.email=="")
            {

              this.apiService.nativeToast("Please enter your registered email")

            }
            else if(valideMail)
            {
              this.forgotApi(data.email);
            }
            else if(!valideMail)
            {
              this.apiService.nativeToast("You have entered an invalid email")
            }

          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }


   validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  forgotApi(email)
  {

    let PostData = {
      email:email,
    }

    this.apiService.postMethod("api/forgot-password?",PostData).then((response) => {
      
      console.log(response);
      // if(response["status"]=="S")
      // {
        this.apiService.nativeToast(response["message"]);
      //}
      },
      (error) => {
      console.log(error);
      this.apiService.nativeToast(error.error.message);
      });
  }

  // loginForm: FormGroup;
  // submitted = false;
  // passwordType = "password";

  // constructor( private router: Router,
  //   private apiService:ApiService,
  //   private http:HttpClient,
  //   private formBuilder:FormBuilder) { }

  // ngOnInit() 
  // {
  //   this.loginForm = this.formBuilder.group({
  //     email: ["", Validators.required],
  //     password: ["", Validators.required],
  //   });
  // }

  // ionViewDidEnter(){
  //   debugger
  //   //this.register();
  //   this.otp();
  //   this.awr();
  // }

  // toggle() {
  //   this.passwordType = this.passwordType === "text" ? "password" : "text";
  // }

  // get f() {
  //   return this.loginForm.controls;
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.loginForm.invalid) {
  //     return;
  //   } else {
  //     console.log(this.loginForm.value);
  //     // this.login(this.loginForm.value);
  //   }
  // }


  // login() {
  //   this.router.navigateByUrl('/tabs', { replaceUrl: true });
  // }

  // register()
  // {
  //   this.apiService.postRequest("api/register?customer_type=personal&first_name=Sunil s&last_name=kumar&mobile=9999999999&email=sunil5555@agileidc.com&nationality=&address=kurubarahalli&password=test1234&confirmpassword=test1234&smsemail=0&terms=1&newsletter=0&contact_name=Sunil Kumar N&contact_title=Mr&company_name=AgileIDC&position=Manager").subscribe((response) => {
  //     debugger;
  //     console.log(response);
  //     });
  // }

  // otp()
  // {
  //   this.apiService.postRequest("api/validateotp?email=sunil5555@agileidc.com&otp=407215").subscribe((response) => {
  //     debugger;
  //     console.log(response);
  //     });
  // }

  // awr() {
   
  //   const httpOptions = {};
  //   this.http
  //     .post("http://3.7.140.167:8086/api/register?customer_type=personal&first_name=Sunil s&last_name=kumar&mobile=9999999999&email=sunil5555@agileidc.com&nationality=&address=kurubarahalli&password=test1234&confirmpassword=test1234&smsemail=0&terms=1&newsletter=0&contact_name=Sunil Kumar N&contact_title=Mr&company_name=AgileIDC&position=Manager", httpOptions)
  //     .subscribe(
  //       (data) => {
  //       debugger
  //       },
  //       (error) => {
  //         debugger
  //       }
  //     );
  // }


}
