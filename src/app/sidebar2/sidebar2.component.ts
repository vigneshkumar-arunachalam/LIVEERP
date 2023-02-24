import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import data1 from '../../assets/json/Dev1.json';
import { Child, Subchild, menulist1 } from './billing.model';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component implements OnInit {
 

  public jsonData = data1;
  overallmenulist: any;
  roles: any;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.loadScript('../../assets/js/script.js');
    feather.replace();
    // console.log("menu list details", this.overallmenulist);
    this.roles = localStorage.getItem("role");
    this.loadMenus()

  }
  handleSelectedMenu(id: number) {
    this.overallmenulist.forEach((element: { menuId: number; isActive: boolean; }) => {
      if (element.menuId == id) {
        element.isActive = !element.isActive;
      }
    })
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  change(id:any){
      console.log(id);
      this.router.navigate([id]);
  }

loadMenus(){
  var mainMenus = [];
  var childMenu = [];
  var childers = [];
  var subChildMenu = [];
  var childMenus = [];

// First Level Menu Filter
  for(let i=0; i<this.jsonData.length; i++){
    if(this.jsonData[i].IDs.length == 0){
      mainMenus.push(this.jsonData[i]);
    } else if(this.jsonData[i].IDs != undefined){ 
      let foundIds = this.jsonData[i].IDs.filter((x: any) => this.roles.indexOf(x) !== -1);
      if(foundIds.length > 0){
        mainMenus.push(this.jsonData[i]);
      }
    }
  }

// Second and Third Level Menu Filter
for(let i=0; i<mainMenus.length; i++){
  if(mainMenus[i].IDs.length == 0){
    for(let j=0; j < mainMenus[i].children.length; j++){
      childers.push(mainMenus[i].children[j]);
     mainMenus[i]['childMain'] = childers
    }
    childMenu.push(mainMenus[i]);
  } else if(mainMenus[i].children != undefined){ 
    for(let j=0; j < mainMenus[i].children.length; j++){
      let foundIdss = mainMenus[i].children[j].IDs.filter((x: any) => this.roles.indexOf(x) !== -1);
      if(foundIdss.length > 0){
        childMenus = mainMenus[i].children[j].subchild;
        for(let k=0; k < childMenus.length; k++){
          let subids = childMenus[k].IDs.filter((x: any) => this.roles.indexOf(x) !== -1); 
          if(subids.length > 0){ 
            // console.log(subids);
            // console.log(childMenus[k]); 
            subChildMenu.push(childMenus[k]);
          }
          mainMenus[i].children[j]['subchildMain'] = subChildMenu
        }
        childers.push(mainMenus[i].children[j]);
        subChildMenu = [];
      }
     mainMenus[i]['childMain'] = childers
    }
    childMenu.push(mainMenus[i]);
    childers = [];
  }
}
this.overallmenulist = childMenu;
// console.log(this.overallmenulist)
}

mainMenus2(){
  var mainMenus = [];
  for(let i=0; i<this.overallmenulist.length; i++){
    if(this.overallmenulist[i].IDs.length == 0){
      mainMenus.push(this.overallmenulist[i]);
    } else if(this.overallmenulist[i].IDs != undefined){ 
      let foundIds = this.overallmenulist[i].IDs.filter((x: any) => this.roles.indexOf(x) !== -1);
      if(foundIds.length > 0){
        let foundIds = this.overallmenulist[i].children.filter((x: any) => this.roles.indexOf(x) !== -1);
        mainMenus.push(this.overallmenulist[i]);
      }
    }
  }
  // console.log(mainMenus);
}

}
