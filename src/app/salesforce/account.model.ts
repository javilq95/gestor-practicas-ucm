import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
import { Opportunity } from "./opportunity.model";
export class Account {
    public s: string = null;
    public id: string = null;
    public error: string = null;
    public vOpportunities:Opportunity[] = []; 
    public totalOpportunities: number = null; 
    constructor(
        public http: HttpClient,
        public name: string = null,
        public email: string = null,
        public password: string = null,
        public description: string = null,
        public type: string= null,
        public industry: string = null,
        public annualRevenue: number = null,
        public website: string = null,
        public numberOfEmployees: number = null,
        public accountNumber: string = null,
        public phone: string = null,
        public billingCity: string = null,
        public logo: string = null
    ){}

    public async insertAccountSF() {

      var body = {
          'Name':this.name,
          'Email__c': this.email,
          'Password__c': this.password,
          'Description': this.description,
          'Type': this.type,
          'Industry': this.industry,
          'AnnualRevenue': this.annualRevenue,
          'Website': this.website,
          'AccountNumber': this.accountNumber,
          'NumberOfEmployees': this.numberOfEmployees,
          'Phone': this.phone,
          'BillingCity': this.billingCity,
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

    public async loginAccountSF (loginEmail:string, loginPassword:string){

      var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+Email__c+,+Password__c+,+Phone+,+Description+,+Type+,+Industry+,+AnnualRevenue+,+Website+,+AccountNumber,+NumberOfEmployees+,+BillingCity+,+Logo__c+FROM+Account+WHERE+Email__c='"+loginEmail+"'+AND+Password__c='"+loginPassword+"'+AND+Verification__c=true";

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

      if (parsed.totalSize > 0){
        this.id = parsed.records[0].Id;
        this.name = parsed.records[0].Name;
        this.email = parsed.records[0].Email__c;
        this.password = parsed.records[0].Password__c;
        this.phone = parsed.records[0].Phone;
        this.description = parsed.records[0].Description;
        this.type = parsed.records[0].Type;
        this.industry = parsed.records[0].Industry;
        this.annualRevenue = parsed.records[0].AnnualRevenue;
        this.website = parsed.records[0].Website;
        this.accountNumber = parsed.records[0].AccountNumber;
        this.numberOfEmployees = parsed.records[0].NumberOfEmployees;
        this.billingCity = parsed.records[0].BillingCity;
        this.logo = parsed.records[0].Logo__c;
      }else{
        this.error = "Error, los credenciales no son correctas o el alumno está verificado";
      }
    }

    public async getOpportunities (){

      var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+StageName+,+CloseDate+,+Type+,+Amount+,+Probability+,+WeekDays__c+,+TotalDays__c+,+StartTime__c+,+EndTime__c,+StartDate__c+,+EndDate__c+,+AccountId+FROM+Opportunity+WHERE+AccountId='"+this.id+"'";

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

      this.totalOpportunities = parsed.totalSize;

      if (this.totalOpportunities > 0){
        for (var _i = 0; _i < this.totalOpportunities; _i++) {
          this.vOpportunities[_i] = new Opportunity(this.http,
                                                    parsed.records[_i].Name,
                                                    parsed.records[_i].StageName,
                                                    parsed.records[_i].CloseDate,
                                                    parsed.records[_i].Type,
                                                    parsed.records[_i].Amount,
                                                    parsed.records[_i].Probability,
                                                    parsed.records[_i].WeekDays__c,
                                                    parsed.records[_i].TotalDays__c,
                                                    parsed.records[_i].StartTime__c,
                                                    parsed.records[_i].EndTime__c,
                                                    parsed.records[_i].StartDate__c,
                                                    parsed.records[_i].EndDate__c,
                                                    parsed.records[_i].AccountId);
        }
      }else{
        this.error = "Error, los credenciales no son correctas o el alumno está verificado";
      }
    }

    get currentAccount() {
        return JSON.stringify(this);
    }
}