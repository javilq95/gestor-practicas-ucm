import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Account } from 'src/app/salesforce/Account.model';
import { accessToken } from 'src/app/salesforce/auth';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public s;
  public sizeLeads: number = null;
  public dateLeads;
  public sizeContacts: number = null;
  public dateContacts;
  public vAccount: Account[] = [];
  public sizeAccounts: number = null;
  public dateAccounts;
  public sizeOpportunities: number = null;
  public dateOpportunities;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});

    this.getLeads();
    this.getContacts();
    this.getAccounts();
    this.getOpportunities();
    
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  public async getLeads (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+CreatedDate+FROM+Lead+WHERE+isConverted=false+ORDER+BY+CreatedDate+DESC";

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

    this.sizeLeads = parsed.totalSize;

    if(this.sizeLeads > 0){
      this.dateLeads = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

  public async getContacts (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+CreatedDate+FROM+Contact+ORDER+BY+CreatedDate+DESC";

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

    this.sizeContacts = parsed.totalSize;

    if(this.sizeContacts > 0){
      this.dateContacts = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

  public async getAccounts (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+CreatedDate+FROM+Account+ORDER+BY+CreatedDate+DESC";

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

    this.sizeAccounts = parsed.totalSize;

    if(this.sizeAccounts> 0){
      for (var _i = 0; _i < this.sizeAccounts; _i++) {
        this.vAccount[_i] = new Account(this.http);
        this.vAccount[_i].getAccount(parsed.records[_i].Id);
      }
      this.dateAccounts = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

  public async getOpportunities (){

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+CreatedDate+FROM+Opportunity+ORDER+BY+CreatedDate+DESC";

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

    this.sizeOpportunities = parsed.totalSize;

    if(this.sizeOpportunities > 0){
      this.dateOpportunities = parsed.records[0].CreatedDate.substring(0,10);
    }
  }

}
