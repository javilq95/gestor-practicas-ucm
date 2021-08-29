import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public copy: string;
  constructor() { }

  ngOnInit() {
  }

  //https://wam-dev-ed--signature.visualforce.com/apex/Signature
  //https://wam-dev-ed.lightning.force.com/lightning/n/signature__Sign
}
