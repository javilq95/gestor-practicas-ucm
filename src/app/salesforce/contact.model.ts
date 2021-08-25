import { HttpClient} from "@angular/common/http";
import { accessToken } from "./auth";
export class Contact {
    public s: string = null;
    public error: string = null;
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
        public mobilePhone: string = null,
        public mark: string = null,
        public billingCity: string = null,
        public id: string = null
    ){}

    public async insertContactSF() {

      var body = {
          'FirstName':this.firstName, 
          'LastName': this.lastName, 
          'Email': this.email,
          'Password__c': this.password,
          'NIF__c': this.nif,
          'Area__c': this.area,
          'Titulation__c': this.titulation,
          'Phone': this.phone,
          'MobilePhone': this.mobilePhone,
          'BillingCity': this.billingCity,
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

    public async loginContactSF (loginEmail:string, loginPassword:string){

      var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+FirstName+,+LastName+,+Email+,+Password__c+,+NIF__c+,+Area__c+,+Titulation__c+,+Phone+,+City+,+Mark__c+,+BillingCity+FROM+Contact+WHERE+Email='"+loginEmail+"'+AND+Password__c='"+loginPassword+"'";

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
        this.billingCity = parsed.records[0].BillingCity;
      }else{
        this.error = "Error, los credenciales no son correctas o el alumno está verificado";
      }
    }

    get currentContact() {
        return JSON.stringify(this);
    }
}