import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BnNgIdleService } from 'bn-ng-idle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'
import { InputModalityDetector } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-quotationnew',
  templateUrl: './quotationnew.component.html',
  styleUrls: ['./quotationnew.component.css']
})
export class QuotationnewComponent implements OnInit {
  //quotation version
  quotationVersion = '1.0';
  //add modal
  quotation_list: any;
  addNewQuotationPopUpForm: FormGroup;
  EnquiryFrom: FormGroup;
  enquiryFromList: any;
  templateNameList: any;
  //edit modal
  editNewQuotationPopUpForm: FormGroup;
  edit_enquiryFromList: any;
  edit_quotationValidityList: any;
  edit_templateNameList: any;
  edit_quotationID: any;
  //button flag
  clicked = false;
  //pdf
  urlSafe: SafeResourceUrl;
  // duplicate modal
  duplicateQuotationPopUpForm: FormGroup;
  duplicate_quotationID: any;
  duplicate_enquiryFromList: any;
  duplicate_quotationValidityList: any;
  duplicate_templateNameList: any;
  isReadonly: boolean = true;

  //search quotation
  searchQuotationForm: FormGroup;
  searchBillerNameList: any;
  groupSelect_searchId: any;
  quotationSearchCheckboxID_array: any = [];
  searchBillerResult: any;
  //auto complete search
  searchResult: any;
  searchResult_CustomerID: any;
  quotationId_new: any;
  searchResult_CustomerName: any;
  // quotation_list:any=[];
  quotationValidityList: any = [];
  //quotation-shared
  quotationSharedPersonForm: FormGroup;
  quotationSharedResult: any;
  groupselectQuotationId: any;
  checkbox_quotationShare_value: any;
  quotationSharedCheckboxID_array: any = [];
  quotationSharedPreviousChecked: any = [];
  sharePermissionQuotationId: any;
  search_SharedPersonName: any;
  values = '';
  //quotation shared-rework--new
  quotationSharedPerson_EditOnLoad_Values: any;
  quotationSharedPerson_List: any;
  quotationSharedPerson_List1: any;
  CheckBox_DynamicArrayList_quotationSharedPerson: any;
  typeConvertionString_quotation_Shared_Permission: any;
  checkbox_ID_SingleParameter_quotationShare_Value: any;
  Checkbox_value_quotationShare: any;
  //quotation-approval
  quotationApproval_ID: any;
  quotationApprovalForm: FormGroup;
  quotationApprovalResult: any;
  checked = true;
  Approval_Type_radiobox_Value: any = 'single';
  quotationApprovedBy: any;
  approvalUserID_Radio: any;
  //set template name
  setTemplateNameForm: FormGroup;
  template_quotationID: any;
  TemplateNameList: any;
  //set actual cost
  setActualCostForm: FormGroup;
  actualCost_quotationID: any;
  actualCost_ProductList: any;
  quotationChildID: any;
  quotationChildId_count: any;
  public addresses_actualCost: FormArray;
  setActualCost_FormGroup: FormGroup;
  test: boolean[] = [];
  itre = 0;
  //file attachment
  fileAttach_quotationID: any;
  FileAttachmentForm: FormGroup;
  getFileAttachmentResult: any;
  myFiles: string[] = [];
  edit_array: any = [];
  checkbox_value: any;
  groupSelectCommonId: any;
  commonAttachmentID: any;
  checkboxAdding: any = [];
  //email
  emailForm: FormGroup;
  EmailQuotationID: any;
  msg_id: any;
  emailTo: any;
  subjectValue: any;
  Select_To_Type_radiobox_Value: any;
  email_template: any;
  email_fromList: any;
  email_crmTemplateList: any;
  email_cc_userList: any;
  groupSelect_emailCCId: any;
  edit_array_emailCC_Checkbox: any = [];
  quotation_Emailtemplate_id: any;
  messageContent: any;
  mailContent: any;
  FromEmailValue: any;

  //approval
  approval_Show_hide: boolean = true;
  textarea_Show_hide: boolean;
  textarea1_Show_hide: boolean;
  approval_comments: any;
  //quotation-comments
  quotationCommentsForm: FormGroup;
  comment_QuotationID: any;
  comment_TransactionID: any;
  response_CommentResult: any;

  //PI-Performa Inv
  PIForm: FormGroup;
  PIResult: any;
  quotationID_PI: any;
  CustomerName_Result: any;
  ProductDescription_Result: any;

  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //excel
  ExcelReportResult: any;
  //permission
  quotationPermissionList: any;
  quotationPermission_Edit: any;
  quotationPermission_ActualPrice: any;
  quotationPermission_Add: any;
  quotationPermission_Delete: any;
  quotationPermission_List: any;
  quotationPermission_Mail: any;
  quotationPermission_Search: any;
  quotationPermission_View: any;
  quotationPermission_Share: any;
  user_ids: any;

  constructor(public serverService: ServerService, public sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private bnIdle: BnNgIdleService, private spinner: NgxSpinnerService) {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if (params['ids'] != '' && params['ids'] != undefined && params['ids'] != 'undefined' && params['ids'] != null && params['ids'] != 'null') {
        var k = atob(params['ids']);
        this.user_ids = k;
        console.log(this.user_ids)
      }

    }
    );
    this.setActualCost_FormGroup = this.fb.group({
      addresses_actualCost: this.fb.array([this.createAddressActualCost()])
    });
  }
  keywordCompanyName = 'customerName';
  ngOnInit(): void {
    this.user_ids = sessionStorage.getItem('erp_c4c_user_id');
    this.searchBillerNameList = ["Cal4Care Pte Ltd", "Marshal System Consultancy", "Cal4Care", "Dcare Technologies Pte Ltd", "DCARE Technologies India Pvt Ltd.", "Cal4care Sdn.Bhd.", "Cal4Care Japan Co., Ltd", "1Msb IT Care Sdn. Bhd.", "Cal4care Telecommunication Services (I) PVT LTD"]
    this.addNewQuotationPopUpForm = new FormGroup({
      'enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'enquirySubject_addPopUP': new FormControl(null, [Validators.required]),
      'quotationValidity_addPopUP': new FormControl(null, [Validators.required]),
      'version_enqForm_addPopUP': new FormControl(null, [Validators.required]),
      'templateName_addPopUP': new FormControl(null),
    });
    this.editNewQuotationPopUpForm = new FormGroup({
      'e_enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'e_enquirySubject_addPopUP': new FormControl(null),
      'e_quotationValidity_addPopUP': new FormControl(null),
      'e_version_enqForm_addPopUP': new FormControl(null),
      'e_templateName_addPopUP': new FormControl(null),
    });
    this.duplicateQuotationPopUpForm = new FormGroup({
      'd_enquiryFrom_addPopUP': new FormControl(null, [Validators.required]),
      'd_enquirySubject_addPopUP': new FormControl(null),
      'd_quotationValidity_addPopUP': new FormControl(null),
      'd_version_enqForm_addPopUP': new FormControl(null),
      'd_templateName_addPopUP': new FormControl(null),
    });

    this.searchQuotationForm = new FormGroup({
      'search_text': new FormControl(null),
      'groupby_customer': new FormControl(null),
      'company_Name': new FormControl(null),

    });
    this.EnquiryFrom = new FormGroup({
      'enquiryForm': new FormControl(null),
      'enquirySubject': new FormControl(null),
      'quotationValidity': new FormControl(null),
      'version_enqForm': new FormControl(null),
      'templateName': new FormControl(null),
    });
    this.quotationSharedPersonForm = new FormGroup({
      'enquiryForm': new FormControl(null),

    });
    this.quotationApprovalForm = new FormGroup({
      'cm_chk': new FormControl(null),
      'cd_chk': new FormControl(null),
      'radio_approvalPermission': new FormControl(null),
      'approval_comments': new FormControl(null),
      'comments_approvedBy': new FormControl(null),
    });
    this.setTemplateNameForm = new FormGroup({
      'txt_templateName': new FormControl(null),

    });
    this.setActualCostForm = new FormGroup({
      'txt_templateName': new FormControl(null),

    });
    this.FileAttachmentForm = new FormGroup({
      'file': new FormControl(null),

    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      // 'email_pdfType': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),

    });
    this.quotationCommentsForm = new FormGroup({
      'quotation_Comments': new FormControl(null),

    });
    this.PIForm = new FormGroup({
      'quotation_Comments': new FormControl(null),

    });
    this.addressControlsActualCost.controls.forEach((elt, index) => {
      this.test[index] = true;
    });
    setTimeout(() => {
      this.quotationList({});
    }, 3000);

    this.search_BillerList();
  }
  selectEventCustomer(item: any) {
    console.log(item)
    this.searchResult_CustomerID = item.customerId;
    this.searchResult_CustomerName = item.customerName;
    console.log("AutoComplete-customer ID", this.searchResult_CustomerID)
    console.log("AutoComplete-customer Name", this.searchResult_CustomerName)

  }
  onFocusedCustomer(e: any) {
    // do something when input is focused
  }
  get addressControlsActualCost() {
    return this.setActualCost_FormGroup.get('addresses_actualCost') as FormArray
  }
  addActualCostAddress(): void {
    this.addresses_actualCost = this.setActualCost_FormGroup.get('addresses_actualCost') as FormArray;
    this.addresses_actualCost.push(this.createAddressActualCost());

    this.itre = this.itre + 1;
    this.addressControlsActualCost.controls.forEach((elt, index) => {
      this.test[index] = true;

    });
  }

  createAddressActualCost(): FormGroup {
    return this.fb.group({
      AP_sno: '',
      AP_productName: '',
      AP_productDescription: '',
      AP_productQty: '',
      AP_productUnit: '',
      AP_productPrice: '',
      AP_productNetAmt: '',
      AP_productActualPercent: '',
      AP_productActualCost: '',
      AP_productActualNetTot: '',
      AP_productActualDiffAmt: '',
      AP_productInvisible: '',
      quotationChildId_count: '',
      AP_productActualCostTOTAL: '',
      AP_productActualNETTOTAL: '',
      AP_productActualDiffAmountTotal: '',

    });

  }
  checkbox_CM_QuotPermission: any;
  eventCheck_CM_QuotPermission(event: any) {
    this.checkbox_CM_QuotPermission = event.target.checked;
    console.log(this.checkbox_CM_QuotPermission)
  }

  checkbox_CD_QuotPermission: any;
  eventCheck_CD_QuotPermission(event: any) {
    this.checkbox_CD_QuotPermission = event.target.checked;
    console.log(this.checkbox_CD_QuotPermission)
  }
  checkbox_eventCheck_PDFType: any;
  eventCheck_PDFType(event: any) {
    this.checkbox_eventCheck_PDFType = event.target.checked;
    console.log(this.checkbox_eventCheck_PDFType)
  }
  checkbox_eventCheck_GroupByCustomer: any;
  eventCheckGroupByCustomer(event: any) {
    this.checkbox_eventCheck_GroupByCustomer = event.target.checked;
    console.log(this.checkbox_eventCheck_GroupByCustomer)
  }
  onKey(event: any) { // without type info
    this.values = event.target.value;
    console.log("this.values", this.values)
  }
  handleChange(evt: any, userId: any) {

    this.approvalUserID_Radio = userId;
    var xyz = evt.target.id;
    this.quotationApprovedBy = this.approvalUserID_Radio;
    console.log(xyz, "target");
    if (xyz == "0") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = true;
      this.textarea1_Show_hide = false;
    }
    else if (xyz == "1") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "2") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "3") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "4") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "5") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "6") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "7") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "8") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
    else if (xyz == "9") {
      console.log(xyz);
      console.log("this.quotationApprovedBy", this.quotationApprovedBy);
      this.textarea_Show_hide = false;
      this.textarea1_Show_hide = true;

    }
  }
  handle_radioChange(event: any) {
    this.Approval_Type_radiobox_Value = event.target.id;
    console.log(this.Approval_Type_radiobox_Value);

    if (this.Approval_Type_radiobox_Value == "single") {
      this.approval_Show_hide = true;

    }
    else if (this.Approval_Type_radiobox_Value == "double") {
      console.log(this.Approval_Type_radiobox_Value);
      this.approval_Show_hide = false;

    }
  }


  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);
  }
  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    // console.log(this.checkbox_value)
    for (let i = 0; i <= this.getFileAttachmentResult.length; i++) {
      console.log(this.getFileAttachmentResult[i].quotation_pdf_add)
      // console.log(this.checkboxAdding)
      if (this.getFileAttachmentResult[i].quotation_pdf_add == '1') {
        this.checkboxAdding = this.getFileAttachmentResult[i].common_attachmentId;
        // console.log(this.checkboxAdding)
      }

    }

    console.log(this.checkboxAdding)
    if (this.checkbox_value) {
      this.checkboxAdding.push(data);
      console.log(this.checkboxAdding)
      this.edit_array.push(data);
      // this.edit_array.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array);
    }
    else {
      const index = this.edit_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array)

    }
  }



  EditCHK_emailCC(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array_emailCC_Checkbox.push(data);
      this.edit_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.edit_array_emailCC_Checkbox);
    }
    else {
      const index = this.edit_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.edit_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.edit_array_emailCC_Checkbox)

    }
  }
  QuotationSearchCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelect_searchId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.quotationSearchCheckboxID_array.push(data);
      this.quotationSearchCheckboxID_array.join(',');
      console.log("Final Checkbox After checkbox selected list", this.quotationSearchCheckboxID_array);
    }
    else {
      const index = this.quotationSearchCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.quotationSearchCheckboxID_array.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.quotationSearchCheckboxID_array)

    }
  }

  onFileChange(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }
  search_BillerList() {
    let api_req: any = new Object();
    let api_SearchBiller_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/biller_dropdown";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_SearchBiller_req.action = "biller_dropdown";
    api_SearchBiller_req.user_id = this.user_ids;
    api_req.element_data = api_SearchBiller_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_status response", response);

      this.searchBillerResult = response.biller_list;

      if (response.status = true) {
      }
    });
  }
  searchCustomerData(data: any) {

    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "customer_name_search";
    api_Search_req.user_id = this.user_ids;
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_status response", response);

      this.searchResult = response.customer_names;
      console.log("vignesh-advanced search result", this.searchResult);
      if (response.status = true) {
      }
    });
  }
  quotationList1() {
    console.log("Quotation List UI Display Data after OnInit ")

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "quotation_list";
    api_quotationList.user_id = this.user_ids;
    api_quotationList.off_set = "0";
    api_quotationList.limit_val = "50";
    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("qoutation list", response);
      if (response) {
        this.quotation_list = response.quotation_details;
        console.log(this.quotation_list)

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
  quotationList(data: any) {
    // Swal.fire('Loading');
    // Swal.showLoading();
    this.spinner.show();
    $("#searchQuotationFormId ").modal("hide");

    console.log("Quotation List UI Display Data after OnInit ")
    var list_data = this.listDataInfo(data);
    console.log("data console", list_data)
    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "quotation_list";
    api_quotationList.user_id = this.user_ids;
    api_quotationList.off_set = list_data.offset;
    api_quotationList.limit_val = list_data.limit;
    api_quotationList.current_page = "";
    api_quotationList.billerID = this.quotationSearchCheckboxID_array;
    api_quotationList.search_txt = this.searchResult_CustomerName;
    api_quotationList.groupByCheck = this.checkbox_eventCheck_GroupByCustomer;
    api_req.element_data = api_quotationList;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("qoutation list", response);
      if (response) {
        // Swal.close();
        this.spinner.hide();
        this.quotation_list = response.quotation_details;
        this.quotationPermission_Edit = response.quotation_permission_arr.edit;
        this.quotationPermission_Edit = response.quotation_permission_arr.edit
        this.quotationPermission_ActualPrice = response.quotation_permission_arr.actual_price
        this.quotationPermission_Add = response.quotation_permission_arr.add
        this.quotationPermission_Delete = response.quotation_permission_arr.delete
        this.quotationPermission_List = response.quotation_permission_arr.list
        this.quotationPermission_Mail = response.quotation_permission_arr.mail
        this.quotationPermission_Search = response.quotation_permission_arr.search
        this.quotationPermission_View = response.quotation_permission_arr.view
        this.quotationPermission_Share = response.quotation_permission_arr.share

        console.log(response)
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
    console.log(list_data)
    // list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    // list_data.order_by_name = list_data.order_by_name == undefined ? "user.agent_name" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  clearAddQuotationGo() {
    this.addNewQuotationPopUpForm.reset();
    this.addNewQuotationPopUpForm.patchValue({

      'version_enqForm_addPopUP': '1.0',

    });


  }
  addQuotationNew() {
    // $("#enq_From").val('');
    // $("#enq_subject").val('');
    // setTimeout(() => {
    //   $("#quot_val").val('');
    // $("#temp_name").val('');
    // }, 2000);


    $("#addNewQuotationFormId").modal("show");
    // this.addNewQuotationPopUpForm.value.reset();
    let api_req: any = new Object();
    let add_newQuotation_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/create_popup";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_newQuotation_req.action = "create_popup";
    add_newQuotation_req.user_id = this.user_ids;
    add_newQuotation_req.enquiry_from_id = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
    add_newQuotation_req.quot_validity = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
    add_newQuotation_req.quotationId = this.addNewQuotationPopUpForm.value.templateName_addPopUP;
    api_req.element_data = add_newQuotation_req;
    $("#addNewQuotationFormId").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#addNewQuotationFormId").removeAttr("disabled");
      console.log(response);

      console.log("pop up for add quotation", response);
      if (response != '') {
        this.enquiryFromList = response.enquiry_from;
        this.quotationValidityList = response.quot_validity;
        this.templateNameList = response.template_name_arr;
        console.log("EnquiryFormList", this.enquiryFromList)

        // $('#addNewQuotationFormId').modal('hide');
        //this.contactsList({});

      }

    });
  }
  editQuotationPopUP(QuotationId: any) {
    this.edit_quotationID = QuotationId;
    let api_req: any = new Object();
    let edit_popup_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/edit_enquiry_popup_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_popup_req.action = "edit_enquiry_popup_quotation";
    edit_popup_req.user_id = this.user_ids;
    edit_popup_req.quotation_id = this.edit_quotationID;
    api_req.element_data = edit_popup_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("pop up for edit quotation", response);
      if (response != '') {
        this.edit_enquiryFromList = response.enquiry_from;
        this.edit_quotationValidityList = response.quot_validity;
        this.edit_templateNameList = response.template_name_arr;
        this.editNewQuotationPopUpForm.patchValue({

          'e_enquiryFrom_addPopUP': response.quotation_arr_popup.enquiry_from_id,
          'e_enquirySubject_addPopUP': response.quotation_arr_popup.enquiry_product_description,
          'e_quotationValidity_addPopUP': response.quotation_arr_popup.quotation_valid_day,
          'e_version_enqForm_addPopUP': response.quotation_arr_popup.duplicate_version,
          // 'e_templateName_addPopUP': response.template_name_arr,


        });


        // $('#addNewQuotationFormId').modal('hide');
        //this.contactsList({});

      }

    });
  }
  duplicateQuotationPopUP(QuotationId: any) {
    this.duplicate_quotationID = QuotationId;
    let api_req: any = new Object();
    let duplicate_popup_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/duplicate_enquiry_popup_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    duplicate_popup_req.action = "duplicate_enquiry_popup_quotation";
    duplicate_popup_req.user_id = this.user_ids;
    duplicate_popup_req.quotation_id = this.duplicate_quotationID;
    api_req.element_data = duplicate_popup_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("pop up for edit quotation", response);
      if (response != '') {
        this.duplicate_enquiryFromList = response.enquiry_from;
        this.duplicate_quotationValidityList = response.quot_validity;
        this.duplicate_templateNameList = response.template_name_arr;
        this.duplicateQuotationPopUpForm.patchValue({

          'd_enquiryFrom_addPopUP': response.quotation_arr_popup.enquiry_from_id,
          'd_enquirySubject_addPopUP': response.quotation_arr_popup.enquiry_product_description,
          'd_quotationValidity_addPopUP': response.quotation_arr_popup.quotation_valid_day,
          'd_version_enqForm_addPopUP': response.quotation_arr_popup.duplicate_version,
          // 'e_templateName_addPopUP': response.template_name_arr,


        });


        // $('#addNewQuotationFormId').modal('hide');
        //this.contactsList({});

      }

    });
  }
  quotationSharedPersonEdit(QuotationId: any) {
    this.sharePermissionQuotationId = QuotationId;
    let api_req: any = new Object();
    let quot_share_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_shared_person";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_req.action = "quotation_shared_person";

    quot_share_req.quotationId = this.sharePermissionQuotationId;
    quot_share_req.user_id = this.user_ids;
    api_req.element_data = quot_share_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      alert(response.HttpErrorResponse.ERROR.headers.status)
      if (response.status == true) {


        this.quotationSharedPerson_EditOnLoad_Values = response.access_userid;
        // setTimeout(() => {
        //   this.quotationSharedPerson_List = response.user_list;
        // }, 2000);
        this.quotationSharedPerson_List = response.user_list;
        this.quotationSharedPerson_List1 = response.access_userid;
        this.quotationSharedResult = response.user_list;
        this.CheckBox_DynamicArrayList_quotationSharedPerson = response.access_userid.split(',').map(Number);
        console.log("initial Select/Deselect list", this.CheckBox_DynamicArrayList_quotationSharedPerson)

      }
      else {
        $("#quotationSharedPersonId").modal("hide");
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });

      }
    }), (error: HttpErrorResponse) => {
      if (error.status == 500) {
        alert("wrong")
        console.log("vignesh", error)
      }
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);

    }
  }

  quotationSharedPersonUpdate() {
    let api_req: any = new Object();
    let quot_share_update_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_shared_user_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_update_req.action = "quotation_shared_user_update";
    quot_share_update_req.quotationId = this.sharePermissionQuotationId;
    quot_share_update_req.user_id = this.user_ids;
    quot_share_update_req.follower_user_id = this.typeConvertionString_quotation_Shared_Permission;
    api_req.element_data = quot_share_update_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        iziToast.success({
          message: "Share Customer Permission Updated successfully",
          position: 'topRight'
        });

        $('#quotationSharedPersonId').modal('hide');
        this.typeConvertionString_quotation_Shared_Permission = [];
      } else {
        iziToast.warning({
          message: "Response Failed",
          position: 'topRight'
        });
      }
    }),
      (error: any) => {
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
      };
  }

  // quotationSharedPersonUpdate1() {

  //   console.log("Checkbox current click", this.quotationSharedCheckboxID_array)

  //   this.quotationSharedCheckboxID_array.join(this.quotationSharedPreviousChecked);
  //   console.log("Checkbox current+edit(past) click", this.quotationSharedCheckboxID_array)

  //   let api_req: any = new Object();
  //   let quot_share_update_req: any = new Object();
  //   api_req.moduleType = "quotation";
  //   api_req.api_url = "quotation/quotation_shared_user_update";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   quot_share_update_req.action = "quotation_shared_user_update";
  //   quot_share_update_req.quotationId = this.sharePermissionQuotationId;
  //   quot_share_update_req.user_id = this.user_ids;
  //   quot_share_update_req.follower_user_id = this.quotationSharedCheckboxID_array.join(',');
  //   api_req.element_data = quot_share_update_req;

  //   this.serverService.sendServer(api_req).subscribe((response: any) => {

  //     if (response.status == true) {
  //       this.quotationSharedResult = response.customer_invoice_details;
  //       console.log("response.customer_invoice_details", response.customer_invoice_details)
  //       this.quotationList({});

  //       $("#quotationSharedPersonId").modal("hide");
  //       console.log("Quotation Shared checkbox array-after update click", this.quotationSharedCheckboxID_array)
  //       iziToast.success({
  //         message: "Quotation Shared has been Updated",
  //         position: 'topRight'
  //       });

  //     }
  //     else {

  //       iziToast.error({
  //         message: "Quotation Shared has not been Updated",
  //         position: 'topRight'
  //       });
  //     }




  //   });


  // }
  // quotationSharedPersonEdi(QuotationId: any) {

  //   this.sharePermissionQuotationId = QuotationId
  //   let api_req: any = new Object();
  //   let quot_share_req: any = new Object();
  //   api_req.moduleType = "quotation";
  //   api_req.api_url = "quotation/quotation_shared_person";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   quot_share_req.action = "quotation_shared_person";

  //   quot_share_req.quotationId = this.sharePermissionQuotationId;
  //   quot_share_req.user_id = this.user_ids;
  //   api_req.element_data = quot_share_req;
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {

  //     if (response.status == true) {

  //       this.quotationSharedResult = response.user_list;
  //       console.log("response.user_list", response.user_list);
  //       var localVar = response.access_userid
  //       this.quotationSharedCheckboxID_array = localVar.split(',');
  //       console.log(this.quotationSharedCheckboxID_array)
  //       console.log("checkbox selected user_list", response.access_userid);
  //       this.quotationSharedCheckboxID_array = response.access_userid;
  //       console.log("Initial Quotation list before select/deselect", this.quotationSharedCheckboxID_array);
  //     }
  //     else {
  //       $("#quotationSharedPersonId").modal("hide");
  //       iziToast.error({
  //         message: "Data Not Found",
  //         position: 'topRight'
  //       }); 
  //     }
  //   }), (error: any) => {
  //     iziToast.error({
  //       message: "Sorry, some server issue occur. Please contact admin",
  //       position: 'topRight'
  //     });
  //     console.log("final error", error);
  //   }
  // }
  quotationSharedPersonNameSearch(event: any) {


    this.values = event.target.value;
    console.log("this.values", this.values)


    console.log("You entered: ", event.target.value);
    this.search_SharedPersonName = event.target.value;

    let api_req: any = new Object();
    let quot_share_Search_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/user_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_share_Search_req.action = "user_name_search";

    quot_share_Search_req.firstName = this.values;
    api_req.element_data = quot_share_Search_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("search username ", response)
      if (response.status == true) {

        // this.quotationSharedResult = response.user_list;
        this.quotationSharedPerson_List = response.user_list;

      }
      else {

      }

    });

  }
  QuotationSharedCHK(data: any, event: any) {
    console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_quotationShare_Value = data;
    this.Checkbox_value_quotationShare = event.target.checked;
    console.log(this.Checkbox_value_quotationShare)
    if (this.Checkbox_value_quotationShare) {

      this.CheckBox_DynamicArrayList_quotationSharedPerson.push(Number(data));
      this.CheckBox_DynamicArrayList_quotationSharedPerson.join(',');
      this.CheckBox_DynamicArrayList_quotationSharedPerson.sort();
      console.log("Final check After checkbox selected list", this.CheckBox_DynamicArrayList_quotationSharedPerson);

    }
    else {
      const index: number = this.CheckBox_DynamicArrayList_quotationSharedPerson.indexOf(data);
      console.log(index)
      if (index == -1) {
        this.CheckBox_DynamicArrayList_quotationSharedPerson.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_quotationSharedPerson.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_quotationSharedPerson)
    }
    this.typeConvertionString_quotation_Shared_Permission = this.CheckBox_DynamicArrayList_quotationSharedPerson.toString();

    console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_quotation_Shared_Permission)

  }
  QuotationSharedCHK1(data: any, event: any) {
    console.log("before--Final check After Selected/Deselected selected list", this.typeConvertionString_quotation_Shared_Permission)
    console.log("List - Checkbox ID", data);
    this.checkbox_ID_SingleParameter_quotationShare_Value = data;
    this.Checkbox_value_quotationShare = event.target.checked;
    // console.log(this.Checkbox_value_quotationShare)
    //     console.log(this.quotationSharedPerson_List1)
    // var k = this.quotationSharedPerson_List1.split(',');
    if (this.Checkbox_value_quotationShare) {
      // console.log(k.indexOf(data))
      // for(var i=0;i<=k.length;i++){
      //   if(k[i]!=data){
      // k.push(data);
      //   }
      // }
      // console.log(k)
      if (this.CheckBox_DynamicArrayList_quotationSharedPerson.indexOf(data) < 0) {
        this.CheckBox_DynamicArrayList_quotationSharedPerson.push(data);
        var k = this.CheckBox_DynamicArrayList_quotationSharedPerson.toString();
        var a = k.split(',');
        let filteredArr = a.filter((item: any) => item === data);
        console.log(filteredArr);
      }
      else {
        //type something
      }
      console.log("Final check After  selected list", this.CheckBox_DynamicArrayList_quotationSharedPerson)

    } else {
      // for(var i=0;i<=k.length;i++){
      //   if(k[i]==data){
      // const index = k.indexOf(data);
      // console.log(index);
      // if(index == 1){
      //   k.splice(index,1);
      // }else{
      //   k.splice(index,1);
      // }
      //   }
      // }
      // console.log(k)
      const index = this.CheckBox_DynamicArrayList_quotationSharedPerson.indexOf(data);
      console.log(this.CheckBox_DynamicArrayList_quotationSharedPerson)
      if (index == 1) {
        this.CheckBox_DynamicArrayList_quotationSharedPerson.splice(index, 1);
      } else {
        this.CheckBox_DynamicArrayList_quotationSharedPerson.splice(index, 1);
      }
      console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_quotationSharedPerson)
    }
    // this.quotationSharedPerson_List1 = k.toString();
    // console.log(this.quotationSharedPerson_List1)
    this.typeConvertionString_quotation_Shared_Permission = this.CheckBox_DynamicArrayList_quotationSharedPerson.toString();
    this.quotationSharedPerson_List1 = this.CheckBox_DynamicArrayList_quotationSharedPerson.toString();
    console.log("after--Final check After Selected/Deselected selected list", this.typeConvertionString_quotation_Shared_Permission)

  }
  quotationApprovalEdit(id: any) {

    this.quotationApproval_ID = id;
    let api_req: any = new Object();
    let quot_approval_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_permission_user";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_approval_req.action = "quotation_permission_user";
    quot_approval_req.quotationId = this.quotationApproval_ID;
    quot_approval_req.user_id = this.user_ids;

    api_req.element_data = quot_approval_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response.status == true) {

        this.quotationApprovalResult = response.user_list;

        // console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)

      }
      else {
        $("#quotationApprovalId").modal("hide");
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
        // this.editInvoiceGroupForm.reset();
        // this.contractList();
      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }

  }
  quotationApprovalUpdate() {

    if (this.quotationApprovedBy == undefined || this.quotationApprovedBy == 'undefined' || this.quotationApprovedBy == '') {
      this.quotationApprovedBy = '';
    }
    let api_req: any = new Object();
    let quot_approvalUpdate_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_send_to_approval";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    quot_approvalUpdate_req.action = "quotation_send_to_approval";
    quot_approvalUpdate_req.quotationId = this.quotationApproval_ID;
    quot_approvalUpdate_req.user_id = this.user_ids;
    quot_approvalUpdate_req.approval_type = this.Approval_Type_radiobox_Value;
    quot_approvalUpdate_req.quotation_comments = this.quotationApprovalForm.value.comments_approvedBy;
    quot_approvalUpdate_req.approval_by_name = this.quotationApprovedBy;
    console.log("this.quotationApprovedBy", this.quotationApprovedBy);
    if (this.Approval_Type_radiobox_Value == "double" && this.quotationApprovedBy == '') {

      iziToast.warning({
        message: "Select Approval By for Double Approval",
        position: 'topRight'
      });
      return false;

    }
    quot_approvalUpdate_req.assigned_comments = this.quotationApprovalForm.value.approval_comments;

    api_req.element_data = quot_approvalUpdate_req;

    $("#quotationApprovalId").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#quotationApprovalId").removeAttr("disabled");
      console.log("response status", response.status);
      if (response.status == true) {

        iziToast.success({
          message: "Quotation Sent for Approval",
          position: 'topRight'
        });
        $("#quotationApprovalId").modal("hide");
        this.quotationList({})

      }
      else {
        $("#quotationApprovalId").modal("hide");
        iziToast.error({
          message: "Data Not Found",
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
  quotationApprovalClear() {

    this.quotationApprovalForm.reset();
    window.location.reload()
  }
  deleteQuotation(id: any) {
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

        let api_req: any = new Object();
        let delete_quotation_req: any = new Object();
        api_req.moduleType = "quotation";
        api_req.api_url = "quotation/delete_quotation";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_quotation_req.action = "delete_quotation";
        delete_quotation_req.quotationId = id;
        delete_quotation_req.user_id = this.user_ids;
        api_req.element_data = delete_quotation_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            window.location.reload();
            this.quotationList({})
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Quotation Deleted Successfully",
              position: 'topRight'
            });
            this.quotationList({})
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  setTemplateName(quotationId: any) {

    this.template_quotationID = quotationId;
    let api_req: any = new Object();
    let templateName_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_template_name";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    templateName_req.action = "get_template_name";
    templateName_req.user_id = this.user_ids;
    templateName_req.quotationId = this.template_quotationID;
    api_req.element_data = templateName_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("set template name", response);
      if (response.status = true) {
        this.TemplateNameList = response.template_name;

        this.setTemplateNameForm.patchValue({
          'txt_templateName': response.template_name,
        });
      }

    });

  }
  templateNameUpdate() {

    let api_req: any = new Object();
    let templateNameUpdate_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/temaplete_name_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    templateNameUpdate_req.action = "temaplete_name_update";
    templateNameUpdate_req.user_id = this.user_ids;
    templateNameUpdate_req.quotationId = this.template_quotationID;
    templateNameUpdate_req.template_name = this.setTemplateNameForm.value.txt_templateName;
    api_req.element_data = templateNameUpdate_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {


      console.log("set template name update", response);
      if (response != '') {
        $("#setTemplateNameId").modal("hide");
      }
      // $("#setTemplateNameId").modal("hide");
    });

  }
  setActualCost(quotationId: any) {
    this.actualCost_quotationID = quotationId;
    let api_req: any = new Object();
    let actualCost_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_actualcost_quotation_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    actualCost_req.action = "get_actualcost_quotation_details";
    actualCost_req.user_id = this.user_ids;
    actualCost_req.quotationId = this.actualCost_quotationID;
    api_req.element_data = actualCost_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);

      console.log("set actual cost response", response);
      if (response.status = true) {
        this.actualCost_ProductList = response.product_details;
        this.quotationChildId_count = this.actualCost_ProductList.length + 1;

      }

    });


  }
  setActualCostSave() {

    console.log(this.actualCost_ProductList);
    for (let k = 0, i = 1; k < this.actualCost_ProductList.length; k++, i++) {
      this.actualCost_ProductList[k].act_diff_amt = $('#act_diff_amt_' + i).val();
      this.actualCost_ProductList[k].actual_cost = $('#actual_cost_' + i).val();
      this.actualCost_ProductList[k].actual_net_tot = $('#actual_net_tot_' + i).val();
      this.actualCost_ProductList[k].actual_percentage = $('#actual_percentage_' + i).val();
      this.actualCost_ProductList[k].invisiable_state = $('#invisiable_state_' + i).val();
      this.actualCost_ProductList[k].qty = $('#product_qty_' + i).val();

      this.actualCost_ProductList[k].price = $('#product_rate_' + i).val();
      this.actualCost_ProductList[k].productDesc = $('#AP_productDescription_' + i).val();
      this.actualCost_ProductList[k].productName = $('#AP_productName_' + i).val();

      this.actualCost_ProductList[k].quotationChildId = $('#quotationChildId_' + i).val();
      if ($('#invisiable_state_' + i).val() == 0) {
        this.actualCost_ProductList[k].totat_amt = $('#product_rate_' + i).val();
      } else {
        this.actualCost_ProductList[k].totat_amt = $('#price_' + i).val();
      }

      this.actualCost_ProductList[k].unit = $('#product_unit' + i).val();

    }
    console.log(this.actualCost_ProductList);
    console.log("form array group", this.setActualCost_FormGroup.value.addresses_actualCost)
    let api_req: any = new Object();
    let actualCostUpdate_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/update_actualcost_quotation_value";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    actualCostUpdate_req.action = "update_actualcost_quotation_value";
    actualCostUpdate_req.user_id = this.user_ids;
    actualCostUpdate_req.quotationId = this.actualCost_quotationID;
    actualCostUpdate_req.values = this.actualCost_ProductList;
    api_req.element_data = actualCostUpdate_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log(response);


      console.log("set actual cost response", response);
      if (response.status == true) {
        iziToast.success({
          message: "Success",
          position: 'topRight'
        });

        $("#setActualCostId").modal("hide");


      }

    });

  }

  fileAttachmentEdit(ID: any) {
    this.myFiles = [];
    $("#fileAttachmentFormId").modal("show");
    // this.fileAttachContractID = fileAttachContractID;
    this.fileAttach_quotationID = ID;
    let api_req: any = new Object();
    let fileattach_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/quotation_attachment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattach_req.action = "quotation_attachment_details";
    fileattach_req.quotationId = this.fileAttach_quotationID;
    fileattach_req.user_id = this.user_ids;
    api_req.element_data = fileattach_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check  file attachment", response)
      this.getFileAttachmentResult = response.attachment_list
      // this.firstResult = response.phone_provision_det;
      // this.secondResult=response.contract_attachment_arr;
      if (response.status == true) {
        this.FileAttachmentForm.patchValue({
          'file': response.attachment_list.uploadFileName,
        });
      }
    });


  }
  fileAttachmentClear() {
    this.FileAttachmentForm.reset();
  }
  quotationCommentsClear() {
    this.quotationCommentsForm.reset();
  }
  quotationEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.quotationList({});
    tinymce.activeEditor.setContent("");
  }
  fileAttachmentDelete(common_attachmentId: any) {
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result: any) => {
      if (result.value) {

        this.commonAttachmentID = common_attachmentId;
        let api_req: any = new Object();
        let fileattachDelete_req: any = new Object();
        api_req.moduleType = "quotation";
        // api_req.api_url = "customer/delete_file_attachment";
        api_req.api_url = "quotation/quotation_attachment_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        fileattachDelete_req.action = "quotation_attachment_delete";
        fileattachDelete_req.common_attachmentId = this.commonAttachmentID;
        fileattachDelete_req.user_id = this.user_ids;
        fileattachDelete_req.quotationId = this.fileAttach_quotationID;
        api_req.element_data = fileattachDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            iziToast.success({
              message: "File Attachment Deleted successfully",
              position: 'topRight'
            });

            $("#fileAttachmentFormId").modal("hide");

          } else {
            iziToast.warning({
              message: "File Attachment not deleted. Please try again",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
  // fileAttachmentUpdate() {
  //   this.FileAttachmentForm.reset();

  //   Swal.fire('File Updating');
  //   Swal.showLoading();

  //   if (this.myFiles.length == 0) {
  //     Swal.close();
  //     iziToast.warning({
  //       message: "Attachment File Missing",
  //       position: 'topRight'
  //     });
  //   }

  //   const data = new FormData();

  //   for (var i = 0; i < this.myFiles.length; i++) {
  //     data.append("cust_file[]", this.myFiles[i]);
  //   }
  //   for (var j = 0; j < this.edit_array.length; j++) {
  //     data.append("quotation_pdf_add[]", this.edit_array[j]);
  //   }
  //   data.append('user_id', "2");
  //   data.append('quotationId', this.fileAttach_quotationID);

  //   data.append('action', "quotation_attachment_save");


  //   var self = this;
  //   $.ajax({
  //     type: 'POST',
  //     url: 'https://erp1.cal4care.com/api/quotation/quotation_attachment_save',
  //     cache: false,
  //     contentType: false,
  //     processData: false,
  //     data: data,
  //     success: function (result: any) {
  //       if (result.status == true) {
  //         self.quotationList({});
  //         console.log(result);
  //         Swal.close();
  //         $("#fileAttachmentFormId").modal("hide");
  //         this.edit_array = [];

  //         iziToast.success({
  //           message: "File Attachment Saved successfully",
  //           position: 'topRight'
  //         });
  //       }
  //     },
  //     error: function (err: any) {
  //       console.log(err);
  //     }
  //   })

  // }
  fileAttachmentUpdate() {

    this.FileAttachmentForm.reset();
    //  var data = new FormData();
    Swal.fire('File Updating');
    Swal.showLoading();

    if (this.myFiles.length == 0) {
      Swal.close();
      iziToast.warning({
        message: "Attachment File Missing",
        position: 'topRight'
      });
    }

    if (this.myFiles.length > 0) {

      const data = new FormData();

      for (var i = 0; i < this.myFiles.length; i++) {
        data.append("cust_file[]", this.myFiles[i]);
      }
      for (var j = 0; j < this.edit_array.length; j++) {
        data.append("quotation_pdf_add[]", this.edit_array[j]);
      }

      data.append('user_id', "2");
      data.append('quotationId', this.fileAttach_quotationID);
      // data.append('quotation_pdf_add[]',this.edit_array ); 
      data.append('action', "quotation_attachment_save");


      var self = this;
      $.ajax({
        type: 'POST',
        url: 'https://erp1.cal4care.com/api/quotation/quotation_attachment_save',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function (result: any) {
          if (result.status == true) {
            self.quotationList({});
            console.log(result);
            Swal.close();
            $("#fileAttachmentFormId").modal("hide");
            this.edit_array = [];

            iziToast.success({
              message: "File Attachment Saved successfully",
              position: 'topRight'
            });
          }
          else {
            Swal.close();
            $("#fileAttachmentFormId").modal("hide");

            iziToast.warning({
              message: "File Attachment Update Failed",
              position: 'topRight'
            });
          }
        },
        error: function (err: any) {

          console.log("err", err)
          iziToast.error({
            message: "Server Side Error",
            position: 'topRight'
          });
          Swal.close();
          $("#fileAttachmentFormId").modal("hide");
        }

      })


    }
  }
  Email(QuotationID: any) {
    this.emailForm.reset();
    this.EmailQuotationID = QuotationID;


    let api_req: any = new Object();
    let emailPage_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/sendmail_popup_quot";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    emailPage_req.action = "sendmail_popup_quot";
    emailPage_req.user_id = this.user_ids;
    emailPage_req.quotation_id = this.EmailQuotationID;
    api_req.element_data = emailPage_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("emailpagecontent", response)
      if (response != true) {
        // this.myForm.reset();
        console.log("emailpagecontent", response)
        // $("#fileAttachmentFormId").modal("hide");
        this.email_fromList = response.email_from;
        this.email_crmTemplateList = response.crm_template;
        this.email_cc_userList = response.cc_user;
        this.emailForm.patchValue({

          'email_to': response.to_email,


        });

      }


    });

  }

  templateContentEmailDropdown(event: any) {
    this.quotation_Emailtemplate_id = event.target.value;
    console.log("quotation dropdown ID check", this.quotation_Emailtemplate_id);
    let api_req: any = new Object();
    let api_quotationTemplateDropdown_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/get_email_quotation_template";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationTemplateDropdown_req.action = "get_email_quotation_template";
    api_quotationTemplateDropdown_req.user_id = this.user_ids;
    api_quotationTemplateDropdown_req.quotation_id = this.EmailQuotationID
    api_quotationTemplateDropdown_req.template_id = this.quotation_Emailtemplate_id;
    api_req.element_data = api_quotationTemplateDropdown_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("quotation-template Dropdown response", response)
      this.messageContent = response.crm_template_content
      this.mailContent = tinymce.get('tinyID').setContent("<p>" + this.messageContent + "</p>");
      if (response != '') {
        this.emailForm.patchValue({

          'Subject_Content': response.crm_subject_name,

          'tinyID': this.mailContent,

        });

      }
      else {
        this.emailForm.patchValue({

          'email_template': '',

        });
      }


    });
  }
  sendMail() {
    Swal.fire('Sending Email');
    Swal.showLoading();

    this.FromEmailValue = $('#emailFrom').val();
    this.emailTo = $('#emailto').val();
    this.subjectValue = $('#subject').val();
    this.msg_id = tinymce.get('tinyID').getContent();
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)
    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "sendemail/quotation_sendmail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "quotation_sendmail";
    api_email_req.user_id = this.user_ids;
    // api_email_req.customer_contract_id = this.EmailCustomerContractID;

    api_email_req.from_email = this.FromEmailValue;
    if (this.FromEmailValue === null || this.FromEmailValue === '' || this.FromEmailValue === 'undefined' || this.FromEmailValue === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.to_email = this.emailTo;
    if (this.emailTo === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.cc_email = this.edit_array_emailCC_Checkbox;
    api_email_req.subject = this.subjectValue;
    if (this.subjectValue === null || this.subjectValue === '' || this.subjectValue === 'undefined' || this.subjectValue === undefined) {

      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.mail_message = this.msg_id;
    if (this.msg_id === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.quotation_id = this.EmailQuotationID;
    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");
        this.quotationList({})
        Swal.close();
        iziToast.success({
          message: "Email Notification Sent Successfully",
          position: 'topRight'
        });

      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");
        Swal.close();
        this.quotationList({})
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        this.quotationList({})

      }
      Swal.close();
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  initTiny() {
    var richTextArea_id = 'richTextAreacreated';
    tinymce.init({
      selector: '#richTextAreacreated',
      height: 500,
      plugins: 'advlist autolink textcolor formatpainter lists link  image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste  wordcount autolink lists media table',
      toolbar: 'undo redo |fullscreen|forecolor backcolor| formatselect | bold italic | \ undo redo | link image file| code | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | autoresize',
      paste_data_images: true,
      images_upload_url: 'upload.php',
      automatic_uploads: false,
      default_link_target: "_blank",
      extended_valid_elements: "a[href|target=_blank]",
      link_assume_external_targets: true,
      images_upload_handler: function (blobInfo: any, success: any, failure: any) {
        var xhr: any, formData;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'upload.php');

        xhr.onload = function () {
          var json;

          if (xhr.status != 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }

          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.file_path != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }

          success(json.file_path);
        };

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
      },
    });
    if (tinymce.editors.length > 0) {
      //  tinymce.execCommand('mceFocus', true, richTextArea_id );       
      tinymce.execCommand('mceRemoveEditor', true, richTextArea_id);
      tinymce.execCommand('mceAddEditor', true, richTextArea_id);
    }
  }

  quotationCommentsEdit(quotationID: any, transactionID: any) {
    console.log("transactionid", transactionID)
    if (transactionID != null) {

      this.comment_QuotationID = quotationID;
      this.comment_TransactionID = transactionID;
      let api_req: any = new Object();
      let transactionComment_req: any = new Object();
      api_req.moduleType = "quotation";
      api_req.api_url = "quotation/transaction_enquiry_command";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      transactionComment_req.action = "transaction_enquiry_command";
      transactionComment_req.user_id = this.user_ids;
      transactionComment_req.transaction_id = this.comment_TransactionID;
      api_req.element_data = transactionComment_req;
      this.serverService.sendServer(api_req).subscribe((response: any) => {

        if (response.status == true) {
          this.response_CommentResult = response.commands;
        }


      });
    } else {
      $('#quotationCommentsId').modal('hide');

      iziToast.warning({
        message: "Transaction ID is empty. Unable to save Comments. Please try with Transaction ID",
        position: 'topRight'
      });
    }


  }
  quotationCommentsSave() {

    let api_req: any = new Object();
    let transactionCommentSave_req: any = new Object();
    api_req.moduleType = "quotation";
    api_req.api_url = "quotation/transaction_enquiry_command_save";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    transactionCommentSave_req.action = "transaction_enquiry_command_save";
    transactionCommentSave_req.user_id = this.user_ids;

    transactionCommentSave_req.transaction_id = this.comment_TransactionID;
    transactionCommentSave_req.commands = this.quotationCommentsForm.value.quotation_Comments;
    api_req.element_data = transactionCommentSave_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status == true) {
        $('#quotationCommentsId').modal('hide');
        iziToast.success({
          message: "Comment Added successfully",
          position: 'topRight'
        });

        this.quotationCommentsForm.reset();

      } else {
        iziToast.warning({
          message: "Comment Failed. Please try again",
          position: 'topRight'
        });
      }
    });




  }
  PIEdit1(quotationId: any) {

  }
  PIEdit(quotationId: any) {
    this.PIResult = [];//for refreshing we are emptying the variable
    // this.invoiceCheckboxID_array=[];
    //for refreshing we are emptying the variable
    this.quotationID_PI = quotationId;
    let api_req: any = new Object();
    let piEdit_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "quotation/set_small_task";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    piEdit_req.action = "set_small_task";
    piEdit_req.quotationId = this.quotationID_PI;
    piEdit_req.userId = "2";
    api_req.element_data = piEdit_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status", response.status);
      if (response.status == true) {

        this.PIResult = response.user_list;
        this.CustomerName_Result = response.customer_name;
        this.ProductDescription_Result = response.description;
        // iziToast.success({
        //     message: "Invoice attachment displayed successfully",
        //     position: 'topRight'
        // });
        // this.editInvoiceGroupForm.reset();

        // this.contractList();
      }
      else {
        $("#invoiceAttachmentId").modal("hide");
        iziToast.error({
          message: "Data Not Found",
          position: 'topRight'
        });
        // this.editInvoiceGroupForm.reset();
        // this.contractList();
      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  quotationConvertPI() {

    let api_req: any = new Object();
    let api_quotConvertPI_req: any = new Object();
    api_req.moduleType = "quotation";

    api_req.api_url = "quotation/quotation_convert_to_proformainvoice";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotConvertPI_req.action = "quotation_convert_to_proformainvoice";
    api_quotConvertPI_req.user_id = this.user_ids;
    api_quotConvertPI_req.quotationId = this.quotationID_PI;
    api_req.element_data = api_quotConvertPI_req;

    $("#PIId").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#PIId").removeAttr("disabled");
      console.log("response-quotation convert pi", response)
      if (response.status == true) {
        iziToast.success({
          message: "PI Conversion Successfull. Go to Old ERP PI List",
          position: 'topRight'
        });
        this.quotationList({});
        $('#PIId').modal('hide');
      }
      else {
        $('#PIId').modal('hide');
        iziToast.warning({
          message: "Data Not Found",
          position: 'topRight'
        });
        this.quotationList({});

      }
    }), (error: any) => {
      iziToast.error({
        message: "Sorry, some server issue occur. Please contact admin",
        position: 'topRight'
      });
      console.log("final error", error);
    }
  }
  pdf(quotationId: any) {
    var url = "https://erp1.cal4care.com/api/quotation/show_quotation_pdf?id=" + quotationId + "";
    window.open(url, '_blank');
    console.log("url", url)
    $('#pdfFormId').modal('hide');
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }
  quotationExcelExport(quotationId: any) {
    let api_req: any = new Object();
    let api_quotExcel_req: any = new Object();
    api_req.moduleType = "quotation";

    api_req.api_url = "quotation/excel_export";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotExcel_req.action = "excel_export";
    api_quotExcel_req.user_id = this.user_ids;
    api_quotExcel_req.quotation_id = quotationId;
    api_req.element_data = api_quotExcel_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      this.ExcelReportResult = response.web_excel_path;
      window.open(this.ExcelReportResult, '_blank')
      console.log("response-quotation convert pi", response)
      if (response.status != '') {
        iziToast.success({
          message: "Excel file has been downloaded",
          position: 'topRight'
        });

      }
      else {

        iziToast.warning({
          message: "Data Not Found",
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
  keyPress(event: any, i: any) {

    //   var key = event.target.value;
    //   var bill_cnt = $('#quotationChildId_count').val();
    //   var actual_cost=0,
    // actual_cost_tot=0,
    // product_qty=0,
    // product_rate=0,
    // actual_net_tot=0,
    // actual_cost_net_tot=0,
    // actual_percentage=0;
    //   var product_net_amt=0,act_diff_amt =0,act_diff_amt_tot=0;
    //   for(i=1;i<bill_cnt;i++){
    //     if($('#invisiable_state_'+i).val()==0){
    //       actual_cost = $('#actual_cost_'+i).val();
    //       product_qty = $('#product_qty_'+i).val();
    //       product_rate = $('#product_rate_'+i).val();
    //       product_net_amt = $('#product_net_amt_'+i).val();
    //       actual_percentage = $('#actual_percentage_'+i).val();
    //       if(actual_percentage>0){    
    //         actual_cost = (parseFloat(product_rate)*parseFloat(actual_percentage)/100).toFixed(2);
    //         $('#actual_cost_'+i).val(actual_cost);                            
    //       }
    //         actual_net_tot = (parseFloat(product_qty)*parseFloat(actual_cost)).toFixed(2);;                        
    //         act_diff_amt = (parseFloat(product_net_amt)-parseFloat(actual_net_tot)).toFixed(2);;
    //         $('#act_diff_amt_'+i).val(act_diff_amt);
    //         $('#actual_net_tot_'+i).val(actual_net_tot);
    //         actual_cost_tot+=parseFloat(actual_cost);
    //         actual_cost_net_tot+=parseFloat(actual_net_tot);
    //         act_diff_amt_tot+=parseFloat(act_diff_amt);
    //     }else{
    //       act_diff_amt_tot = act_diff_amt_tot-$('#price_'+i).val();
    //       $('#act_diff_amt_'+i).val(-$('#price_'+i).val());
    //     }
    //           }



  }



  AddQuotationGo() {

    if (this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP === null) {

      iziToast.warning({
        message: "Choose Enquiry From",
        position: 'topRight'
      });
      return false;

    }
    var enq_formID = this.addNewQuotationPopUpForm.value.enquiryFrom_addPopUP;
    if (this.addNewQuotationPopUpForm.value.enquirySubject_addPopUP === null) {

      iziToast.warning({
        message: "Choose Enquiry Subject",
        position: 'topRight'
      });
      return false;

    }
    var enq_subject = this.addNewQuotationPopUpForm.value.enquirySubject_addPopUP;
    if (this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP === null) {

      iziToast.warning({
        message: "Choose Quotation Validity",
        position: 'topRight'
      });
      return false;

    }
    var enq_quotation_valid_day = this.addNewQuotationPopUpForm.value.quotationValidity_addPopUP;
    var enq_duplicate_version = this.addNewQuotationPopUpForm.value.version_enqForm_addPopUP;


    this.router.navigate(['/addquotationnew'], { queryParams: { formID: enq_formID, subject: enq_subject, validity: enq_quotation_valid_day, version: enq_duplicate_version } });

    $('#addNewQuotationFormId').modal('hide');
  }
  EditQuotationGo() {
    console.log("e_formID", this.editNewQuotationPopUpForm.value.e_enquiryFrom_addPopUP)
    console.log("e_subject", this.editNewQuotationPopUpForm.value.e_enquirySubject_addPopUP)
    console.log("e_valid", this.editNewQuotationPopUpForm.value.e_quotationValidity_addPopUP)
    console.log("e_version", this.editNewQuotationPopUpForm.value.e_version_enqForm_addPopUP)
    var editQuotID = this.edit_quotationID;
    var enq_formID = this.editNewQuotationPopUpForm.value.e_enquiryFrom_addPopUP;
    var enq_subject = this.editNewQuotationPopUpForm.value.e_enquirySubject_addPopUP;
    var enq_quotation_valid_day = this.editNewQuotationPopUpForm.value.e_quotationValidity_addPopUP;
    var enq_duplicate_version = this.editNewQuotationPopUpForm.value.e_version_enqForm_addPopUP;

    this.router.navigate(['/editquotationnew'], {
      queryParams: {
        e_quotID: editQuotID,
        e_formID: enq_formID,
        e_subject: enq_subject,
        e_validity: enq_quotation_valid_day,
        e_version: enq_duplicate_version
      }
    });
    $('#editNewQuotationFormId').modal('hide');


  }

  DuplicateQuotationGo() {



    let api_req: any = new Object();
    let api_dup_req: any = new Object();
    api_req.moduleType = "quotation";

    api_req.api_url = "quotation/duplicate_quotation";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_dup_req.action = "duplicate_quotation";
    api_dup_req.user_id = this.user_ids;
    api_dup_req.quotation_id = this.duplicate_quotationID;
    api_dup_req.enquiry_from_id = this.duplicateQuotationPopUpForm.value.d_enquiryFrom_addPopUP;
    api_dup_req.quotation_valid_day = this.duplicateQuotationPopUpForm.value.d_quotationValidity_addPopUP;
    api_dup_req.duplicate_version = this.duplicateQuotationPopUpForm.value.d_version_enqForm_addPopUP;
    api_req.element_data = api_dup_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response-quotation convert pi", response);
      // console.log("quotationId_new", response.quotationId_new)
      //  this.quotationId_new = response.quotationId_new;
      var editQuotID = response.quotationId_new;

      var enq_formID = this.duplicateQuotationPopUpForm.value.d_enquiryFrom_addPopUP;
      var enq_subject = this.duplicateQuotationPopUpForm.value.d_enquirySubject_addPopUP;
      var enq_quotation_valid_day = this.duplicateQuotationPopUpForm.value.d_quotationValidity_addPopUP;
      var enq_duplicate_version = this.duplicateQuotationPopUpForm.value.d_version_enqForm_addPopUP;
      this.router.navigate(['/editquotationnew'], { queryParams: { e_quotID: editQuotID, e_formID: enq_formID, e_subject: enq_subject, e_validity: enq_quotation_valid_day, e_version: enq_duplicate_version } });
      $('#duplicateQuotationFormId').modal('hide');

    });
    // console.log("editQuotID", editQuotID);



  }


  get_actual_total() {
    var bill_cnt = $('#quotationChildId_count').val();
    let actual_cost, product_qty, product_rate, actual_net_tot, actual_percentage;
    let product_net_amt, act_diff_amt;
    let actual_cost_tot = 0;
    let actual_cost_net_tot = 0;
    let act_diff_amt_tot = 0;

    for (let i = 1; i < bill_cnt; i++) {
      if ($('#invisiable_state_' + i).val() == 0) {
        console.log('test');
        actual_cost = $('#actual_cost_' + i).val();
        product_qty = $('#product_qty_' + i).val();
        product_rate = $('#product_rate_' + i).val();
        product_net_amt = $('#product_net_amt_' + i).val();
        actual_percentage = $('#actual_percentage_' + i).val();
        console.log(product_rate);
        console.log(actual_cost);
        console.log(actual_percentage);
        console.log(product_qty);
        console.log(product_net_amt);
        if (actual_cost == '') {
          actual_cost = 0;
        }
        // break
        if (actual_percentage > 0) {
          actual_cost = (parseFloat(product_rate) * parseFloat(actual_percentage) / 100).toFixed(2);
          $('#actual_cost_' + i).val(actual_cost);
        }
        actual_net_tot = (parseFloat(product_qty) * parseFloat(actual_cost)).toFixed(2);
        console.log(actual_net_tot);
        act_diff_amt = (parseFloat(product_net_amt) - parseFloat(actual_net_tot)).toFixed(2);
        console.log(act_diff_amt);
        $('#act_diff_amt_' + i).val(act_diff_amt);
        $('#actual_net_tot_' + i).val(actual_net_tot);
        actual_cost_tot += parseFloat(actual_cost);
        actual_cost_net_tot += parseFloat(actual_net_tot);
        act_diff_amt_tot += parseFloat(act_diff_amt);
      } else {
        act_diff_amt_tot = act_diff_amt_tot - $('#price_' + i).val();
        $('#act_diff_amt_' + i).val(-$('#price_' + i).val());
      }
    }


    $('#actual_cost_tot').text(actual_cost_tot);
    $('#actual_net_tot').text(actual_cost_net_tot);
    $('#act_diff_amt_tot').text(act_diff_amt_tot);
  }

}

