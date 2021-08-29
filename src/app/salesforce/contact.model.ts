import { HttpClient } from "@angular/common/http";
import { accessToken } from "./auth";
export class ContactModel {
  public http: HttpClient;
  public firstName: string = null;
  public lastName: string = null;
  public email: string = null;
  public password: string = null;
  public nif: string = null;
  public area: string = null;
  public titulation: string = null;
  public phone: string = null;
  public mobilePhone: string = null;
  public mark: string = null;
  public mailingCity: string = null;
  public id: string = null;
  public accountId: string = null;
  public opportunityId: string = null;
}

export class Contact {
  public s: string = null;
  public error: string = null;
  public logged: boolean = null;
  public contactModel: ContactModel = new ContactModel();
  constructor(
    public http: HttpClient
  ) { }

  public async insertContactSF() {

    var body = {
      'FirstName': this.contactModel.firstName,
      'LastName': this.contactModel.lastName,
      'Email': this.contactModel.email,
      'Password__c': this.contactModel.password,
      'NIF__c': this.contactModel.nif,
      'Area__c': this.contactModel.area,
      'Titulation__c': this.contactModel.titulation,
      'Phone': this.contactModel.phone,
      'MobilePhone': this.contactModel.mobilePhone,
      'mailingCity': this.contactModel.mailingCity,
      'AccountId': this.contactModel.accountId,
      'Mark__c': this.contactModel.mark
    };
    return this.http.post<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/contact',
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

  public async loginContactSF(loginEmail: string, loginPassword: string) {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+FirstName+,+LastName+,+Email+,+Password__c+,+NIF__c+,+Area__c+,+Titulation__c+,+Phone+,+Mark__c+,+MailingCity+,+AccountId+FROM+Contact+WHERE+Email='" + loginEmail + "'+AND+Password__c='" + loginPassword + "'";

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
      this.contactModel.id = parsed.records[0].Id;
      this.contactModel.firstName = parsed.records[0].FirstName;
      this.contactModel.lastName = parsed.records[0].LastName;
      this.contactModel.email = parsed.records[0].Email;
      this.contactModel.password = parsed.records[0].Password__c;
      this.contactModel.nif = parsed.records[0].NIF__c;
      this.contactModel.area = parsed.records[0].Area__c;
      this.contactModel.titulation = parsed.records[0].Titulation__c;
      this.contactModel.phone = parsed.records[0].Phone;
      this.contactModel.mailingCity = parsed.records[0].MailingCity;
      this.contactModel.accountId = parsed.records[0].AccountId;
      this.contactModel.mark = parsed.records[0].Mark__c;
      await this.getOpportunitySF();
      sessionStorage.setItem('currentUser', JSON.stringify(this.contactModel));
      sessionStorage.setItem('currentType', 'Contact');
      this.logged = true;
    } else {
      this.error = "ERROR, credenciales incorrectas o alumno no verificado";
      this.logged = false;
    }
  }

  public async getOpportunitySF() {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+OpportunityId+FROM+OpportunityContactRole+WHERE+ContactId='" + this.contactModel.id + "'";

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

    if(parsed.totalSize > 0){
      console.log(parsed.records[0].OpportunityId);
      this.contactModel.opportunityId = parsed.records[0].OpportunityId;
    }
  }

  get currentContact() {
    return JSON.stringify(this);
  }

}