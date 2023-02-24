import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public addresses: FormArray;
  public addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      addresses: this.fb.array([ this.createAddress() ])
    });
  }
  

  ngOnInit(): void {
 
  }

  get addressControls() {
 
    // return this.addressForm.get('addresses')['controls'];

    return this.addressForm.get('addresses') as FormArray

    // return (this.addressForm.controls.addresses as FormGroup).controls;
   
  }

  createAddress(): FormGroup {
    return this.fb.group({
      address: '',
      street: '',
      city: '',
      country: ''
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
    console.log(this.addresses.value);
  }
  
}
