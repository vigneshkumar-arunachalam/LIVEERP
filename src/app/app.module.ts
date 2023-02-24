import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }  from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips'; 
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MastersComponent } from './masters/masters.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { TestComponent } from './test/test.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CombinationComponent } from './combination/combination.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import {MatIconModule} from '@angular/material/icon';
import { CustomerComponent } from './masters/customer/customer.component';
import { CustomernewallComponent } from './masters/customer/customernewall/customernewall.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ContractComponent } from './contract/contract.component';
import { AddComponent } from './contract/add/add.component';
import { MenutestComponent } from './menutest/menutest.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';
import { AlertCheckComponent } from './alert-check/alert-check.component';
import { ContractmasterfileComponent } from './contract/contractmasterfile/contractmasterfile.component';
import { ContractclassificationComponent } from './contract/contractclassification/contractclassification.component';
import { ContractnameComponent } from './contract/contractname/contractname.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { BillingComponent } from './billing/billing.component';
import { QuotationnewComponent } from './billing/quotationnew/quotationnew.component';
import { AddquotationnewComponent } from './billing/quotationnew/addquotationnew/addquotationnew.component';
import { CheckComponent } from './check/check.component';
import { ContractliveComponent } from './contractlive/contractlive.component';
import { LiveComponent } from './live/live.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EditquotationnewComponent } from './billing/quotationnew/editquotationnew/editquotationnew.component';
import { ProformaInvoiceComponent } from './billing/proforma-invoice/proforma-invoice.component';
import { AddPIComponent } from './billing/proforma-invoice/add-pi/add-pi.component';
import { EditPIComponent } from './billing/proforma-invoice/edit-pi/edit-pi.component';
import { TransactionApprovalComponent } from './billing/transaction-approval/transaction-approval.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormarrayComponent } from './formarray/formarray.component';
import { QRCodeModule } from 'angular2-qrcode';
import { SettingsComponent } from './settings/settings.component';
import { ProfiledetailsComponent } from './settings/profiledetails/profiledetails.component';
import { InvoiceComponent } from './billing/invoice/invoice.component';
import { AddInvoiceComponent } from './billing/invoice/add-invoice/add-invoice.component';
import { DidinvoiceComponent } from './billing/didinvoice/didinvoice.component';
import { AddDidInvoiceComponent } from './billing/didinvoice/add-did-invoice/add-did-invoice.component';
import { EditDidInvoiceComponent } from './billing/didinvoice/edit-did-invoice/edit-did-invoice.component';
import { EditInvoiceComponent } from './billing/invoice/edit-invoice/edit-invoice.component';
@NgModule({
  declarations: [
    AppComponent,
    MastersComponent,
    HeaderComponent,
    FooterComponent,

    NavbarComponent,
     SidebarComponent,
     TableComponent,
     TestComponent,
     CombinationComponent,
     Sidebar2Component,
     CustomerComponent,
     CustomernewallComponent,
     FirstComponent,
     SecondComponent,
     ContractComponent,
     AddComponent,
     MenutestComponent,
     AlertCheckComponent,
     ContractmasterfileComponent,
     ContractclassificationComponent,
     ContractnameComponent,
     BillingComponent,
     QuotationnewComponent,
     AddquotationnewComponent,
     CheckComponent,
     ContractliveComponent,
     LiveComponent,
     LoginComponent,
     LogoutComponent,
     EditquotationnewComponent,
     ProformaInvoiceComponent,
     AddPIComponent,
     EditPIComponent,
     TransactionApprovalComponent,
     FormarrayComponent,
     SettingsComponent,
     ProfiledetailsComponent,
     InvoiceComponent,
     AddInvoiceComponent,
     DidinvoiceComponent,
     AddDidInvoiceComponent,
     EditInvoiceComponent,
     EditDidInvoiceComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,MatTabsModule,
    ReactiveFormsModule,QRCodeModule,
    AppRoutingModule,MatChipsModule,EditorModule, DragDropModule,
    HttpClientModule,MatIconModule, NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,MatFormFieldModule,MatAutocompleteModule,MatInputModule,MatSliderModule,
    AutocompleteLibModule,PdfViewerModule
  ],
  providers: [   [BnNgIdleService], { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
