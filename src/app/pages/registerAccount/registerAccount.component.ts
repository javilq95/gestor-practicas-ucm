import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/salesforce/Account.model';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registerAccount',
  templateUrl: './registerAccount.component.html',
  styleUrls: ['./registerAccount.component.scss']
})
export class RegisterAccountComponent implements OnInit {

  model = new Account('', '', '', '', '', '', null, '', null, '', '', '', this.http);

  constructor(private http: HttpClient) { }
  //
  ngOnInit() {
    
  }

}
