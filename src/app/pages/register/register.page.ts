import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  layoutChange:any;
  prefix = "Mr";
  prefixes = [];
  nationalities = [];
  nationality = "Choose Nationality"
  mobileCodes = [];
  mobileCode = "+971"

  newsletter = 1;
  smsemail = 1;
  terms = 0;

  registerForm1:FormGroup;
  registerForm2:FormGroup;

  passwordTypeA = "password";
  passwordTypeB = "password";

  submitted = false;

  termStatus:boolean = false;
  newsStatus:boolean = true;
  emailStatus:boolean = true;
  termToggle:boolean = true;

  constructor(private router:Router,
    private apiService:ApiService,
    private platform:Platform,
    private alertCtrl:AlertController,
    private formBuilder:FormBuilder,
    private appComponent:AppComponent)
  {

    this.layoutChange = "corporate";

  }

  ngOnInit() {
    this.prefixes = [{
      name:"Mr"
    },
    {
      name:"Mrs"
    }]

    this.nationalities = [{
      name:"United Arab Emirates"
    },
    {
      name:"United Kingdom"
    }]

    this.mobileCodes = [{
      name:"+971"
    },
    {
      name:"+44"
    }]

    this.registerForm1 = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        // contactName: ["", Validators.required],
        // contactTitle: ["", Validators.nullValidator],
        position: ["", Validators.required],
        //debitorCode: ["", Validators.nullValidator],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          ],
        ],
        password: ["", [Validators.required]],
        confirmPassword: ["", Validators.required],
        companyName: ["", Validators.required],
        address: ["", Validators.required],
        mobile: [
          "",
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );

    this.registerForm2 = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          ],
        ],
        //debitorCode: ["", Validators.nullValidator],
        password: ["", [Validators.required]],
        confirmPassword: ["", Validators.required],
        address: ["", Validators.required],
        mobile: [
          "",
          [
            Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );

  }

  ionViewDidEnter(){

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {

      console.log("Back press handler!");
      this.router.navigateByUrl('/login');
    });

  }

  get f1() {
    return this.registerForm1.controls;
  }
  get f2() {
    return this.registerForm2.controls;
  }

  hideShowA() {
    this.passwordTypeA = this.passwordTypeA === "text" ? "password" : "text";
  }

  hideShowB() {
    this.passwordTypeB = this.passwordTypeB === "text" ? "password" : "text";
  }

  onSubmit1() {

    this.submitted = true;
    if (this.registerForm1.invalid) {

      if (!this.termStatus) {
        this.termToggle = false;
      }
      return;
    } else {

      console.log(this.registerForm1.value);

      if (!this.termStatus) {
        this.termToggle = false;
      }
      else
      {
        this.termToggle = true;
        this.register(this.registerForm1.value);
      }

    }
  }

  onSubmit2() {

    this.submitted = true;
    if (this.registerForm2.invalid) {

      if (!this.termStatus) {
        this.termToggle = false;
      }
      return;
    } else {

      console.log(this.registerForm2.value);

      if (!this.termStatus) {
        this.termToggle = false;
      }
      else
      {
        this.termToggle = true;
        this.register(this.registerForm2.value);
      }

    }
  }

  segmentChanged(event)
  {

    console.log(event.target.value);
    this.layoutChange = event.target.value;
  }
  selectPrefix(event)
  {
    this.prefix = event.target.value;

  }
  selectNationality(value)
  {
    this.nationality = value;
  }

  selectMobilecode(event)
  {
    this.mobileCode = event.target.value;
  }

  termsCheck() {

    if (this.termStatus) {
      this.termStatus = false;
      this.terms = 0;
      this.termToggle = false;
    } else {
      this.termStatus = true;
      this.terms = 1;
      this.termToggle = true;
    }
  }

  newsCheck() {

    if (this.newsStatus) {
      this.newsStatus = false;
      this.newsletter = 0;
    } else {
      this.newsStatus = true;
      this.newsletter = 1;
    }
  }


  emailCheck() {

    if (this.emailStatus) {
      this.emailStatus = false;
      this.smsemail = 0;
    } else {
      this.emailStatus = true;
      this.smsemail = 1;
    }
  }

  register(formData) {

    let PostData;
    if(this.layoutChange=="corporate")
    {

     PostData = {

    customer_type:this.layoutChange,
    salutation:this.prefix,
    first_name:formData.firstName,
    last_name:formData.lastName,
    debitor_code:formData.debitorCode,
    mobile_code:this.mobileCode,
    mobile:formData.mobile,
    email:formData.email,
    nationality:this.nationality,
    address:formData.address,
    password:formData.password,
    confirm_password:formData.confirmPassword,
    smsemail:this.smsemail,
    termsandconditions:this.terms,
    newsletter:this.newsletter,
    // contact_name:formData.contactName,
    // contact_title:formData.contactTitle,
    company_name:formData.companyName,
    position:formData.position,
    gcm_id:this.appComponent.fcmToken

  }
}
else
{

  PostData = {

    customer_type:this.layoutChange,
    salutation:this.prefix,
    first_name:formData.firstName,
    last_name:formData.lastName,
    debitor_code:formData.debitorCode,
    mobile_code:this.mobileCode,
    mobile:formData.mobile,
    email:formData.email,
    nationality:this.nationality,
    address:formData.address,
    password:formData.password,
    confirm_password:formData.confirmPassword,
    smsemail:this.smsemail,
    termsandconditions:this.terms,
    newsletter:this.newsletter,
    gcm_id:this.appComponent.fcmToken

  }

}

console.log("register request",PostData);

    this.apiService.postMethod("api/register?",PostData).then((response) => {

      console.log(response);

      if(response['status']=='S')
      {

          this.apiService.nativeToast(response["message"]);
          this.router.navigate([
            "otp",
            JSON.stringify(formData.email)
          ]);

      }
      else
      {
        this.apiService.nativeToast(response["message"]);
      }

      },
      (error) => {

      console.log(error);
      this.apiService.nativeToast(error.error.message);
      });

  }

  login()
  {
    this.router.navigateByUrl('/login');
  }

  async presentConfirm() {

    let alert = await this.alertCtrl.create({
      header: "Confirmation Alert",
      message: "Do you want to exit App?",
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

}
