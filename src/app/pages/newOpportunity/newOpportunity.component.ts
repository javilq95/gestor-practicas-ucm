import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { accessToken } from 'src/app/salesforce/auth';
import { Opportunity } from 'src/app/salesforce/opportunity.model';

@Component({
  selector: 'app-newOpportunity',
  templateUrl: './newOpportunity.component.html',
  styleUrls: ['./newOpportunity.component.scss']
})
export class NewOpportunityComponent implements OnInit {

  model = new Opportunity(this.http);
  public vAreas:string[] = []; 
  public vTypes:string[] = []; 
  public vStages:string[] = []; 
  public s;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAreas();
    this.getTypes();
    this.getStages();
    this.model.accountId = "0010900000d1biYAAQ";
  }

  public async getAreas (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Opportunity/picklist-values/012000000000000AAA/Area__c";

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
      this.vAreas[_i] = parsed.values[_i].value;
      _i++;
    }
  }

  public async getTypes (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Opportunity/picklist-values/012000000000000AAA/Type";

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
      this.vTypes[_i] = parsed.values[_i].value;
      _i++;
    }
  }

  public async getStages (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Opportunity/picklist-values/012000000000000AAA/StageName";

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
      this.vStages[_i] = parsed.values[_i].value;
      _i++;
    }
  }

}
