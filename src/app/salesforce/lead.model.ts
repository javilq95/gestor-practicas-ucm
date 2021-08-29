import { HttpClient } from "@angular/common/http";
import { accessToken } from "./auth";

export class LeadModel {
  public firstName: string = null;
  public lastName: string = null;
  public email: string = null;
  public password: string = null;
  public nif: string = null;
  public area: string = null;
  public titulation: string = null;
  public phone: string = null;
  public city: string = null;
  public id: string = null;
  public vOpportunities: string[] = [];
  public totalOpportunities: number = null;
  public vOpportunitiesArea: string[] = [];
  public totalOpportunitiesArea: number = null;
}

export class Lead {

  public s: string = null;
  public error: string = null;
  public logged: boolean = null;
  public leadModel: LeadModel = new LeadModel();

  constructor(
    public http: HttpClient
  ) { }

  public async insertLeadSF() {

    var body = {
      'FirstName': this.leadModel.firstName,
      'LastName': this.leadModel.lastName,
      'Email': this.leadModel.email,
      'Password__c': this.leadModel.password,
      'NIF__c': this.leadModel.nif,
      'Area__c': this.leadModel.area,
      'Titulation__c': this.leadModel.titulation,
      'Phone': this.leadModel.phone,
      'City': this.leadModel.city,
      'Company': 'Universidad Complutense de Madrid',
    };
    return this.http.post<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/lead',
      body,
      {
        headers: {
          'Authorization': accessToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Content-Type': 'application/json'
        }
      }).toPromise().then(x => this.s = JSON.stringify(x));
  }

  public async updateLeadSF() {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v52.0/sobjects/Lead/" + this.leadModel.id;

    var body = {
      'FirstName': this.leadModel.firstName,
      'LastName': this.leadModel.lastName,
      'NIF__c': this.leadModel.nif,
      'Area__c': this.leadModel.area,
      'Titulation__c': this.leadModel.titulation,
      'Phone': this.leadModel.phone,
      'City': this.leadModel.city
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

  get currentLead() {
    return JSON.stringify(this);
  }

  public async loginLeadSF(loginEmail: string, loginPassword: string) {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+FirstName+,+LastName+,+Email+,+Password__c+,+NIF__c+,+Area__c+,+Titulation__c+,+Phone+,+City+,+Company+FROM+Lead+WHERE+Email='" + loginEmail + "'+AND+Password__c='" + loginPassword + "'+AND+Verification__c=true+AND+isConverted=false";

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

    if (parsed.totalSize == 1) {
      this.leadModel.id = parsed.records[0].Id;
      this.leadModel.firstName = parsed.records[0].FirstName;
      this.leadModel.lastName = parsed.records[0].LastName;
      this.leadModel.email = parsed.records[0].Email;
      this.leadModel.password = parsed.records[0].Password__c;
      this.leadModel.nif = parsed.records[0].NIF__c;
      this.leadModel.area = parsed.records[0].Area__c;
      this.leadModel.titulation = parsed.records[0].Titulation__c;
      this.leadModel.phone = parsed.records[0].Phone;
      this.leadModel.city = parsed.records[0].City;
      await this.getOpportunities();
      await this.getOpportunitiesArea();
      sessionStorage.setItem('currentUser', JSON.stringify(this.leadModel));
      sessionStorage.setItem('currentType', 'Lead');
      this.logged = true;
    } else {
      this.error = "ERROR, credenciales incorrectas o alumno no verificado";
      this.logged = false;
    }
  }

  public async getOpportunities() {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Opportunity__c+FROM+OpportunityLead__C+WHERE+Lead__c='" + this.leadModel.id + "'";

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

    this.leadModel.totalOpportunities = parsed.totalSize;

    if (this.leadModel.totalOpportunities > 0) {
      for (var _i = 0; _i < this.leadModel.totalOpportunities; _i++) {
        this.leadModel.vOpportunities[_i] = parsed.records[_i].Opportunity__c;
      }
    }
  }

  public async getOpportunitiesArea() {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+FROM+Opportunity+WHERE+Area__c='" + this.leadModel.area + "'+AND+StageName='Sin Asignar'";

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

    this.leadModel.totalOpportunitiesArea = parsed.totalSize;

    if (this.leadModel.totalOpportunitiesArea > 0) {
      for (var _i = 0; _i < this.leadModel.totalOpportunitiesArea; _i++) {
        this.leadModel.vOpportunitiesArea[_i] = parsed.records[_i].Id;
      }
    }
  }

  public async insertOpportunityLeadSF(opportunityId: string) {

    var body = {
      'Lead__c': this.leadModel.id,
      'Opportunity__c': opportunityId
    };
    return this.http.post<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/OpportunityLead__c/',
      body,
      {
        headers: {
          'Authorization': accessToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Content-Type': 'application/json'
        }
      }).toPromise().then(x => this.s = JSON.stringify(x));
  }

}