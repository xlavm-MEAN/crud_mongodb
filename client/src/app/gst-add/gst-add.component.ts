import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { MachineService } from '../machine.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {
  dataadded = false;
  msg: String ;
  gst_addForm;
  constructor(private fb: FormBuilder , private bs: MachineService) {
    this.createForm();
  }

  createForm() {
    this.gst_addForm = this.fb.group({
      serial:  ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      brand:  ['', Validators.required],
      model:  ['', Validators.required],
      ubication: ['', Validators.required],
      price_shopping:  ['', Validators.required],
      receipt_shopping: ['', Validators.required],
      creation_date: ['', Validators.required],
      sale_date:['', Validators.required],
      seller_identification:['', Validators.required],
      state: ['', Validators.required]
    });
  }

  addMachine (serial,brand,model,ubication,price_shopping,receipt_shopping,creation_date,sale_date,seller_identification,state) {
  this.bs.addMachine(serial,brand,model,ubication,price_shopping,receipt_shopping,creation_date,sale_date,seller_identification,state);
  location.reload();
  this.dataadded = true;
  this.msg = 'Data Added successfully';
  }

  ngOnInit() {
  }

}
