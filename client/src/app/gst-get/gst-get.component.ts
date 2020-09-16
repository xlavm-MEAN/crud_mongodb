import { Component, OnInit } from '@angular/core';
import { MachineService } from '../machine.service';
import Machine from '../machine_model';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {
  machine: Machine[];
  constructor(private ms: MachineService) { }

  deleteMachine(id) {
    this.ms.deleteMachine(id).subscribe(res => {
      console.log('Deleted');
      this.ngOnInit();
    });
  }

  refresh() {
    location.reload();
  }
  ngOnInit() {
    this.ms.getMachine().subscribe((data: Machine[]) => {
      this.machine = data;
    });
  }

}
