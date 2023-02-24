import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
declare var jQuery:any;   
@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.css']
})
export class CombinationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadScript('../../assets/js/script.js');
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
}
