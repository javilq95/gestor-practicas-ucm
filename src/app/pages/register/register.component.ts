import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/salesforce/Lead.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model = new Lead('Javier','example@gmail.com','');

  constructor() { }
//
  ngOnInit() {
  }

  get currentLead(){
    return JSON.stringify(this.model);
  }

}
