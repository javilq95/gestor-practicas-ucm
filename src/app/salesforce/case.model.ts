import { HttpClient } from "@angular/common/http";
import { accessToken } from "./auth";

export class Case {
  public s;
  public message = null;
  constructor(
    public http: HttpClient,
    public subject: string = null,
    public description: string = null,
    public lead: string = null,
    public contactId: string = null,
    public accountId: string = null,
    public priority: string = null
  ) {
  }

  public async insertCaseSF() {

    var priority = '' + this.priority;

    var body = {
      'Subject': this.subject,
      'Description': this.description,
      'Priority': priority,
      'Lead__c': this.lead,
      'ContactId': this.contactId,
      'AccountId': this.accountId,
      'Status': 'Nuevo',
      'Origin': 'Web'
    };
    await this.http.post<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/case',
      body,
      {
        headers: {
          'Authorization': accessToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Content-Type': 'application/json'
        }
      }).toPromise().then(x => this.s = JSON.stringify(x));

      this.message = "Caso creado ✓";
  }

}