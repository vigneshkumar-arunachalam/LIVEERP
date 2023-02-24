import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
