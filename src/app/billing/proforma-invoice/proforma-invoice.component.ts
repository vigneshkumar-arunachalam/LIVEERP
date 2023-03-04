import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any
declare var iziToast: any;
declare var tinymce: any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-proforma-invoice',
  templateUrl: './proforma-invoice.component.html',
  styleUrls: ['./proforma-invoice.component.css']
})
export class ProformaInvoiceComponent implements OnInit {
  //list
  PI_list: any;
  biller_list: any;
  biller_temp: any;
  //list-checkbox all
  checkbox_value: any;
  edit_array: any = [];
  //dummy list
  user_list: any;
  //pagination
  recordNotFound = false;
  pageLimit = 50;
  paginationData: any = { "info": "hide" };
  offset_count = 0;
  //payment process
  processPaymentForm: FormGroup;
  isReadOnly: boolean = true;
  invoiceDetails_payment:any;
  paymentType_payment:any;
  paymentDetails_payment:any;
  billID_processPayment:any;
 
  //invoice type details
  invoiceTypeDetailsForm: FormGroup;
  //coupon assign
  couponAssignForm:FormGroup;
 
 
    //email-landscape
 
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
    email_groupMailList:any;

    edit_array_emailCC_Checkbox: any = [];
    quotation_Emailtemplate_id: any;
    messageContent: any;
    mailContent: any;
    FromEmailValue: any;
    Email_BillId:any;
    CBV_TemplateSelection:any;
    CBV_PDFLink:any;
    CBV_PaymentLink:any;

  //email-checkbox
  email_array_emailCC_Checkbox: any = [];
  groupSelect_emailCCId:any;
  email_checkbox_value:any;

  // set-Invoice-type-name

  setInvoiceType: FormGroup;
  InvoiceType_BillerID:any
  InvoiceTypeList:any;
  //term
  setTermCondition: FormGroup;
  TermDetailsList:any;
  TermCondition_BillerID:any;

  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
    this.PIList({});
    this.processPaymentForm = new FormGroup({
      'invoiceID': new FormControl(null),
      'toal': new FormControl(null),
      'biller': new FormControl(null),
      'paid': new FormControl(null),
      'customer': new FormControl(null),
      'owing': new FormControl(null),
      'amount': new FormControl(null, [Validators.required, Validators.pattern('^-?[1-9]\\d*(\\.\\d{1,2})?$')]),
      'date': new FormControl((new Date()).toISOString().substring(0, 10)),
      'paymenttype': new FormControl(null),
      'note': new FormControl(null),
      'paymentDetails': new FormControl(null),

    });
    this.invoiceTypeDetailsForm = new FormGroup({
      'paymenttype': new FormControl(null),
    });
    
    this.couponAssignForm = new FormGroup({
      'couponCode': new FormControl(null),
    });
    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      'radio_ApprovalBy':new FormControl(null, Validators.required),
      'email_From': new FormControl(null, Validators.required),
      // 'email_pdfType': new FormControl(null, Validators.required),
      'email_template': new FormControl(null, Validators.required),
      'email_cc': new FormControl(null, Validators.required),

    });

    this.setInvoiceType = new FormGroup({
    'setInvoice' : new FormControl(null)
    });
        
    this.setTermCondition = new FormGroup({
      'setTerm' : new FormControl(null)
    });
  }
  handle_radioChange_email(event: any) {
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);
  }
  radioChange_selectToType(event:any){
    this.Select_To_Type_radiobox_Value = event.target.id;
    console.log(this.Select_To_Type_radiobox_Value);
  }
  CBF_TemplateSelection(event:any){
    this.CBV_TemplateSelection=event.target.checked;
    console.log(this.CBV_TemplateSelection);
  }
  CBF_PDFLink(event:any){
    this.CBV_PDFLink=event.target.checked;
    console.log(this.CBV_PDFLink);
  }
  CBF_PaymentLink(event:any){
    this.CBV_PaymentLink=event.target.checked;
    console.log(this.CBV_PaymentLink);

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
  getEmailDetails(id:any){
   this.Email_BillId=id;
    let api_req: any = new Object();
    let api_emailDetails: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/send_invoice_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_emailDetails.action = "send_invoice_details";

    api_emailDetails.billId = id;
    api_emailDetails.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_emailDetails;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
     
        this.email_fromList = response.email_from_arr;
        this.email_groupMailList=response.group_mail;
        this.email_crmTemplateList = response.crm_template_list;
        this.email_cc_userList = response.cc_user;
        this.messageContent = response.invoice_content;
        this.mailContent = tinymce.get('tinyID').setContent("<p>" + this.messageContent + "</p>");
        this.emailForm.patchValue({
         
          'tinyID': this.mailContent, 
          'Subject_Content':response.subject,


        })
        if(this.Select_To_Type_radiobox_Value=='finance'){
          this.emailForm.patchValue({
            'email_to': response.finance_email, 
            'tinyID': this.mailContent,          
          })
        }
        else{
          this.emailForm.patchValue({
            'email_to': response.company_email,    
            'tinyID': this.mailContent,     
          })
        }
      
       
        iziToast.success({
          message: "Payment Process Details displayed Successfully",
          position: 'topRight'

        });
        this.PIList({});
      } else {

        $('#processPaymentFormId').modal("hide");
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
    api_quotationTemplateDropdown_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
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
    var pdf_state=0
if(this.CBV_TemplateSelection==true ||  this.CBV_PDFLink==true ||   this.CBV_PaymentLink==true ){
  var pdf_state=1;
  console.log("if condition if any checkbox selects",pdf_state)
}
else{
  var pdf_state=0;
  console.log("if condition if none of checkbox selects",pdf_state)
}


    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "invoice";
    api_req.api_url = "invoice/invoice_details_sendmail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "invoice_details_sendmail";
    api_email_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_email_req.billId = this.Email_BillId;

    api_email_req.fromEmailId = this.FromEmailValue;
    if (this.FromEmailValue === null || this.FromEmailValue === '' || this.FromEmailValue === 'undefined' || this.FromEmailValue === undefined) {

      iziToast.warning({
        message: "Choose From Email Value",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.toEmailId = this.emailTo;
    if (this.emailTo === null) {

      iziToast.warning({
        message: "Choose To Email Value",
        position: 'topRight'
      });
      return false;

    }
    // api_email_req.cc_email = this.edit_array_emailCC_Checkbox;
    api_email_req.pdf_state = pdf_state;
    api_email_req.subject = this.subjectValue;
    if (this.subjectValue === null || this.subjectValue === '' || this.subjectValue === 'undefined' || this.subjectValue === undefined) {

      iziToast.warning({
        message: "Choose Subject",
        position: 'topRight'
      });
      return false;

    }
    api_email_req.message = this.msg_id;
    if (this.msg_id === null) {

      iziToast.warning({
        message: "Choose Message",
        position: 'topRight'
      });
      return false;

    }
 
    api_req.element_data = api_email_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      Swal.close();
      console.log("response status", response.status);
      if (response.status == true) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");
        this.PIList({});
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
        this.PIList({});
        iziToast.success({
          message: "Email Notification Sent !!!!",
          position: 'topRight'
        });
        this.PIList({});

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
  PIEmailClear() {
    this.emailForm.reset();
    this.msg_id = '';
    this.PIList({});
    tinymce.activeEditor.setContent("");
  }
  PIList(data: any) {

    var list_data = this.listDataInfo(data);

    let api_req: any = new Object();
    let api_quotationList: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/proforma_invoice_list"
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_quotationList.action = "quotation_list";
    api_quotationList.user_id = sessionStorage.getItem("user_id");
    api_quotationList.off_set = list_data.offset;
    api_quotationList.limit_val = list_data.limit;
    api_quotationList.current_page = "";

    api_req.element_data = api_quotationList;

    
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
 
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }
  selectAll(event: any) {
    console.log(event.target.checked)
    if (event.target.checked == true) {

      this.PI_list.forEach((element: any, index: any) => {

        $("#check-grp1-" + index).prop('checked', true);
      });
    } else {
      this.PI_list.forEach((element: any, index: any) => {

        $("#check-grp1-" + index).prop('checked', false);
      });

    }

  }

  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    // this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array.push(data);
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
  addPIGo() {
    this.router.navigate(['/AddPI'])
  }
  editPIGo(id: any) {
    var editbillID = id;
    this.router.navigate(['/EditPI'])

    this.router.navigate(['/EditPI'], {
      queryParams: {
        e_editBillID: editbillID,
      }
    });
  }
 
  CHKGroup_emailCC(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelect_emailCCId = data;
    this.email_checkbox_value = event.target.checked;
    console.log(this.email_checkbox_value)
    if (this.email_checkbox_value) {

      this.email_array_emailCC_Checkbox.push(data);
      this.email_array_emailCC_Checkbox.join(',');
      console.log("Final Checkbox After checkbox selected list", this.email_array_emailCC_Checkbox);
    }
    else {
      const index = this.email_array_emailCC_Checkbox.findIndex((el: any) => el === data)
      if (index > -1) {
        this.email_array_emailCC_Checkbox.splice(index, 1);
      }
      console.log("Final Checkbox After Deselected selected list", this.email_array_emailCC_Checkbox)

    }
  }

  paymentProcess(data:any){
    var list_payment = data;
    let api_req: any = new Object();
    let api_paymentPI_req: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_payment_details";
    api_req.api_type = "web";
    api_req.access_token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_paymentPI_req.action = "invoice_payment_details";
    api_paymentPI_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
     api_paymentPI_req.billId = list_payment ;
    api_req.element_data = api_paymentPI_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if( response.status==true){
        // this.enquiryFromList = response.;
      }

    })
  }

  deleteProformaInvoice(billId :any){
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

        Swal.fire('Deleting');
        Swal.showLoading();
        let api_req: any = new Object();
        let del_req: any = new Object();
        api_req.moduleType = "invoice";
        api_req.api_url = "invoice/suspend_invoice";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        del_req.action = "suspend_invoice";
        del_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
        del_req.billId = billId;
        api_req.element_data = del_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {

            Swal.close();
            iziToast.success({
              message: "Proforma Invoice Deleted Successfully",
              position: 'topRight'
            });
          } else {
            Swal.close();
            iziToast.warning({
              message: "Proforma Invoice Delete Failed",
              position: 'topRight'
            });
          }
        }),
          (error: any) => {
            Swal.close();
            iziToast.error({
              message: "Sorry, some server issue occur. Please contact admin",
              position: 'topRight'
            });
            console.log("final error", error);
          };
      }
    })
  }

  EmailEdit(a:any){
    
  }

  pdf(billId: any) {
    var url = "https://erp1.cal4care.com/api/quotation/show_quotation_pdf?id=" + billId + "";
    window.open(url, '_blank');
    console.log("url", url)
  }

  showPerission(){

    alert("Are you sure you want to bill show permission?")
  }
  clearPaymentProcess(){

    $("#amount").val('');
    $("#note").val('');
  }
  processPaymentEdit(id:any){

 
    this.billID_processPayment=id;
    let api_req: any = new Object();
    let api_processpaymentEdit: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/proforma_invoice_payment_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentEdit.action = "proforma_invoice_payment_details";

    api_processpaymentEdit.billId = id;
    api_processpaymentEdit.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_processpaymentEdit;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
       this.invoiceDetails_payment=response.invoice_details;
       this.paymentType_payment=response.payment_type;
       this.paymentDetails_payment=response.payment_details;
        this.processPaymentForm.patchValue({
          'invoiceID':response.invoice_details[0].invoice_no,
          'toal':response.invoice_details[0].netPayment,
          'biller':response.invoice_details[0].billerName,
          'paid':response.paid_amount,
          'customer':response.invoice_details[0].customerName,
          'owing':response.owing_amount,
          
        })
       
        iziToast.success({
          message: "Payment Process Details displayed Successfully",
          position: 'topRight'

        });
        this.PIList({});
      } else {

        $('#processPaymentFormId').modal("hide");
        iziToast.warning({
          message: "Payment Process Details not displayed. Please try again",
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
  processPaymentUpdate(){
    Swal.fire('Updating');
    Swal.showLoading();
    
    let api_req: any = new Object();
    let api_processpaymentUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/proforma_invoice_payment_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_processpaymentUpdate.action = "proforma_invoice_payment_update";

    api_processpaymentUpdate.billId =  this.billID_processPayment;
    api_processpaymentUpdate.user_id = sessionStorage.getItem('erp_c4c_user_id');
    if(this.processPaymentForm.value.amount=== null){
      Swal.close();
      iziToast.warning({
        message: "Amount Value Missing",
        position: 'topRight'
      });
      
      return false;
    }
 
    api_processpaymentUpdate.amount=this.processPaymentForm.value.amount;
    api_processpaymentUpdate.paymentDate=this.processPaymentForm.value.date;
    api_processpaymentUpdate.payment_method=this.processPaymentForm.value.paymenttype;
    if(this.processPaymentForm.value.paymenttype=== null){
      Swal.close();
      iziToast.warning({
        message: "Payment Type Missing",
        position: 'topRight'
      });
      return false;
    }
    api_processpaymentUpdate.note=this.processPaymentForm.value.note;
    api_req.element_data = api_processpaymentUpdate;
    $("#processPaymentFormId").attr("disabled", true);
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      $("#processPaymentFormId").removeAttr("disabled");
      if (response.status == true) {
   
        Swal.close();
        $('#processPaymentFormId').modal("hide");
        iziToast.success({
          message: "Payment Process Updated Successfully",
          position: 'topRight'

        });
        this.PIList({});
        
      } else {
        Swal.close();
        $('#processPaymentFormId').modal("hide");
        iziToast.warning({
          message: "Payment Process not displayed. Please try again",
          position: 'topRight'
        });
       
      }
    }),
      (error: any) => {
        Swal.close();
        iziToast.error({
          message: "Sorry, some server issue occur. Please contact admin",
          position: 'topRight'
        });
        console.log("final error", error);
        
      };
  }

  setInvoiceTypeNameEdit(id:any){
    this.InvoiceType_BillerID=id;
    
    let api_req: any = new Object();
    let api_invoiceTyp: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_type_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invoiceTyp.action = "invoice_type_get";

    api_invoiceTyp.billId = id;
    api_invoiceTyp.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_invoiceTyp;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.InvoiceTypeList = response.invoice_type_det;
        console.log("response.selected_invoice_type",response.selected_invoice_type)
        this.setInvoiceType.patchValue({
          'setInvoice':response.selected_invoice_type
        })
       
        iziToast.success({
          message: "Invoice Type Details displayed Successfully",
          position: 'topRight'

        });

      } else {

        $('#setInvoiceTypeNameFormId').modal("hide");
        iziToast.warning({
          message: "Invoice Type Details not displayed. Please try again",
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
  setInvoiceTypeNameUpdate(){
    
    let api_req: any = new Object();
    let api_invTypeUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/invoice_type_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_invTypeUpdate.action = "invoice_type_update";
    api_invTypeUpdate.billId =   this.InvoiceType_BillerID;
    api_invTypeUpdate.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_invTypeUpdate.invoice_type_values = this.setInvoiceType.value.setInvoice;
    api_req.element_data = api_invTypeUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
      
       
        iziToast.success({
          message: "Term Condition Details Updated Successfully",
          position: 'topRight'

        });
        $('#setInvoiceTypeNameFormId').modal("hide");
      } else {

        $('#setInvoiceTypeNameFormId').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not Updated. Please try again",
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
  setInvoiceTypeClear(){
    this.setInvoiceType.reset();
  }


  setTermsConditionEdit(id:any){
    // this.setInvoiceType.reset();
    this.TermCondition_BillerID=id;
    
    let api_req: any = new Object();
    let api_insertProforma: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/terms_condition_get";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProforma.action = "terms_condition_get";

    api_insertProforma.billId = id;
    api_insertProforma.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_req.element_data = api_insertProforma;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.TermDetailsList = response.terms_details;
        this.setTermCondition.patchValue({
          'setTerm':response.selected_terms
        })
       
        iziToast.success({
          message: "Term Condition Details displayed Successfully",
          position: 'topRight'

        });

      } else {

        $('#settermsConditionFormId').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not displayed. Please try again",
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
  setTermsConditionUpdate(){
    
    let api_req: any = new Object();
    let api_insertProformaUpdate: any = new Object();
    api_req.moduleType = "proforma";
    api_req.api_url = "proforma/terms_condition_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_insertProformaUpdate.action = "terms_condition_update";
    api_insertProformaUpdate.billId =   this.TermCondition_BillerID;
    api_insertProformaUpdate.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_insertProformaUpdate.terms_values = this.setTermCondition.value.setTerm;
    api_req.element_data = api_insertProformaUpdate;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
      
       
        iziToast.success({
          message: "Term Condition Details Updated Successfully",
          position: 'topRight'

        });
        $('#settermsConditionFormId').modal("hide");
      } else {

        $('#settermsConditionFormId').modal("hide");
        iziToast.warning({
          message: "Term Condition Details not Updated. Please try again",
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
  setTermsConditionClear(){
    this.setTermCondition.reset();
  }


}
