import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/salesforce/case.model';

@Component({
  selector: 'app-supportCase',
  templateUrl: './supportCase.component.html',
  styleUrls: ['./supportCase.component.scss']
})
export class SupportCaseComponent implements OnInit {

  model = new Case(this.http);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.model.lead = '00Q0900000909BQEAY';
  }


}
