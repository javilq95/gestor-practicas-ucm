import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/salesforce/Account.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  public dom;
  model = new Account(this.http);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.model.loginAccountSF('adidaspruebaucm@gmail.com','clave7896');
  }

}
