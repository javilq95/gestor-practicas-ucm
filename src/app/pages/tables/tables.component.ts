import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from 'src/app/salesforce/Account.model';
import { Lead } from 'src/app/salesforce/Lead.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  model = new Account(this.http, this.sanitizer);
  lead = new Lead(this.http);
  public currentType = "Account";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.model.loginAccountSF('pescanovanova8@gmail.com','dsadsddsads');
    this.lead.loginLeadSF('hola@ucm.es', 'miclave123');
  }

}
