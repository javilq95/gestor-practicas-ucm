import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { accessToken, currentType } from 'src/app/salesforce/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public vAreas:string[] = []; 
  public vTitulations:string[] = []; 
  public s;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAreas();
    this.getTitulations();
  }

  public async getAreas (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/" + currentType + "/picklist-values/012000000000000AAA/Area__c";

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

  public async getTitulations (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/" + currentType + "/picklist-values/012000000000000AAA/Titulation__c";

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
      this.vTitulations[_i] = parsed.values[_i].value;
      _i++;
    }
  }

}
