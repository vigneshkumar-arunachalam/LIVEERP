import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
declare var iziToast: any;
declare var $: any;
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  userID: any;
  userName: any;
  loginDetails: any;
  role: any = [];
  otpstatus = false;

  expired = false;
  count: number = 1;
  subscription: Subscription;
  public qrdata: string;
  public level: string;
  public width: number;
  datas: any;
  typess: any;
  websocket: any;
  getdatas: any;


  constructor(private router: Router, private serverService: ServerService, private bnIdle: BnNgIdleService) {
    this.websocket = new WebSocket('wss://myscoket.mconnectapps.com:4006');
    var s = this;
    this.websocket.onopen = function (event: any) {
      console.log('socket connected');
    };
    this.websocket.onmessage = function (event: any) {
      s.getdatas = JSON.parse(event.data);
      console.log('socket detail' + sessionStorage.getItem('erp_c4c_user_id'));
      if (s.getdatas['0'].userId) {
        if (sessionStorage.getItem('erp_c4c_user_id') == null) {
          s.qrLogin();
        }
        this.websocket.onclose;
      }

    };

    this.websocket.onerror = function (event: any) {
      console.log('error');
      console.log(event.message);
    };
    this.websocket.onclose = function (event: any) {
      console.log('close');
    };

  }
  //  code_val=WXpSalgyOXNaR1Z5Y0E9PQ==&uscode=TXprPQ==


  ngOnInit(): void {


    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      verify_otp_ctrl: new FormControl(null),

    });
    this.subscribes('');

  }



  subscribes(val: any) {
    this.expired = false;
    if (val != '') this.count = 1;
    this.qrcodes();
    const source = interval(30000);
    this.subscription = source.subscribe((val) => this.qrcodes());
  }
  unsubscribe() {
    this.subscription.unsubscribe();
  }
  qrLogin() {


    let api_req: any = new Object();
    let addAPI: any = new Object();
    api_req.moduleType = "login";
    api_req.api_url = "login_qrcode";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addAPI.action = "login_qrcode";
    addAPI.userId_encode = this.getdatas['0'].userId;

    addAPI.code_val = 'YzRjX2VycA==';
    api_req.element_data = addAPI;

    this.serverService.sendServer(api_req).subscribe((response: any) => {


      this.loginDetails = response;
      this.userID = response.userId;
      this.userName = response.firstName;
      this.role = response.role;



      sessionStorage.setItem('access_token', 'test')
      sessionStorage.setItem('login_status', '1')
      sessionStorage.setItem('erp_c4c_user_id', response.userId)
      sessionStorage.setItem('user_name', response.firstName)
      sessionStorage.setItem('role', response.role)
      sessionStorage.setItem('profile_image', response.profile_image)


      if (this.userID != '') {
        this.router.navigate(['/']);
      }
      if (this.userID == 'undefined') {
        this.router.navigate(['/logout']);
      }

    });



  }
  qrcodes() {
    this.count = ++this.count;

    if (this.count < 5) {
      this.level = 'M';
      this.width = 256;
      this.datas = uuidv4();
      this.typess = btoa('erp');

      const data = [
        {
          type: this.typess,
          address: this.datas,
        },
      ];



      this.qrdata = JSON.stringify(data);

    } else {
      this.expired = true;
      this.unsubscribe();
    }
  }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }


  userLogin() {
    Swal.fire('Authenticating');
    Swal.showLoading();

    let api_req: any = new Object();
    let loginFormapi_req: any = new Object();
    api_req.moduleType = 'login';


    let button_val = $('#send_otp_id').val();
    if (button_val == 'Send OTP') {
      api_req.api_url = 'login_otp';
    } else {
      api_req.api_url = 'login';
      loginFormapi_req.auth_id = $('#auth_id').val();
      loginFormapi_req.verify_otp_code = this.loginForm.value.verify_otp_ctrl;
    }

    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";

    loginFormapi_req.action = 'login';
    loginFormapi_req.username = this.loginForm.value.username;
    loginFormapi_req.password = this.loginForm.value.password;
    api_req.element_data = loginFormapi_req;
    console.log("api req", api_req)
    console.log("loginFormapi_req", loginFormapi_req)
    // return false;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.opt_status == true) {


        Swal.close();
        iziToast.success({
          message: 'OTP Sent to Email',
          position: 'topRight',
        });

        this.otpstatus = true;
        $('#send_otp_id').val("Login");
        $('#auth_id').val(response.auth_id);

      } else if (response.opt_status == 'false') {
        Swal.close();
        iziToast.error({
          message: 'Invalid OTP',
          position: 'topRight',
        });

      } else if (response.status == 'true') {
        Swal.close();
        this.loginDetails = response;
        this.userID = response.userId;
        this.userName = response.firstName;
        this.role = response.role;

        sessionStorage.setItem('access_token', 'test')
        sessionStorage.setItem('login_status', '1')
        sessionStorage.setItem('erp_c4c_user_id', response.userId)
        sessionStorage.setItem('user_name', response.firstName)
        sessionStorage.setItem('role', response.role)
        sessionStorage.setItem('profile_image', response.profile_image)


        if (this.userID != '') {
          Swal.close();
          this.router.navigate(['/']);
        }


        Swal.close();
        iziToast.success({
          message: 'Logged In Successfully',
          position: 'topRight',
        });


      } else {
        Swal.close();
        iziToast.error({
          message: 'Invalid Login credentials',
          position: 'topRight',
        });
      }

    }),
      (error: any) => {
        Swal.close();
        console.log(error);
      }

  }
  AddQuotationGo() {

  }
}
