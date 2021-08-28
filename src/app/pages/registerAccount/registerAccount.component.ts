import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/salesforce/Account.model';
import { HttpClient} from "@angular/common/http";
import { accessToken } from 'src/app/salesforce/auth';

@Component({
  selector: 'app-registerAccount',
  templateUrl: './registerAccount.component.html',
  styleUrls: ['./registerAccount.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  model = new Account(this.http);

  public s;

  public vTypes:string[] = []; 
  public vIndustries:string[] = []; 

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.getTypes();
    this.getIndustries();
  }

  public async getTypes (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Account/picklist-values/012000000000000AAA/Type";

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

    var _i = 0;
    while(parsed.values[_i] != null){
      this.vTypes[_i] = parsed.values[_i].label;
      _i++;
    }
  }

  public async getIndustries (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Account/picklist-values/012000000000000AAA/Industry";

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

    var _i = 0;
    while(parsed.values[_i] != null){
      this.vIndustries[_i] = parsed.values[_i].label;
      _i++;
    }
  }

}
