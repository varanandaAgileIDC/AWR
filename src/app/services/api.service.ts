import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { LoadingController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path = 'http://3.7.140.167:8091/';
  successResponse:any;
  errorResponse:any;
  isLoading = false;
  profileImage = "/assets/profile.png";

  pickUpLocation:any;
  dropOffLocation:any;

  addressPopUp = "pickUp";

  matrixDistance:any;
  matrixTime:any;

  interval:any;
  fromWhichPage:any;

  selectedVehicle:any;

  //apiUrl = 'https://randomuser.me/api/?results=20&page=';
  constructor(private http:HttpClient,
    private toastCtrl:Toast,
    private loadingCtrl:LoadingController) {  }

   // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // Handle API errors
  handleError(error: HttpErrorResponse) {
  
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
     
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };




    // Get response
    getRequest(item): Observable<any> {

      return this.http
        .get<any>(this.base_path + JSON.stringify(item), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

    postRequest (service,data): Observable<object> {
     
      return this.http.post<object>(this.base_path+service,data,this.httpOptions)
        .pipe(
          retry(),
          catchError(this.handleError)
        );
    }


    getMethod(service,data) {
   
      return new Promise((resolve, reject) => {
        this.showLoader();
        this.http.get(this.base_path+service+data).subscribe(response => {
      
        this.hideLoader();
        resolve(response);
        },
        (error) =>
        {
         
          this.hideLoader();
          reject(error);
        });
      });
  }

     postMethod(service,data) {
   
      return new Promise((resolve, reject) => {
        this.showLoader();
        this.http.post(this.base_path+service,data).subscribe(response => {
      
        this.hideLoader();
        resolve(response);
        },
        (error) =>
        {
         
          this.hideLoader();
          reject(error);
        });
      });
  }

    nativeToast(message) {
      this.toastCtrl.show(message, "4000", "bottom").subscribe((toast) => {
        console.log(toast);
      });
    }

    //show loader
    async showLoader() {
      this.isLoading = true;
      return await this.loadingCtrl
        .create({
          message: "Please wait ...",
          spinner: "circles",
          cssClass: "loading-class",
        })
        .then((a) => {
          a.present().then(() => {
            console.log("loading presented");
            if (!this.isLoading) {
              a.dismiss().then(() => console.log("abort loading"));
            }
          });
        });
    }

     //hide loading
  async hideLoader() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log("loading dismissed"));
  }

}
