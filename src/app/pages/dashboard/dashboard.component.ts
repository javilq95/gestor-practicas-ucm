import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/salesforce/Account.model';
import { accessToken } from 'src/app/salesforce/auth';
import { Contact } from 'src/app/salesforce/contact.model';
import { Lead } from 'src/app/salesforce/Lead.model';
import { Opportunity } from 'src/app/salesforce/opportunity.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public s;
  public sizeLeads: number = null;
  public dateLeads;
  public sizeContacts: number = null;
  public dateContacts;
  public vAccount: Account[] = [];
  public sizeAccounts: number = null;
  public dateAccounts;
  public sizeOpportunities: number = null;
  public dateOpportunities;
  public vOpportunities: Opportunity[] = [];
  public currentType = sessionStorage.getItem('currentType');
  public currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  public accountUser = new Account(this.http);
  public leadUser = new Lead(this.http);
  public contactUser = new Contact(this.http);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    switch (this.currentType) {
      case "Lead":
        this.leadUser.loginLeadSF(this.currentUser.email, this.currentUser.password);

        if (this.currentUser.totalOpportunities > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunities; _i++) {
            this.vOpportunities[_i] = new Opportunity(this.http);
            this.vOpportunities[_i].getOpportunitySF(this.currentUser.vOpportunities[_i]);
          }
        }
        break;
      case "Account":
        this.accountUser.loginAccountSF(this.currentUser.email, this.currentUser.password);
        if (this.currentUser.totalOpportunities > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunities; _i++) {
            this.vOpportunities[_i] = new Opportunity(this.http);
            this.vOpportunities[_i].getOpportunitySF(this.currentUser.vOpportunities[_i]);
          }
        }
        break;
      case "Contact":
        this.contactUser.loginContactSF(this.currentUser.email, this.currentUser.password);
        this.vOpportunities[0] = new Opportunity(this.http);
        this.vOpportunities[0].getOpportunitySF(this.currentUser.opportunityId);
        break;
      default:
        console.log("Tipo erróneo");
        break;
      }

    this.getLeads();
    this.getContacts();
    this.getAccounts();
    this.getOpportunities();
    
  }

  public async getLeads (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+CreatedDate+FROM+Lead+WHERE+isConverted=false+ORDER+BY+CreatedDate+DESC";

    await this.http.get<any>(
          endPoint,
          {
            headers: {
              'Authorization': accessToken,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET'
            }
          }).toPromise().then(x => this.s = JSON.stringify(x));

    var parsed = JSON.parse(this.s);

    this.sizeLeads = parsed.totalSize;

    if(this.sizeLeads > 0){
      this.dateLeads = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

  public async getContacts (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+CreatedDate+FROM+Contact+ORDER+BY+CreatedDate+DESC";

    await this.http.get<any>(
          endPoint,
          {
            headers: {
              'Authorization': accessToken,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET'
            }
          }).toPromise().then(x => this.s = JSON.stringify(x));

    var parsed = JSON.parse(this.s);

    this.sizeContacts = parsed.totalSize;

    if(this.sizeContacts > 0){
      this.dateContacts = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

  public async getAccounts (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+CreatedDate+FROM+Account+ORDER+BY+CreatedDate+DESC";

    await this.http.get<any>(
          endPoint,
          {
            headers: {
              'Authorization': accessToken,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET'
            }
          }).toPromise().then(x => this.s = JSON.stringify(x));

    var parsed = JSON.parse(this.s);

    this.sizeAccounts = parsed.totalSize;

    if(this.sizeAccounts> 0){
      for (var _i = 0; _i < this.sizeAccounts; _i++) {
        this.vAccount[_i] = new Account(this.http);
        this.vAccount[_i].getAccount(parsed.records[_i].Id);
      }
      this.dateAccounts = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

  public async getOpportunities (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+CreatedDate+FROM+Opportunity+ORDER+BY+CreatedDate+DESC";

    await this.http.get<any>(
          endPoint,
          {
            headers: {
              'Authorization': accessToken,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET'
            }
          }).toPromise().then(x => this.s = JSON.stringify(x));

    var parsed = JSON.parse(this.s);

    this.sizeOpportunities = parsed.totalSize;

    if(this.sizeOpportunities > 0){
      this.dateOpportunities = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

}
