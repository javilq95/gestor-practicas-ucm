import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/salesforce/Lead.model';
import { HttpClient} from "@angular/common/http";
import { accessToken } from 'src/app/salesforce/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model = new Lead(this.http);
  public vAreas:string[] = []; 
  public vTitulations:string[] = []; 

  public s;

  constructor(private http: HttpClient) { }
  //
  ngOnInit() {
    this.getAreas();
    this.getTitulations();
  }

  public async getAreas (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Lead/picklist-values/012000000000000AAA/Area__c";

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

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v48.0/ui-api/object-info/Lead/picklist-values/012000000000000AAA/Titulation__c";

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

  get currentLead() {
    return JSON.stringify(this.model);
  }

  public async authSalesforce() {

    var body = {
      'username': 'prsucm@gmail.com',
      'password': 'eTiMAlM8QqtnXZSisrr8Uroge',
      'grant_type': 'password',
      'client_id': '3MVG9SOw8KERNN08z_oVBiDovu6mJpSAiAXITiJ4ViMs8DPEh_PPXnf9sdNhCyT.TGM9TN7ucJxfIB_mJk4D9',
      'client_secret': 'A447A22720FC315D2338C4066AA5785F56B4BFAFAAE22870E7CDE6203241F76B'
    };

    var formData: any = new FormData();
    formData.append("username", "prsucm@gmail.com");
    formData.append("password", "eTiMAlM8QqtnXZSisrr8Uroge");
    formData.append("grant_type", "password");
    formData.append("client_id", "3MVG9SOw8KERNN08z_oVBiDovu6mJpSAiAXITiJ4ViMs8DPEh_PPXnf9sdNhCyT.TGM9TN7ucJxfIB_mJk4D9");
    formData.append("client_secret", "A447A22720FC315D2338C4066AA5785F56B4BFAFAAE22870E7CDE6203241F76B");

    return await this.http.post<any>(
      'https://login.salesforce.com/services/oauth2/token',
      formData,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST'
        }
      }).toPromise().then(x => this.s = x.access_token);

  }


  public async getAPI() {

    return await this.http.get<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Name+FROM+Lead',
      {
        headers: {
          'Authorization': 'Bearer 00D09000007iY11!AREAQHfP26qVEytMe7Kg.9trKT29_GXUhARcYaveObcNUGdPlgzj5eHvdNosL81vvbH2nwqRhWFSj9u_ITd0BZO6sa6MB6MC',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET'
        }
      }).toPromise().then(x => this.s = JSON.stringify(x));

  }

}
