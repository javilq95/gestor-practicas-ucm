import { HttpClient} from "@angular/common/http";
export class Lead {

    public http: HttpClient;
    
    constructor(
        public name: string,
        public email: string,
        public password: string
    ){}

    public async insertLeadSF() {

        var secondBody = {
            'FirstName':'Test1', 
            'LastName': 'Test1', 
            'Company': 'Test1' 
        };
        var body = {
            'Name': this.name,
            'Email': this.email
          };
        this.http.post<any>(
            'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/lead',
            secondBody,
            {
              headers: {
                'Authorization': 'Bearer 00D09000007iY11!AREAQIfkFyoJBgpfMchxfhxkUDZka7E.QzFF3G_R9SMsyT3odoI6oLvW1d8g4McpQqAcMRvwDKOJmwuv4Io0c1LXu5ULm8Fy',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json'
              }
            }).toPromise().then();
    }

    get currentLead() {
        return JSON.stringify(this);
    }
}