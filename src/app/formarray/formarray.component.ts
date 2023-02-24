import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formarray',
  templateUrl: './formarray.component.html',
  styleUrls: ['./formarray.component.css']

})
export class FormarrayComponent implements OnInit   {
  orderForm: FormGroup;
items: FormArray;

constructor(private formBuilder: FormBuilder) {}

ngOnInit() {
  this.orderForm = new FormGroup({
    items: new FormArray([])
  });
}

createItem(): FormGroup {
  return this.formBuilder.group({
    name: '',
    description: '',
    price: ''
  });
}

addItem(): void {
  this.items = this.orderForm.get('items') as FormArray;
  this.items.push(this.createItem());
}

}
