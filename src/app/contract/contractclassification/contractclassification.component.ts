import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
declare var $ :any;
import Swal from 'sweetalert2';
declare var $: any;

declare var iziToast: any;
@Component({
  selector: 'app-contractclassification',
  templateUrl: './contractclassification.component.html',
  styleUrls: ['./contractclassification.component.css']
})
export class ContractclassificationComponent implements OnInit {
  result:any;
  addContractClassificationForm:FormGroup;
  editContractClassificationForm:FormGroup;
  viewContractClassificationForm:FormGroup;
  contract_classification_id:any;
  isReadOnly:boolean=true;
  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.customerClassificationList();

    this.addContractClassificationForm=new FormGroup({
      'cont_classification_name': new FormControl(null,[Validators.required]),
      'description_name': new FormControl(null,[Validators.required]),
      'color_name': new FormControl(null,[Validators.required]),
    });
    this.editContractClassificationForm=new FormGroup({
      'e_cont_classification_name': new FormControl(null,[Validators.required]),
      'e_description_name': new FormControl(null,[Validators.required]),
      'e_color_name': new FormControl(null,[Validators.required]),
    });
    this.viewContractClassificationForm=new FormGroup({
      'v_cont_classification_name': new FormControl(null),
      'v_description_name': new FormControl(null),
      'v_color_name': new FormControl(null),
    });
  }
  customerClassificationList(){
    let api_req: any = new Object();
    let contractclassif_req: any = new Object();
     api_req.moduleType = "customer_contract";
     api_req.api_url = "customer_contract/contract_classification_list";
     api_req.api_type = "web";
     api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
     contractclassif_req.action = "contract_classification_list";
     api_req.element_data = contractclassif_req;

     this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check customer classification list",response)
      this.result=response.file_list;
     
      
        if(response!=''){
         
         }

      });

  }
  saveContractClassification(){
    let api_req: any = new Object();
    let contractclassifSave_req: any = new Object();
     api_req.moduleType = "customer_contract";
     api_req.api_url = "customer_contract/contract_classification_save";
     api_req.api_type = "web";
     api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
     contractclassifSave_req.action = "contract_classification_save";
     contractclassifSave_req.classification_name= this.addContractClassificationForm.value.cont_classification_name;
     if (this.addContractClassificationForm.value.cont_classification_name==null ) {

      iziToast.warning({
        message: "Select Name",
        position: 'topRight'
      });
      return false;

    }
     contractclassifSave_req.classification_desc= this.addContractClassificationForm.value.description_name;
     if (this.addContractClassificationForm.value.description_name==null ) {

      iziToast.warning({
        message: "Select Description",
        position: 'topRight'
      });
      return false;

    }
     contractclassifSave_req.color= this.addContractClassificationForm.value.color_name;
     if (this.addContractClassificationForm.value.color_name==null ) {

      iziToast.warning({
        message: "Select Color",
        position: 'topRight'
      });
      return false;

    }
     api_req.element_data = contractclassifSave_req;

     this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check customer classification SAVE",response)
      
        if(response.status=true){
         
          $('#addContractClassificationId').modal('hide');
          Swal.fire({
            icon: 'success',
            title: 'Contract Classification Added Successfully',  
            showConfirmButton: false,  
            timer: 1200, 
          });
          this.customerClassificationList();
         }
        
        
       
         

      });

  }
  clearContractClassification(){
    this.addContractClassificationForm.reset();
  }
  // deleteContractClassif(contractClassifID:any){
  //   let api_req: any = new Object();
  //   let contractclassifDelete_req: any = new Object();
  //    api_req.moduleType = "customer_contract";
  //    api_req.api_url = "customer_contract/contract_classification_delete";
  //    api_req.api_type = "web";
  //    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
  //    contractclassifDelete_req.action = "contract_classification_delete";
  //    contractclassifDelete_req.contract_classification_id= contractClassifID;
  //    api_req.element_data = contractclassifDelete_req;

  //    this.serverService.sendServer(api_req).subscribe((response: any) => {
  //     console.log("check customer classification DELETE",response)
    
  //       if(response.status=true){
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Contract Classification Deleted Successfully',  
  //           showConfirmButton: false,  
  //           timer: 1200, 
  //         });
  //         this.customerClassificationList();
  //        }
         

  //     });

  // }

  deleteContractClassif(contractClassifID:any){
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
        let contractclassifDelete_req: any = new Object();
         api_req.moduleType = "customer_contract";
         api_req.api_url = "customer_contract/contract_classification_delete";
         api_req.api_type = "web";
         api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
         contractclassifDelete_req.action = "contract_classification_delete";
         contractclassifDelete_req.contract_classification_id= contractClassifID;
         api_req.element_data = contractclassifDelete_req;
  
        this.serverService.sendServer(api_req).subscribe((response: any) => {
  
          if (response.status == true) {
            // $("#fileAttachmentCustomerContractId").modal("hide");
            iziToast.success({
              message: " Contract Deleted successfully",
              position: 'topRight'
            });
            this.customerClassificationList();
          }
          else{
            iziToast.error({
              message: " Contract Not Deleted ",
              position: 'topRight'
            });
            this.customerClassificationList();
          }
        }),
          (error: any) => {
            console.log(error);
          };
      }
    })
  
  
  }
  
  
  editContractClassification(contractClassifID:any){
    this.contract_classification_id=contractClassifID;
    let api_req: any = new Object();
    let contractclassifEdit_req: any = new Object();
     api_req.moduleType = "customer_contract";
     api_req.api_url = "customer_contract/contract_classification_edit";
     api_req.api_type = "web";
     api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
     contractclassifEdit_req.action = "contract_classification_edit";
     contractclassifEdit_req.contract_classification_id=  this.contract_classification_id
     api_req.element_data = contractclassifEdit_req;

     this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("edit response",response)
        if(response.status=true){
          this.editContractClassificationForm.patchValue({
        
            'e_cont_classification_name': response.list[0].classification_name,
            'e_description_name': response.list[0].classification_desc,
            'e_color_name': '#'+response.list[0].color,
          });
          this.customerClassificationList();
         }
         

      });

  }
  updateContractClassification(){
    let api_req: any = new Object();
    let contractclassifUpdate_req: any = new Object();
     api_req.moduleType = "customer_contract";
     api_req.api_url = "customer_contract/contract_classification_update";
     api_req.api_type = "web";
     api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
     contractclassifUpdate_req.action = "contract_classification_update";
     contractclassifUpdate_req.classification_name = this.editContractClassificationForm.value.e_cont_classification_name;
     contractclassifUpdate_req.classification_desc =this.editContractClassificationForm.value.e_description_name;
     contractclassifUpdate_req.color = this.editContractClassificationForm.value.e_color_name;
     contractclassifUpdate_req.contract_classification_id=  this.contract_classification_id
     api_req.element_data = contractclassifUpdate_req;
     this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("check customer classification Update",response)
      
        if(response.status=true){
          $('#editContractClassificationId').modal('hide');
          Swal.fire({
            icon: 'success',
            title: 'Contract Classification Updated Successfully',  
            showConfirmButton: false,  
            timer: 1200, 
          });
          this.customerClassificationList();
         }
         

      });

  }
  viewContractClassification(contractClassifID:any){
   
    this.contract_classification_id=contractClassifID;
    let api_req: any = new Object();
    let contractclassifView_req: any = new Object();
     api_req.moduleType = "customer_contract";
     api_req.api_url = "customer_contract/contract_classification_edit";
     api_req.api_type = "web";
     api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
     contractclassifView_req.action = "contract_classification_edit";
     contractclassifView_req.contract_classification_id= this.contract_classification_id;
     api_req.element_data = contractclassifView_req;

     this.serverService.sendServer(api_req).subscribe((response: any) => {
      console.log("view response",response)
        if(response.status=true){
          this.viewContractClassificationForm.patchValue({
        
            'v_cont_classification_name': response.list[0].classification_name,
            'v_description_name': response.list[0].classification_desc,
            'v_color_name': '#'+response.list[0].color,
          });
          this.customerClassificationList();
         }
         

      });

  }

}
