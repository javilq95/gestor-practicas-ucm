import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lead } from 'src/app/salesforce/Lead.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public modelEmail = '';
  public modelPassword = '';
  model = new Lead(this.http);

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  //sessionStorage.setItem('currentUser', JSON.stringify(user));

}
