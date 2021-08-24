import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/salesforce/Account.model';
import { Lead } from 'src/app/salesforce/Lead.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  model = new Account(this.http);
  lead = new Lead(this.http);
  public currentType = "Lead";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.model.loginAccountSF('adidaspruebaucm@gmail.com','clave7896');
    this.lead.loginLeadSF('hola@ucm.es', 'miclave123');
  }

}
