import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
export class Lead {
    public s: string;
    public id: string;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public nif: string,
        public area: string,
        public titulation: string,
        public phone: string,
        public city: string,
        private http: HttpClient
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

    get currentLead() {
        return JSON.stringify(this);
    }

    public async loginLeadSF (loginEmail:string, loginPassword:string){

        var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+FirstName+LastName+Email+Password__c+NIF__c+Area__c+Titulation__c+Phone+City+Company+FROM+Lead+WHERE+Email='"+loginEmail+"'+Password__c='"+loginPassword+"'";
        return await this.http.get<any>(
            endPoint,
            {
              headers: {
                'Authorization': accessToken,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
              }
            }).toPromise().then(x => this.s = JSON.stringify(x));
    }
}