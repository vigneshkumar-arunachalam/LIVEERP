import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';


declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-editquotationnew',
  templateUrl: './editquotationnew.component.html',
  styleUrls: ['./editquotationnew.component.css']
})
export class EditquotationnewComponent implements OnInit {
  public editQuotationInvoice_section1: FormGroup;
  public addQuotationInvoice_section2: FormGroup;
  public addQuotationInvoice_section3: FormGroup;
  public DiscountForm: FormGroup;

  public addresses: FormArray;
  editQuotationID: any;
  SalesRepList: any;
  salesRepDropDown_Textbox_Status: any;
  SalesResellerList: any;
  SelectTemplateList: any;
  CurrencyList: any;
  TermsConditionList: any;
  PDFTemplateList: any;
  additionalSignatureList: any;
  quotation_template_id: any;
  terms_condition_id: any;
  billerID: any;
  FooterDetails: any;
  TaxDropdownList: any;
  billerIDUpdate: any;
  ExtraLogoList: any;
  sub_dis_type:any;
  sub_dis_val:any;
  selected_pdf_footer:any;
  descriptionDetails_DontShow:boolean=true;
  grantTotalShow:boolean=true;
  radioSelectFooterChecked:boolean=false;
  checkbox_descriptionDetails_DontShow:boolean=true;
  checkbox_termsCondition_DontShow:boolean=false;
  sign_state:any;
  searchResult: any;
  customerName_Data: any;
  billerList: any;
  testVariable: any;
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

  selectedTax = true;
  test: boolean[] = [];
  addrNetPrices: boolean[] = [];
  isReadOnly: boolean = true;

  //auto-complete customer name
  autocomplete_CustomerID: any;
  autocomplete_CustomerName: any;
  //auto-complete product details
  searchResult_productName: any;
  product_name_AutoComplete: any;
//radio button dynamic change
currencyOld_RadioValue: any;
currencyNew_RadioValue: any;
CurrencyChangeFieldValue:any;
dynamicTermsConditions_Currency:any;

  //enquiry from details pop up
  FormID_enquiryFromDetails: any;
  subject_enquiryFromDetails: any;
  validity_enquiryFromDetails: any;
  version_enquiryFromDetails: any;
  tax_amt_tot: number;
  grs_amt: number;
  //quotation add signature for edit
quotationAddSignature_state:any;
quotationAddSignature_filename:any;
quotationAddSignatureCHKShowState:any;
selectAdditionalSign:boolean=true;
selectAdditionalSignUnchecked:boolean=false;
//check box in form array
groupSelectCommonId: any;
checkbox_value: any;
edit_array: any = [];
datavalue:any;

  constructor(private serverService: ServerService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.addQuotationInvoice_section2 = this.fb.group({
      addresses: this.fb.array([this.EditAddress_FormControl()])
    });

  }
  keywordpd_productName_autocomplete = 'partNo';
  ngOnInit(): void {
    // this.editQuotation();
   // this.TaxDropdown();
    this.ExtraLogoList = ["IT Care", "Calncall", "DID Sg", "Callcloud", "Mrvoip"];
    this.route.queryParams
      .subscribe(params => {
        console.log("params output value", params);

        this.editQuotationID = params['e_quotID'];
        this.FormID_enquiryFromDetails = params['e_formID'];
        this.subject_enquiryFromDetails = params['e_subject'];
        this.validity_enquiryFromDetails = params['e_validity'];
        this.version_enquiryFromDetails = params['e_version'];

        console.log("quotationId for edit", this.editQuotationID);
        console.log("formid", this.FormID_enquiryFromDetails);
        console.log("subject", this.subject_enquiryFromDetails);
        console.log("validity", this.validity_enquiryFromDetails);
        console.log("version", this.version_enquiryFromDetails);

        console.log(this.editQuotationID);
        console.log(this.FormID_enquiryFromDetails);
        console.log(this.subject_enquiryFromDetails);
        console.log(this.validity_enquiryFromDetails);
        console.log(this.version_enquiryFromDetails);
        this.testVariable = this.editQuotationID;
        this.editQuotation();
        this.totalCalculate();
      }
      );
    this.editQuotationInvoice_section1 = new FormGroup({
      'e_companyName': new FormControl(null),
      'e_quotationNumber': new FormControl(null),
      'e_selectFooter':new FormControl(null, [Validators.required]),
      'e_quotationDate': new FormControl(null),
      'e_customer_id': new FormControl(null),
      'e_customerName': new FormControl(null, [Validators.required]),

      'e_cust_address1': new FormControl(null),
      'e_cust_address2': new FormControl(null),
      'e_cust_address3': new FormControl(null),
      'e_zipcode': new FormControl(null),
      'e_attention': new FormControl(null),
      'e_salesRep': new FormControl(null),
      'salesRep_id': new FormControl(null),

      'e_selectTemplate':  new FormControl(null, [Validators.required]),
      'e_selectReseller': new FormControl(null),
      'e_selectCurrency': new FormControl(null),
      'e_extraLogo': new FormControl(null),
      'e_selectPDFTemplate':  new FormControl(null, [Validators.required]),
      'e_selectTermsConditions': new FormControl(null, [Validators.required]),
      'e_termsCondition_DontShow': new FormControl(null),
      'e_DescriptionText': new FormControl(null),
      'e_descriptionDetails_DontShow': new FormControl(null),
      'e_termConditionContentChange': new FormControl(null),
      'e_templateContent_Dropdown': new FormControl(null),

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
  onDrop(event: CdkDragDrop<string[]>) {
    console.log("event drag drop", event)
    moveItemInArray(this.addressControls.controls, event.previousIndex, event.currentIndex);
    console.log(this.addressControls.controls, event.previousIndex, event.currentIndex)

  }
  
  termsCondition_DontShow_eventCheck(e: any) {
    this.checkbox_termsCondition_DontShow = e.target.checked;
    console.log(this.checkbox_termsCondition_DontShow);
  }

  descriptionDetails_DontShow_eventCheck(e: any) {
    this.checkbox_descriptionDetails_DontShow = e.target.checked
    console.log(this.checkbox_descriptionDetails_DontShow);
  }
  checkbox_productDetails_Split: any;
  productDetails_Split_eventCheck(e: any) {
    this.checkbox_productDetails_Split = e.target.checked
    console.log(this.checkbox_productDetails_Split);
  }
  checkbox_productDetails_GPTotal: any;
  productDetails_GPTotal_eventCheck(e: any) {
    this.checkbox_productDetails_GPTotal = e.target.checked
    console.log(this.checkbox_productDetails_GPTotal);
  }
  checkbox_productDetails_selectTax: any;
  checkbox_GrantTotalShow: any;
  eventCheckGrantTotalShows(e: any) {
    this.checkbox_GrantTotalShow = e.target.checked
    console.log(this.checkbox_GrantTotalShow);
  }
  checkbox_selectAdditionalSignature:any;
  eventCheckSelectAdditionalSignature(e:any){
    if(this.quotationAddSignature_state==1){
      if(e.target.checked==true){
        $('#signature_img_id').css("display","block");
      }else{
        $('#signature_img_id').css("display","none");
      }
    }else{
      $('#signature_message_id').css("display","block");
    }
    this.checkbox_selectAdditionalSignature = e.target.checked
    console.log(this.checkbox_selectAdditionalSignature );
  }

  radioCurrencyChange(event: any) {

    this.currencyNew_RadioValue = event.target.value;
    console.log("this.currencyNew_RadioValue", this.currencyNew_RadioValue)
    this.currencyQuotationTermChange();

  }
  handleChange(evt: any) {
    this.selectFooter("any");
    var radioSelectFooter = evt.target.value;
    this.radioSelectFooterChecked=evt.target.checked;
    console.log("evt.target.checked global variable",this.radioSelectFooterChecked)
    console.log("radio button value", radioSelectFooter);
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

  editAddress(): void {

    this.addresses = this.addQuotationInvoice_section2.get('addresses') as FormArray;
    this.addresses.push(this.EditAddress_FormControl());

    this.itre = this.itre + 1;
    console.log(this.addresses)
    console.log(this.itre)
    this.addressControls.controls.forEach((elt, index) => {
      this.test[index] = true;
      console.log(this.test[index])
    });
  }
  
  EditAddress_FormControl(): FormGroup {
    return this.fb.group({
      
      pd_productName_txtbox1: '',
      pd_productName_autocomplete: '',
      pd_productName_txtArea: '',
      pd_quantity_txtbox1: '',
      pd_quotationChildId: '',
      pd_unit: '',
      pd_sellingPrice: '',
      pd_Total: '',
      pd_netPrice: '',
      pd_split: '',
      pd_GPTotal: '',
      pd_selectTax: '',
      to_next_page: '',
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
		         api_dynamicDropdown_req.user_id = this.editQuotationInvoice_section1.value.e_salesRep;
			     api_dynamicDropdown_req.billerId = this.billerID;
			         api_req.element_data = api_dynamicDropdown_req;
				   this.serverService.sendServer(api_req).subscribe((response: any) => {
		//		   this.FooterDetails = response.footer_details;
				   console.log("dynamic Dropdown change response", response)
				   
				   console.log("dynamic term condition change response", response.quotation_terms_cond)
				        
					 for (let index = 0; index < response.footer_details.length; index++) {
					  this.billerIDUpdate = response.footer_details[index].billerId;
        if (response.status == true) {
          this.editQuotationInvoice_section1.patchValue({
            'e_quotationNumber': response.quotation_no,
   //         'e_selectFooter': response.footer_details[index].pdf_footer_id,
            'e_selectCurrency': response.currency_id,
            'e_termConditionContentChange': response.quotation_terms_cond,
            // 'e_DescriptionText': response.quotation_desp_det,
          });


        }
        else {
          this.editQuotationInvoice_section1.patchValue({
            'e_quotationNumber': '',
     //       'e_selectFooter': '',
            'e_selectCurrency': '',
            'e_termConditionContentChange': '',
            // 'e_DescriptionText': '',

          });
        }
      }


    });
  }
  dynamicChange_edit(val: any) {
    this.billerID = val;
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
      console.log("dynamic Dropdown change response", response)
      console.log("dynamic term condition change response", response.quotation_terms_cond)
     // this.FooterDetails = response.footer_details;
      this.currencyOld_RadioValue = response.currency_id;
      this.dynamicTermsConditions_Currency=response.quotation_terms_cond;
      for (let index = 0; index < response.footer_details.length; index++) {
        this.billerIDUpdate = response.footer_details[index].billerId;
        if (response.status == true) {
          this.editQuotationInvoice_section1.patchValue({
            // 'e_quotationNumber': response.quotation_no,
            'e_selectFooter': this.selected_pdf_footer,
            'e_selectCurrency': response.currency_id,
            'e_termConditionContentChange': response.quotation_terms_cond,
            // 'e_DescriptionText': response.quotation_desp_det,
          });


        }
        else {
          this.editQuotationInvoice_section1.patchValue({
            'e_quotationNumber': '',
      //      'e_selectFooter': '',
            'e_selectCurrency': '',
            'e_termConditionContentChange': '',
            // 'e_DescriptionText': '',

          });
        }
      }
    
    setTimeout(() => {
      this.selectFooter(this.selected_pdf_footer);
    }, 1000)

    });
  }
  selectFooter(selval:any){
     $('#footer_'+selval).prop('checked', true);
  }
  editQuotation() {
    
    // window.location.reload();
    console.log("quotation id check for edit", this.editQuotationID)
   
    let api_req: any = new Object();
    let edit_Quotation_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/edit_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_Quotation_req.action = "edit_quotation";
    edit_Quotation_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    edit_Quotation_req.quotation_id = this.editQuotationID;
    api_req.element_data = edit_Quotation_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("edit quotation response", response);
      if (response != '') {
        this.dynamicChange_edit(response.quotation_details[0].billerId);
        this.salesRepDropDown_Textbox_Status = response.sales_rep_status.dropdown_status;
      //  console.log("test dynamic change", this.dynamicChange_edit(response.quotation_details[0].billerId))
        this.SalesRepList = response.sales_rep;
        this.SalesResellerList = response.sales_reseller;
        this.SelectTemplateList = response.quotation_template;
        this.CurrencyList = response.currency;
        this.TermsConditionList = response.quotation_terms;
        this.PDFTemplateList = response.default_quotation_temp;
        this.ExtraLogoList = response.extra_bills;
        this.billerList = response.bill_details;
        this.additionalSignatureList = response.additional_signature_list;

        if (response.sales_rep_status.dropdown_status == 0) {
          console.log("response.sales_rep.name", response.sales_rep.name);

          this.editQuotationInvoice_section1.patchValue({
            'salesRep_id': response.sales_rep.name,
            'e_salesRep': response.sales_rep.userid,
          });

        }

        this.editQuotationInvoice_section1.patchValue({

          'e_companyName': response.quotation_details[0].billerId,
          'e_quotationNumber': response.quotation_details[0].quotation_no,
   //       'e_selectFooter': response.quotation_details[0].pdf_footer_id,
          'e_quotationDate': response.quotation_details[0].quotation_date,
          'e_customer_id': response.quotation_details[0].customer_id,
          'e_customerName': response.quotation_details[0].customerName,
          'e_cust_address1': response.quotation_details[0].customerAddress1,
          'e_cust_address2': response.quotation_details[0].customerAddress2,
          'e_cust_address3': response.quotation_details[0].customerAddress3,
          'e_attention': response.quotation_details[0].kind_Attention,
          'e_salesRep': response.quotation_details[0].billGeneratedBy,
          'e_selectTemplate': response.quotation_details[0].quotation_template_id,
          'e_selectReseller': response.quotation_details[0].reseller_id,
          'e_selectCurrency': response.quotation_details[0].currencyId,
          'e_extraLogo': response.quotation_details[0].bills_logo_id,
          'e_selectPDFTemplate': response.quotation_details[0].default_quotation_pdf_temp,

          'e_selectTermsConditions': response.quotation_details[0].terms_condition_id,
          'e_termsCondition_DontShow': response.quotation_details[0].terms_conditions_show_state,
          'e_DescriptionText': response.quotation_details[0].description_details,
          'e_descriptionDetails_DontShow': response.quotation_details[0].description_details_show_state,
          'e_termConditionContentChange': response.quotation_details[0].terms_conditions,
          'e_templateContent_Dropdown': response.quotation_details[0].main_content,


        });
        
        //$('#test_'+response.quotation_details[0].pdf_footer_id).prop('checked', true);
       this.selected_pdf_footer = response.quotation_details[0].pdf_footer_id;
        
       // console.log("testing123456", response.quotation_details[0].pdf_footer_id);

        const formArray = new FormArray([]);
        for (let index = 0; index < response.quotation_child_det.length; index++) {
          this.sub_dis_type='';
          this.sub_dis_val='';
          if(response.quotation_child_det[index].dis_per!=''){
            this.sub_dis_type='per';
            this.sub_dis_val=response.quotation_child_det[index].dis_per;
          }else if(response.quotation_child_det[index].dis_amt!=''){
            this.sub_dis_type='amt';
            this.sub_dis_val=response.quotation_child_det[index].dis_amt;
          }
           // alert('ttt'+response.quotation_child_det[index].header_split);
        
          formArray.push(this.fb.group({

            "pd_productName_txtbox1": response.quotation_child_det[index].productName,
            "pd_productName_txtArea": response.quotation_child_det[index].productDesc,
            "pd_quantity_txtbox1": response.quotation_child_det[index].qty,
            "pd_quotationChildId": response.quotation_child_det[index].quotationChildId,
            "pd_unit": response.quotation_child_det[index].unit,
            "pd_sellingPrice": response.quotation_child_det[index].price,
            "pd_Total": response.quotation_child_det[index].total_bf_amt,
            "pd_netPrice": response.quotation_child_det[index].totat_amt,
            "sub_dis_amt": response.quotation_child_det[index].dis_amt,
            "sub_dis_type": this.sub_dis_type,
            "sub_dis_val":  this.sub_dis_val,
        //    "pd_split": response.quotation_child_det[index].header_split == 1 ? true : false,
            "pd_GPTotal": response.quotation_child_det[index].group_total_display_status == 1 ? true : false,
            "pd_selectTax": response.quotation_child_det[index].tax_state == 1 ? true : false,
            "to_next_page": response.quotation_child_det[index].to_next_page == 1 ? true : false,


          })

          
          
          );   

          
        }

        console.log(formArray)
        this.addQuotationInvoice_section2.setControl('addresses', formArray);
        // this.addresses.push(this.addQuotationInvoice_section2);
        console.log(this.addresses)
      //  console.log('response.quotation_details[0].grand_total'+response.quotation_details[0].grand_total);

      this.finalDiscountType = '';
      this.finalDiscountVal='';
      this.finalDiscount='';
      console.log('response.signature_filename'+response.quotation_details[0].signature_filename);
     
      if(response.quotation_details[0].signature_filename!=''){
        this.sign_state=1;
      }
      this.quotationAddSignature_filename=response.quotation_details[0].signature_filename;

      if(response.quotation_details[0].par_dis_per!=''){
        this.finalDiscountType = 'per';
        this.finalDiscountVal=response.quotation_details[0].par_dis_per;
        this.finalDiscount=response.quotation_details[0].par_dis_amt;
      }else if(response.quotation_details[0].par_dis_amt!=''){
        this.finalDiscountType = 'amt';
        this.finalDiscount=response.quotation_details[0].par_dis_amt;
      }



        this.addQuotationInvoice_section3.patchValue({
          //section-3

          //row-1
          'section3_grant_total_show': response.quotation_details[0].total_display_status,
          'section3_gross_total': response.quotation_details[0].gross_total,
          //row-2
          'section3_discount_txtbox': this.finalDiscount,
          'final_dis_val': this.finalDiscountVal,
          'final_dis_type': this.finalDiscountType,
          //row-3
          'section3_gst_dropdown': response.quotation_details[0].tax_id1,
          'section3_taxAmt_txtbox': response.quotation_details[0].tax_amt1,
          'section3_tax_per_hd': response.quotation_details[0].tax_per1,
          //row-4
          'section3_shipping_amt_name_txtbox': response.quotation_details[0].shipping_amt_name,
          'section3_shipping_amt_txtbox': response.quotation_details[0].shipping_amt,
          //row-5
          'section3_grand_total': response.quotation_details[0].grand_total,
          //row-6
          'section3_remarks': response.quotation_details[0].remarks,

          //row-7
          'section3_signature_dropdown': response.quotation_details[0].additional_signature_id,
          //row-8
          'section3_templateName': response.quotation_details[0].template_name,



        });
        this.quotationAddSignatureEdit(this.sign_state);
        //this.tax_per_mod = response.quotation_details[0].tax_id1;
        this.editAddress();
        console.log(response.quotation_child_det.length);
        this.removeAddresstest(response.quotation_child_det.length);
        
        

          for (let index = 0; index < response.quotation_child_det.length; index++) {
      
             if(response.quotation_child_det[index].header_split == 1){

              $('#pd_split_'+[index]).prop('checked',false);
              setTimeout(()=>{
                $('#pd_split_'+[index]).click();
              },1000);

          
              }          
           }
        


      //         setTimeout(()=>{
      //   // this.set_display_none(1);
      //  // $('#pd_split_'+2).prop('checked',false);
      //   $('#pd_split_'+index).click();
      // },1000)

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
        this.editQuotationInvoice_section1.patchValue({

          // 'resellerMainContent_Dropdown': response.terms_condition_details,
          'e_templateContent_Dropdown': response.main_content,
          'e_DescriptionText': response.description_details,
        });

      }
      else {
        this.editQuotationInvoice_section1.patchValue({

          'e_templateContent_Dropdown': '',
          'e_DescriptionText': '',
        });
      }


    });
  }
  quotationAddSignatureEdit(sign_val:any){
    //alert('sign_state'+sign_state);
    let api_req: any = new Object();
    let api_quotationAddSignatureEdit_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_add_signature_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationAddSignatureEdit_req.action = "quotation_add_signature_edit";
    //api_quotationAddSignatureEdit_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_quotationAddSignatureEdit_req.user_id = this.editQuotationInvoice_section1.value.e_salesRep;
   // api_quotationAddSignatureEdit_req.billerId = this.billerID ;
    api_quotationAddSignatureEdit_req.billerId = this.editQuotationInvoice_section1.value.e_companyName;
    api_quotationAddSignatureEdit_req.quotationId= this.editQuotationID ;
    api_req.element_data = api_quotationAddSignatureEdit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-quotation_add_signature response", response)

      if (response.status == true) {
      
        this.quotationAddSignature_state=response.signature_state;
        this.checkbox_selectAdditionalSignature = true
        if(sign_val==0){
          console.log('response.signature_filename'+response.signature_filename);
          this.quotationAddSignature_filename=response.signature_filename;
        }
       
        this.quotationAddSignatureCHKShowState=response.quot_signature_show_state;

        this.addQuotationInvoice_section3.patchValue({
          //section-3

          //row-9
     //     'section3_select_additional_signature': response.quot_signature_show_state,

        });
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
        this.editQuotationInvoice_section1.patchValue({

          'e_termConditionContentChange': response.terms_condition_details,


        });

      }
      else {
        this.editQuotationInvoice_section1.patchValue({

          'e_termConditionContentChange': '',


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

      }



    });
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
        this.editQuotationInvoice_section1.patchValue({

          'e_termConditionContentChange': response.terms,

        });

      }
      else {
        this.editQuotationInvoice_section1.patchValue({

          'e_termConditionContentChange': '',
        });
      }
    });

  }
  updateQuotationEnquiry($event: MouseEvent) {
    
    let api_req: any = new Object();
    let api_UpdateEnquiry_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/update_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_UpdateEnquiry_req.action = "update_quotation";
    api_UpdateEnquiry_req.user_id = sessionStorage.getItem('erp_c4c_user_id');

    api_UpdateEnquiry_req.enquiry_from_id = this.FormID_enquiryFromDetails;
    api_UpdateEnquiry_req.enquiry_subject = this.subject_enquiryFromDetails;
    api_UpdateEnquiry_req.quotation_valid_day = this.validity_enquiryFromDetails;
    api_UpdateEnquiry_req.duplicate_version = this.version_enquiryFromDetails;

    api_UpdateEnquiry_req.quotationId = this.editQuotationID
    api_UpdateEnquiry_req.billerId = this.editQuotationInvoice_section1.value.e_companyName;
    api_UpdateEnquiry_req.quotation_no = this.editQuotationInvoice_section1.value.e_quotationNumber;
    api_UpdateEnquiry_req.pdf_footer_id = this.editQuotationInvoice_section1.value.e_selectFooter;
   // api_UpdateEnquiry_req.pdf_footer_id = $('input:radio[name=selectFooter_name]:checked').val();
    api_UpdateEnquiry_req.quotation_date = this.editQuotationInvoice_section1.value.e_quotationDate;
    api_UpdateEnquiry_req.customer_id = this.editQuotationInvoice_section1.value.e_customer_id;
    api_UpdateEnquiry_req.customerName = this.editQuotationInvoice_section1.value.e_customerName;

    // api_UpdateEnquiry_req.customer_id = this.editQuotationInvoice_section1.value.customer_id;
    api_UpdateEnquiry_req.customerAddress1 = this.editQuotationInvoice_section1.value.e_cust_address1;
    api_UpdateEnquiry_req.customerAddress2 = this.editQuotationInvoice_section1.value.e_cust_address2;
    api_UpdateEnquiry_req.customerAddress3 = this.editQuotationInvoice_section1.value.e_cust_address3;
    api_UpdateEnquiry_req.kind_Attention = this.editQuotationInvoice_section1.value.e_attention;
    api_UpdateEnquiry_req.billGeneratedBy = this.editQuotationInvoice_section1.value.e_salesRep;
    api_UpdateEnquiry_req.quotation_template_id = this.editQuotationInvoice_section1.value.e_selectTemplate;
    api_UpdateEnquiry_req.reseller_id = this.editQuotationInvoice_section1.value.e_selectReseller;
    api_UpdateEnquiry_req.main_content = this.editQuotationInvoice_section1.value.e_templateContent_Dropdown;
    api_UpdateEnquiry_req.currencyId = this.editQuotationInvoice_section1.value.e_selectCurrency;
    api_UpdateEnquiry_req.bills_logo_id = this.editQuotationInvoice_section1.value.e_extraLogo;
    api_UpdateEnquiry_req.default_quotation_pdf_temp = this.editQuotationInvoice_section1.value.e_selectPDFTemplate;
    api_UpdateEnquiry_req.terms_condition_id = this.editQuotationInvoice_section1.value.e_selectTermsConditions;
    api_UpdateEnquiry_req.terms_conditions_show_state = this.checkbox_termsCondition_DontShow;
    api_UpdateEnquiry_req.terms_conditions = this.editQuotationInvoice_section1.value.e_termConditionContentChange;
    api_UpdateEnquiry_req.description_details = this.editQuotationInvoice_section1.value.e_DescriptionText;
    api_UpdateEnquiry_req.description_details_show_state = this.checkbox_descriptionDetails_DontShow;

    //section-2
    // api_UpdateEnquiry_req.values = this.addQuotationInvoice_section2.value.addresses;

    var addr = this.addQuotationInvoice_section2.value.addresses;
    for (let i = 0; i < addr.length; i++) {
      console.log(addr[i].pd_quantity_txtbox1)
      addr[i].pd_quotationChildId = $('#pd_quotationChildId_' + i).val();
      addr[i].pd_productName_txtbox1 = $('#pd_productName_txtbox_' + i).val();
      addr[i].pd_productName_txtArea = $('#pd_productName_txtArea_' + i).val();
      addr[i].pd_quantity_txtbox1 = $('#pd_qty_' + i).val();
      addr[i].pd_sellingPrice = $('#pd_SP_' + i).val();
      addr[i].pd_netPrice = $('#pd_netPrice_' + i).val();
      addr[i].pd_Total = $('#pd_Total_' + i).val();
      addr[i].sub_dis_type = $('#sub_discount_type_' + i).val();
      addr[i].sub_dis_val = $('#sub_discount_val_' + i).val();
      addr[i].sub_discount = $('#sub_discount_' + i).val();
      addr[i].pd_split = $('#pd_split_'+i).prop('checked');
      addr[i].to_next_page = $('#to_next_page_'+i).prop('checked');
      addr[i].pd_selectTax = $('#pd_selectTax_'+i).prop('checked');
      addr[i].pd_GPTotal = $('#pd_GPTotal_'+i).prop('checked');
    }
    api_UpdateEnquiry_req.values = addr;

    //section-3

    //row-1
    api_UpdateEnquiry_req.total_display_status = this.addQuotationInvoice_section3.value.section3_grant_total_show;
    api_UpdateEnquiry_req.gross_total = this.addQuotationInvoice_section3.value.section3_gross_total;
    //row-2
    api_UpdateEnquiry_req.discount_amt_tot = this.addQuotationInvoice_section3.value.section3_discount_txtbox;
    api_UpdateEnquiry_req.final_dis_type = this.addQuotationInvoice_section3.value.final_dis_type;
    api_UpdateEnquiry_req.final_dis_val = this.addQuotationInvoice_section3.value.final_dis_val;    
    //row-3
    api_UpdateEnquiry_req.taxId = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
    api_UpdateEnquiry_req.taxPer = this.addQuotationInvoice_section3.value.section3_tax_per_hd;
    api_UpdateEnquiry_req.taxAmt = this.addQuotationInvoice_section3.value.section3_taxAmt_txtbox;
    //row-4
    api_UpdateEnquiry_req.shipping_amt_name = this.addQuotationInvoice_section3.value.section3_shipping_amt_name_txtbox;
    api_UpdateEnquiry_req.shipping_amt = this.addQuotationInvoice_section3.value.section3_shipping_amt_txtbox;
    //row-5
    api_UpdateEnquiry_req.grand_total = this.addQuotationInvoice_section3.value.section3_grand_total;
    //row-6
    api_UpdateEnquiry_req.remarks = this.addQuotationInvoice_section3.value.section3_remarks;
    //row-7
    api_UpdateEnquiry_req.additional_signature_id = this.addQuotationInvoice_section3.value.section3_signature_dropdown;
    //row-8
    api_UpdateEnquiry_req.template_name = this.addQuotationInvoice_section3.value.section3_templateName;

    //row-9
    api_UpdateEnquiry_req.quot_signature_show_state = this.checkbox_selectAdditionalSignature;


    api_req.element_data = api_UpdateEnquiry_req;

    //section-2
    var addr = this.addQuotationInvoice_section2.value.addresses;
    for (let i = 0; i < addr.length; i++) {
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
   api_UpdateEnquiry_req.values = addr;
	console.log(api_req);
  ($event.target as HTMLButtonElement).disabled = true;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      ($event.target as HTMLButtonElement).disabled = false;

      console.log("add quotation new save", response);
      if (response.status == true) {

        iziToast.success({
          title: 'Updated',
          message: 'Quotation Updated Successfully !',
        });
        this.redirecttoQuotation();
        this.editQuotationInvoice_section1.reset();
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

    //  console.log('response'+response);
      if (response.status == true) {
        // this.autocomplete_CustomerID = response.customer_list[0].customerId;
       //  this.autocomplete_CustomerName = response.customer_list[0].customerName;
       //console.log('response.customer_list'+ response.customer_list);
        this.editQuotationInvoice_section1.patchValue({
          'e_customer_id': response.customer_list.customerId,
          'e_customerName': response.customer_list.customerName,
          'e_cust_address1': response.customer_list.customerAddress1,
          'e_cust_address2': response.customer_list.customerAddress2,
          'e_cust_address3': response.customer_list.customerAddress3,
          'e_attention': response.customer_list.kind_Attention,

        //   'e_customer_id': response.customer_list[0].customerId,
        // //  'e_cust_address1': response.customer_list[0].customerAddress1,
        //   'e_cust_address2': response.customer_list[0].customerAddress2,
        //   'e_cust_address3': response.customer_list[0].customerAddress3,
        //   'e_customerName': response.customer_list[0].customerName,
        //   'e_attention': response.customer_list[0].kind_Attention,
        });

      //  alert('test');
      }
      else {
        this.editQuotationInvoice_section1.patchValue({


          'e_cust_address1': '',
          'e_cust_address2': '',
          'e_cust_address3': '',
          'e_customerName': '',
          'e_attention': '',
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

      if (response.status != '') {
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

    let discount_type :any;
    var total_amt:any;
    var dis_amt_val:any;

    var total_amt:any;
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
      console.log('discount_type'+discount_type);
      if(discount_type=='per'){
        this.sub_dis_val = $('#sub_discount_val_' + a).val();
        console.log('discount_type1111'+this.sub_dis_val);
        dis_amt_val = (parseFloat(this.sub_dis_val) * parseFloat(total_amt) / 100).toFixed(2);
        console.log('dis_amt_val'+dis_amt_val);
        sub_total_amt = parseFloat(total_amt)-parseFloat(dis_amt_val)
        $('#pd_netPrice_' + a).val(sub_total_amt);
        $('#sub_discount_' + a).val(dis_amt_val);
      }else if(discount_type=='amt'){
       // console.log('discount_type222'+discount_type);
       
        this.sub_dis_val = $('#sub_discount_val_' + a).val();
       // console.log('sub_discount_valppp'+this.sub_dis_val);
       sub_total_amt =parseFloat(total_amt)-parseFloat( this.sub_dis_val);
        $('#pd_netPrice_' + a).val(sub_total_amt);
      }else{
        $('#pd_netPrice_' + a).val(total_amt);
        sub_total_amt=total_amt;
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

  assignRowVal(val: any){
    this.quotationPriceKey = val;

  }
  saveDiscount() {
    var enablePercentabeDiscont = $('#enablePercentabeDiscont').val()
    var enablePriceDiscont = $('#enablePriceDiscont').val()
    var disType = $('input:radio[name=discountTYpe]:checked').val();
   //var disType = $('sub_discount_type_'+this.quotationPriceKey).val();
   //console.log('quotationPriceKey'+this.quotationPriceKey);
   //console.log('disType'+disType);
    var final_tot = $('#pd_Total_' + this.quotationPriceKey).val();
    $('#sub_discount_type_' + this.quotationPriceKey).val(disType);
    var price: any;
    if (disType == 'per') {
   // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'--'+final_tot);
      if (enablePercentabeDiscont != '') {
           console.log('3333'+final_tot);
        price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);


        $('#sub_discount_' + this.quotationPriceKey).val(price);
        $('#sub_discount_val_' + this.quotationPriceKey).val(enablePercentabeDiscont);
        price = final_tot - price;
      } else {
        $('#sub_discount_' + this.quotationPriceKey).val('');
        $('#sub_discount_val_' + this.quotationPriceKey).val('');
           console.log('222'+final_tot);
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
    this.finalDiscountType=disType;

    if (disType == 'per') {
 // console.log('enablePercentabeDiscont'+enablePercentabeDiscont+'--'+final_tot);
      if (enablePercentabeDiscont != '') {
        //  console.log('3333'+final_tot);
      price = (parseFloat(enablePercentabeDiscont) * parseFloat(final_tot) / 100).toFixed(2);
 $('#final_discount').val(price);
        $('#final_discount_val').val(enablePercentabeDiscont);
        this.finalDiscountVal=enablePercentabeDiscont;
        //     price = final_tot - price;
      } else {
        $('#final_discount').val('');
        $('#final_discount_val').val('');
        this.finalDiscountVal='';
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
      this.finalDiscountVal=enablePercentabeDiscont;
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
      $('#finaldiscountType_per').prop('checked', true);
      final_dis_val = $('#final_discount_val').val();

      $('#enablePerFinal').val(final_dis_val);
      console.log('22' + disType);
    } else if (disType == 'amt') {
      $('#finaldiscountType_amt').prop('checked', true);
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
    this.grandTotal = this.grandTotal + parseFloat(fee);
    this.extraCharge = parseFloat(fee);
    this.totalCalculate();
  }
  set_display_none(cnt:any){
    //PN
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

removeAddress(i: number) {
  console.log(i)
  console.log(this.addresses)
  
  var quotationChildId = $('#pd_quotationChildId_' + i).val();
  //console.log('quotationChildId'+quotationChildId);

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      this.addresses.removeAt(i);
      var addr = this.addQuotationInvoice_section2.value.addresses;
      var list_cnt = addr.length;
      this.totalCalculate();


      let api_req: any = new Object();
    let api_ProdAutoFill_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/delete_quotation_child";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_ProdAutoFill_req.action = "delete_quotation_child";
    api_ProdAutoFill_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_ProdAutoFill_req.quotationChildId = quotationChildId;
    api_req.element_data = api_ProdAutoFill_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
console.log("response", response)


    });



     
     
    }
  })


}
removeAddresstest(i: number) {
  console.log(i)
  console.log(this.addresses)
      this.addresses.removeAt(i);
      var addr = this.addQuotationInvoice_section2.value.addresses;
      var list_cnt = addr.length;
      this.totalCalculate();
    
}

// removeAddress(i: number) {
//     this.addresses.removeAt(i);
// var addr = this.addQuotationInvoice_section2.value.addresses;
//     var list_cnt = addr.length;

//     this.totalCalculate();
//   }
  // productDetails_selectTax_eventCheck(e: any, i: any) {
    // this.checkbox_productDetails_selectTax = e.target.checked
    // console.log(this.checkbox_productDetails_selectTax);
    // var actualPrice = $('#pd_netPrice_' + i).val();
    // if (this.addQuotationInvoice_section3.value.section3_gst_dropdown) {
     //  var tax = this.addQuotationInvoice_section3.value.section3_gst_dropdown;
      // tax = (parseFloat(tax) * parseFloat(actualPrice) / 100).toFixed(2);
      // if (this.checkbox_productDetails_selectTax == true) {
        // this.grandTotal = this.grandTotal + parseFloat(tax);
        // this.finalTax = this.finalTax + parseFloat(tax)
      // } else {
        // this.grandTotal = this.grandTotal - tax;
        // this.finalTax = this.finalTax - parseFloat(tax)
      // }
    // }
  // }
  redirecttoQuotation() {

    this.router.navigate(['/quotationnew']);
  }

  goBack() {
    this.router.navigate(['/quotationnew']);
    
  }

}
