import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
declare var jQuery:any;   

@Component({
  selector: 'app-menutest',
  templateUrl: './menutest.component.html',
  styleUrls: ['./menutest.component.css']
})
export class MenutestComponent implements OnInit {

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
