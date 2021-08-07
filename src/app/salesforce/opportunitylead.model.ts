import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
export class Opportunity {
    public s;
    constructor(
        public leadId: string,
        public opportunityId: string,
        private http: HttpClient
    ){}

    public async insertOpportunityLeadSF() {

        var body = {
            'Lead__c':this.leadId, 
            'Opportunity__c': this.opportunityId
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

    get currentOpportunityLead() {
        return JSON.stringify(this);
    }
}