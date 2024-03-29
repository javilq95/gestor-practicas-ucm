import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Account } from 'src/app/salesforce/Account.model';
import { Contact } from 'src/app/salesforce/contact.model';
import { Lead } from 'src/app/salesforce/Lead.model';
import { Opportunity } from 'src/app/salesforce/opportunity.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  //LEAD
  public vOpportunitiesAccount: Opportunity[] = [];
  public vOpportunitiesLead: Opportunity[] = [];
  public vOpportunitiesAreaLead: Opportunity[] = [];
  //ACCOUNT
  public vAccountOpportunity: Account[] = [];
  public vAccountAreaOpportunity: Account[] = [];
  public vLeadOpportunity: Lead[] = [];
  public secureLogos: SafeResourceUrl[] = [];
  public secureLogosArea: SafeResourceUrl[] = [];
  public vContactAccount: Contact[] = [];
  //CONTACT
  public accountContact = new Account(this.http);
  public opportunityContact;
  //LOGIN
  public accountUser = new Account(this.http);
  public leadUser = new Lead(this.http);
  public contactUser = new Contact(this.http);
  public currentType = sessionStorage.getItem('currentType');
  public currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  public secureLogo;
  public details = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  async ngOnInit() {

    switch (this.currentType) {
      case "Lead":
        this.leadUser.loginLeadSF(this.currentUser.email, this.currentUser.password);

        if (this.currentUser.totalOpportunities > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunities; _i++) {
            this.vOpportunitiesLead[_i] = new Opportunity(this.http);
            await this.vOpportunitiesLead[_i].getOpportunitySF(this.currentUser.vOpportunities[_i]);
            this.vAccountOpportunity[_i] = new Account(this.http);
            await this.vAccountOpportunity[_i].getAccount(this.vOpportunitiesLead[_i].accountId)
            this.secureLogos[_i] = this.sanitizer.bypassSecurityTrustResourceUrl(String(this.vAccountOpportunity[_i].accountModel.logo).substring(13, 141).replace('&amp;', '&').replace('&amp;', '&'));
          }
        }
        if (this.currentUser.totalOpportunitiesArea > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunitiesArea; _i++) {
            this.vOpportunitiesAreaLead[_i] = new Opportunity(this.http);
            await this.vOpportunitiesAreaLead[_i].getOpportunitySF(this.currentUser.vOpportunitiesArea[_i]);
            this.vAccountAreaOpportunity[_i] = new Account(this.http);
            await this.vAccountAreaOpportunity[_i].getAccount(this.vOpportunitiesAreaLead[_i].accountId)
            this.secureLogosArea[_i] = this.sanitizer.bypassSecurityTrustResourceUrl(String(this.vAccountAreaOpportunity[_i].accountModel.logo).substring(13, 141).replace('&amp;', '&').replace('&amp;', '&'));
          }
        }
        break;
      case "Account":
        this.accountUser.loginAccountSF(this.currentUser.email, this.currentUser.password);
        this.secureLogo = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentUser.logo.substring(13, 141).replace('&amp;', '&').replace('&amp;', '&'));

        if (this.currentUser.totalOpportunities > 0) {
          for (var _i = 0; _i < this.currentUser.totalOpportunities; _i++) {
            this.vOpportunitiesAccount[_i] = new Opportunity(this.http);
            await this.vOpportunitiesAccount[_i].getOpportunitySF(this.currentUser.vOpportunities[_i]);
            await this.vOpportunitiesAccount[_i].getContactSF(this.currentUser.vOpportunities[_i]);
            this.vContactAccount[_i] = new Contact(this.http);
            if (this.vOpportunitiesAccount[_i].contactId) {
              this.vContactAccount[_i].getContactSF(this.vOpportunitiesAccount[_i].contactId);
            }
          }
        }
        break;
      case "Contact":
        this.contactUser.loginContactSF(this.currentUser.email, this.currentUser.password);
        this.accountContact.getAccount(this.currentUser.accountId);
        this.opportunityContact = new Opportunity(this.http);
        this.opportunityContact.getOpportunitySF(this.currentUser.opportunityId);
        break;
      default:
        console.log("Tipo erróneo");
        break;
    }
  }

  public async getLeads(index: number) {

    await this.vOpportunitiesAccount[index].getLeadsSF(this.vOpportunitiesAccount[index].id);
    if (this.vOpportunitiesAccount[index].totalLeads > 0) {
      for (var _i = 0; _i < this.vOpportunitiesAccount[index].totalLeads; _i++) {

        this.vLeadOpportunity[_i] = new Lead(this.http);
        this.vLeadOpportunity[_i].getLeadSF(this.vOpportunitiesAccount[index].vLeads[_i]);
      }
    }
  }

  public detailsOpp(index: number){
    this.opportunityContact = this.vOpportunitiesLead[index];
    this.details = true;
  }

  public detailsOppArea(index: number){
    this.opportunityContact = this.vOpportunitiesAreaLead[index];
    this.details = true;
  }
}
