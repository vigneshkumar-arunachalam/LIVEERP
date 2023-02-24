import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  //list
  PI_list: any;
  biller_list: any;
  biller_temp: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //payment process
  processPaymentForm: FormGroup;
  isReadOnly: boolean = true;
  // Invoice Sending Method
  InvoiceSendingMethodForm: FormGroup;
  InvoiceSendingValue:any='None';

  constructor(private serverService: ServerService, private router: Router) { }


  ngOnInit(): void {
    this.getInvoice({});
    this.processPaymentForm = new FormGroup({
      'invoiceID': new FormControl(null),
      'toal': new FormControl(null),
      'biller': new FormControl(null),
      'paid': new FormControl(null),
      'customer': new FormControl(null),
      'owing': new FormControl(null),
      'amount': new FormControl(null),
      'date': new FormControl(null),
      'paymenttype': new FormControl(null),
      'note': new FormControl(null),
      'paymentDetails': new FormControl(null),

    });
    this.InvoiceSendingMethodForm = new FormGroup({
      'InvoiceSendingInput': new FormControl(null),
    });

  }
  radio_InvoiceSendingInput(event: any) {
    this.InvoiceSendingValue = event.target.value;
    console.log(this.InvoiceSendingValue)
  }
  getInvoice(data: any) {
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "quotation_list";
    api_quotationList.user_id = localStorage.getItem("user_id");
    api_quotationList.off_set = list_data.offset;
    api_quotationList.limit_val = list_data.limit;
    api_quotationList.current_page = "";

    api_req.element_data = api_quotationList;

    // this.serverService.sendServer(api_req).subscribe((response: any) => {
    //   if (response != '') {

    //     this.PI_list = response;

    //   }

    // });
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("PI list", response);
      if (response) {
        this.PI_list = response.proforma_details;

        this.biller_list = response.biller_details;

        console.log("proforma_details list", this.PI_list)
        console.log("this.biller_list", this.biller_list)
        this.paginationData = this.serverService.pagination({ 'offset': response.off_set, 'total': response.total_cnt, 'page_limit': this.pageLimit });
      }
      else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
  listDataInfo(list_data: any) {
    // console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  addPIGo() {
    this.router.navigate(['/AddInvoice'])
  }
  editPIGo(id: any) {
    var editbillID = id;
    this.router.navigate(['/EditInvoice'])

    this.router.navigate(['/EditInvoice'], {
      queryParams: {
        e_editBillID: editbillID,
      }
    });
  }

}
