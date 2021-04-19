import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/salesforce/Lead.model';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model = new Lead('','','');

  public s;

  constructor(private http: HttpClient) { }
//
  ngOnInit() {
    this.getapi();
  }

  get currentLead(){
    return JSON.stringify(this.model);
  }

  public async getapi(){
    return await this.http.get<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Name+FROM+Account',
        {
            headers: {
              'Authorization': 'Bearer 00D09000007iY11!AREAQKGxJhAPyKMz3TlNg4Ji6_Hxvisjh_uADX9RpAWItjJHmNpP2LaKwFMzXesnFyA7BrwlUde1P8ReWXcUVG_R1ts6q5UI',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET'
            }
        }).toPromise().then(x => this.s = x);
    //return this.http.get('Bearer https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Name+FROM+Account');
  }

}
