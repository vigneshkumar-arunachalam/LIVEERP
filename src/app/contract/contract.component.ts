import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2'

import { Router } from '@angular/router';
declare var $: any;
declare var tinymce: any;
declare var iziToast: any;
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  result: any;
  pageLimit = 10;
  offset_count = 0;
  resultSave: any;
  resultEditGroup: any;
  checkbox_value: any;
  checkbox_invoice_value: any;
  groupSelectInvoiceId: any;
  file: File;
  fileToUpload: any;
  groupSelectCommonId: any;
  fileContractGenerate_row_id: any;
  FileURLDisplay: any;
  invoiceResult: any;
  invoiceContractID: any;
  contractRemarksEditId: any = [];
  CheckTest: any;
  recordNotFound = false;
  firstResult: any;
  secondResult: any;
  paginationData: any = { "info": "hide" };

  public addresses: FormArray;
  public edit_addresses: FormArray;
  public addressForm: FormGroup;
  public editContractGroupForm: FormGroup;
  public contractRemarkForm: FormGroup;
  editContractGenerateForm: FormGroup;
  editContractRemarkForm: FormGroup;
  TemporaryGenerateForm: FormGroup;
  editInvoiceGroupForm: FormGroup;
  emailForm: FormGroup;
  emailBizzFileForm: FormGroup;
  approveStatusForm: FormGroup;


  result1: any;
  billDetails: any;
  myFiles: any;
  contractDetails: any;
  contractClassification: any;
  searchResult: any;
  cust_id: any;
  testEdit: any;
  add_address: any;
  edit_array: any = [];
  invoiceCheckboxID_array: any = [];
  fileContractCheckboxID_array: any = [];
  listDisplay: any;
  invoiceCustomerID: any;
  fileAttachContractID: any;
  fileAttachCustomerID: any;
  contractFileAttachmentDisplayId: any;
  checkbox_contract_file_attach_value: any;
  keywordCompanyName = 'customerName';
  url: string;
  urlSafe: SafeResourceUrl;
  richTextArea_id: any;
  EmailCustomerContractID: any;
  msg_id: any;
  subjectValue: any;
  emailTo: any;
  EmailBizzFileID: any;
  validateEmail = true;
  mailContent: any;
  bizzFileURL: any;
  subjectValueBizz: any;
  emailToBizz: any;
  approveStatus: any;
  customerContractIDApproveStatus: any;
  CustomerIDUpdate:any;
  updateCustID:any;
  customerIDJoin:any=[];

  formGroup = this.fb.group({
    features: this.fb.array([this.fb.control('', Validators.required)])
  });
  constructor(private serverService: ServerService, public sanitizer: DomSanitizer, private router: Router, private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([this.createAddress()])
    });
    this.editContractGroupForm = this.fb.group({
      edit_addresses: this.fb.array([this.edit_createAddress()])
    });
  }

  ngOnInit(): void {

    // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.FileURLDisplay);

    if(localStorage.getItem('login_status')=='1'){
      localStorage.setItem('login_status','0');
      window.location.reload();
    }

    this.contractRemarkForm = new FormGroup({
      'cust_name': new FormControl(null),
      'cust_Date': new FormControl(null),
      'cust_remark': new FormControl(null),
    });
    this.editContractGenerateForm = new FormGroup({
      'contractselect': new FormControl(null)

    });

    this.editContractRemarkForm = new FormGroup({
      'cust_name': new FormControl(null),
      'firstName': new FormControl(null),
      'cust_Date': new FormControl(null),
      'cust_remark': new FormControl(null),
    });
    this.editInvoiceGroupForm = new FormGroup({
      'checkbox_invoice': new FormControl(null),
    });

    this.emailForm = new FormGroup({
      'Subject_Content': new FormControl(null, Validators.required),
      'email_to': new FormControl(null, Validators.required),
      // 'email_to': new FormControl('',[
      //   Validators.required,
      //   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),


    });
    this.emailBizzFileForm = new FormGroup({
      'bizz_Subject_Content': new FormControl(null, Validators.required),
      'bizz_email_to': new FormControl(null, Validators.required),
      'bizzFileMailContent': new FormControl(null),
      // 'email_to': new FormControl('',[
      //   Validators.required,
      //   Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),


    });

    this.approveStatusForm = new FormGroup({
      'cust_contract_status_approve': new FormControl(null),
    });

    this.contractList()
    this.contractAdd()
    this.contractMasterFileList()
    // $('#invoiceAttachmentId').modal('show');

    this.initTiny();

  }
  get addressControls() {
    return this.addressForm.get('addresses') as FormArray
  }
  get editaddressControls() {
    return this.editContractGroupForm.get('edit_addresses') as FormArray
  }
  get primEmail() {
    return this.emailForm.get('email_to')
  }

  addAddress(): void {
    this.addresses = this.addressForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }



  showPreviewImage(event: any) {
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }


  createAddress(): FormGroup {
    return this.fb.group({
      company_Name: '',
      contractName: '',
      classificationName: '',
      fromDate: '',
      toDate: '',
      remarks: '',
      attachment: '',
      billerName: ''
    });
  }
  edit_createAddress(): FormGroup {

    return this.fb.group({
      e_company_Name: '',
      e_contractName: '',
      e_contractID:'',
      e_customer_contract_id: '',
      e_classificationName: '',
      e_fromDate: '',
      e_toDate: '',
      e_remarks: '',
      e_billerName: ''
    });
  }
  selectFile(i: any) {

    //     this.fileToUpload = i.item(0);
    // console.log(this.fileToUpload)

    // var k = $('input[type=file]')[0].files[0];
    // console.log(k.innerHTML)

    // console.log(e)
    // for (var i = 0; i < e.target.files.length; i++) { 
    //   this.myFiles.push(e.target.files[i]);
    // }
    // console.log(this.myFiles)
  }
  checkbox_Select: any;
  eventCheck(event: any) {
    this.checkbox_Select = event.target.checked;
    console.log(this.checkbox_Select)
  }
  checkbox_ApproveStatus: any;
  eventCheckApproveStatus(event: any) {
    this.checkbox_ApproveStatus = event.target.checked;
    console.log(this.checkbox_ApproveStatus)
  }

  addContractOpen() {
    this.addressForm.reset()
  }


  contractAdd() {
    console.log("Customer List UI Display Data after OnInit ")

    let api_req: any = new Object();
    let add_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_add"
    api_req.api_type = "web";

    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_req.action = "customer_contract_add";
    add_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = add_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.contacts_list=response.result.data.list_data;

      this.result1 = response
      this.billDetails = response.bill_details
      this.contractDetails = response.contract_details
      this.contractClassification = response.contract_class_details

      console.log("get customer contract ADD details", this.result);
      console.log(" contract bill details", this.billDetails);
      console.log(" contract bill details", this.contractDetails);
      console.log(" contract bill details", this.contractClassification);
    });
  }
  contractSave() {

    // if($('#id').val()==''){

    // }
    console.log("Customer List UI Display Data after OnInit ")

    let api_req: any = new Object();
    let save_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_save"
    api_req.api_type = "web";

    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    save_req.action = "customer_contract_save";
    save_req.user_id = localStorage.getItem('user_id');
    if (this.addressForm.value.addresses.length <= 1) {
      save_req.values = this.addressForm.value.addresses;

    } else {
      save_req.values = this.addresses.value;
    }
    api_req.element_data = save_req;
    console.log("check api req", api_req)

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.contacts_list=response.result.data.list_data;

      console.log("save check", response)
      this.resultSave = response
      if (response.status = true) {

        $("#addCustomerContractId").modal("hide");
        this.contractList()
        iziToast.success({
          title: 'Saved',
          message: 'Contract Saved Successfully !',
        });

      }
      else {
        $("#addCustomerContractId").modal("hide");
        iziToast.error({
          title: 'Not Saved',
          message: 'Contract not Saved !',
        });
        this.contractList()
      }

    });

  }
  check() { }
  contractEditGroup() {
    this.editContractGroupForm.reset();
    
    console.log(this.edit_array)
    if (this.edit_array == '') {
      
      iziToast.error({
        title: 'Error',
        message: 'Atleast Select 1 Contract to Edit !',
      });
      console.log("empty check1")
      console.log("empty check2")
    }
    else {

      $("#editCustomerContractId").modal("show");
    }
    let api_req: any = new Object();
    let edit_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_edit_group"
    api_req.api_type = "web";

    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    edit_req.action = "customer_contract_edit_group";
    edit_req.user_id = localStorage.getItem('user_id');
    edit_req.contract_ids = this.edit_array;
    api_req.element_data = edit_req;
    console.log("check for edit api", api_req)
    //return false

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.contacts_list=response.result.data.list_data;
      this.updateCustID=response.edit_contract_details;
      console.log("test update customer id",this.updateCustID)
  
      this.updateCustID.forEach((Element: any) => {
        console.log(Element.customer_id);
        this.customerIDJoin.push(Element.customer_id);
        
        console.log("this.customerIDJoin",  this.customerIDJoin);
      });
      console.log("variable check",this.customerIDJoin.join(",") )
      
      //this.resultEditGroup = response.edit_contract_details
      console.log("op", response.edit_contract_details)
      console.log("op1", response.edit_contract_details[0].biller_id)
      if (response != '') {


        const formArray = new FormArray([]);
        for (let index = 0; index < response.edit_contract_details.length; index++) {
          this.CustomerIDUpdate=response.edit_contract_details[index].customer_id,
          formArray.push(this.fb.group({
            "e_company_Name": response.edit_contract_details[index].customerName,
            "e_contractName": response.edit_contract_details[index].contract_id,
            "e_contractID":response.edit_contract_details[index].customer_id,
            "e_customer_contract_id": response.edit_contract_details[index].customer_contract_id,
            "e_classificationName": response.edit_contract_details[index].contract_classification_id,
            "e_fromDate": response.edit_contract_details[index].from_dt,
            "e_toDate": response.edit_contract_details[index].to_dt,
            "e_remarks": response.edit_contract_details[index].remark_desc,
            "e_billerName": response.edit_contract_details[index].biller_id,
           

          })
          );


        }

        console.log(formArray);

        this.editContractGroupForm.setControl('edit_addresses', formArray);

        console.log(this.editContractGroupForm);


      }

    });

  }
  contractUpdate() {
   
    $("#editCustomerContractId").modal("hide");
    console.log(this.editContractGroupForm.value)
    // console.log("group select id",this.edit_array)
    let api_req: any = new Object();
    let update_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_group_update"
    api_req.api_type = "web";

    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    update_req.action = "customer_contract_group_update";
    update_req.user_id = localStorage.getItem('user_id');
    // update_req.e_company_Name=this.customerIDJoin;
    update_req.values = this.editContractGroupForm.value.edit_addresses;
    api_req.element_data = update_req;


    this.serverService.sendServer(api_req).subscribe((response: any) => {

      console.log("update response", response)

      if (response.status== true) {
        this.contractList(); 
        this.editContractGroupForm.reset();
        iziToast.success({
          title: 'Success',
          message: 'Contract has been updated!',
        });
        this.contractList()
      }
      else {
        iziToast.error({
          title: 'Error',
          message: 'Contract has not been updated!',
        });
      }

    });


  }
  deleteContract(id: any) {
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
        let delete_contract_req: any = new Object();
        api_req.moduleType = "customer_contract";
        api_req.api_url = "customer_contract/delete_individual";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_contract_req.action = "delete_individual";
        delete_contract_req.contract_id = id;
        delete_contract_req.user_id = localStorage.getItem('user_id');
        api_req.element_data = delete_contract_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Contract Deleted successfully",
              position: 'topRight'
            });
            this.contractList();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }



  contractDeleteGroup() {
    console.log(this.edit_array);
    if (this.edit_array == '') {
      
      iziToast.error({
        title: 'Error',
        message: 'Atleast Select 1 Contract to Delete !',
      });
      
    }
    else{
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
        let GrpDelete_contract_req: any = new Object();
        api_req.moduleType = "customer_contract";
        api_req.api_url = "customer_contract/group_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        GrpDelete_contract_req.action = "group_delete";
        GrpDelete_contract_req.contract_id = this.edit_array.join(',');
        GrpDelete_contract_req.user_id = localStorage.getItem('user_id');
        api_req.element_data = GrpDelete_contract_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {

          if (response.status == true) {
            iziToast.success({
              message: "Contract attachment deleted successfully",
              position: 'topRight'
            });
            this.contractList();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })
    }
  }

  contractfileAttachment(fileAttachContractID: any, fileAttachCustomerID: any) {
    $("#fileAttachmentCustomerContractId").modal("show");
    this.fileAttachContractID = fileAttachContractID;
    this.fileAttachCustomerID = fileAttachCustomerID;
    let api_req: any = new Object();
    let fileattach_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_get_attachment_file";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileattach_req.action = "customer_contract_get_attachment_file";
    fileattach_req.cust_cont_id = this.fileAttachContractID;
    fileattach_req.customerID = this.fileAttachCustomerID;
    fileattach_req.userId = "2";
    api_req.element_data = fileattach_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check contract file attachment", response)
      this.firstResult = response.phone_provision_det;
      this.secondResult = response.contract_attachment_arr;

      if (response != '') {

      }


    });


  }
  contractAttachmentDelete(id: any) {
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
        let delete_contractAttach_req: any = new Object();
        api_req.moduleType = "customer_contract";
        api_req.api_url = "customer_contract/customer_contract_attachment_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        delete_contractAttach_req.action = "customer_contract_attachment_delete";
        delete_contractAttach_req.contract_attachment_file_id = id;
        delete_contractAttach_req.user_id = localStorage.getItem('user_id');
        api_req.element_data = delete_contractAttach_req;
        this.serverService.sendServer(api_req).subscribe((response: any) => {
          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: "Contract attachment deleted successfully",
              position: 'topRight'
            });
            this.contractfileAttachment(this.fileAttachContractID, this.fileAttachCustomerID);
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })



  }

  // contractAttachmentDelete(id:any){
  //   var id = id;
  //   let api_req: any = new Object();
  //   let delete_contractAttach_req: any = new Object();
  //   api_req.moduleType = "customer_contract";
  //   api_req.api_url = "customer_contract/customer_contract_attachment_delete";
  //   api_req.api_type = "web";
  //   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //   delete_contractAttach_req.action = "customer_contract_attachment_delete";
  //   delete_contractAttach_req.contract_attachment_file_id = id;
  //   delete_contractAttach_req.user_id = localStorage.getItem('user_id');
  //   api_req.element_data = delete_contractAttach_req;
  //   console.log(api_req)
  //   this.serverService.sendServer(api_req).subscribe((response: any) => {

  //     if (response.status==true) {
  //       $("#fileAttachmentCustomerContractId").modal("hide");

  //       this.contractfileAttachment(this.fileAttachContractID,this.fileAttachCustomerID );

  //       // this.contractList()
  //     }
  //     // this.contractList()
  //   });

  // }
  contractFileUpdate() {

    var data = new FormData();
    data.append('contractID', this.fileAttachContractID);
    data.append('customerID', this.fileAttachCustomerID);
    data.append('fileContractCheckboxID', this.fileContractCheckboxID_array);
    data.append('contract_attachment_file', $("#uploaded-img")[0].files[0]);
    data.append('action', "customer_contract_attachment_file_save");
    data.append('user_id', "2");
    var self = this;
    $.ajax({
      type: 'POST',
      url: 'https://erp1.cal4care.com/api/customer_contract/customer_contract_attachment_file_save',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {
          self.contractList();

          $("#fileAttachmentCustomerContractId").modal("hide");

          // console.log(result);


        }

        $("#fileAttachmentCustomerContractId").modal("hide");
        $('#uploaded-img').val("")
        Swal.fire({
          icon: 'success',
          title: 'Contract File has been Updated',
          showConfirmButton: false,
          timer: 1200,
        });

      },
      error: function (err: any) {
        console.log(err);
      }
    })
  }
  invoiceAttachment(CustomerContractid: any, customerID: any) {
    this.invoiceResult=[];//for refreshing we are emptying the variable
    // this.invoiceCheckboxID_array=[];
    //for refreshing we are emptying the variable
    this.invoiceContractID = CustomerContractid;
    this.invoiceCustomerID = customerID;
    let api_req: any = new Object();
    let invEdit_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/invoice_attachment";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    invEdit_req.action = "invoice_attachment";
    invEdit_req.cust_cont_id = CustomerContractid;
    invEdit_req.cust_id = customerID;
    invEdit_req.userId = "2";
    api_req.element_data = invEdit_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("response status",response.status);     
        if (response.status == true) {
         
          this.invoiceResult = response.customer_invoice_details;
            // iziToast.success({
            //     message: "Invoice attachment displayed successfully",
            //     position: 'topRight'
            // });
            // this.editInvoiceGroupForm.reset();
            console.log("invoice checkbox array-invoice attachment",this.invoiceCheckboxID_array)
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
  
  chkFunction(item: any) {

  }
  invoiceUpdate() {
    // this.invoiceCheckboxID_array=[];
    console.log("invoice checkbox array-on update click",this.invoiceCheckboxID_array)
    let api_req: any = new Object();
    let invUpdate_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/save_invoice_contract_details";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    invUpdate_req.action = "save_invoice_contract_details";


    invUpdate_req.customer_contract_id_inv_hd = this.invoiceContractID;
    invUpdate_req.customer_id_inv_hd = this.invoiceCustomerID;
    invUpdate_req.inv_billId = this.invoiceCheckboxID_array.join(',');

    api_req.element_data = invUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check invoice update", response)
 
      if (response.status==true) {
        this.invoiceResult = response.customer_invoice_details;
        $("#invoiceAttachmentId").modal("hide");
        console.log("invoice checkbox array-after update click",this.invoiceCheckboxID_array)
        iziToast.success({
          message: "Invoice has been Updated",
          position: 'topRight'
      });
 
      }
      else{
       
        iziToast.error({
          message: "Invoice has not been Updated",
          position: 'topRight'
      });
      }
    
     
      // this.contractList()

    });

  }
  contractFileGenerateEdit(id: any) {
    // $("#fileContractGenerateId").modal("show");
  }
  fileContractGenerateRowID(id: any) {
    this.fileContractGenerate_row_id = id;
  }
  dropdowncontractfileGenerate() {
    console.log("contract master file id", this.editContractGenerateForm.value.contractselect)
    let api_req: any = new Object();
    let fileGenerate_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_generate_file";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileGenerate_req.action = "customer_contract_generate_file";
    fileGenerate_req.customer_contract_id = this.fileContractGenerate_row_id;
    fileGenerate_req.contract_master_file_id = this.editContractGenerateForm.value.contractselect;
    fileGenerate_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = fileGenerate_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response != '') {
        this.editContractGenerateForm.patchValue({
          'contractselect': response.contract_classification_id,
        });

        $("#fileContractGenerateId").modal("hide");
        Swal.fire({
          icon: 'success',
          title: 'Contract File Generated',
          showConfirmButton: false,
          timer: 1200,
        });
      }

    });

  }
  contractMasterFileList() {
    console.log("Contract Master File List UI Display Data after OnInit ")

    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_master_file_list"
    api_req.api_type = "web";

    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "contract_master_file_lis";
    get_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = get_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // this.contacts_list=response.result.data.list_data;
      this.listDisplay = response.file_list;
      console.log("get customer contract details", response);

    });

  }
  dropdownGenerateTemporaryMasterFile(id: any) {

    let api_req: any = new Object();
    let fileGenerate1_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_get_master_file";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    fileGenerate1_req.action = "customer_contract_get_master_file";
    fileGenerate1_req.customer_contract_id = id;
    fileGenerate1_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = fileGenerate1_req;
    console.log(api_req)
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("temporary master file", response)
      // this.FileURLDisplay = response.contract_master_file_det.upload_file_name;
      this.FileURLDisplay = response.contract_master_file_det.excel_url;
      console.log(this.FileURLDisplay)
      this.url = response.contract_master_file_det.excel_url;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.FileURLDisplay);
      console.log("file check", this.FileURLDisplay)

      if (response.status == true) {


      }
      else {

        $("#fileContractTemporaryId").modal("hide");

      }

    });

  }
  contractRemarksEdit(id: any) {
    //$("#contractRemarksId").modal("show");
    this.contractRemarksEditId = id;

    console.log("contract remarks id", this.contractRemarksEditId)

    let api_req: any = new Object();
    let editCR_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_remarks";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    editCR_req.action = "customer_contract_remarks";
    editCR_req.contract_id = this.contractRemarksEditId;
    editCR_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = editCR_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      // if(response.contract_remarks==''){
      //   alert("Comments not available")
      // }
      console.log("contract remarks api", response)
      if (response != '') {
        this.add_address = response.contract_remarks;
        // this.contractRemarkForm.patchValue({

        //   'cust_name': response.contract_remarks[0].firstName,
        //   'cust_Date': response.contract_remarks[0].remark_dt,
        //   'cust_remark':response.contract_remarks[0].remark_desc,

        // });
        console.log(this.contractRemarkForm.value);


        this.contractList()
      }
      else {
        this.contractRemarkForm.patchValue({


          'cust_name': '',
          'cust_Date': '',
          'cust_remark': '',



        });
      }

    });

  }
  contractRemarksUpdate() {

    let api_req: any = new Object();
    let updateCR_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_comments_save";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    updateCR_req.action = "contract_comments_save";
    updateCR_req.contract_id = this.contractRemarksEditId;
    updateCR_req.user_id = localStorage.getItem('user_id');
    //updateCR_req.comments = this.contractRemarkForm.value.remark_desc;
    updateCR_req.comments = $('#remark_desc').val();
    api_req.element_data = updateCR_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("contract remarks Update api", response)
      if (response.status == true) {
        // this.contractList() 

        this.editContractRemarkForm.reset()

        $("#contractRemarksId").modal("hide");
        iziToast.success({
          message: "Contract Remark has been Saved",
          position: 'topRight'
      });
        this.contractList()
      }

    });

  }

  searchCustomerData(data: any) {
    console.log("search data", data)

    //  var list_data= this.listDataInfo(data);
    let api_req: any = new Object();
    let api_Search_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/cal/customer_name_search";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_Search_req.action = "customer_name_search";
    api_Search_req.user_id = localStorage.getItem('user_id');
    api_Search_req.customerName = data;
    api_req.element_data = api_Search_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer_status response", response);

      this.searchResult = response.customer_names;
      if (response.status = true) {

      }

    });

  }
 
  selectEventCustomer(item: any) {
    console.log(item)
    this.cust_id = item;
    // do something with selected item
  }

  onChangeSearchCustomer(val: string) {
    console.log(val)
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocusedCustomer(e: any) {
    // do something when input is focused
  }



  EditCHK(data: any, event: any) {
    console.log("List - CheckBox ID", data);
    this.groupSelectCommonId = data;
    this.checkbox_value = event.target.checked;
    console.log(this.checkbox_value)
    if (this.checkbox_value) {

      this.edit_array.push(data);
      this.edit_array.join(',');
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
  InvoiceCHK(data: any, event: any) {
    // this.invoiceCheckboxID_array=[];
    console.log("Invoice List - CheckBox ID", data);
    this.groupSelectInvoiceId = data;
    this.checkbox_invoice_value = event.target.checked;
    console.log(this.checkbox_invoice_value)

    if (this.checkbox_invoice_value) {

      this.invoiceCheckboxID_array.push(data);
      this.invoiceCheckboxID_array.join(',');
      console.log("Final Invoice Checkbox After checkbox selected list", this.invoiceCheckboxID_array);
    }
    else {
      const index = this.invoiceCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.invoiceCheckboxID_array.splice(index, 1);
      }
      console.log("Final Invoice Checkbox After Deselected selected list", this.invoiceCheckboxID_array)

    }

  }
  contractFileCHK(data: any, event: any) {
    console.log("Contract File Attachment Display - CheckBox ID", data);
    this.contractFileAttachmentDisplayId = data;
    this.checkbox_contract_file_attach_value = event.target.checked;
    console.log(this.checkbox_contract_file_attach_value)

    if (this.checkbox_contract_file_attach_value) {

      this.fileContractCheckboxID_array.push(data);
      this.fileContractCheckboxID_array.join(',');
      console.log("Final contract file attachment Checkbox After checkbox selected list", this.fileContractCheckboxID_array);
    }
    else {
      const index = this.fileContractCheckboxID_array.findIndex((el: any) => el === data)
      if (index > -1) {
        this.fileContractCheckboxID_array.splice(index, 1);
      }
      console.log("Final contract file attachment Checkbox After Deselected selected list", this.fileContractCheckboxID_array)

    }

  }


  selectAll(event: any) {

    if (event.target.checked == true) {

      this.result.forEach((element: any, index: any) => {
        $("#check-grp-" + index).prop('checked', true);
      });
    } else {
      this.result.forEach((element: any, index: any) => {
        $("#check-grp-" + index).prop('checked', false);
      });

    }

  }


  logValue() {
    console.log(this.addresses.value);
    // console.log(this.addresses.value.company_Name);
  }
  sendMail() {
    var subject = $('#subject').val();
    var description = btoa(tinymce.activeEditor.getContent());
    console.log(tinymce.activeEditor.getContent());
    var formData = new FormData();
    formData.append('subject', subject);
    formData.append('description', description);
    //  var json_arr = JSON.stringify(agent_req);
    return false;
    var self = this;
    $.ajax({
      type: 'POST',
      url: 'https://erp1.cal4care.com/api/sendemail/customer_contract_mail',
      cache: false,
      contentType: false,
      processData: false,
      data: data,
      success: function (result: any) {
        if (result.status == true) {
          self.contractMasterFileList();
          console.log(result);

        }
      },
      error: function (err: any) {
        console.log(err);
      }
    })

    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer/cal/email";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "email";
    api_email_req.user_id = localStorage.getItem('user_id');
    // api_email_req.customer_contract_id = id;
    api_req.element_data = api_email_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer email", response);

      this.searchResult = response.customer_names;
      if (response.status = true) {

      }

    });

  }
  Email(EmailID: any) {
    this.emailForm.reset();
    this.EmailCustomerContractID = EmailID;
   
  }
  EmailBizzFile(EmailID: any) {
    this.EmailBizzFileID = EmailID;
  }



  testdatas() {

    this.subjectValue = $('#subject').val();
    this.emailTo = $('#emailto').val();
    // if(this.subjectValue=''){
    //   alert("Give Subject")

    // }
    this.msg_id = tinymce.get('tinyID').getContent();
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)
    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "sendemail/customer_contract_mail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "customer_contract_mail";
    api_email_req.user_id = localStorage.getItem('user_id');
    api_email_req.customer_contract_id = this.EmailCustomerContractID;
    api_email_req.emailToCustomer = this.emailTo;
    api_email_req.emailSubject = this.subjectValue;
    api_email_req.emailContent = this.msg_id;
    api_req.element_data = api_email_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer email", response);

      // this.searchResult = response.customer_names;
      if (response != 'null' && response != null) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");
        this.contractList()
        Swal.fire({
          icon: 'error',
          title: 'Email Not Sent',
          showConfirmButton: false,
          timer: 1200,
        });
      }
      else {
        $('#subject').val('');
        $('#emailto').val('');
        $("#TextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");

        this.contractList()
        Swal.fire({
          icon: 'success',
          title: 'Email Notification Sent Successfully',
          showConfirmButton: false,
          timer: 1200,
        });
      }

      this.contractList()
    });
  }
  bizzFileContractEdit(EmailID: any) {
    this.EmailBizzFileID = EmailID;
    this.subjectValue = $('#subject_bizz').val();
    this.emailTo = $('#emailto_bizz').val();
    //  this.mailContent= $('#bizzFileMailContent').val();
    // if(this.subjectValue=''){
    //   alert("Give Subject")

    // }
    this.msg_id = tinymce.get('tinyBizzFileID').getContent();
    // tinymce.get("myTextarea").setContent("<p>Hello world!</p>");
    this.mailContent = tinymce.get('tinyBizzFileID').setContent("<p>Hello world!</p>");
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailTo)
    console.log("subject", this.subjectValue)
    console.log("mailcontent", this.mailContent)
    let api_req: any = new Object();
    let api_email_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer_contract/contract_biz_file_send_form";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_email_req.action = "contract_biz_file_send_form";
    api_email_req.user_id = localStorage.getItem('user_id');
    api_email_req.customer_contract_id = this.EmailBizzFileID;
    api_email_req.emailToCustomer = this.emailTo;
    api_email_req.emailSubject = this.subjectValue;
    api_email_req.emailContent = this.msg_id;
    api_req.element_data = api_email_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer email", response);
      this.bizzFileURL = response.biz_file_link;
      this.mailContent = tinymce.get('tinyBizzFileID').setContent("<p>" + this.bizzFileURL + "</p>");

      // this.searchResult = response.customer_names;
      if (response != 'null' && response != null) {
        $('#subject').val('');
        $('#emailto').val('');
        $("#BizzFileTextEditorId").modal("hide");
        // tinymce.activeEditor.setContent("");
        this.contractList()
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Email Not Sent',  
        //   showConfirmButton: false,  
        //   timer: 1200, 
        // });


      }
      else {
        $('#subject').val('');
        $('#emailto').val('');

        $("#BizzFileTextEditorId").modal("hide");
        // tinymce.activeEditor.setContent("");

        this.contractList()
        Swal.fire({
          icon: 'success',
          title: 'Email Notification Sent Successfully',
          showConfirmButton: false,
          timer: 1200,
        });
      }
      this.emailBizzFileForm.patchValue({

        'bizz_email_to': response.email,
        // 'bizz_Subject_Content': response.email,
        'mailcontent': this.mailContent,
      });

      this.contractList()
    });
  }
  bizzFileContractEmail() {

    this.subjectValueBizz = $('#subject_bizz').val();
    this.emailToBizz = $('#emailto_bizz').val();
    this.msg_id = tinymce.get('tinyBizzFileID').getContent();
    this.mailContent = tinymce.get('tinyBizzFileID').setContent("<p>Hello world!</p>");
    console.log("msgid", this.msg_id)
    console.log("email to", this.emailToBizz)
    console.log("subject", this.subjectValueBizz)
    console.log("mailcontent", this.mailContent)

    let api_req: any = new Object();
    let api_buzzemail_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "sendemail/customer_contract_biz_mail";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_buzzemail_req.action = "customer_contract_biz_mail";
    api_buzzemail_req.user_id = localStorage.getItem('user_id');
    api_buzzemail_req.customer_contract_id = this.EmailBizzFileID;
    api_buzzemail_req.emailToCustomer = this.emailToBizz;
    api_buzzemail_req.emailSubject = this.subjectValueBizz;
    api_buzzemail_req.emailContent = this.msg_id;
    api_req.element_data = api_buzzemail_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("vignesh-customer email", response);

      if (response != 'null' && response != null) {
        $('#subject').val('');
        $('#emailto').val('');

        $("#BizzFileTextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");
        this.contractList()
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Email Not Sent',  
        //   showConfirmButton: false,  
        //   timer: 1200, 
        // });


      }
      else {
        $('#subject').val('');
        $('#emailto').val('');

        $("#BizzFileTextEditorId").modal("hide");
        tinymce.activeEditor.setContent("");

        this.contractList()
        Swal.fire({
          icon: 'success',
          title: 'Email Notification Sent Successfully',
          showConfirmButton: false,
          timer: 1200,
        });
      }


      this.contractList()
    });

  }
  customerContractApproveStatus(customerContractId: any) {
    this.customerContractIDApproveStatus = customerContractId;
    let api_req: any = new Object();
    let api_ApproveStatus_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer_contract/customer_contract_approve_status";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_ApproveStatus_req.action = "customer_contract_approve_status";
    api_ApproveStatus_req.user_id = localStorage.getItem('user_id');
    api_ApproveStatus_req.customer_contract_id = this.customerContractIDApproveStatus;
    api_req.element_data = api_ApproveStatus_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status = true) {
        console.log("customerContractApproveStatus response", response);
        this.approveStatus = response.approve_status;
        console.log("ApproveStatus response", this.approveStatus);
        this.approveStatusForm.patchValue({

          'cust_contract_status_approve': response.approve_status,
        });
      }


    });
  }
  customerContractApproveStatusUpdate() {
    let api_req: any = new Object();
    let api_ApproveStatusUpdate_req: any = new Object();
    api_req.moduleType = "customer";
    api_req.api_url = "customer_contract/customer_contract_approve_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    api_ApproveStatusUpdate_req.action = "customer_contract_approve_update";
    api_ApproveStatusUpdate_req.user_id = localStorage.getItem('user_id');
    api_ApproveStatusUpdate_req.customer_contract_id = this.customerContractIDApproveStatus;
    api_ApproveStatusUpdate_req.approve_status = this.checkbox_ApproveStatus;
    api_req.element_data = api_ApproveStatusUpdate_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {

      if (response.status = true) {
        // console.log("customer_contract_approve_update-before",  this.approveStatus)
        // this.approveStatus = !this.approveStatus;
        // console.log("customer_contract_approve_update-after",  this.approveStatus)
        console.log("customer_contract_approve_update", response);
      }
    });
    $('#ApproveStatusId').modal('hide');
    this.contractList();
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

  listDataInfo(list_data: any) {

    list_data.search_text = list_data.search_text == undefined ? "" : list_data.search_text;
    list_data.order_by_name = list_data.order_by_name == undefined ? "contact.contact_id" : list_data.order_by_name;
    list_data.order_by_type = list_data.order_by_type == undefined ? "desc" : list_data.order_by_type;
    list_data.limit = list_data.limit == undefined ? this.pageLimit : list_data.limit;
    list_data.offset = list_data.offset == undefined ? 0 : list_data.offset;
    return list_data;
  }

  contractList() {
    
    var list_data = this.listDataInfo(data);
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/customer_contract_list"
    api_req.api_type = "web";
    api_req.search_text = list_data.search_text;
    api_req.order_by_name = list_data.order_by_name;
    api_req.order_by_type = list_data.order_by_type;
    api_req.limit = list_data.limit;
    api_req.offset = list_data.offset;
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "customer_contract_list";
    get_req.user_id = localStorage.getItem('user_id');
    api_req.element_data = get_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      if (response.status == true) {
        this.result = response.customer_contract_details;
        // console.log("get customer contract details", this.result);
        // this.contacts_list=response.result.data.list_data;
        // this.offset_count = list_data.offset;
        // this.paginationData = this.serverService.pagination({ 'offset': response.result.data.list_info.offset, 'total': response.result.data.list_info.total, 'page_limit': this.pageLimit });
        // this.recordNotFound = this.result.length == 0 ? true : false;
      } else {
        iziToast.warning({
          message: "Please try again",
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
      };

  }


}



function data(data: any) {
  throw new Error('Function not implemented.');
}

