import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:any
  userId:any;
  role_Permission:any;
  user_ProfileImage:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      
    
    this.userName=sessionStorage.getItem('user_name');
    this.userId=sessionStorage.getItem('erp_c4c_user_id');
    this.role_Permission=sessionStorage.getItem('role');
    this.user_ProfileImage=sessionStorage.getItem('profile_image');
  }, 2000);
    // console.log("navigation menu, username",this.userName)
    // console.log("navigation menu, userid",this.userId)
    // console.log("navigation menu, role_permission",this.role_Permission)
    // console.log("navigation menu,  this.user_ProfileImage", this.user_ProfileImage)
   
  }
 
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);

      
  }
}
