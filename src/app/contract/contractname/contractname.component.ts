import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
declare var iziToast: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contractname',
  templateUrl: './contractname.component.html',
  styleUrls: ['./contractname.component.css']
})
export class ContractnameComponent implements OnInit {
  result: any;
  addContractNameForm: FormGroup;
  editContractNameForm: FormGroup;
  viewContractNameForm: FormGroup;
  contract_classification_id: any;
  classificationList: any;
  classificationEditList: any;
  contract_id: any;
  isReadOnly: boolean = true;
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.contractNameDetails();
    this.addContractNameForm = new FormGroup({

      'create_contract_name': new FormControl(null, [Validators.required]),
      'create_contract_description_name': new FormControl(null, [Validators.required]),
      'create_contract_summary_name': new FormControl(null, [Validators.required]),
      'create_classification': new FormControl(null, [Validators.required]),
    });
    this.editContractNameForm = new FormGroup({
      'e_create_contract_name':new FormControl(null, [Validators.required]),
      'e_create_contract_description_name': new FormControl(null, [Validators.required]),
      'e_create_contract_summary_name': new FormControl(null, [Validators.required]),
      'e_create_classification': new FormControl(null, [Validators.required]),
    });
    this.viewContractNameForm = new FormGroup({
      'v_create_contract_name': new FormControl(null),
      'v_create_contract_description_name': new FormControl(null),
      'v_create_contract_summary_name': new FormControl(null),
      'v_create_classification': new FormControl(null),
    });

  }
  contractNameDetails() {
    let api_req: any = new Object();
    let contractName_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_details_list";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    contractName_req.action = "contract_details_list";
    contractName_req.user_id = 2;
    api_req.element_data = contractName_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check customer contract name list", response)
      this.result = response.contract_details_ilst;

      if (response.status == true) {

      } else {
        // iziToast.warning({
        //   message: "Please try again",
        //   position: 'topRight'
        // });
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
  addContract() {

    let api_req: any = new Object();
    let contractNameAdd_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_details_add";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    contractNameAdd_req.action = "contract_details_add";
    //  contractNameSave_req.contract_name= this.addContractNameForm.value.create_contract_name;
    //  contractNameSave_req.contract_description= this.addContractNameForm.value.create_contract_description_name;
    //  contractNameSave_req.contract_summary= this.addContractNameForm.value.create_contract_summary_name;

    contractNameAdd_req.user_id = 2;
    api_req.element_data = contractNameAdd_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check customer classification ADD", response)
      this.classificationList = response.contract_classification_list;
      console.log("test classification list", this.classificationList)
      if (response.status = true) {
        // $('#addContractNameId').modal('hide');
        // this.contractNameDetails();
      }


    });

  }
  saveContractName() {
    let api_req: any = new Object();
    let contractNameSave_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_details_save";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    contractNameSave_req.action = "contract_details_save";
    contractNameSave_req.contract_name = this.addContractNameForm.value.create_contract_name;
    if (this.addContractNameForm.value.create_contract_name==null ) {

      iziToast.warning({
        message: "Select Contract Name",
        position: 'topRight'
      });
      return false;

    }
    contractNameSave_req.contract_description = this.addContractNameForm.value.create_contract_description_name;
    if (this.addContractNameForm.value.create_contract_description_name==null ) {

      iziToast.warning({
        message: "Select Contract Description",
        position: 'topRight'
      });
      return false;

    }
    contractNameSave_req.contract_summary = this.addContractNameForm.value.create_contract_summary_name;
    if (this.addContractNameForm.value.create_contract_summary_name==null ) {

      iziToast.warning({
        message: "Select Contract Summary",
        position: 'topRight'
      });
      return false;

    }
    contractNameSave_req.contract_classification_id = this.addContractNameForm.value.create_classification;
    if (this.addContractNameForm.value.create_classification==null ) {

      iziToast.warning({
        message: "Select Contract Classification",
        position: 'topRight'
      });
      return false;

    }
    contractNameSave_req.user_id = 2;
    api_req.element_data = contractNameSave_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check customer contract save result", response)

      if (response.status = true) {
        $('#addContractNameId').modal('hide');
        iziToast.success({
          message: "Contract Name has been Saved",
          position: 'topRight'
        });
        this.contractNameDetails();
      }
      else {
        iziToast.error({
          message: "Contract Name has not been Saved",
          position: 'topRight'
        });
      }


    });
  }
  clearContractName() {
    this.addContractNameForm.reset();
  }
  viewContractName(contractID: any) {
    this.viewContractNameForm.reset();
    $("cont_name").val('');
    this.contract_id = contractID;
    let api_req: any = new Object();
    let contractNameView_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_details_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    contractNameView_req.action = "contract_details_edit";
    contractNameView_req.contract_id = this.contract_id;
    api_req.element_data = contractNameView_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("view response", response)
      this.classificationEditList = response.contract_classification_list.sort();
      if (response.status = true) {

        console.log('set time out')
        setTimeout(() => {

          this.viewContractNameForm.setValue({
            'v_create_contract_name': response.contract_details[0].contract_name,
            'v_create_contract_description_name': response.contract_details[0].contract_description,
            'v_create_contract_summary_name': response.contract_details[0].contract_summary,
            'v_create_classification': response.contract_details[0].contract_classification_id,
          });

        }, 500);
        // this.contractNameDetails();
      }


    });
  }
  editContractName(contractID: any) {
    this.editContractNameForm.reset();
    $("cont_name").val('');
    this.contract_id = contractID;
    let api_req: any = new Object();
    let contractNameEdit_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_details_edit";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    contractNameEdit_req.action = "contract_details_edit";
    contractNameEdit_req.contract_id = this.contract_id;
    api_req.element_data = contractNameEdit_req;

    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("edit response", response)
      this.classificationEditList = response.contract_classification_list.sort();
      if (response.status = true) {

        console.log('set time out')
        setTimeout(() => {

          this.editContractNameForm.setValue({
            'e_create_contract_name': response.contract_details[0].contract_name,
            'e_create_contract_description_name': response.contract_details[0].contract_description,
            'e_create_contract_summary_name': response.contract_details[0].contract_summary,
            'e_create_classification': response.contract_details[0].contract_classification_id,
          });

        }, 500);
        // this.contractNameDetails();
      }


    });

  }
  reset() {
    this.editContractNameForm.reset();
  }
  updateContractName() {
    let api_req: any = new Object();
    let contractNameUpdate_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url = "customer_contract/contract_details_update";
    api_req.api_type = "web";
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    contractNameUpdate_req.action = "contract_details_update";
    contractNameUpdate_req.contract_id = this.contract_id;
    contractNameUpdate_req.contract_name = this.editContractNameForm.value.e_create_contract_name;
    contractNameUpdate_req.contract_description = this.editContractNameForm.value.e_create_contract_description_name;
    contractNameUpdate_req.contract_summary = this.editContractNameForm.value.e_create_contract_summary_name;
    contractNameUpdate_req.contract_classification_id = this.editContractNameForm.value.e_create_classification;
    contractNameUpdate_req.user_id = 2;
    api_req.element_data = contractNameUpdate_req;
    this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check customer classification Update", response)

      if (response.status = true) {
        $('#editContractNameId').modal('hide');
        this.contractNameDetails();
        iziToast.success({
          message: "Contract Name has been Updated",
          position: 'topRight'
        });
      }
      else {
        iziToast.error({
          message: "Contract Name has not been Updated",
          position: 'topRight'
        });
      }


    });

  }
  deleteContractName(contractID: any) {
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
        let contractNameDelete_req: any = new Object();
        api_req.moduleType = "customer_contract";
        api_req.api_url = "customer_contract/contract_details_delete";
        api_req.api_type = "web";
        api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
        contractNameDelete_req.action = "contract_details_delete";
        contractNameDelete_req.contract_id = contractID;
        api_req.element_data = contractNameDelete_req;

        this.serverService.sendServer(api_req).subscribe((response: any) => {

          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Contract Deleted successfully",
              position: 'topRight'
            });
            this.contractNameDetails();
          }
          else{
            iziToast.error({
              message: " Contract Not Deleted ",
              position: 'topRight'
            });
            this.contractNameDetails();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })


  }
}
