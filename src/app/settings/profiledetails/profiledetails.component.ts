import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import Swal from 'sweetalert2';
declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
  ProfileDetailsForm: FormGroup;
  userSignatureDetailsList:any;
  googleAuthentication:any;
  firstName:any;
  lastName:any;
  QRCode:any;
  ProfileImage:any;
  // file: File;
  file: string[] = [];
  // file = Array();
  //file
  signature_billerid: any = [];
  files_Signature: any  = [];
    
  constructor(private serverService: ServerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ProfileDetails();
    this.ProfileDetailsForm = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'photo': new FormControl(null),
      'sign': new FormControl(null),
      'googleAuthenticator': new FormControl(null),
    
    });
  }
  ProfileDetails(){

    let api_req: any = new Object();
    let api_profDetails: any = new Object();
    api_req.moduleType = "common";
    api_req.api_url = "common/profile_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_profDetails.action = "profile_details";
    api_profDetails.user_id = localStorage.getItem('user_id');
    api_req.element_data = api_profDetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        
       this.firstName=response.user_details[0].firstName;
       this.lastName=response.user_details[0].lastName;
       this.ProfileImage=response.user_details[0].profile_image;

        this.userSignatureDetailsList=response.user_signature_details;
        this.googleAuthentication=response.user_details[0].google_secretcode;
       

        this.QRCode=response.qr_code;
        $('#qr_code_id').html(response.qr_code);

        this.ProfileDetailsForm.patchValue({
          'firstName': response.user_details[0].firstName,
          'lastName': response.user_details[0].lastName,
          

          // 'a_selectLogo_mconnect': response[0].mconnect_company_logo,
        });
       
        iziToast.success({
          message: "Mconnect Partner Details displayed successfully",
          position: 'topRight'

        });

      } else {
        iziToast.warning({
          message: "Mconnect Partner details not available for this Customer. Please try again",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };


  }
  showPreviewImage(billerid: any, event: any) {
   

    for (let i = 0; i < event.target.files.length; i++) {
      var file = event.target.files[i]
      this.files_Signature.push(file);
      console.log(this.files_Signature);
      this.signature_billerid.push(billerid)
      console.log("push_billerid(signature)", this.signature_billerid);
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }


  delete_sign(id: any) {
    Swal.fire({
      title: 'Do you want to Delete?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.delete_data(id);
      } else if (result.isDenied) {
        Swal.fire('No Changes');
      }
    })
  }

  delete_data(sign_id: any) {
    let api_req: any = new Object();
    let api_enableDisable: any = new Object();
    api_req.moduleType = "admin";
    api_req.api_url = "admin/user_signature_deleted"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_enableDisable.action = "user_signature_deleted";
    api_enableDisable.user_signature_id = sign_id;
    api_req.element_data = api_enableDisable;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Signature deleted successful',
          showConfirmButton: false,
          timer: 1500
        })
        this.ProfileDetails();
        
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Password Reset not Success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });


  }
  google_auth() {
    var url = "https://www.authenticatorapi.com/pair.aspx?AppName=Erp&AppInfo=" + this.firstName + "&SecretCode=" +this.googleAuthentication + +"";
    window.open(url, '_blank');
    console.log("url", url)
  }
  GoogleAuthenticationValidation(){
   

      let api_req: any = new Object();
      let api_googleAuthVali: any = new Object();
      api_req.moduleType = "common";
      api_req.api_url = "common/google_auth_check";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      api_googleAuthVali.action = "google_auth_check";
      api_googleAuthVali.user_id = localStorage.getItem('user_id');
      api_googleAuthVali.customerId = localStorage.getItem('user_id');
      api_googleAuthVali.auth_code = localStorage.getItem('user_id');
      api_req.element_data = api_googleAuthVali;
  
      this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.status == true) {
          
         this.firstName=response.user_details[0].firstName;
         this.lastName=response.user_details[0].lastName;
          this.userSignatureDetailsList=response.user_signature_details;
          this.googleAuthentication=response.user_details[0].google_secretcode;
  
          this.ProfileDetailsForm.patchValue({
            'firstName': response.user_details[0].firstName,
            'lastName': response.user_details[0].lastName,
            
  
            // 'a_selectLogo_mconnect': response[0].mconnect_company_logo,
          });
          this.google_auth();
          iziToast.success({
            message: "Mconnect Partner Details displayed successfully",
            position: 'topRight'
  
          });
  
        } else {
          iziToast.warning({
            message: "Mconnect Partner details not available for this Customer. Please try again",
            position: 'topRight'
          });
        }
      }),
        (error: any) => {
          iziToast.error({
            message: "Sorry, some server issue occur. Please contact admin",
            position: 'topRight'
          });
          console.log("final error", error);
        };
  
  
    }  
  
}
