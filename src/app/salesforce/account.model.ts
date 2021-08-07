import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
export class Account {
    public s;
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public description: string,
        public type: string,
        public industry: string,
        public annualRevenue: number,
        public website: string,
        public numberOfEmployees: number,
        public accountNumber: string,
        public phone: string,
        public logo: string,
        private http: HttpClient
    ){}

    public async insertAccountSF() {

        var body = {
            'Name':this.name,
            'Email': this.email,
            'Password__c': this.password,
            'Description': this.description,
            'Type': this.type,
            'Industry': this.industry,
            'AnnualRevenue': this.description,
            'Website': this.website,
            'AccountNumber': this.accountNumber,
            'NumberOfEmployees': this.accountNumber,
            'Phone': this.phone,
            'Logo__c': this.logo
        };
        return this.http.post<any>(
            'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/account',
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

    get currentAccount() {
        return JSON.stringify(this);
    }
}