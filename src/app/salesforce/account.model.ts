import { HttpClient } from "@angular/common/http";
import { accessToken } from "./auth";
import { SafeResourceUrl } from "@angular/platform-browser";

export class AccountModel {
  public name: string = null;
  public email: string = null;
  public password: string = null;
  public description: string = null;
  public type: string = null;
  public industry: string = null;
  public annualRevenue: number = null;
  public website: string = null;
  public numberOfEmployees: number = null;
  public accountNumber: string = null;
  public phone: string = null;
  public billingCity: string = null;
  public logo: SafeResourceUrl | string = null;
  public id: string = null;
  public vOpportunities: string[] = [];
  public totalOpportunities: number = null;

}
export class Account {
  public s: string = null;
  public error: string = null;
  public logged: boolean = null;
  public registerErrors: string[] = [];
  public accountModel: AccountModel = new AccountModel();
  constructor(
    public http: HttpClient
  ) {
  }

  public async insertAccountSF() {

    var body = {
      'Name': this.accountModel.name,
      'Email__c': this.accountModel.email,
      'Password__c': this.accountModel.password,
      'Description': this.accountModel.description,
      'Type': this.accountModel.type,
      'Industry': this.accountModel.industry,
      'AnnualRevenue': this.accountModel.annualRevenue,
      'Website': this.accountModel.website,
      'AccountNumber': this.accountModel.accountNumber,
      'NumberOfEmployees': this.accountModel.numberOfEmployees,
      'Phone': this.accountModel.phone,
      'BillingCity': this.accountModel.billingCity,
      'Logo__c': this.accountModel.logo
    };
    var parsed = null;

    await this.http.post<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/account',
      body,
      {
        headers: {
          'Authorization': accessToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Content-Type': 'application/json'
        }
      }).toPromise().then(x => parsed = x, (error: any) => this.registerErrors = error.error);

      this.logged = (parsed != null);
  }

  public async updateAccountSF() {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v52.0/sobjects/Account/" + this.accountModel.id;

    var body = {
      'Name': this.accountModel.name,
      'Description': this.accountModel.description,
      'Type': this.accountModel.type,
      'Industry': this.accountModel.industry,
      'AnnualRevenue': this.accountModel.annualRevenue,
      'Website': this.accountModel.website,
      'AccountNumber': this.accountModel.accountNumber,
      'NumberOfEmployees': this.accountModel.numberOfEmployees,
      'Phone': this.accountModel.phone,
      'BillingCity': this.accountModel.billingCity
    };
    return this.http.patch<any>(
      endPoint,
      body,
      {
        headers: {
          'Authorization': accessToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PATCH',
          'Content-Type': 'application/json'
        }
      }).toPromise().then(x => this.s = JSON.stringify(x));
  }

  public async loginAccountSF(loginEmail: string, loginPassword: string) {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+Email__c+,+Password__c+,+Phone+,+Description+,+Type+,+Industry+,+AnnualRevenue+,+Website+,+AccountNumber,+NumberOfEmployees+,+BillingCity+,+Logo__c+FROM+Account+WHERE+Email__c='" + loginEmail + "'+AND+Password__c='" + loginPassword + "'+AND+Verification__c=true";

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

    if (parsed.totalSize > 0) {
      this.accountModel.id = parsed.records[0].Id;
      this.accountModel.name = parsed.records[0].Name;
      this.accountModel.email = parsed.records[0].Email__c;
      this.accountModel.password = parsed.records[0].Password__c;
      this.accountModel.phone = parsed.records[0].Phone;
      this.accountModel.description = parsed.records[0].Description;
      this.accountModel.type = parsed.records[0].Type;
      this.accountModel.industry = parsed.records[0].Industry;
      this.accountModel.annualRevenue = parsed.records[0].AnnualRevenue;
      this.accountModel.website = parsed.records[0].Website;
      this.accountModel.accountNumber = parsed.records[0].AccountNumber;
      this.accountModel.numberOfEmployees = parsed.records[0].NumberOfEmployees;
      this.accountModel.billingCity = parsed.records[0].BillingCity;
      this.accountModel.logo = parsed.records[0].Logo__c;
      await this.getOpportunities();
      sessionStorage.setItem('currentUser', JSON.stringify(this.accountModel));
      sessionStorage.setItem('currentType', 'Account');
      this.logged = true;
    } else {
      this.error = "ERROR, credenciales incorrectas o empresa no verificada";
      this.logged = false;
    }
  }

  public async getOpportunities() {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+StageName+,+CloseDate+,+Type+,+Amount+,+Probability+,+WeekDays__c+,+TotalDays__c+,+StartTime__c+,+EndTime__c,+StartDate__c+,+EndDate__c+,+Area__c+,+AccountId+FROM+Opportunity+WHERE+AccountId='" + this.accountModel.id + "'";

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

    this.accountModel.totalOpportunities = parsed.totalSize;

    if (this.accountModel.totalOpportunities > 0) {
      for (var _i = 0; _i < this.accountModel.totalOpportunities; _i++) {
        this.accountModel.vOpportunities[_i] = parsed.records[_i].Id;
      }
    }
  }

  public async getAccount(id: string) {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+Email__c+,+Password__c+,+Phone+,+Description+,+Type+,+Industry+,+AnnualRevenue+,+Website+,+AccountNumber,+NumberOfEmployees+,+BillingCity+,+Logo__c+FROM+Account+WHERE+Id='"+ id +"'";

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

    if (parsed.totalSize > 0) {
      this.accountModel.id = parsed.records[0].Id;
      this.accountModel.name = parsed.records[0].Name;
      this.accountModel.email = parsed.records[0].Email__c;
      this.accountModel.password = parsed.records[0].Password__c;
      this.accountModel.phone = parsed.records[0].Phone;
      this.accountModel.description = parsed.records[0].Description;
      this.accountModel.type = parsed.records[0].Type;
      this.accountModel.industry = parsed.records[0].Industry;
      this.accountModel.annualRevenue = parsed.records[0].AnnualRevenue;
      this.accountModel.website = parsed.records[0].Website;
      this.accountModel.accountNumber = parsed.records[0].AccountNumber;
      this.accountModel.numberOfEmployees = parsed.records[0].NumberOfEmployees;
      this.accountModel.billingCity = parsed.records[0].BillingCity;
      this.accountModel.logo = parsed.records[0].Logo__c;
    }
  }

  get currentAccount() {
    return JSON.stringify(this);
  }
  
}