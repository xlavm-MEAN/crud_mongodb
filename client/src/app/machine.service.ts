import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  uri = 'http://localhost:3000/machines';


  constructor(private http: HttpClient) { }

  addMachine(serial,brand,model,ubication,price_shopping,receipt_shopping,creation_date,sale_date,seller_identification,state) {
    const obj = {
      serial:serial,
      brand:brand,
      model:model,
      ubication:ubication,
      price_shopping:price_shopping,
      receipt_shopping:receipt_shopping,
      creation_date:creation_date,
      sale_date:sale_date,
      seller_identification:seller_identification,
      state:state
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getMachine() {
    return this.http.get(`${this.uri}`);
  }

  editMachine(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateMachine(serial,brand,model,ubication,price_shopping,receipt_shopping,creation_date,sale_date,seller_identification,state,id) {
    const obj = {
      serial:serial,
      brand:brand,
      model:model,
      ubication:ubication,
      price_shopping:price_shopping,
      receipt_shopping:receipt_shopping,
      creation_date:creation_date,
      sale_date:sale_date,
      seller_identification:seller_identification,
      state:state
    };
    this.http.post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteMachine(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }
  
}

