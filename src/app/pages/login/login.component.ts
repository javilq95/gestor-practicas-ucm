import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) { }

  public redirection(){
    return this.router.navigate(['/user-profile']);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
