import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/salesforce/Account.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  model = new Account(this.http);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.model.id = '0010900000aPU7SAAW';
    this.model.getOpportunities();
  }

}
