import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from 'src/app/salesforce/Account.model';
import { accessToken } from 'src/app/salesforce/auth';
import { Lead } from 'src/app/salesforce/Lead.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public s;
  public vAreas:string[] = []; 
  public vTitulations:string[] = []; 
  public vTypes:string[] = []; 
  public vIndustries:string[] = []; 
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
        this.getAreas();
        this.getTitulations();
        break;
      case "Account":
        this.accountUser.loginAccountSF(this.currentUser.email, this.currentUser.password);
        this.secureLogo = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentUser.logo.substring(13, 141).replace('&amp;', '&').replace('&amp;', '&'));
        this.getTypes();
        this.getIndustries();
        break;
      case "Contact":
        console.log("It is a Tuesday.");
        break;
      default:
        console.log("Tipo erróneo");
        break;
    }
  }

  public async getAreas (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/" + this.currentType + "/picklist-values/012000000000000AAA/Area__c";

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

    var _i = 0;
    while(parsed.values[_i] != null){
      this.vAreas[_i] = parsed.values[_i].value;
      _i++;
    }
  }

  public async getTitulations (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/" + this.currentType + "/picklist-values/012000000000000AAA/Titulation__c";

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

    var _i = 0;
    while(parsed.values[_i] != null){
      this.vTitulations[_i] = parsed.values[_i].value;
      _i++;
    }
  }

  public async getTypes (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Account/picklist-values/012000000000000AAA/Type";

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

    var _i = 0;
    while(parsed.values[_i] != null){
      this.vTypes[_i] = parsed.values[_i].label;
      _i++;
    }
  }

  public async getIndustries (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Account/picklist-values/012000000000000AAA/Industry";

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

    var _i = 0;
    while(parsed.values[_i] != null){
      this.vIndustries[_i] = parsed.values[_i].label;
      _i++;
    }
  }

}
