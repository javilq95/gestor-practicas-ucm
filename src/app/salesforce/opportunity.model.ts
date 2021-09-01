import { HttpClient } from "@angular/common/http";
import { accessToken } from "./auth";

export class Opportunity {
  public s;
  public vLeads: string[] = [];
  public totalLeads: number = null;
  public registerErrors: string[] = [];
  public isInsert: boolean;
  constructor(
    public http: HttpClient,
    public id: string = null,
    public name: string = null,
    public stageName: string = null,
    public closeDate: string = null,
    public type: string = null,
    public amount: number = null,
    public probability: number = null,
    public weekDays: Array<String> = null,
    public totalDays: number = null,
    public startTime: string = null,
    public endTime: string = null,
    public startDate: string = null,
    public endDate: string = null,
    public area: string = null,
    public accountId: string = null,
    public contactId: string = null
  ) {
  }

  public async insertOpportunitySF() {
    if (this.weekDays != null)
      var weekDaysSF = this.weekDays.join(';');

    var body = {
      'Name': this.name,
      'AccountId': this.accountId,
      'StageName': this.stageName,
      'CloseDate': this.closeDate,
      'Type': this.type,
      'Amount': this.amount,
      'Probability': this.probability,
      'WeekDays__c': weekDaysSF,
      'TotalDays__c': this.totalDays,
      'StartTime__c': this.startTime,
      'EndTime__c': this.endTime,
      'StartDate__c': this.startDate,
      'EndDate__c': this.endDate,
      'Area__c': this.area
    };
    var parsed = null;

    await this.http.post<any>(
      'https://wam-dev-ed.my.salesforce.com/services/data/v49.0/sobjects/opportunity',
      body,
      {
        headers: {
          'Authorization': accessToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Content-Type': 'application/json'
        }
      }).toPromise().then(x => parsed = x, (error: any) => this.registerErrors = error.error);

    this.isInsert = (parsed != null);
  }

  public async getOpportunitySF(id: string) {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Id+,+Name+,+StageName+,+CloseDate+,+Type+,+Amount+,+Probability+,+WeekDays__c+,+TotalDays__c+,+StartTime__c+,+EndTime__c,+StartDate__c+,+EndDate__c+,+Area__c+,+AccountId+FROM+Opportunity+WHERE+Id='" + id + "'";

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
    
    this.id = parsed.records[0].Id;
    this.name = parsed.records[0].Name;
    this.stageName = parsed.records[0].StageName;
    this.closeDate = parsed.records[0].CloseDate;
    this.type = parsed.records[0].Type;
    this.amount = parsed.records[0].Amount;
    this.probability = parsed.records[0].Probability;
    this.weekDays = parsed.records[0].WeekDays__c;
    this.totalDays = parsed.records[0].TotalDays__c;
    this.startTime = parsed.records[0].StartTime__c;
    this.endTime = parsed.records[0].EndTime__c;
    this.startDate = parsed.records[0].StartDate__c;
    this.endDate = parsed.records[0].EndDate__c;
    this.area = parsed.records[0].Area__c;
    this.accountId = parsed.records[0].AccountId;
  }


  public async getLeadsSF(id: string) {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+Lead__c+FROM+OpportunityLead__C+WHERE+Opportunity__c='" + id + "'";

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

    this.totalLeads = parsed.totalSize;

    if (this.totalLeads > 0) {
      for (var _i = 0; _i < this.totalLeads; _i++) {
        this.vLeads[_i] = parsed.records[_i].Lead__c;
      }
    }
  }

  public async getContactSF(id: string) {

    var endPoint = "https://wam-dev-ed.my.salesforce.com/services/data/v42.0/query/?q=SELECT+ContactId+FROM+OpportunityContactRole+WHERE+OpportunityId='" + id + "'";

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

    if(parsed.totalSize > 0){
      this.contactId = parsed.records[0].ContactId;
    }
  }

  get currentOpportunity() {
    return JSON.stringify(this);
  }
}