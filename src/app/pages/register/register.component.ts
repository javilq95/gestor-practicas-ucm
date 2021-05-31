import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/salesforce/Lead.model';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model = new Lead('', '', '', '', this.http);

  public s;

  constructor(private http: HttpClient) { }
  //
  ngOnInit() {
    
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
