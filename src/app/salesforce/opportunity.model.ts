import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
export class Opportunity {
    public s;
    constructor(
        public http: HttpClient,
        public name: string = null,
        public stageName: string = null,
        public closeDate: string = null,
        public type: string = null,
        public amount: number = null,
        public probability: number = null,
        public weekDays: string = null,
        public totalDays: number = null,
        public startTime: string = null,
        public endTime: string = null,
        public startDate: string = null,
        public endDate: string = null,
        public accountId: string = null
    ){}

    public async insertOpportunitySF() {

        var body = {
            'Name':this.name, 
            'AccountId':this.accountId, 
            'StageName': this.stageName, 
            'CloseDate': this.closeDate,
            'Type': this.type,
            'Amount': this.amount,
            'Probability': this.probability,
            'WeekDays__c': this.weekDays,
            'TotalDays__c': this.totalDays,
            'StartTime__c': this.startTime,
            'EndTime__c': this.endTime,
            'StartDate__c': this.startDate,
            'EndDate__c': this.endDate
        };
        return this.http.post<any>(
            'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/opportunity',
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

    get currentOpportunity() {
        return JSON.stringify(this);
    }
}