import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/salesforce/contact.model';

@Component({
  selector: 'app-login',
  templateUrl: './loginContact.component.html',
  styleUrls: ['./loginContact.component.scss']
})
export class LoginContactComponent implements OnInit, OnDestroy {

  public modelEmail = '';
  public modelPassword = '';
  model = new Contact(this.http);

  constructor(private http: HttpClient, private router: Router) {}

  public redirection(){
    return this.router.navigate(['/user-profile']);
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
  }

}
