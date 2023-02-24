import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public addresses: FormArray;
  public addressForm: FormGroup;
  result:any;
  billDetails:any;
  contractDetails:any;
  contractClassification:any;
  searchResult:any;
  cust_id:any;
  keywordCompanyName = 'customerName';
  
  constructor(private fb: FormBuilder,private serverService: ServerService) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([ this.createAddress() ])
    });
  }
  

  ngOnInit(): void {
    this.contractAdd()
  }

  get addressControls() {
 
    // return this.addressForm.get('addresses')['controls'];

    return this.addressForm.get('addresses') as FormArray

    // return (this.addressForm.controls.addresses as FormGroup).controls;
   
  }

  createAddress(): FormGroup {
    return this.fb.group({
      company_Name:'',
      contractName: '',
      classificationName: '',
      fromDate: '',
      toDate: '',
      remarks:'',
      attachment:'',
      billerName:''
    });
  }

  addAddress(): void {
    this.addresses = this.addressForm.get('addresses') as FormArray;
    this.addresses.push(this.createAddress());
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }

  logValue() {
    //console.log(JSON.parse(this.addresses.value));
    console.log(JSON.stringify(this.addresses.value));
  }

  contractAdd(){
    console.log("Customer List UI Display Data after OnInit ")
    
    let api_req: any = new Object();
    let add_req: any = new Object();
    api_req.moduleType = "customer_contract";
    api_req.api_url="customer_contract/customer_contract_add"
    api_req.api_type = "web";
   
    api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
    add_req.action = "customer_contract_add";
    add_req.user_id = localStorage.getItem('user_id');
    api_req.element_data =add_req;
    
    this.serverService.sendServer(api_req).subscribe((response: any) => {
     // this.contacts_list=response.result.data.list_data;
     
      this.result = response
      this.billDetails=response.bill_details
      this.contractDetails=response.contract_details
      this.contractClassification=response.contract_class_details
     
      console.log("get customer contract ADD details",this.result );
      console.log(" contract bill details",this.billDetails );
      console.log(" contract bill details",this.contractDetails );
      console.log(" contract bill details",this.contractClassification );
    });
  }

  searchCustomerData(data:any){
    console.log("search data",data)
       
      //  var list_data= this.listDataInfo(data);
        let api_req: any = new Object();
        let api_Search_req: any = new Object();
        api_req.moduleType = "customer";
        api_req.api_url = "customer/cal/customer_name_search";
          api_req.api_type = "web";
          api_req.access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJhdWQiOiJ1cGRhdGVzLm1jb25uZWN0YXBwcy5jb20iLCJpYXQiOjE2NTQ2NjQ0MzksIm5iZiI6MTY1NDY2NDQzOSwiZXhwIjoxNjU0NjgyNDM5LCJhY2Nlc3NfZGF0YSI6eyJ0b2tlbl9hY2Nlc3NJZCI6IjIiLCJ0b2tlbl9hY2Nlc3NOYW1lIjoidGVzdGluZzA0MDYyMDIyIiwidG9rZW5fYWNjZXNzVHlwZSI6IjIifX0.NaymQDSiON2R3tKICGNpj6hsQfg9DGwEcZzrJcvsqbI";
          api_Search_req.action = "customer_name_search";
          api_Search_req.user_id = localStorage.getItem('user_id');
          api_Search_req.customerName=data;
          api_req.element_data = api_Search_req;
    
         this.serverService.sendServer(api_req).subscribe((response:any) => 
         {
           console.log("vignesh-customer_status response",response);
    
      this.searchResult=response.customer_names;
         if(response.status=true){
         
         }
             
         });
    
      }

      selectEventCustomer(item:any) {
        console.log(item)
        this.cust_id = item;
        // do something with selected item
      }
     
      onChangeSearchCustomer(val: string) {
        console.log(val)
        // fetch remote data from here
        // And reassign the 'data' which is binded to 'data' property.
      }
      
      onFocusedCustomer(e:any){
        // do something when input is focused
      }

}
