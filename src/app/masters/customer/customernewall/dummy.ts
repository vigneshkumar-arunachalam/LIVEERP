CheckboxValueChanges_invoice_shareCustomerPermission(data: any, event: any) {

  console.log("List - Checkbox ID", data);
  this.checkbox_ID_SingleParameter_invoice_Value = data;
  this.Checkbox_value_invoice = event.target.checked;
  console.log(this.Checkbox_value_invoice)

  if (this.Checkbox_value_invoice) {

    if (this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.indexOf(data) < 0) {
      this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.push(data);
    }
    else {
      //type something
    }
    console.log("Final check After  selected list", this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission)

  }
  else {
    const index: number = this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.indexOf(data);
    console.log(index)
    if (index == -1) {
      this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.splice(index, 1);
    } else {
      this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.splice(index, 1);
    }
    console.log("Final check After  de-selected list", this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission)
  }
  this.typeConvertionString_invoice_Shared_Permission = this.CheckBox_DynamicArrayList_invoice_shareCustomerPermission.toString();

  console.log("Final check After Selected/Deselected selected list", this.typeConvertionString_invoice_Shared_Permission)

}