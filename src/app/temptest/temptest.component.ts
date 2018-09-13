import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Integrations } from '../modal/integrations';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Component({
  selector: 'app-temptest',
  templateUrl: './temptest.component.html',
  styleUrls: ['./temptest.component.css']
})


export class TemptestComponent implements OnInit {
 
username = sessionStorage.getItem('userName');
userName2;
newIntegration: Integrations[];
integ1: Integrations;
bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor(private http: HttpClient) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    console.log(this.bsValue);
  }

  ngOnInit() {
  }
  printDate(){
   //http://api.victorcalls.com/api/account/LeadSource/Validate?startDate=09/08/2018&endDate=09/09/2018&CompanyId=46
   let url='http://api.victorcalls.com/api/account/LeadSource/Validate?startDate=09/08/2018&endDate=09/09/2018&CompanyId=46';
this.http.post(url,this.newIntegration,httpOptions);
  }
}
