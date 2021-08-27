import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";

export class Case {
    public s;
    constructor(
        public http: HttpClient,
        public subject: string = null,
        public description: string = null,
        public lead: string = null,
        public contactId: string = null,
        public accountId: string = null,
        public priority: string = null
    ){
    }

    public async insertCaseSF() {

        var body = {
            'Subject':this.subject,
            'Description':this.description, 
            'Priority': this.priority,
            'Lead__c':this.lead, 
            'ContactId': this.contactId, 
            'AccountId': this.accountId,
            'Status': 'Nuevo',
            'Origin': 'Web'
        };
        return this.http.post<any>(
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
    }
    
}