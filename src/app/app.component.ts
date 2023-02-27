import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERPUpdate';
  code_val: any;
  uscode: any;
  public file_path: string = "";
  templateAuthView = false;
  constructor(private bnIdle: BnNgIdleService, private router: Router, private route: ActivatedRoute, private serverService: ServerService) {
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);
        this.code_val = params['code_val'];
        this.uscode = params['uscode'];
        console.log(this.code_val);
      }
      );
  }
  ngOnInit(): void {
    //60 = 1 minute
    //3600= 1 hour
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (res) {
        console.log('session expired after 900 seconds');
        this.router.navigateByUrl('/logout');
      }
    });


  }
  // qrLogin(){


  //   let api_req: any = new Object();
  //   let addAPI: any = new Object();
  //   api_req.moduleType = "login";
  //   api_req.api_url = "login_qrcode";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   addAPI.action = "login_qrcode";
  //   addAPI.userId_encode = this.getdatas['0'].userId;

  //   addAPI.code_val = 'YzRjX2VycA==';
  //   api_req.element_data = addAPI;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {


  //     this.loginDetails=response;
  //     this.userID=response.userId;
  //     this.userName=response.firstName;
  //     this.role=response.role;



  //     localStorage.setItem('access_token','test')
  //     localStorage.setItem('login_status','1')
  //     localStorage.setItem('user_id',response.userId)
  //     localStorage.setItem('user_name',response.firstName)
  //     localStorage.setItem('role',response.role)
  //     localStorage.setItem('profile_image',response.profile_image)


  //     if(this.userID!=''){
  //         this.router.navigate(['/']);
  //     }
  //     if(this.userID=='undefined'){
  //       this.router.navigate(['/logout']);
  //     }

  //   });



  // }

  onActivate(event: any) {
    this.file_path = this.router.url;
    // console.log(this.router.url);
    if (localStorage.getItem('access_token')) {
      this.templateAuthView = false;

    } else if (this.code_val != '' && this.code_val != undefined && this.code_val != 'undefined' && this.code_val != 'null' && this.code_val != null && this.uscode != '' && this.uscode != 'undefined' && this.uscode != undefined && this.uscode != 'null' && this.uscode != null) {
      this.templateAuthView = false;
      let api_req: any = new Object();
      let addAPI: any = new Object();
      api_req.moduleType = "login";
      api_req.api_url = "login_olderp";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      addAPI.action = "login_olderp";
      addAPI.uscode = this.uscode;

      addAPI.code_val = this.code_val;
      api_req.element_data = addAPI;

      this.serverService.sendServer(api_req).subscribe((response: any) => {
        localStorage.setItem('access_token', 'test')
        localStorage.setItem('login_status', '1')
        localStorage.setItem('user_id', response.userId)
        localStorage.setItem('user_name', response.firstName)
        localStorage.setItem('role', response.role)
        localStorage.setItem('profile_image', response.profile_image)
        console.log(response)
        this.templateAuthView = true;
        if (response.userId != '') {
          setTimeout(()=>{
            this.router.navigate(['/'],{ queryParams: { ids: btoa(response.userId)}});
          },1000) 
        }
        if (response.userId == 'undefined') {
          this.router.navigate(['/logout']);
        }

      });
    } else {
      this.templateAuthView = true;
      this.router.navigate(['/login']);
    }
  }

}
