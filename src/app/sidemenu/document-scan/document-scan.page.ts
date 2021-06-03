import { Camera } from '@ionic-native/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
//import { DocumentScanner,DocumentScannerOptions, DocumentScannerSourceType } from '@ionic-native/document-scanner/ngx';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-document-scan',
  templateUrl: './document-scan.page.html',
  styleUrls: ['./document-scan.page.scss'],
})
export class DocumentScanPage implements OnInit {

  image:any;

  constructor(private platform:Platform,
    private router:Router,
    public apiService:ApiService) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
     
      console.log("Back press handler!");
      this.router.navigate(["/tabs"]);
    });
  }

//   camera()
//   {

//     let opts: DocumentScannerOptions = {
//       sourceType : DocumentScannerSourceType.CAMERA,
//       fileName : "myfile",
//       quality : 1.0,
//       returnBase64 : true
//   };
  
// this.scanner.scanDoc(opts)
//   .then((res: string) =>{

//     this.image = "data:image/jpeg;base64," + res;

//      console.log(res)

//     })
//   .catch((error: any) => {
    
//     console.error(error)

//   });

//   }

//   gallery()
//   {

//     let opts: DocumentScannerOptions = {
//       sourceType : DocumentScannerSourceType.GALLERY,
//       fileName : "myfile",
//       quality : 1.0,
//       returnBase64 : true
//   };
  
// this.scanner.scanDoc(opts)
//   .then((res: string) =>{

//     this.image = "data:image/jpeg;base64," + res;

//      console.log(res)

//     })
//   .catch((error: any) => {
    
//     console.error(error)

//   });

//   }

  upload()
  {
    this.apiService.nativeToast("In progress");
  }

}
