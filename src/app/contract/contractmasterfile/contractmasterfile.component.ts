import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import Swal from 'sweetalert2'
declare var $: any;
declare var iziToast: any;

declare var $ :any;
@Component({
  selector: 'app-contractmasterfile',
  templateUrl: './contractmasterfile.component.html',
  styleUrls: ['./contractmasterfile.component.css']
})
export class ContractmasterfileComponent implements OnInit {
  listDisplay:any;
  public addContractmasterForm: FormGroup;
  constructor(private serverService: ServerService) { }

  ngOnInit(): void 
  {
    this.contractMasterFileList() 
    
    this.addContractmasterForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'file': new FormControl(null, Validators.required),
    
    });
  }
  send_file()
  {
        var contract_name= $("#contractName").val();
        var contract_master_file = $("#contractfile").val();
        var data = new FormData();
          data.append('contract_name', contract_name);
          data.append('contract_master_file', $("#contractfile")[0].files[0]);
          data.append('action', "contract_master_file_add");
  
            var self = this;
            $.ajax({
                type: 'POST',
                url: 'https://erp1.cal4care.com/api/customer_contract/contract_master_file_add',
                cache: false,
                contentType: false,
                processData: false,
                data : data,
                success: function(result:any){
                  if(result.status==true){
                    self.contractMasterFileList();
                    console.log(result);
                    $('#contractName').val("")
                    $('#contractfile').val("")
                    Swal.fire({
                      icon: 'success',
                      title: 'Contract Master File Added Successfully',  
                      showConfirmButton: false,  
                      timer: 1200, 
                    });
                  }
                },
                error: function(err:any){
                    console.log(err);
                }
              })
             
            $('#addCustomerContractFileId').modal('hide');
            $('#contractfile').val("")
            this.contractMasterFileList();
            // Swal.fire({
            //   icon: 'warning',
            //   title: 'Choose Name / File',  
            //   showConfirmButton: false,  
            //   timer: 2000, 
            // });
  }

  contractMasterFileList() {
    console.log("Contract Master File List UI Display Data after OnInit ")
   
    let api_req: any = new Object();
    let get_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url="customer_contract/contract_master_file_list"
    api_req.api_type = "web";
 
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    get_req.action = "contract_master_file_lis";
    get_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
    api_req.element_data =get_req;
    
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     // this.contacts_list=response.result.data.list_data;
     this.listDisplay=response.file_list;
      console.log("get customer contract details",response );
      
    });

  }
  clear_file(){
  $('#contractfile').val('');
  }
//  deleteFile(id:any){
//   var id=id;
//   let api_req: any = new Object();
//  let delete_file_req: any = new Object();
//   api_req.moduleType = "customer_contract";
//   api_req.api_url = "customer_contract/contract_master_file_delete";
//   api_req.api_type = "web";
//   api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
//   delete_file_req.action = "contract_master_file_delete";
//   delete_file_req.contract_master_file_id=id;
//   delete_file_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
//   api_req.element_data = delete_file_req;
//   this.serverService.sendServer(api_req).subscribe((response: any) => {
//     console.log(response)

//   //  alert("Deleted Sucessfully")
//     if(response.status==true){
//      this. contractMasterFileList()
      
//       Swal.fire({  
//         title: 'Are you sure want to remove?',  
//         icon: 'warning',  
//         showCancelButton: true,  
//         confirmButtonText: 'Yes',  
//         cancelButtonText: 'No'  
//       }).then((response:any) => {  
//         if (response.value) {  
//           Swal.fire(  
//             'Deleted!' 
             
//           )  
//         } else if (response.dismiss === Swal.DismissReason.cancel) {  
//           Swal.fire(  
//             'Cancelled' 
           
//           )  
//         }  
//       })  
    


//      }
  
//   });

//  }

 deleteFile(id: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Approve it!'
  }).then((result:any) => {
    if (result.value) {

      
      let api_req: any = new Object();
     let delete_file_req: any = new Object();
      api_req.moduleType = "customer_contract";
      api_req.api_url = "customer_contract/contract_master_file_delete";
      api_req.api_type = "web";
      api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
      delete_file_req.action = "contract_master_file_delete";
      delete_file_req.contract_master_file_id=id;
      delete_file_req.user_id = sessionStorage.getItem('erp_c4c_user_id');
      api_req.element_data = delete_file_req;

      this.serverService.sendServer(api_req).subscribe((response: any) => {
        if (response.status == true) {
          this. contractMasterFileList()
          iziToast.success({
            message: "Deleted Successfully",
            position: 'topRight'
          });
        }   else {
          iziToast.warning({
            message: "Not Deleted",
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

}
