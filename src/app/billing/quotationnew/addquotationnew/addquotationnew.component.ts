import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
declare var $: any;
declare var iziToast: any;
@Component({
  selector: 'app-addquotationnew',
  templateUrl: './addquotationnew.component.html',
  styleUrls: ['./addquotationnew.component.css']
})
export class AddquotationnewComponent implements OnInit {
  public addQuotationInvoice_section1: FormGroup;
  public addQuotationInvoice_section2: FormGroup;
  public addQuotationInvoice_section3: FormGroup;
  public setActualCost_FormGroup: FormGroup;

  public DiscountForm: FormGroup;
  public addresses: FormArray;

  isReadOnly: boolean = true;
  SalesRepList: any;
  salesRepDropDown_Textbox_Status: any;
  SalesResellerList: any;
  SelectTemplateList: any;
  isReadonly:boolean=true;
  LogoList: any;
  CurrencyList: any;
  TermsConditionList: any;
  PDFTemplateList: any;
  ExtraLogoList: any;
  billerList: any;
  quotation_template_id: any;
  terms_condition_id: any;
  billerID: any;
  grantTotalShow: boolean = true;
  descriptionDetails_DontShow:boolean=true;
  selectAdditionalSign:boolean=true;
  FooterDetails: any;
  radioSelectFooterChecked: boolean = false;
  checkbox_descriptionDetails_DontShow:boolean=true;
  checkbox_termsCondition_DontShow:boolean=false;
  searchResult: any;
  billerIDUpdate: any;
  sub_dis_type: any;
  sub_dis_val: any;
  customerName_Data: any;
  additionalSignatureList: any;
  TaxDropdownList: any;
  quotationPriceKey: any;
  row_cnt_mod: any;
  grossTotal: any;
  itre = 0;
  finalDiscount: any;
  finalDiscountType: any;
  finalDiscountVal: any;
  // net_amt = $('#pd_netPrice_' + a).val();
  grandTotal: any;
  finalTax: any;
  tax_per_hd = 0;
  tax_per_mod: any;
  extraCharge = 0;
  net_amt: any;
  shipping_amt: any;

  // tax_amt_tot=0;  
  selectedTax = true;
  test: boolean[] = [];
  addrNetPrices: boolean[] = [];

  //enquiry from details pop up
  FormID_enquiryFromDetails: any;
  subject_enquiryFromDetails: any;
  validity_enquiryFromDetails: any;
  version_enquiryFromDetails: any;
  //auto search product
  searchResult_productName: any;
  product_name_AutoComplete: any;
  //radio button dynamic change
  currencyOld_RadioValue: any;
  currencyNew_RadioValue: any;
  dynamicTermsConditions_Currency:any;
  tax_amt_tot: number;
  grs_amt: number;
  CurrencyChangeFieldValue: any;
  //  quotationAddSignature
quotationAddSignature_state:any;
quotationAddSignature_filename:any;

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.addQuotationInvoice_section2 = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });

  }
  keywordCompanyName = 'customerName';
  keywordpd_productName_autocomplete = 'partNo';
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);
        this.FormID_enquiryFromDetails = params['formID'];
        this.subject_enquiryFromDetails = params['subject'];
        this.validity_enquiryFromDetails = params['validity'];
        this.version_enquiryFromDetails = params['version'];

        console.log("formid", this.FormID_enquiryFromDetails);
        console.log("subject", this.subject_enquiryFromDetails);
        console.log("validity", this.validity_enquiryFromDetails);
        console.log("version", this.version_enquiryFromDetails);

        console.log(this.FormID_enquiryFromDetails);
        console.log(this.subject_enquiryFromDetails);
        console.log(this.validity_enquiryFromDetails);
        console.log(this.version_enquiryFromDetails);
      }
      );

    this.ExtraLogoList = ["IT Care", "Calncall", "DID Sg", "Callcloud", "Mrvoip"];
    this.addQuotation();
    // this.TaxDropdown();
    this.addQuotationInvoice_section1 = new FormGroup({
      'companyName': new FormControl(null),
      'quotationNumber': new FormControl(null),
      'selectFooter': new FormControl(null, [Validators.required]),
      'quotationDate': new FormControl((new Date()).toISOString().substring(0, 10)),
      'customerName': new FormControl(null, [Validators.required]),
      'cust_address1': new FormControl(null),
      'cust_address2': new FormControl(null),
      'cust_address3': new FormControl(null),
      'attention': new FormControl(null),
      'salesRep': new FormControl(null),
      'salesRep_id': new FormControl(null),
      'selectTemplate': new FormControl(null, [Validators.required]),
      'selectReseller': new FormControl(null),
      'selectCurrency': new FormControl(null),
      'extraLogo': new FormControl(null),
      'selectPDFTemplate': new FormControl(null, [Validators.required]),
      'selectTermsConditions':new FormControl(null, [Validators.required]),
      'termsCondition_DontShow': new FormControl(null),
      'DescriptionText': new FormControl(null),
      'descriptionDetails_DontShow': new FormControl(null),
      'termConditionContentChange': new FormControl(null),
      'templateContent_Dropdown': new FormControl(null),

    });
    this.addQuotationInvoice_section3 = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),
      'section3_discount_txtbox': new FormControl(null),
      'final_dis_type': new FormControl(null),
      'final_dis_val': new FormControl(null),
      'section3_gst_dropdown': new FormControl(null),
      'section3_taxAmt_txtbox': new FormControl(null),
      'section3_tax_per_hd': new FormControl(null),
      'section3_shipping_amt_name_txtbox': new FormControl(null),
      'section3_shipping_amt_txtbox': new FormControl(null),
      'section3_grand_total': new FormControl(null),
      'section3_remarks': new FormControl(null),
      'section3_signature_dropdown': new FormControl(null),
      'section3_templateName': new FormControl(null),
      'section3_select_additional_signature': new FormControl(null),


    });
    this.DiscountForm = new FormGroup({
      'section3_grant_total_show': new FormControl(null),
      'section3_gross_total': new FormControl(null),



    });

    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
    });



  }

  selectEventProduct(item: any, i: any) {
    console.log("product item selected", item)
    this.product_name_AutoComplete = item.partNo;
    console.log("product item.partNo selected", item.partNo)
    if (this.product_name_AutoComplete != '') {
      this.productNameAutoFill(i)
    }

  }
  onFocusedProduct(e: any) {
    console.log("onFocusedProduct ", e)


    // do something when input is focused
  }

  changeProductName_partNO(e: any) {
    console.log(e.target.value);
  }
  onDrop(event: CdkDragDrop<string[]>) {
    console.log("event drag drop", event)
    moveItemInArray(this.addressControls.controls, event.previousIndex, event.currentIndex);

  }

  checkbox_productDetails_Split: any;
  checkbox_productDetails_Split_Number: any;
  productDetails_Split_eventCheck(e: any) {
    this.checkbox_productDetails_Split = e.target.checked
    console.log(this.checkbox_productDetails_Split);
    this.checkbox_productDetails_Split_Number = Number(this.checkbox_productDetails_Split);
    console.log(" checkbox 1 or 0---:", this.checkbox_productDetails_Split_Number)
  }
  checkbox_productDetails_GPTotal: any;
  checkbox_productDetails_GPTotal_Number: any;
  productDetails_GPTotal_eventCheck(e: any) {
    this.checkbox_productDetails_GPTotal = e.target.checked
    console.log(this.checkbox_productDetails_GPTotal);
    this.checkbox_productDetails_GPTotal_Number = Number(this.checkbox_productDetails_GPTotal);
    console.log(" checkbox 1 or 0---:", this.checkbox_productDetails_GPTotal_Number)
  }
  checkbox_productDetails_selectTax: any;


  checkbox_GrantTotalShow: any;
  eventCheckGrantTotalShows(e: any) {
    this.checkbox_GrantTotalShow = e.target.checked
    console.log(this.checkbox_GrantTotalShow);
  }
  
  termsCondition_DontShow_eventCheck(e: any) {
    this.checkbox_termsCondition_DontShow = e.target.checked;
    console.log(this.checkbox_termsCondition_DontShow);
  }


  descriptionDetails_DontShow_eventCheck(e: any) {
    this.checkbox_descriptionDetails_DontShow = e.target.checked
    console.log(this.checkbox_descriptionDetails_DontShow);
  }
  checkbox_selectAdditionalSignature:any;
  eventCheckSelectAdditionalSignature(e:any){
    this.checkbox_selectAdditionalSignature = e.target.checked
    console.log(this.checkbox_selectAdditionalSignature );
  }
  radioCurrencyChange(event: any) {

    this.currencyNew_RadioValue = event.target.value;
    console.log("this.currencyNew_RadioValue", this.currencyNew_RadioValue)
    this.currencyQuotationTermChange();

  }
  handleChange(evt: any) {
    var radioSelectFooter = evt.target.value;
    this.radioSelectFooterChecked=evt.target.checked;
    console.log("event only",evt)
    console.log("evt.target",evt.target)
    console.log("evt.target.checked",evt.target.checked)
    console.log("evt.target.checked global variable",this.radioSelectFooterChecked)
    console.log(" evt.target.value radioSelectFooter",evt.target.value)

    console.log("radio button value", radioSelectFooter);
  }

  chk_grantTotal: any;
  chkGrandTotalEvent(event: any) {
    this.chk_grantTotal = event.target.checked;
    console.log(this.chk_grantTotal)
  }

  keywordCustomerName = 'customerName';

  selectEventCustomer(item: any) {
    console.log(item)
    // do something with selected item
  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }

  get addressControls() {
    return this.addQuotationInvoice_section2.get('addresses') as FormArray
  }


  addAddress(): void {
    this.addresses = this.addQuotationInvoice_section2.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());

    this.itre = this.itre + 1;
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  createAddress(): FormGroup {
    return this.fb.group({

      pd_productName_txtbox1: '',
      pd_productName_autocomplete: '',
      pd_productName_txtArea: '',
      pd_quantity_txtbox1: '',
      pd_unit: '',
      pd_sellingPrice: '',
      pd_Total: '',
      pd_netPrice: '',
      pd_split: '',
      pd_GPTotal: '',
      pd_selectTax: '',
      sub_dis_type: '',
      sub_dis_val: '',
      sub_dis_amt: '',


    });

  }

  dynamicChange(event: any) {
    this.billerID = event.target.value;
    console.log("billerID check", this.billerID);
    // this.TaxDropdown();
    let api_req: any = new Object();
    let api_dynamicDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_customercbo_quat_no";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_dynamicDropdown_req.action = "get_customercbo_quat_no";
    api_dynamicDropdown_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_dynamicDropdown_req.billerId = this.billerID;
    api_req.element_data = api_dynamicDropdown_req;
   
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.FooterDetails = response.footer_details;
      console.log("dynamic Dropdown change response", response)
      this.currencyOld_RadioValue = response.currency_id;
      this.dynamicTermsConditions_Currency=response.quotation_terms_cond;
      console.log("dynamic term condition change response", response.quotation_terms_cond)
      for (let index = 0; index < response.footer_details.length; index++) {
        this.billerIDUpdate = response.footer_details[index].billerId;
        if (response.status == true) {
          this.addQuotationInvoice_section1.patchValue({
            'quotationNumber': response.quotation_no,
            'selectFooter': response.footer_details[index].pdf_footer_id,
            'selectCurrency': response.currency_id,
            'termConditionContentChange': response.quotation_terms_cond,
            // 'DescriptionText': response.quotation_desp_det,
          });

          this.currencyNew_RadioValue = response.currency_id;         
          //this.currencyQuotationTermChange();


        }
        else {
          this.addQuotationInvoice_section1.patchValue({
            'quotationNumber': '',
            'selectFooter': '',
            'selectCurrency': '',
            'termConditionContentChange': '',
            // 'DescriptionText': '',

          });
        }
      }


    });
  }
  dynamicChange1() {
    console.log("billerID check", this.billerID);
    this.TaxDropdown();
    let api_req: any = new Object();
    let api_dynamicDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_customercbo_quat_no";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_dynamicDropdown_req.action = "get_customercbo_quat_no";
    api_dynamicDropdown_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_dynamicDropdown_req.billerId = this.billerID;
    api_req.element_data = api_dynamicDropdown_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.FooterDetails = response.footer_details;
      this.currencyOld_RadioValue = response.currency_id;
      this.dynamicTermsConditions_Currency=response.quotation_terms_cond;
      console.log("dynamic Dropdown change response", response)
      console.log("dynamic term condition change response", response.quotation_terms_cond)
      for (let index = 0; index < response.footer_details.length; index++) {
        this.billerIDUpdate = response.footer_details[index].billerId;
        if (response.status == true) {
          this.addQuotationInvoice_section1.patchValue({
            'quotationNumber': response.quotation_no,
            'selectFooter': response.footer_details[index].pdf_footer_id,
            'selectCurrency': response.currency_id,
            'termConditionContentChange': response.quotation_terms_cond,
            // 'DescriptionText': response.quotation_desp_det,
          });


        }
        else {
          this.addQuotationInvoice_section1.patchValue({
            'quotationNumber': '',
            'selectFooter': '',
            'selectCurrency': '',
            'termConditionContentChange': '',
            // 'DescriptionText': '',

          });
        }
      }


    });
  }
  addQuotation() {
   
    let api_req: any = new Object();
    let add_newQuotationNextPage_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/add_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_newQuotationNextPage_req.action = "add_quotation";
    add_newQuotationNextPage_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_req.element_data = add_newQuotationNextPage_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("add new quotation response", response);
      if (response != '') {

        this.salesRepDropDown_Textbox_Status = response.sales_rep_status.dropdown_status;

        this.SalesRepList = response.sales_rep;
        this.SalesResellerList = response.sales_reseller;
        this.SelectTemplateList = response.quotation_template;
        this.CurrencyList = response.currency;
        this.TermsConditionList = response.quotation_terms;
        this.PDFTemplateList = response.default_quotation_temp;
        this.billerList = response.biller_details;
        this.additionalSignatureList = response.additional_signature_list;
        this.LogoList = response.extra_bills;

        console.log("add new quotation response-customer name", this.PDFTemplateList);
        this.billerID = response.defaults_biller_id;

        if (this.billerID != '') {
          this.dynamicChange1();
        }
        this.addQuotationInvoice_section1.patchValue({
          'companyName': response.defaults_biller_id,
          'salesRep': sessionStorage.getItem('erp_c4c_user_id'),

        });

        if (response.sales_rep_status.dropdown_status == 0) {
          this.addQuotationInvoice_section1.patchValue({
            'salesRep_id': response.sales_rep.name,
            'salesRep': response.sales_rep.userid,
          });

        }
        this.tax_per_mod = response.percent_val;
        // alert(response.percent_val);
        this.addQuotationInvoice_section3.patchValue({
          'section3_gst_dropdown': response.default_tax_id,
        });
        this.quotationAddSignature();

      }
      else {

        iziToast.warning({
          message: "Quotation not updated. Please try again",
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

  templateContentDropdown(event: any) {
   
    this.quotation_template_id = event.target.value;
    console.log("quotation dropdown ID check", this.quotation_template_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_template_maincontent";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_template_maincontent";
    api_quotationTemplateDropdown_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_quotationTemplateDropdown_req.quotation_template_id = this.quotation_template_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)

      if (response.status == true) {
        this.addQuotationInvoice_section1.patchValue({

          // 'resellerMainContent_Dropdown': response.terms_condition_details,
          'templateContent_Dropdown': response.main_content,
          'DescriptionText': response.description_details,
        });

      }
      else {
        this.addQuotationInvoice_section1.patchValue({

          'templateContent_Dropdown': '',
          'DescriptionText': '',
        });
      }


    });
  }
  quotationAddSignature(){
    let api_req: any = new Object();
    let api_quotationAddSignature_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_add_signature";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationAddSignature_req.action = "quotation_add_signature";
    api_quotationAddSignature_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_quotationAddSignature_req.billerId = this.billerID ;
    api_req.element_data = api_quotationAddSignature_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-quotation_add_signature response", response)

      if (response.status == true) {
      
        this.quotationAddSignature_state=response.signature_state;
        this.checkbox_selectAdditionalSignature = true
        this.quotationAddSignature_filename=response.signature_filename;
      }
      else {
       
      }


    });


  }

  

  TermsConditionsContentDropdown(event: any) {
    this.terms_condition_id = event.target.value;
    console.log("template terms_condition ID check", this.terms_condition_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_quotation_terms_condition";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_quotation_terms_condition";
    api_quotationTemplateDropdown_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_quotationTemplateDropdown_req.terms_condition_id = this.terms_condition_id;
    api_req.element_data = api_quotationTemplateDropdown_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)

      if (response.status == true) {
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange': response.terms_condition_details,


        });

      }
      else {
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange': '',


        });
      }


    });
  }
  TaxDropdown() {

    let api_req: any = new Object();
    let api_TaxDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_tax_dropdown";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_TaxDropdown_req.action = "quot_tax_dropdown";
    api_TaxDropdown_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_TaxDropdown_req.billerId = this.billerID;
    api_req.element_data = api_TaxDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Tax Dropdown response", response)

      if (response.status == true) {
        this.TaxDropdownList = response.tax_list;
        this.tax_per_mod = response.percent_val;
        $('#tax_per_hd_id').val(response.percent_val);          
          setTimeout(()=>{this.settaxId(response.default_tax_id); },1000);
 
        this.totalCalculate()

      }



    });
  }


  settaxId(default_tax_id:any){
    this.addQuotationInvoice_section3.get('section3_gst_dropdown').setValue(default_tax_id);
  }
  
  currencyQuotationTermChange() {

    let api_req: any = new Object();
    let api_currencyQuotationTermChange: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/currency_change";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_currencyQuotationTermChange.action = "currency_change";

    api_currencyQuotationTermChange.terms_conditions = this.dynamicTermsConditions_Currency;
    api_currencyQuotationTermChange.oldcurrencyId = this.currencyOld_RadioValue;
    api_currencyQuotationTermChange.newcurrencyId = this.currencyNew_RadioValue;
    api_req.element_data = api_currencyQuotationTermChange;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation/currency_change", response)
      this.CurrencyChangeFieldValue = response.terms
      if (response.status == true) {
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange': response.terms,

        });

      }
      else {
        this.addQuotationInvoice_section1.patchValue({

          'termConditionContentChange': '',
        });
      }
    });

  }
  saveQuotationEnquiry($event: MouseEvent) {
    
    console.log("this.checkbox_termsCondition_DontShow",this.checkbox_termsCondition_DontShow);
    console.log("this.checkbox_descriptionDetails_DontShow",this.checkbox_descriptionDetails_DontShow);
    if(  this.radioSelectFooterChecked==true){
  
    console.log(this.addQuotationInvoice_section3.value.section3_gst_dropdown)
    console.log("this.addQuotationInvoice_section1.value.customerName",this.addQuotationInvoice_section1.value.customerName)
    // alert(this.addQuotationInvoice_section1.value.selectCurrency)
    console.log("this.addQuotationInvoice_section1.value.selectPDFTemplate", this.addQuotationInvoice_section1.value.selectPDFTemplate)
    let api_req: any = new Object();
    let api_saveEnquiry_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/insert_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_saveEnquiry_req.action = "insert_quotation";
    api_saveEnquiry_req.user_id = sessionStorage.getItem('erp_c4c_user_id');


    api_saveEnquiry_req.enquiry_from_id = this.FormID_enquiryFromDetails;
    api_saveEnquiry_req.enquiry_subject = this.subject_enquiryFromDetails;
    api_saveEnquiry_req.quotation_valid_day = this.validity_enquiryFromDetails;
    api_saveEnquiry_req.duplicate_version = this.version_enquiryFromDetails;

    api_saveEnquiry_req.billerId = this.addQuotationInvoice_section1.value.companyName;
    api_saveEnquiry_req.quotation_no = this.addQuotationInvoice_section1.value.quotationNumber;
    api_saveEnquiry_req.pdf_footer_id = this.addQuotationInvoice_section1.value.selectFooter;
    api_saveEnquiry_req.quotation_date = this.addQuotationInvoice_section1.value.quotationDate;
    if(this.addQuotationInvoice_section1.value.customerName===null){
     
      iziToast.warning({
        message: "Fill Customer Name",
        position: 'topRight'
      });
      return false;

    }
    if(this.addQuotationInvoice_section1.value.quotationDate===null){
     
      iziToast.warning({
        message: "Select Date",
        position: 'topRight'
      });
      return false;

    }

    api_saveEnquiry_req.customer_id = this.addQuotationInvoice_section1.value.customerName;
    api_saveEnquiry_req.customerAddress1 = this.addQuotationInvoice_section1.value.cust_address1;
    api_saveEnquiry_req.customerAddress2 = this.addQuotationInvoice_section1.value.cust_address2;
    api_saveEnquiry_req.customerAddress3 = this.addQuotationInvoice_section1.value.cust_address3;
    // api_saveEnquiry_req.quotation_no=Address3;
    api_saveEnquiry_req.kind_Attention = this.addQuotationInvoice_section1.value.attention;
    api_saveEnquiry_req.billGeneratedBy = this.addQuotationInvoice_section1.value.salesRep;
    api_saveEnquiry_req.reseller_id = this.addQuotationInvoice_section1.value.selectReseller;
    api_saveEnquiry_req.quotation_template_id = this.addQuotationInvoice_section1.value.selectTemplate;
    if(this.addQuotationInvoice_section1.value.selectTemplate===null){
     
      iziToast.warning({
        message: "Select Template",
        position: 'topRight'
      });
      return false;

    }
    api_saveEnquiry_req.main_content = this.addQuotationInvoice_section1.value.templateContent_Dropdown;
    api_saveEnquiry_req.currencyId = this.addQuotationInvoice_section1.value.selectCurrency;
    api_saveEnquiry_req.bills_logo_id = this.addQuotationInvoice_section1.value.extraLogo;

    api_saveEnquiry_req.default_quotation_pdf_temp = this.addQuotationInvoice_section1.value.selectPDFTemplate;
    if(this.addQuotationInvoice_section1.value.selectPDFTemplate===null){
     
      iziToast.warning({
        message: "Choose PDF Template",
        position: 'topRight'
      });
      return false;

    }
    if(this.addQuotationInvoice_section1.value.selectTermsConditions===null){
     
      iziToast.warning({
        message: "Choose Terms and Conditions",
        position: 'topRight'
      });
      return false;

    }
    api_saveEnquiry_req.terms_condition_id = this.addQuotationInvoice_section1.value.selectTermsConditions;
    api_saveEnquiry_req.terms_conditions_show_state = this.checkbox_termsCondition_DontShow;
    api_saveEnquiry_req.terms_conditions = this.addQuotationInvoice_section1.value.termConditionContentChange;
    api_saveEnquiry_req.description_details = this.addQuotationInvoice_section1.value.DescriptionText;
    api_saveEnquiry_req.description_details_show_state = this.checkbox_descriptionDetails_DontShow;



    //section-3

    //row-1
    api_saveEnquiry_req.total_display_status = this.addQuotationInvoice_section3.value.section3_grant_total_show;
    api_saveEnquiry_req.gross_total = this.addQuotationInvoice_section3.value.section3_gross_total;
    //row-2
    api_saveEnquiry_req.discount_amt_tot = this.addQuotationInvoice_section3.value.section3_discount_txtbox;
    api_saveEnquiry_req.final_dis_type = this.addQuotationInvoice_section3.value.final_dis_type;
    api_saveEnquiry_req.final_dis_val = this.addQuotationInvoice_section3.value.final_dis_val;
    //row-3
    api_saveEnquiry_req.taxId = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
    api_saveEnquiry_req.taxPer = this.addQuotationInvoice_section3.value.section3_tax_per_hd;
    api_saveEnquiry_req.taxAmt = this.addQuotationInvoice_section3.value.section3_taxAmt_txtbox;
    //row-4
    api_saveEnquiry_req.shipping_amt_name = this.addQuotationInvoice_section3.value.section3_shipping_amt_name_txtbox;
    api_saveEnquiry_req.shipping_amt = this.addQuotationInvoice_section3.value.section3_shipping_amt_txtbox;
    //row-5
    api_saveEnquiry_req.grand_total = this.addQuotationInvoice_section3.value.section3_grand_total;
    //row-6
    api_saveEnquiry_req.remarks = this.addQuotationInvoice_section3.value.section3_remarks;
    //row-7
    api_saveEnquiry_req.additional_signature_id = this.addQuotationInvoice_section3.value.section3_signature_dropdown;
    //row-8
    api_saveEnquiry_req.template_name = this.addQuotationInvoice_section3.value.section3_templateName;
    //row-9-signature
    
    api_saveEnquiry_req.signatureId = this.addQuotationInvoice_section3.value.section3_select_additional_signature;

    api_req.element_data = api_saveEnquiry_req;

    //section-2
    var addr = this.addQuotationInvoice_section2.value.addresses;
   

    for (let i = 0; i < addr.length; i++) {

      if($('#pd_productName_txtbox_' + i).val()==''){
        iziToast.warning({
          message: "Select Minimum 1 Product Details",
          position: 'topRight'
        });
        return false;
        
      }
     
      console.log(addr[i].pd_quantity_txtbox1)
      addr[i].pd_productName_txtbox1 = $('#pd_productName_txtbox_' + i).val();
      addr[i].pd_productName_txtArea = $('#pd_productName_txtArea_' + i).val();
      addr[i].pd_quantity_txtbox1 = $('#pd_qty_' + i).val();
      addr[i].pd_sellingPrice = $('#pd_SP_' + i).val();
      addr[i].pd_netPrice = $('#pd_netPrice_' + i).val();
      addr[i].pd_Total = $('#pd_Total_' + i).val();
      addr[i].sub_dis_type = $('#sub_discount_type_' + i).val();
      addr[i].sub_dis_val = $('#sub_discount_val_' + i).val();
      addr[i].sub_discount = $('#sub_discount_' + i).val();
     
    }

    
    api_saveEnquiry_req.values = addr;
    console.log(api_req);


    ($event.target as HTMLButtonElement).disabled = true;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      
      ($event.target as HTMLButtonElement).disabled = false;

      console.log("add quotation new save", response);
      if (response.status == true) {

        iziToast.success({
          title: 'Saved',
          message: 'Quotation Saved Successfully !',
        });
        this.redirecttoQuotation();
        this.addQuotationInvoice_section1.reset();
        this.addQuotationInvoice_section2.reset();
        this.addQuotationInvoice_section3.reset();

      }
      else {

        iziToast.warning({
          message: "Quotation Not Saved Successfully",
          position: 'topRight'
        });

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  else{
    
    iziToast.warning({
    message: "Select Footer",
    position: 'topRight'
  });

  }
}

  searchCustomer_selectDropdownData(data: any) {

    console.log("search data in dropdown", data)
    console.log("search data-customer Id", data.customerId)
    this.customerName_Data = data.customerId;
    let api_req: any = new Object();
    let api_SearchCUST_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_customer_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchCUST_req.action = "quot_customer_details";
    api_SearchCUST_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_SearchCUST_req.customerId = this.customerName_Data
    api_req.element_data = api_SearchCUST_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      if (response.status == true) {

        this.addQuotationInvoice_section1.patchValue({


          'cust_address1': response.customer_list.customerAddress1,
          'cust_address2': response.customer_list.customerAddress2,
          'cust_address3': response.customer_list.customerAddress3,
          'cust_city': response.customer_list.city,
          'cust_state': response.customer_list.state,
          'cust_zipcode': response.customer_list.zipCode,
          'attention': response.customer_list.kind_Attention,

        });
      }
      else {
        this.addQuotationInvoice_section1.patchValue({


          'cust_address1': '',
          'cust_address2': '',
          'cust_address3': '',
          'cust_city': '',
          'cust_state': '',
          'cust_zipcode': '',
          'attention': '',
        });
      }

    });
  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quot_customer_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "quot_customer_name";
    api_Search_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_Search_req.billerId = this.billerIDUpdate;
    api_Search_req.key_word = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_name response", response);
      this.searchResult = response.customer_list;

      if (response.status = true) {

      }

    });

  }
  searchCustomerDataMouse(data: any) {
    console.log("search data afer mouse click", data)
  }

  searchProductName(data: any) {

    let api_req: any = new Object();
    let api_SearchProd_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/product_name_auto";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchProd_req.action = "product_name_auto";
    api_SearchProd_req.user_id = sessionStorage.getItem('erp_c4c_user_id');

    api_SearchProd_req.part_no = data;
    api_req.element_data = api_SearchProd_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation/product_name_auto response", response);
      this.searchResult_productName = response.products_list;
      console.log("response.partNo", response.products_list)
      // console.log("response.partNo",response.partNo)

      if (response.status == true) {
        // this.productNameAutoFill();

      }

    });

  }
  productNameAutoFill(i: any) {

    let api_req: any = new Object();
    let api_ProdAutoFill_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/product_name_auto_fill";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_ProdAutoFill_req.action = "product_name_auto_fill";
    api_ProdAutoFill_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_ProdAutoFill_req.product_name = this.product_name_AutoComplete;
    api_req.element_data = api_ProdAutoFill_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response", response)
      console.log("response.length", response.length)
      console.log("partNo by auto fill", response[0].partNo);
      console.log("productName by auto fill", response[0].productName);
      console.log("productDesc by auto fill", response[0].productDesc);
      console.log("rate by auto fill", response[0].rate);
      console.log("this.addressControls.length", this.addressControls.length)

      $('#pd_productName_txtbox_' + i).val(response[0].productName)
      $('#pd_productName_txtArea_' + i).val(response[0].productDesc)
      $('#pd_SP_' + i).val(response[0].rate)
      //   this.fb.group({pd_sellingPrice:response[0].rate});

    });
  }

  clearAddress() {
    var t = this.addQuotationInvoice_section2.value;
    console.log(t)
  }

  totalCalculate() {

    // var grs_amt=0;
    // var net_amt =0;
    var tax_amt = 0;
    var tax_amt_tot = 0;
    var grs_amt = 0;
    var sub_total_amt = 0;

    let discount_type: any;
    var total_amt: any;
    var dis_amt_val: any;

    var total_amt: any;
    var addr = this.addQuotationInvoice_section2.value.addresses;
    var list_cnt = addr.length;
    //  alert(list_cnt);
    // var tax_per = $('#tax_per_hd_id').val();
    //var tax_per = $('#tax_per_hd_id').val();
    this.finalDiscount = $('#finalDiscount_amt').val();
    this.shipping_amt = $('#shipping_amt_id').val();
    this.finalTax = 0;
    // alert(tax_per);
    for (let a = 0; a < list_cnt; a++) {

      total_amt = $('#pd_qty_' + a).val() * $('#pd_SP_' + a).val();
      $('#pd_Total_' + a).val(total_amt);


      discount_type = $('#sub_discount_type_' + a).val();
      console.log('discount_type' + discount_type);
      if (discount_type == 'per') {
        this.sub_dis_val = $('#sub_discount_val_' + a).val();
        console.log('discount_type1111' + this.sub_dis_val);
        dis_amt_val = (parseFloat(this.sub_dis_val) * parseFloat(total_amt) / 100).toFixed(2);
        console.log('dis_amt_val' + dis_amt_val);
        sub_total_amt = parseFloat(total_amt) - parseFloat(dis_amt_val)
        $('#pd_netPrice_' + a).val(sub_total_amt);
        $('#sub_discount_' + a).val(dis_amt_val);
      } else if (discount_type == 'amt') {
        // console.log('discount_type222'+discount_type);

        this.sub_dis_val = $('#sub_discount_val_' + a).val();
        // console.log('sub_discount_valppp'+this.sub_dis_val);
        sub_total_amt = parseFloat(total_amt) - parseFloat(this.sub_dis_val);
        $('#pd_netPrice_' + a).val(sub_total_amt);
      } else {
        $('#pd_netPrice_' + a).val(total_amt);
        sub_total_amt = total_amt;
      }

      if ($('#pd_selectTax_' + a).prop('checked') == true && this.tax_per_mod!=null)  {
        this.net_amt = $('#pd_netPrice_' + a).val();

        tax_amt = (parseFloat(this.tax_per_mod) * parseFloat(this.net_amt) / 100);
        tax_amt_tot += tax_amt;

      }


      // sub_total_amt = total_amt - $('#sub_discount_' + a).val();
      // $('#pd_netPrice_' + a).val(sub_total_amt);
      //  alert('total_amt'+total_amt);
      grs_amt += sub_total_amt;


    
      //  alert('Net_Amt'+tax_amt_tot+'---'+this.net_amt);
      //   alert(grs_amt);
    }
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
    //console.log('tax_per'+this.tax_per_mod+'grossTotal'+this.grossTotal+'this.finalTax'+this.finalTax+'shipping_amt'+this.shipping_amt+'finalDiscount'+this.finalDiscount);
    this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(this.finalTax) + parseFloat(this.shipping_amt)) - parseFloat(this.finalDiscount)).toFixed(2);
  }

  keyPress(event: any, i: any) {

    this.quotationPriceKey = i;
    this.row_cnt_mod = i;
    var key = event.target.value;
    var addr = this.addQuotationInvoice_section2.value.addresses;


    var v = addr[i].pd_quantity_txtbox1 * $('#pd_SP_' + i);
    $('#pd_Total_' + i).val(v);
    $('#pd_netPrice_' + i).val(v);
    var gtotel = 0;
    if (this.itre == 0) {
      gtotel = v;
    } else {
      for (let k = 0; k <= this.itre; k++) {
        if ($('#pd_netPrice_' + k).val() > 0) {
          gtotel += parseFloat($('#pd_netPrice_' + k).val());
        }

      }
    }
    for (let j = 0; j <= this.itre; j++) {
      // const formArray = new FormArray([]);
      console.log($('#pd_Total_' + j).val())
      console.log($('#pd_netPrice_' + j).val())
      // formArray.push(this.fb.group({
      //   "pd_Total": $('#pd_Total_' + j).val(),
      //   "pd_netPrice":$('#pd_netPrice_' + j).val(),
      // })
      // );
      // this.addQuotationInvoice_section2.setControl('addresses', formArray);
    }

    this.grossTotal = gtotel;
    this.grandTotal = gtotel;
    if (this.finalDiscount > 0) {
      this.grandTotal = gtotel - this.finalDiscount;
    }
    if (this.finalTax > 0) {
      var tax = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
      tax = (parseFloat(tax) * parseFloat(this.grossTotal) / 100).toFixed(2);
      if (this.grandTotal > 0) {
        this.grandTotal = this.grandTotal + parseFloat(tax);
      }
      this.finalTax = parseFloat(tax);
    }
  }
  saveDiscount() {
    var enablePercentabeDiscont = $('#enablePercentabeDiscont').val()
    var enablePriceDiscont = $('#enablePriceDiscont').val()
    var disType = $('input:radio[name=discountTYpe]:checked').val();
    var final_tot = $('#pd_Total_' + this.quotationPriceKey).val();
    $('#sub_discount_type_' + this.quotationPriceKey).val(disType);
    var price: any;
    if (disType == 'per') {
      // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'--'+final_tot);
      if (enablePercentabeDiscont != '') {
        //   console.log('3333'+final_tot);
        price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);


        $('#sub_discount_' + this.quotationPriceKey).val(price);
        $('#sub_discount_val_' + this.quotationPriceKey).val(enablePercentabeDiscont);
        price = final_tot - price;
      } else {
        $('#sub_discount_' + this.quotationPriceKey).val('');
        $('#sub_discount_val_' + this.quotationPriceKey).val('');
        //   console.log('222'+final_tot);
        price = final_tot;

      }
      //   console.log(price);

    } else {
      price = final_tot - enablePriceDiscont;
      $('#sub_discount_' + this.quotationPriceKey).val(enablePriceDiscont);
      $('#sub_discount_val_' + this.quotationPriceKey).val(enablePriceDiscont);

      // console.log(price);
    }
    $('#pd_netPrice_' + this.quotationPriceKey).val(price)

    var gtotel = 0;
    if (this.itre == 0) {
      gtotel = price;
    } else {
      for (let k = 0; k <= this.itre; k++) {
        gtotel += parseFloat($('#pd_netPrice_' + k).val());
      }
    }
    this.grossTotal = gtotel;
    if (this.grandTotal > 0) {
      this.grandTotal = this.grossTotal;
    }
    if (this.finalTax > 0) {
      this.grandTotal = this.grandTotal + this.finalTax;
    }
    if (this.finalDiscount > 0) {
      this.grandTotal = this.grandTotal - this.finalDiscount;
    }
    if (this.extraCharge > 0) {
      this.grandTotal = this.grandTotal + this.extraCharge;
    }
    $('#discountFormId').modal('hide');
    this.DiscountForm.reset();
    this.totalCalculate();

  }
  calculateDiscount(val: any) {
    this.quotationPriceKey = val;
    this.row_cnt_mod = val;
    var row_cnt = val;
    var sub_dis_val = 0;
    // var sub_dis_amt_val =0;
    console.log('row_cnt' + row_cnt);
    $('#enablePercentabeDiscont').val('');
    $('#enablePriceDiscont').val('');
    // $('input:radio[name=discountTYpe]').prop('checked', true).val('per');
    var disType = $('#sub_discount_type_' + row_cnt).val();

    if (disType == 'per') {
      $('#discountTYpe_per').prop('checked', true);
      sub_dis_val = $('#sub_discount_val_' + row_cnt).val();

      $('#enablePercentabeDiscont').val(sub_dis_val);
      //   console.log('22'+disType);
    } else if (disType == 'amt') {
      $('#discountTYpe_amt').prop('checked', true);
      sub_dis_val = $('#sub_discount_val_' + row_cnt).val();
      $('#enablePriceDiscont').val(sub_dis_val);
      //  console.log('33'+disType);
    } else {
      //  console.log('44'+disType);
      $('#discountTYpe_per').prop('checked', false);
      $('#discountTYpe_amt').prop('checked', false);
    }
  }
  saveGrossDiscount() {
    var enablePercentabeDiscont = $('#enablePerFinal').val()
    var enablePriceDiscont = $('#enablePriceFinal').val()
    var tax_amt = $('#tax_amt_id').val()
    var disType = $('input:radio[name=finaldiscountTYpe]:checked').val();
    var final_tot = this.grossTotal;
    var price: any;
    // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'disType'+disType+'--'+final_tot);
    $('#final_discount_type').val(disType);
    this.finalDiscountType = disType;

    if (disType == 'per') {
      // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'--'+final_tot);
      if (enablePercentabeDiscont != '') {
        //  console.log('3333'+final_tot);
        price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);
        $('#final_discount').val(price);
        $('#final_discount_val').val(enablePercentabeDiscont);
        this.finalDiscountVal = enablePercentabeDiscont;
        //     price = final_tot - price;
      } else {
        $('#final_discount').val('');
        $('#final_discount_val').val('');
        this.finalDiscountVal = '';
        //   console.log('222'+final_tot);
        price = 0;

      }
      //   console.log(price);
    } else {
      if (enablePriceDiscont == '') {
        enablePriceDiscont = 0;
      }
      price = enablePriceDiscont;
      $('#final_discount').val(enablePriceDiscont);
      $('#final_discount_val').val(enablePriceDiscont);
      this.finalDiscountVal = enablePercentabeDiscont;
      console.log('999' + price);
    }

    if (this.grandTotal > 0) {
      this.grandTotal = ((parseFloat(this.grossTotal) + parseFloat(tax_amt)) - parseFloat(price)).toFixed(2);
    }
    this.finalDiscount = price
    $('#discountFormFinal').modal('hide');
  }
  calFinalDiscount() {
    $('#enablePerFinal').val('');
    $('#enablePriceFinal').val('');
    var final_dis_val = 0;
    var disType = $('#final_discount_type').val();
    console.log('111' + disType);
    if (disType == 'per') {
      $('#finaldiscountTYpe_per').prop('checked', true);
      final_dis_val = $('#final_discount_val').val();

      $('#enablePerFinal').val(final_dis_val);
      console.log('22' + disType);
    } else if (disType == 'amt') {
      $('#finaldiscountTYpe_amt').prop('checked', true);
      final_dis_val = $('#final_discount_val').val();
      $('#enablePriceFinal').val(final_dis_val);
      console.log('33' + disType);
    } else {
      console.log('44' + disType);
      $('#finaldiscountTYpe_per').prop('checked', false);
      $('#finaldiscountTYpe_amt').prop('checked', false);
    }


  }
  getTaxCals() {
    var tax_id = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
    var tax: any;
    let api_req: any = new Object();
    let api_data_req: any = new Object();
    this.finalDiscount = $('#finalDiscount_amt').val();
    this.finalTax = $('#finalDiscount_amt').val();

    this.extraCharge = 0;
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

      tax = response.percent_val;
      tax = (parseFloat(tax) * parseFloat(this.grossTotal) / 100).toFixed(2);

      this.finalTax = parseFloat(tax);
      // if (this.grossTotal > 0) {
      //   this.grandTotal = (this.grossTotal + this.finalTax + this.finalDiscount + this.extraCharge).toFixed(2);
      // }
      this.finalTax = parseFloat(tax).toFixed(2);

    });

    // this.totalCalculate();
    setTimeout(() => {
      this.totalCalculate();
    }, 1000)
    // setTimeout(this.totalCalculate(),1000);

  }
  extraFees() {
    var fee = this.addQuotationInvoice_section3.value.section3_shipping_amt_txtbox;
    // this.grandTotal = this.grandTotal + parseFloat(fee);
    this.extraCharge = parseFloat(fee);
    this.totalCalculate();
  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);
    var addr = this.addQuotationInvoice_section2.value.addresses;
    var list_cnt = addr.length;

    this.totalCalculate();

  }

  set_display_none(cnt:any){
      if($('#pd_split_'+cnt).prop('checked')==true) {
        $('#pd_productName_txtArea_'+cnt).fadeOut(1000);
        $('#pd_qty_'+cnt).fadeOut(1000);
        $('#pd_unit_'+cnt).fadeOut(1000);
        $('#pd_SP_'+cnt).fadeOut(1000);
        $('#discount_btn_'+cnt).fadeOut(1000);
        $('#pd_Total_'+cnt).fadeOut(1000);
        $('#sub_discount_'+cnt).fadeOut(1000);
        $('#pd_netPrice_'+cnt).fadeOut(1000);

        $('#pd_productName_txtArea_'+cnt).val('');
        $('#pd_qty_'+cnt).val('');
        $('#pd_unit_'+cnt).val('');
        $('#pd_SP_'+cnt).val('');
        $('#discount_btn_'+cnt).val('');
        $('#pd_Total_'+cnt).val('');
        $('#sub_discount_'+cnt).val('');
        $('#pd_netPrice_'+cnt).val('');


      }else{
        $('#pd_productName_txtArea_'+cnt).fadeIn(1000);
        $('#pd_qty_'+cnt).fadeIn(1000);
        $('#pd_unit_'+cnt).fadeIn(1000);
        $('#pd_SP_'+cnt).fadeIn(1000);
        $('#discount_btn_'+cnt).fadeIn(1000);
        $('#pd_Total_'+cnt).fadeIn(1000);
        $('#sub_discount_'+cnt).fadeIn(1000);
        $('#pd_netPrice_'+cnt).fadeIn(1000);
      }
  }


  redirecttoQuotation() {

    this.router.navigate(['/quotationnew']);
  }
}
