import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any
declare var iziToast: any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-didinvoice',
  templateUrl: './didinvoice.component.html',
  styleUrls: ['./didinvoice.component.css']
})
export class DidinvoiceComponent implements OnInit {
  DID_list: any;
  biller_list: any;
  biller_temp: any;

  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.getInvoice({});
  }

  getInvoice(data: any){
    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_DidList: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_list"
    api_req.api_type = "web";
    api_req.access_token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_DidList.action = "invoice_list";
    api_DidList.user_id = localStorage.getItem("user_id");
    api_DidList.off_set = list_data.offset;
    api_DidList.limit_val = list_data.limit;
    api_DidList.current_page = "";

    api_req.element_data = api_DidList;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("PI list", response);
      if (response) {
        this.DID_list = response.proforma_details;

        this.biller_list = response.biller_details;

        console.log("proforma_details list", this.DID_list)
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

    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  addDidGo(){
    this.router.navigate(['/addDidInvoice'])
  }

  editDidGo(id: any){
    var editbillID = id;
    this.router.navigate(['/editDidInvoice'])
    this.router.navigate(['/editDidInvoice'],{
      queryParams: {
        e_editBillID: editbillID,
      }
    })
  }
}
