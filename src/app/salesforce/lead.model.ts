import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
import { Opportunity } from "./opportunity.model";
export class Lead {
    public s: string = null;
    public id: string = null;
    public error: string = null;
    public vOpportunities:Opportunity[] = []; 
    public totalOpportunities: number = null; 
    public vOpportunitiesArea:Opportunity[] = []; 
    public totalOpportunitiesArea: number = null; 

    constructor(
        public http: HttpClient,
        public firstName: string = null,
        public lastName: string = null,
        public email: string = null,
        public password: string = null,
        public nif: string = null,
        public area: string = null,
        public titulation: string = null,
        public phone: string = null,
        public city: string = null
    ){}

    public async insertLeadSF() {

        var body = {
            'FirstName':this.firstName, 
            'LastName': this.lastName, 
            'Email': this.email,
            'Password__c': this.password,
            'NIF__c': this.nif,
            'Area__c': this.area,
            'Titulation__c': this.titulation,
            'Phone': this.phone,
            'City': this.city,
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

      var body = {
          'FirstName':this.firstName, 
          'LastName': this.lastName, 
          'Email': this.email,
          'Password__c': this.password,
          'NIF__c': this.nif,
          'Area__c': this.area,
          'Titulation__c': this.titulation,
          'Phone': this.phone,
          'City': this.city,
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

    get currentLead() {
        return JSON.stringify(this);
    }

    public async loginLeadSF (loginEmail:string, loginPassword:string){

      var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+FirstName+,+LastName+,+Email+,+Password__c+,+NIF__c+,+Area__c+,+Titulation__c+,+Phone+,+City+,+Company+FROM+Lead+WHERE+Email='"+loginEmail+"'+AND+Password__c='"+loginPassword+"'+AND+Verification__c=true+AND+isConverted=false";

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

      if (parsed.totalSize == 1){
        this.id = parsed.records[0].Id;
        this.firstName = parsed.records[0].FirstName;
        this.lastName = parsed.records[0].LastName;
        this.email = parsed.records[0].Email;
        this.password = parsed.records[0].Password__c;
        this.nif = parsed.records[0].NIF__c;
        this.area = parsed.records[0].Area__c;
        this.titulation = parsed.records[0].Titulation__c;
        this.phone = parsed.records[0].Phone;
        this.city = parsed.records[0].City;
      }else{
        this.error = "Error, los credenciales no son correctas o el alumno está verificado";
      }
      this.getOpportunities();
      this.getOpportunitiesArea();
    }

    public async getOpportunities (){
      
      var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Opportunity__c+FROM+OpportunityLead__C+WHERE+Lead__c='"+this.id+"'";

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
        
          var endPoint2 = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+StageName+,+CloseDate+,+Type+,+Amount+,+Probability+,+WeekDays__c+,+TotalDays__c+,+StartTime__c+,+EndTime__c,+StartDate__c+,+EndDate__c+,+Area__c+,+AccountId+FROM+Opportunity+WHERE+Id='"+parsed.records[_i].Opportunity__c+"'";

          await this.http.get<any>(
                endPoint2,
                {
                  headers: {
                    'Authorization': accessToken,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                  }
                }).toPromise().then(x => this.s = JSON.stringify(x));

                var parsed2 = JSON.parse(this.s);

                this.vOpportunities[_i] = new Opportunity(this.http,
                  parsed2.records[_i].Name,
                  parsed2.records[_i].StageName,
                  parsed2.records[_i].CloseDate,
                  parsed2.records[_i].Type,
                  parsed2.records[_i].Amount,
                  parsed2.records[_i].Probability,
                  parsed2.records[_i].WeekDays__c,
                  parsed2.records[_i].TotalDays__c,
                  parsed2.records[_i].StartTime__c,
                  parsed2.records[_i].EndTime__c,
                  parsed2.records[_i].StartDate__c,
                  parsed2.records[_i].EndDate__c,
                  parsed2.records[_i].Area__c,
                  parsed2.records[_i].AccountId);
        }
      }
    }

    public async getOpportunitiesArea (){

      var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+StageName+,+CloseDate+,+Type+,+Amount+,+Probability+,+WeekDays__c+,+TotalDays__c+,+StartTime__c+,+EndTime__c,+StartDate__c+,+EndDate__c+,+Area__c+,+AccountId+FROM+Opportunity+WHERE+Area__c='"+this.area+"'+AND+StageName='Sin Asignar'";

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

      this.totalOpportunitiesArea = parsed.totalSize;

      if (this.totalOpportunitiesArea > 0){
        for (var _i = 0; _i < this.totalOpportunitiesArea; _i++) {
          this.vOpportunitiesArea[_i] = new Opportunity(this.http,
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
                                                    parsed.records[_i].Area__c,
                                                    parsed.records[_i].AccountId);
        }
      }
    }

    public resetObject(){
      this.id = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.password = null;
      this.nif = null;
      this.area = null;
      this.titulation = null;
      this.phone = null;
      this.city = null;
    }
}