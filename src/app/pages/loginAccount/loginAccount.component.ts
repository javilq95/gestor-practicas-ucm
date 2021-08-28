import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from 'src/app/salesforce/Account.model';

@Component({
  selector: 'app-login',
  templateUrl: './loginAccount.component.html',
  styleUrls: ['./loginAccount.component.scss']
})
export class LoginAccountComponent implements OnInit, OnDestroy {

  public modelEmail = '';
  public modelPassword = '';
  model = new Account(this.http);

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
