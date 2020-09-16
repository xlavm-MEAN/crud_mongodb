import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MachineService } from '../machine.service';


@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})


export class GstEditComponent implements OnInit {

  gst_editForm;
  machine: any = {};

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private ms: MachineService, private fb: FormBuilder) { this.createForm(); }

  createForm() {
    this.gst_editForm = this.fb.group({
      serial:  ['', Validators.required],
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

  updateMachine(serial,brand,model,ubication,price_shopping,receipt_shopping,creation_date,sale_date,seller_identification,state) {
    this.route.params.subscribe(params => {
      this.ms.updateMachine(serial,brand,model,ubication,price_shopping,receipt_shopping,creation_date,sale_date,seller_identification,state, params['id']);
      this.router.navigate(['machine']);
    });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ms.editMachine(params['id']).subscribe(res => {
        this.machine = res;
      });
    });
  }
}
