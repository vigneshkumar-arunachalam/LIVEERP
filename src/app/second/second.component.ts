import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  pdfSource =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor(private router:Router) { }

  ngOnInit(): void {
   // $('#addCustomerFormId').modal('show');
    
    $('#invoiceAttachmentId').modal('show');
   // this.goPlaces();
  }
  // goPlaces() {
  //   this.router.navigate(['/', 'footer']);
  // }
}
