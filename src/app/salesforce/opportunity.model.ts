import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
export class Opportunity {
    public s;
    constructor(
        public name: string,
        public accountId: string,
        public stageName: string,
        public closeDate: string,
        public type: string,
        public amount: number,
        public probability: number,
        public weekDays: string,
        public totalDays: number,
        public startTime: string,
        public endTime: string,
        public startDate: string,
        public endDate: string,
        private http: HttpClient
    ){}

    public async insertLeadSF() {

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

    get currentLead() {
        return JSON.stringify(this);
    }
}