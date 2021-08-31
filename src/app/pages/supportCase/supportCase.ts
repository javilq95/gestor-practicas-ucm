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
  public currentType = sessionStorage.getItem('currentType');
  public currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  constructor(private http: HttpClient) { }

  ngOnInit() {
    switch (this.currentType) {
      case "Lead":
        this.model.lead = this.currentUser.id;
        break;
      case "Account":
        this.model.accountId = this.currentUser.id;
        break;
      case "Contact":
        this.model.contactId = this.currentUser.id;
        break;
      default:
        console.log("Tipo erróneo");
        break;
    }
  }
}
