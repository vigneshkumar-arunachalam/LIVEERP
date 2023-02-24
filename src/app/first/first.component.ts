import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data1 from '../../assets/json/Dev1.json';


import * as feather from 'feather-icons';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  public overallmenulist = data1;
  constructor(private router:Router) { }

  ngOnInit(): void {
    //this.goPlaces() 
    this.loadScript('../../assets/js/script.js');
    feather.replace();
  }
  // goPlaces() {
  //   this.router.navigate(['/', 'second']);
  // }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  handleSelectedMenu(id: number) {
    this.overallmenulist.forEach((element: { menuId: number; isActive: boolean; }) => {
      if (element.menuId == id) {
        element.isActive = !element.isActive;
      }
    })
  }
}
