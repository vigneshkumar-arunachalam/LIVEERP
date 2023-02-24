import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-add-did-invoice',
  templateUrl: './add-did-invoice.component.html',
  styleUrls: ['./add-did-invoice.component.css']
})
export class AddDidInvoiceComponent implements OnInit {
  public addDid_section1: FormGroup;
  public addDid_section3: FormGroup;
  public did_Invice_fixed_charges : FormGroup;
  public did_Invice_usage_Charges : FormGroup;
  public did_Invice_other_charges : FormGroup;
  
  public fixedAddresses: FormArray;
  public usageAddress: FormArray;
  public otherAddress: FormArray;
  isReadOnly: boolean = false;
  
  companyNameList:any
  currencyNameList: any;
  ShipByList: any;
  BillCodeList:any;
  salesRepList: any;
  paymentviaList: any;
  billerID: any;
  getCurrencyCode: any;
  CurrencyConversionRateDefault: any = 1;
  //auto complete
  searchResult: any;
  TaxDropdownList: any;
  customerName_Data :any;
//search textbox
customer_ID: any;
customer_NAME: any;
   //checkbox group select-logo
   groupSelectCommonId_ExtraLogo: any;
   checkbox_value_ExtraLogo: any;
   salesRepDropDown_Textbox_Status:any;
   SalesRepList:any;

   //getProformaBillerDetails
  getProformaBillerDetails_BillerID: any;
  getProformaBillerDetails_tinName: any;
  getProformaBillerDetails_tinNo: any;
  getProformaBillerDetails_cstName: any;
  getProformaBillerDetails_cstNo: any;
  // DID disconut popup

  FixedDiscountForm: FormGroup;
  UsageDiscountForm:FormGroup;
  OtherDiscountForm:FormGroup;
  FinalDiscountForm : FormGroup;
  // DID Commission popup
  DidCommissionForm: FormGroup;

  test: boolean[] = [];
  itre = 0;
 
   //calculation
   finalDiscount: any;
   finalDiscountType: any;
   finalDiscountVal: any;
   sub_dis_val: any;
   sub_dis_type:any;
   grandTotal: any;
   grossTotal: any;
   finalTax: any;
   tax_per_hd = 0;
   tax_per_mod: any;
   extraCharge = 0;
   bankingCharge: any;
   net_amt: any;
   shipping_amt: any;
   invocePriceKey: any;
   row_cnt_mod: any;
   sub_total_glb1: any;
   sub_total_glb2: any;

     //export state-check box
  export_state: any;
  export_state_Local: boolean = true;
  export_state_Export:any;
  export_state_ZeroValid: boolean = true;
  MSDisplay_Value: boolean = true;

  //extra logo
  ExtralogoValue: any;
   //checkbox
   mile_check_value: any;
   dynamicCheckboxwithKey: any;
   SelectExtraLogoCheckboxwithKey: any;
 
   constructor(private serverService: ServerService,private fb: FormBuilder, private router: Router) { 

    this.did_Invice_fixed_charges = this.fb.group({
      fixedAddresses: this.fb.array([this.fixedFormDid()])
    });

    this.did_Invice_usage_Charges = this.fb.group({
      usageAddress: this.fb.array([this.usageFormDid()])
    });

    this.did_Invice_other_charges = this.fb.group({
      otherAddress: this.fb.array([this.otherFormDid()])
    });
   }

  ngOnInit(): void {

    this.addDidLoad();

    this.addDid_section1 = new FormGroup({
      'initial': new FormControl(),
      'companyName': new FormControl(),
      'invoiceNo': new FormControl(),
      'BillTo': new FormControl(),
      'cusInvoiceNo': new FormControl(),
      'tin': new FormControl(),
      'cst': new FormControl(),
      'Reg': new FormControl(),
      'GST': new FormControl(),
      'Date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'address_1': new FormControl(),
      'address_2': new FormControl(),
      'address_3': new FormControl(),
      'PoNo': new FormControl(),
      'Attn_1': new FormControl(),
      'ship_to': new FormControl(),
      'ship_address_1': new FormControl(),
      'ship_address_2': new FormControl(),
      'ship_address_3': new FormControl(),
      'PoDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'salesRep': new FormControl(),
      'salesRep_id': new FormControl(null),
      'ShipBy': new FormControl(),
      'ShipDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'ship_attn': new FormControl(),
      'terms': new FormControl(),
      
      'CurrencyConversionRate': new FormControl(),
      'extraLogo': new FormControl(),
      'Currency': new FormControl(),
      'PaymentVia': new FormControl(),
      'export_state': new FormControl(),
      'ReferenceResellerName': new FormControl(),
      'ExtraLogo': new FormControl(),
      'Jompay_logo': new FormControl(),
      
    });

    this.addDid_section3 = new FormGroup({



      'section3_gross_total': new FormControl(null),
      'section3_discount_txtbox': new FormControl(null),
      'final_dis_type': new FormControl(null),
      'final_dis_val': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_tax_per_hd': new FormControl(null),
      'section3_taxAmt_txtbox': new FormControl(null),
      'section3_shipping_amt_name_txtbox': new FormControl(null),
      'section3_shipping_amt_txtbox': new FormControl(null),
      'section3_bankingCharge_amt_name_txtbox': new FormControl(null),
      'section3_bankingCharge_amt_txtbox': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_termCondition': new FormControl(null),
      'section3_previousDue': new FormControl(null),
      'section3_receivedAuthorizedSignature': new FormControl(null),
      'section3_logo': new FormControl(null),

    });

    
  }

  
  // FIXED CHARGES
  
  get addressControls() {
    return this.did_Invice_fixed_charges.get('fixedAddresses') as FormArray
  }


  addInvoice(){

    this.fixedAddresses = this.did_Invice_fixed_charges.get('fixedAddresses') as FormArray;
    this.fixedAddresses.push(this.fixedFormDid());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  fixedFormDid(): FormGroup{
    return this.fb.group({
      particular1: '',
      fromdt1: '',
      todt1: '',
      md_chk1: '',
      did_diff_date1: '',
      productDesc1: '',
      amt1: '',
      call_duration1: '',
      

    });
  }
  removeDid1(i: number) {
    this.fixedAddresses.removeAt(i);
    var addr = this.did_Invice_fixed_charges.value.fixedAddresses;
    var list_cnt = addr.length;
  }

  // USAGE CHARGES

  get usageAddressControls() {
    return this.did_Invice_usage_Charges.get('usageAddress') as FormArray
  }


  usageCharges(){

    this.usageAddress = this.did_Invice_usage_Charges.get('usageAddress') as FormArray;
    this.usageAddress.push(this.usageFormDid());

    this.itre = this.itre + 1;
    this.usageAddressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  usageFormDid(): FormGroup{
    return this.fb.group({
      particular2: '',
      fromdt2: '',
      todt2: '',
      md_chk2: '',
      did_diff_date2: '',
      productDesc2: '',
      amt2: '',
      call_duration2: '',

    });
  }
  removeDid2(i: number) {
    this.usageAddress.removeAt(i);
    var addr = this.did_Invice_usage_Charges.value.usageAddress;
    var list_cnt = addr.length;
  }

  
  get otherAddressControls() {
    return this.did_Invice_other_charges.get('otherAddress') as FormArray
  }


  otherCharges(){

    this.otherAddress = this.did_Invice_other_charges.get('otherAddress') as FormArray;
    this.otherAddress.push(this.otherFormDid());

    this.itre = this.itre + 1;
    this.otherAddressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  otherFormDid(): FormGroup{
    return this.fb.group({
      particular3: '',
      fromdt3: '',
      todt3: '',
      md_chk3: '',
      did_diff_date3: '',
      productDesc3: '',
      amt3: '',
      call_duration3: '',
     

    });
  }
  removeDid3(i: number) {
    this.otherAddress.removeAt(i);
    var addr = this.did_Invice_other_charges.value.otherAddress;
    var list_cnt = addr.length;
  }

  handleChangeLocal(event:any){
    this.export_state_Local = event.target.value;
    this.export_state='Local';
    console.log( this.export_state_Local);

  }
  handleChangeExport(event:any){
    this.export_state_Export = event.target.value;
    this.export_state='Export';
    console.log(this.export_state_Export);

  }
  handleChangeZeroValid(event:any){
    this.export_state_ZeroValid = event.target.value;
    this.export_state='Zero Valid';
    console.log(this.export_state_ZeroValid );

  }
  handleChange_initial(id: any, evt: any) {
    var radioSelectInitial = evt.target.value;
    var abc = id;
    console.log("radio button value", radioSelectInitial);
    console.log("radio button id value", abc);
  }
  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;
    // var xyz = id;
    console.log("radio button value", radioSelectFooter);
    // console.log("radio button id value", xyz);
  }
  handleChangeExtraLogo(event:any){
     this.ExtralogoValue = event.target.value;
    // var xyz = id;
    console.log("radio button value for Extra logo", this.ExtralogoValue);

  }
  mile(e: any) {
    this.mile_check_value = e.target.value;
    console.log(this.mile_check_value);
  }
  handleChange_MSDisplay(event:any){
this.MSDisplay_Value=event.target.value;
console.log(this.MSDisplay_Value);
  }
  

  addDidLoad(){

    let api_req: any = new Object();
    let addAPI: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "proforma/add_proforma_invoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    addAPI.action = "add_proforma_invoice";
    addAPI.user_id = localStorage.getItem('user_id');
    api_req.element_data = addAPI;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
          if( response.status==true){
              this.companyNameList = response.biller_details;
              this.currencyNameList = response.currency_list;
              this.ShipByList = response.ship_by;
             // this.salesRepList = response.sales_rep;
              this.paymentviaList = response.paymentvia;
              this.BillCodeList = response.billCode;
              this.salesRepDropDown_Textbox_Status = response.sales_rep_status.dropdown_status;

              if (response.sales_rep_status.dropdown_status == 0) {
                this.addDid_section1.patchValue({
                  'salesRep_id': response.sales_rep.name,
                  'salesRep': response.sales_rep.userid,
                });
               
              }else{
                this.SalesRepList = response.sales_rep;
                this.addDid_section1.patchValue({
                  'salesRep': localStorage.getItem('user_id'),
                });

                
              }          


              this.addDid_section1.patchValue({
                'companyName': response.defaults_biller_id,        
              });

             // alert('Test--00'+response.defaults_biller_id);
           //   this.companyNameVal = response.defaults_biller_id;
             this.tax_per_mod = response.percent_val;
             console.log('petrcentage.......'+ this.tax_per_mod);
             
              this.getProformaBillerDetails();
              this.TaxDropdown();
              this.getCustomerInvoiceDetails()
            // this.getCustomerInvoiceDetails(response.defaults_biller_id);
          }
        });
  }

  getCustomerInvoiceDetails() {
    // this.billerID = event.target.value;
    // console.log("billerID check", this.billerID);
 
     let api_req: any = new Object();
     let api_getInvoiceDetails_req: any = new Object();
     api_req.moduleType = "proforma";
     api_req.api_url = "proforma/get_customer_inv_details";
     api_req.api_type = "web";
     api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
     api_getInvoiceDetails_req.action = "get_customer_inv_details";
     api_getInvoiceDetails_req.user_id = localStorage.getItem('user_id');
     api_getInvoiceDetails_req.billerId = this.addDid_section1.value.companyName;    
     api_req.element_data = api_getInvoiceDetails_req;
 
 
     this.serverService.sendServer(api_req).subscribe((response: any) => {
 
       if (response.status == true) {
         this.addDid_section1.patchValue({
           'invoiceNo': response.invoice_no,
           // 'Currency': response.currency_id,
 
 
         });
 
 
       }
       else {
 
       }
 
     });
 
   }

  getProformaBillerDetails() {
    
    let api_req: any = new Object();
    let add_BillerDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_proforma_biller_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_BillerDetails_req.action = "get_proforma_biller_details";
    add_BillerDetails_req.billerId = this.addDid_section1.value.companyName;
    api_req.element_data = add_BillerDetails_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);


      if (response != '') {
        this.getProformaBillerDetails_tinName = response.biller_details[0].tinName;
        this.getProformaBillerDetails_tinNo = response.biller_details[0].tinNo;
        this.getProformaBillerDetails_cstName = response.biller_details[0].cstName;
        this.getProformaBillerDetails_cstNo = response.biller_details[0].cstNo;
        this.addDid_section1.patchValue({
          'tin': response.biller_details[0].tinNo,
          'cst': response.biller_details[0].cstNo,
          'Currency': response.def_currency_id,
          'PaymentVia': response.def_paymentvia_id,

        });

      }
      else {

        iziToast.warning({
          message: "GetProformaBillerDetails API error. Please try again",
          position: 'topRight'
        });

      }

    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log(error);
      }




  }
  getCurrencyValues(event: any) {
    console.log("event.target;", event.target);
    this.getCurrencyCode = event.target.value;
    console.log("billerID check", this.billerID);

    let api_req: any = new Object();
    let api_getInvoiceDetails_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/get_currency_values";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_getInvoiceDetails_req.action = "get_currency_values";
    api_getInvoiceDetails_req.billerId = this.getProformaBillerDetails_BillerID;
    api_getInvoiceDetails_req.currency_code = this.getCurrencyCode;
    api_req.element_data = api_getInvoiceDetails_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.addDid_section1.patchValue({
          'CurrencyConversionRate': response.currency_live_val,

        });

      }
      else {

      }

    });
  }

  TaxDropdown() {

    let api_req: any = new Object();
    let api_TaxDropdown_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/tax_dropdown";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_TaxDropdown_req.action = "tax_dropdown";
    api_TaxDropdown_req.user_id = localStorage.getItem('user_id');
    api_TaxDropdown_req.billerId = this.addDid_section1.value.companyName;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {    

      if (response.status == true) {
        this.TaxDropdownList = response.tax_list;
        setTimeout(() => {
          this.addDid_section3.patchValue({
            'section3_gst_dropdown':response.default_tax_id,  
          });

        }, 500);
       // this.addQuotationInvoice_section3.setValue=response.default_tax_id;
       console.log('response.default_tax_id'+response.default_tax_id);

           

      }



    });
  }
  getTaxCals() {
    var tax_id = this.addDid_section3.value.section3_gst_dropdown;
    var tax: any;
    let api_req: any = new Object();
    let api_data_req: any = new Object();
    this.finalDiscount = $('#finalDiscount_amt').val();
    this.finalTax = $('#finalDiscount_amt').val();

    this.extraCharge = 0;
    this.bankingCharge = 0;
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_tax_percent_val";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_data_req.action = "get_tax_percent_val";
    api_data_req.tax_id = tax_id;

    api_req.element_data = api_data_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.tax_per_mod = response.percent_val;
      $('#tax_per_hd_id').val(response.percent_val);

      //tax = response.percent_val;
      tax = (parseFloat(response.percent_val) * parseFloat(this.grossTotal) / 100).toFixed(2);

      
      // if (this.grossTotal > 0) {
      //   this.grandTotal = (this.grossTotal + this.finalTax + this.finalDiscount + this.extraCharge).toFixed(2);
      // }
      this.finalTax = parseFloat(tax).toFixed(2);

      this.grandTotal = (parseFloat(tax) +  parseFloat(this.grossTotal));
    });
    //this.gross_total();
    
    

  }

  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {

    console.log(item)
  
  }
  onFocusedCustomer(e: any) {
   
  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_customer_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "quot_customer_name";
    api_Search_req.user_id = localStorage.getItem('user_id');
    api_Search_req.billerId = this.addDid_section1.value.companyName;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;

      if (response.status = true) {

      }

    });

  }
  searchCustomer_selectDropdownData(data: any) {
    this.customer_ID=data.customerId;
    this.customer_NAME=data.customerName;
        console.log("search data in dropdown", data)
        console.log("search data-customer Id", data.customerId)
        this.customerName_Data = data.customerId;
        let api_req: any = new Object();
        let api_SearchCUST_req: any = new Object();
        api_req.moduleType = "proforma";
        api_req.api_url = "proforma/customer_address_details";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_SearchCUST_req.action = "quot_customer_details";
        api_SearchCUST_req.user_id = localStorage.getItem('user_id');
        api_SearchCUST_req.customerId = this.customerName_Data
        api_req.element_data = api_SearchCUST_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
    
          console.log("customer_address_details---response", response)
          if (response.status == true) {
           // console.log('address'+response.customer_details[0].customerAddress1);
    
    
           var address_3;
           var ship_to_str,ship_address_str1,ship_address_str2,ship_address_str3;
    
           if(response.customer_details[0].city!=''){
            address_3=response.customer_details[0].city;
           }
           if(address_3!='' && response.customer_details[0].state!=''){
            address_3=address_3+' ,'+response.customer_details[0].state;
           }else{
            address_3=response.customer_details[0].state;
           }
           if(address_3!='' && response.customer_details[0].country!=''){
            address_3=address_3+' ,'+response.customer_details[0].country;
           }else{
            address_3=response.customer_details[0].country;
           }
    
           if(response.customer_details[0].city!=''){
            ship_address_str3=response.customer_details[0].city;
           }
           if(ship_address_str3!='' && response.customer_details[0].state!=''){
            ship_address_str3=ship_address_str3+' ,'+response.customer_details[0].state;
           }else{
            ship_address_str3=response.customer_details[0].state;
           }
           if(ship_address_str3!='' && response.customer_details[0].country!=''){
            ship_address_str3=ship_address_str3+' ,'+response.customer_details[0].country;
           }else{
            ship_address_str3=response.customer_details[0].country;
           }
    
    
            if(response.customer_details[0].ship_to!=''){
              ship_to_str =response.customer_details[0].ship_to;
            }else{
              ship_to_str =response.customer_details[0].customerName;
            }
    
            if(response.customer_details[0].ship_customerAddress1!=''){
              ship_address_str1 =response.customer_details[0].ship_customerAddress1;
            }else{
              ship_address_str1 =response.customer_details[0].customerAddress1;
            }
    
            if(response.customer_details[0].ship_customerAddress2!=''){
              ship_address_str2 =response.customer_details[0].ship_customerAddress2;
            }else{
              ship_address_str2 =response.customer_details[0].customerAddress2;
            }
    
    
    
            this.addDid_section1.patchValue({
                'address_1':response.customer_details[0].customerAddress1,
                'address_2':response.customer_details[0].customerAddress2,
                'address_3':address_3,
                'Attn_1':response.customer_details[0].companyName,
                'ship_to':ship_to_str,
                'ship_address_1':ship_address_str1,
                'ship_address_2':ship_address_str2,
                'ship_address_3':ship_address_str3,
                'ship_attn':response.customer_details[0].companyName,            
            });
          }
          else {
            this.addDid_section1.patchValue({
              'address_1':'',
              'address_2':'',
              'address_3':'',
              'Attn_1':'',
              'ship_to':'',
              'ship_address_1':'',
              'ship_address_2':'',
              'ship_address_3':'',
              'ship_attn':'',            
          });
          }
    
        });
      }


      save() {
        let api_req: any = new Object();
        let api_saveDid_req: any = new Object();
        api_req.moduleType = "proforma";
        api_req.api_url = "proforma/insert_proforma_invoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        api_saveDid_req.action = "insert_proforma_invoice";
        api_saveDid_req.user_id = localStorage.getItem('user_id');
    //section-1
        api_saveDid_req.company = this.addDid_section1.value.companyName;
        api_saveDid_req.invoice_no = this.addDid_section1.value.invoiceNo;
        api_saveDid_req.cus_invoice_no = this.addDid_section1.value.cusInvoiceNo;
        api_saveDid_req.customer_name = this.customerName_Data;
        api_saveDid_req.tinNo = this.addDid_section1.value.tin;
        api_saveDid_req.BillTo_customer_ID=this.customer_ID;
        api_saveDid_req.BillTo_customer_NAME=this.customer_NAME;
    
        api_saveDid_req.did_invoice_state = '1';



        api_saveDid_req.b_name = this.addDid_section1.value.BillTo;
        api_saveDid_req.b_address1 = this.addDid_section1.value.address_1;
        api_saveDid_req.b_address2 = this.addDid_section1.value.address_2;
        api_saveDid_req.b_address3 = this.addDid_section1.value.address_3;
    
        api_saveDid_req.s_name = this.addDid_section1.value.ship_to;
        api_saveDid_req.s_address1 = this.addDid_section1.value.ship_address_1;
        api_saveDid_req.s_address2 = this.addDid_section1.value.ship_address_2;
        api_saveDid_req.s_address3 = this.addDid_section1.value.ship_address_3;
    
        api_saveDid_req.cstNo = this.addDid_section1.value.cst;
        api_saveDid_req.billDate = this.addDid_section1.value.Date;
        api_saveDid_req.b_attn = this.addDid_section1.value.Attn_1;
        api_saveDid_req.po_no = this.addDid_section1.value.PoNo;
        api_saveDid_req.po_date = this.addDid_section1.value.PoDate;
        api_saveDid_req.sales_rep = this.addDid_section1.value.salesRep;
        api_saveDid_req.ship_by = this.addDid_section1.value.ShipBy;
        api_saveDid_req.ship_date = this.addDid_section1.value.ShipDate;
        api_saveDid_req.s_attn = this.addDid_section1.value.ship_attn;
        api_saveDid_req.terms = this.addDid_section1.value.terms;
        api_saveDid_req.currency = this.addDid_section1.value.Currency;
        api_saveDid_req.paymentVIA = this.addDid_section1.value.PaymentVia;
        api_saveDid_req.reference_reseller_name = this.addDid_section1.value.ReferenceResellerName;
        api_saveDid_req.bills_logo_id = this.ExtralogoValue;
        api_saveDid_req.export_state = this.export_state;
        api_saveDid_req.jom_pay_logo= this.addDid_section1.value.Jompay_logo;
        
        //section-2
        // fixed charge

      //  api_saveDid_req.fixed_value = this.did_Invice_fixed_charges.value.fixedAddresses;
    
      console.log('response........'+this.did_Invice_fixed_charges.value.particular1);
       
      var addr1 = this.did_Invice_fixed_charges.value.fixedAddresses;
       
    
        for (let i = 0; i < addr1.length; i++) {
    
          if($('#particular1' + i).val()==''){
            iziToast.warning({
              message: "Select Minimum 1 Product Details",
              position: 'topRight'
            });
            return false;
            
          }
         
          console.log(addr1)
          addr1[i].particular1 = $('#particular_1_'+ i).val();
          addr1[i].fromdt1 = $('#fromdt_1_'+ i).val();
          addr1[i].todt1 = $('#todt_1_'+ i).val();
          addr1[i].md_chk1 = $('#md_chk_1_'+ i).val();
          addr1[i].did_diff_date1 = $('#did_diff_date_1_'+ i).val();
          addr1[i].productDesc1 = $('#productDesc_1_'+ i).val();
          addr1[i].amt1 = $('#amt_1_'+ i).val();
          addr1[i].call_duration1 = $('#call_duration_1_'+ i).val();
         
        }
    
        
        api_saveDid_req.fixed_value = addr1;

        // usage charge

      //  api_saveDid_req.usage_values = this.did_Invice_usage_Charges.value.usageAddress;
    
    
       var addr2 = this.did_Invice_usage_Charges.value.usageAddress;
        
     
         for (let i = 0; i < addr2.length; i++) {
     
           if($('#particular2_' + i).val()==''){
             iziToast.warning({
               message: "Select Minimum 1 Product Details",
               position: 'topRight'
             });
             return false;
             
           }
          
           console.log(addr1[i].amt2)
           addr2[i].particular2 = $('#particular2_'+ i).val();
           addr2[i].fromdt2 = $('#fromdt2_'+ i).val();
           addr2[i].todt2 = $('#todt_2'+ i).val();
           addr2[i].md_chk2 = $('#md_chk2_'+ i).val();
           addr2[i].did_diff_date2 = $('#did_diff_date2_'+ i).val();
           addr2[i].productDesc2 = $('#productDesc2_'+ i).val();
           addr2[i].amt2 = $('#amt2_'+ i).val();
           addr2[i].call_duration2 = $('#call_duration2_'+ i).val();
          
         }
     
         console.log('addr2'+addr2);
         
         api_saveDid_req.usage_value = addr2;

         // other charge

      //  api_saveDid_req.other_values = this.did_Invice_other_charges.value.otherAddress;
    
    
       var addr3 = this.did_Invice_other_charges.value.otherAddress;
        
     
         for (let i = 0; i < addr3.length; i++) {
     
           if($('#particular3_' + i).val()==''){
             iziToast.warning({
               message: "Select Minimum 1 Product Details",
               position: 'topRight'
             });
             return false;
             
           }
          
           console.log(addr3[i].amt3)
           addr3[i].particular3 = $('#particular3_'+ i).val();
           addr3[i].fromdt3 = $('#fromdt_3'+ i).val();
           addr3[i].todt3 = $('#todt_3'+ i).val();
           addr3[i].md_chk3 = $('#md_chk3_'+ i).val();
           addr3[i].did_diff_date3 = $('#did_diff_date3_'+ i).val();
           addr3[i].productDesc3 = $('#productDesc3_'+ i).val();
           addr3[i].amt3 = $('#amt3_'+ i).val();
           addr3[i].call_duration3 = $('#call_duration3_'+ i).val();
          
         }
     
         
         api_saveDid_req.other_values = addr3;

    
    
    //section-3
        api_saveDid_req.grossTotal = this.addDid_section3.value.section3_gross_total;
        api_saveDid_req.discountAmount = this.addDid_section3.value.final_dis_val;
        api_saveDid_req.taxId = this.addDid_section3.value.section3_gst_dropdown;
        api_saveDid_req.taxAmt = this.addDid_section3.value.section3_taxAmt_txtbox;
        api_saveDid_req.shippingAmt = this.addDid_section3.value.section3_shipping_amt_txtbox;
        api_saveDid_req.addAmt = this.addDid_section3.value.section3_bankingCharge_amt_txtbox;
        api_saveDid_req.netTotal = this.addDid_section3.value.section3_grand_total;
        api_saveDid_req.remarks = this.addDid_section3.value.section3_remarks;
        api_saveDid_req.terms_cond_chk = this.addDid_section3.value.section3_termCondition;
        api_saveDid_req.received_signature = this.addDid_section3.value.section3_receivedAuthorizedSignature;
        api_saveDid_req.logo = this.addDid_section3.value.section3_logo;
       
        api_req.element_data = api_saveDid_req;
    
        this.serverService.sendServer(api_req).subscribe((response: any) => {
    
          if (response.status == true) {
            iziToast.success({
              title: 'Saved',
              message: 'DID Invoice Saved Successfully !',
            });
            // this.redirecttoQuotation();
            // this.addDid_section1.reset();
            // this.did_Invice_fixed_charges.reset();
            // this.did_Invice_usage_Charges.reset();
            // this.did_Invice_other_charges.reset();

            // this.addDid_section3.reset();
          }
          else {
            iziToast.warning({
              message: "DID Invoice Not Saved Successfully",
              position: 'topRight'
            });
          }
    
        });
    
      }
      redirecttoQuotation() {

        this.router.navigate(['/did']);
      }

  addCommission(){

  }


  // increment and decrement
  qunatity:number=0;
  addButton =1;
  plus(){
   
   if(this.addButton!=5){
    this.addButton++;
    this.qunatity=this.addButton;
   }
   
  }

  minus(){
    if(this.addButton!=-5){
      this.addButton--;
      this.qunatity=this.addButton;
     }
  }

  qunatity2:number=0;
  addButton2 =1;
  plus2(){
   
   if(this.addButton2!=5){
    this.addButton2++;
    this.qunatity2=this.addButton2;
   }
   
  }

  minus2(){
    if(this.addButton2!=-5){
      this.addButton2--;
      this.qunatity2=this.addButton2;
     }
  }

  qunatity3:number=0;
  addButton3 =1;
  plus3(){
   
   if(this.addButton3!=5){
    this.addButton3++;
    this.qunatity3=this.addButton3;
   }
   
  }

  minus3(){
    if(this.addButton3!=-5){
      this.addButton3--;
      this.qunatity3=this.addButton3;
     }
  }

// Fixed Charges

  totalCalculate_1(){
    var total_amt: any;
    var addr = this.did_Invice_fixed_charges.value.fixedAddresses;
    var list_cnt = addr.length;
    var  total_amt_tot=0;

    for(let a=0;a<list_cnt;a++){
      total_amt = $('#amt_1_' + a).val();
       console.log('subtotal 1...'+total_amt);
      if(!isNaN(total_amt) && total_amt!=''){
        total_amt_tot += parseFloat(total_amt);
      }
      // console.log(total_amt_tot);
      this.sub_total_glb1 = total_amt_tot;
      $('#sub_total_1').val(total_amt_tot);
      console.log('sub_total ='+ total_amt_tot);

    }
    this.gross_total();
  }
  


  fixedSaveDiscount(){
   
    var enablePerFinal_1 = $('#enablePerFinal_1').val()
    var enablePriceFinal_1 = $('#enablePriceFinal_1').val()
    var disType = $('input:radio[name=fix_DiscountTYpe]:checked').val();
    var final_tot = $('#sub_total_1').val();
    console.log('final_tot' + final_tot);
    $('#sub_discount_type_1' ).val(disType);
    var price: any;
    // this.totalCalculate_1();
    // setTimeout(()=>{
    //   this.totalCalculate_1();
    // },1000)

    if (disType == 'per') {
  
      if (enablePerFinal_1 != '') {
        
        price = (parseFloat(enablePerFinal_1) * parseFloat(final_tot) / 100).toFixed(2);
        console.log(price);
        $('#sub_discount_1' ).val(price);
        $('#sub_discount_val_1').val(enablePerFinal_1);
        price = final_tot - price;
        console.log("sub_total" + price);
        $('#sub_total_1').val(price);
        
      } else {
        $('#sub_discount_1' ).val('');
        $('#sub_discount_val_1').val('');
          
        price = final_tot;

      }
    } 
    else {
      price = final_tot - enablePriceFinal_1;
      console.log('price_fin'+price);
      $('#sub_total_1').val(price);
      $('#sub_discount_1').val(enablePriceFinal_1);
      $('#sub_discount_val_1').val(enablePriceFinal_1);
          }

          $('#sub_total_1' ).val(price)

          var gtotel = 0;
          if (this.itre == 0) {
            gtotel = price;
          } else {
            for (let k = 0; k <= this.itre; k++) {
              gtotel += parseFloat($('#sub_total_1' + k).val());
              console.log('gtotal'+ gtotel );
              
            }
          }
          
    
    $('#fixedDiscountFormId').modal('hide');
          
  }


  // usage Charges

 


  totalCalculate_2(){

    var total_amt: any;
    var addr = this.did_Invice_usage_Charges.value.usageAddress;
    var list_cnt = addr.length;
    var  total_amt_tot=0;

    for(let a=0;a<list_cnt;a++){
      total_amt = $('#amt2_' + a).val();
      // console.log(total_amt);
      if(!isNaN(total_amt) && total_amt!=''){
          total_amt_tot += parseFloat(total_amt);
      }
      // console.log(total_amt_tot);
      $('#sub_total_2').val(total_amt_tot);
      console.log('sub_total ='+ total_amt_tot);

    }
    this.gross_total();

  }


  usageSaveDiscount(){

    var enablePerFinal_2 = $('#enablePerFinal_2').val()
    var enablePriceFinal_2 = $('#enablePriceFinal_2').val()
    var disType = $('input:radio[name=use_DiscountTYpe]:checked').val();
    var final_tot = $('#sub_total_2').val();
    console.log('final_tot' + final_tot);
    $('#sub_discount_type_2' ).val(disType);
    var price: any;

    if (disType == 'per') {
  
      if (enablePerFinal_2 != '') {
        
        price = (parseFloat(enablePerFinal_2) * parseFloat(final_tot) / 100).toFixed(2);
        console.log(price);
        $('#sub_discount_2' ).val(price);
        $('#sub_discount_val_2').val(enablePerFinal_2);
        price = final_tot - price;
        console.log("sub_total" + price);
        $('#sub_total_2').val(price);
        
      } else {
        $('#sub_discount_2' ).val('');
        $('#sub_discount_val_2').val('');
          
        price = final_tot;

      }
    } 
    else {
      price = final_tot - enablePriceFinal_2;
      console.log('price_fin'+price);
      $('#sub_total_2').val(price);
      $('#sub_discount_2').val(enablePriceFinal_2);
      $('#sub_discount_val_2').val(enablePriceFinal_2);
          }

          $('#sub_total_2' ).val(price)

          var gtotel = 0;
          if (this.itre == 0) {
            gtotel = price;
          } else {
            for (let k = 0; k <= this.itre; k++) {
              gtotel += parseFloat($('#sub_total_' + k).val());
              console.log('gtotal'+ gtotel );
              
            }
          }
    $('#usageDiscountFormId').modal('hide');
         

  }
  
  

// other charges


totalCalculate_3(){

  var total_amt: any;
  var addr = this.did_Invice_other_charges.value.otherAddress;
  var list_cnt = addr.length;
  var  total_amt_tot=0;

  for(let a=0;a<list_cnt;a++){
    total_amt = $('#amt3_' + a).val();
    // console.log(total_amt);
    if(!isNaN(total_amt) && total_amt!=''){
        total_amt_tot += parseFloat(total_amt);
    }
    // console.log(total_amt_tot);
    $('#sub_total_3').val(total_amt_tot);
    console.log('sub_total ='+ total_amt_tot);
    
  }
  this.gross_total();
}



otherSaveDiscount(){

  var enablePerFinal_3 = $('#enablePerFinal_3').val()
    var enablePriceFinal_3 = $('#enablePriceFinal_3').val()
    var disType = $('input:radio[name=oth_DiscountTYpe]:checked').val();
    var final_tot = $('#sub_total_3').val();
    console.log('final_tot' + final_tot);
    $('#sub_discount_type_3' ).val(disType);
    var price: any;

    if (disType == 'per') {
  
      if (enablePerFinal_3 != '') {
        
        price = (parseFloat(enablePerFinal_3) * parseFloat(final_tot) / 100).toFixed(2);
        console.log(price);
        $('#sub_discount_3' ).val(price);
        $('#sub_discount_val_3').val(enablePerFinal_3);
        price = final_tot - price;
        console.log("sub_total" + price);
        $('#sub_total_3').val(price);
        
      } else {
        $('#sub_discount_3' ).val('');
        $('#sub_discount_val_3').val('');
          
        price = final_tot;

      }
    } 
  else {
    price = final_tot - enablePriceFinal_3;
    console.log('price_fin_3'+price);
    $('#sub_total_3').val(price);
    $('#sub_discount_3').val(enablePriceFinal_3);
    $('#sub_discount_val_3').val(enablePriceFinal_3);
        }

        $('#sub_total_3' ).val(price)

        var gtotel = 0;
        if (this.itre == 0) {
          gtotel = price;
        } else {
          for (let k = 0; k <= this.itre; k++) {
            gtotel += parseFloat($('#sub_total_3' + k).val());
            console.log('gtotal_3'+ gtotel );
            
          }
        }
  $('#otherDiscountFormId').modal('hide');
      
          
}

gross_total(){
  var total_amt: any =0;
 var gross_tot =0;

  var sub_total1,sub_total2,sub_total3:any = 0;

    sub_total1 = $('#sub_total_1').val();
    sub_total2 = $('#sub_total_2').val();
    sub_total3 = $('#sub_total_3').val();
    total_amt = (parseFloat(sub_total1)) + (parseFloat(sub_total2)) + (parseFloat(sub_total3));

    console.log(total_amt);
    gross_tot += parseFloat(total_amt);
    $('#section3_gross_total').val(gross_tot);
    $('#section3_grand_total').val(gross_tot);
    console.log('gross total =' + gross_tot);

    var tax_amt: any = 0;
    var tax_amt_tot = 0;
    var grs_amt = 0;
    var net_tot: any;
    var net_price = 0;

    this.net_amt = $('#section3_gross_total').val();

    tax_amt = (parseFloat(this.tax_per_mod) * parseFloat(this.net_amt) / 100);
    grs_amt += gross_tot;
    net_tot = (parseFloat(tax_amt) + parseFloat(this.grossTotal)).toFixed(2);

    console.log('this.grossTotal.....' + this.grossTotal);
    net_price += parseFloat(net_tot);
    $('#section3_grand_total').val(net_price);
    console.log('net total =' + net_price);

this.grossTotal = grs_amt;
this.finalTax = tax_amt_tot.toFixed(2);
if (this.shipping_amt == '') {
  this.shipping_amt = 0;
}
if (this.finalDiscount == '') {
  this.finalDiscount = 0;
}
if (this.finalTax == '') {
  this.finalTax = 0;
}
if (this.bankingCharge == '') {
  this.bankingCharge = 0;
}
this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(this.finalTax) + parseFloat(this.shipping_amt)+ parseFloat(this.bankingCharge)) - parseFloat(this.finalDiscount)).toFixed(2);

 
    // 
}



finalSaveDiscount(){

  var enablePerFinal_4 = $('#enablePerFinal_4').val()
  var enablePriceFinal_4 = $('#enablePriceFinal_4').val()
  var disType = $('input:radio[name=final_DiscountTYpe]:checked').val();
  var final_tot = $('#section3_gross_total').val();
  console.log('final_tot' + final_tot);
  $('#final_discount_type' ).val(disType);
  var price: any;
  

  if (disType == 'per') {

    if (enablePerFinal_4 != '') {
      
      price = (parseFloat(enablePerFinal_4) * parseFloat(final_tot) / 100).toFixed(2);
      console.log('discount amount = '+price);
      $('#finalDiscount_amt' ).val(price);
      $('#final_discount_val').val(enablePerFinal_4);
    price = final_tot - price;
      console.log("percentage" + price);
      $('#section3_grand_total').val(price);
      
    } else {
      $('#finalDiscount_amt' ).val('');
      $('#final_discount_val').val('');
        
      price = final_tot;
      console.log(''+price);
      
    }
  } 
  else {
    price = final_tot - enablePriceFinal_4;
    console.log('price amount '+price);
    $('#section3_grand_total').val(price);
    $('#finalDiscount_amt').val(enablePriceFinal_4);
    $('#final_discount_val').val(enablePriceFinal_4);
        }

        $('#section3_grand_total' ).val(price)

        var gtotel = 0;
        if (this.itre == 0) {
          gtotel = price;
        } else {
          for (let k = 0; k <= this.itre; k++) {
            gtotel += parseFloat($('#section3_grand_total' + k).val());
            console.log('gtotal'+ gtotel );
            
          }
        }
  $('#discountFormFinal').modal('hide');
       
        

}

extraFees() {
  var fee = this.addDid_section3.value.section3_shipping_amt_txtbox;
  this.grandTotal = this.grandTotal + parseFloat(fee);
  this.extraCharge = parseFloat(fee);
  this.totalCalculate_1();
  this.totalCalculate_2();
  this.totalCalculate_3();
}
set_display_none(cnt: any) {
  //PN
  if ($('#pd_split_' + cnt).prop('checked') == true) {
    $('#particular_1' + cnt).fadeOut(1000);
    $('#fromdt_1' + cnt).fadeOut(1000);
    $('#todt_1' + cnt).fadeOut(1000);
    $('#md_chk_1' + cnt).fadeOut(1000);
    $('#did_diff_date_1' + cnt).fadeOut(1000);
    $('#productDesc_1' + cnt).fadeOut(1000);
    $('#amt_1' + cnt).fadeOut(1000);
    $('#call_duration_1' + cnt).fadeOut(1000);

    $('#particular_1' + cnt).val('');
    $('#fromdt_1' + cnt).val('');
    $('#todt_1' + cnt).val('');
    $('#md_chk_1' + cnt).val('');
    $('#did_diff_date_1' + cnt).val('');
    $('#productDesc_1' + cnt).val('');
    $('#amt_1' + cnt).val('');
    $('#call_duration_1' + cnt).val('');

  } else {
    $('#particular_1' + cnt).fadeIn(1000);
    $('#fromdt_1' + cnt).fadeIn(1000);
    $('#todt_1' + cnt).fadeIn(1000);
    $('#md_chk_1' + cnt).fadeIn(1000);
    $('#did_diff_date_1' + cnt).fadeIn(1000);
    $('#productDesc_1' + cnt).fadeIn(1000);
    $('#amt_1' + cnt).fadeIn(1000);
    $('#call_duration_1' + cnt).fadeIn(1000);
  }
}

goBack() {
  this.router.navigate(['/didInvoice']);
  
}



}
