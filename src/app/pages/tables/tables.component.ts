import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from 'src/app/salesforce/Account.model';
import { Lead } from 'src/app/salesforce/Lead.model';
import { Opportunity } from 'src/app/salesforce/opportunity.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  public vOpportunitiesAccount: Opportunity[] = [];
  public vOpportunitiesLead: Opportunity[] = [];
  public vOpportunitiesAreaLead: Opportunity[] = [];

  public accountUser = new Account(this.http);
  public leadUser = new Lead(this.http);
  public currentType = sessionStorage.getItem('currentType');
  public currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  public secureLogo;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    switch (this.currentType) {
      case "Lead":
        this.leadUser.loginLeadSF(this.currentUser.email, this.currentUser.password);

        if (this.currentUser.totalOpportunities > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunities; _i++) {
            this.vOpportunitiesLead[_i] = new Opportunity(this.http, this.currentUser.vOpportunities[_i]);
          }
        }
        if (this.currentUser.totalOpportunitiesArea > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunitiesArea; _i++) {
            this.vOpportunitiesAreaLead[_i] = new Opportunity(this.http, this.currentUser.vOpportunitiesArea[_i]);
          }
        }
        break;
      case "Account":
        this.accountUser.loginAccountSF(this.currentUser.email, this.currentUser.password);
        this.secureLogo = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentUser.logo.substring(13, 141).replace('&amp;', '&').replace('&amp;', '&'));

        if (this.currentUser.totalOpportunities > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunities; _i++) {
            this.vOpportunitiesAccount[_i] = new Opportunity(this.http, this.currentUser.vOpportunities[_i]);
          }
        }
        break;
      case "Contact":
        console.log("It is a Tuesday.");
        break;
      default:
        console.log("Tipo erróneo");
        break;
    }
  }
}
