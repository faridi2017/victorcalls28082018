import { Component, OnInit } from '@angular/core';
import { UserLeads } from '../modal/userLeads';
import { VictorServiceService } from '../apiService/victor-service.service';
import {throwError} from 'rxjs';
import { Routes, Router } from '../../../node_modules/@angular/router';
import { Company } from '../modal/company';
@Component({
  selector: 'app-vcnavigation',
  templateUrl: './vcnavigation.component.html',
  styleUrls: ['./vcnavigation.component.css']
})
export class VcnavigationComponent implements OnInit {
leadsCount:UserLeads;
vedagya19 = false;
show=false;
showToAdminOnly=false;
userRole;
companies: Company[];
public user;

loginCompanyName;
bUploadExcel=true;
showCompany;
  constructor(private getCounts:VictorServiceService,private router:Router) {
   // sessionStorage.clear();
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.user =sessionStorage.getItem('userName');
    this.userRole = sessionStorage.getItem('role');
    if(this.userRole==='Admin'){
        this.showToAdminOnly= true;
    }else{
      this.showToAdminOnly=false;
    }
    this.getCounts.getAllCompanies().subscribe((data: Company[])=>{
      this.companies = data;
     // this.loginCompanyName = sessionStorage.getItem('CompanyId');
      for(let index=0;index<this.companies.length;index++){
          if(this.companies[index].companyId==+sessionStorage.getItem('CompanyId')){
            this.loginCompanyName = this.companies[index].companyName;
            sessionStorage.setItem('loginCompany',this.loginCompanyName);
            break;
          }
      }
     
  
    },error=>{
      
      console.error('Error in get Api, Companies!');
      return throwError(error);
   });
    if(sessionStorage.getItem('role')==='SuperAdmin'){
      this.showCompany=true;
      this.bUploadExcel=false;
    }else{
      this.showCompany=false;
      this.bUploadExcel=true;

    }
    
    //this.vedagya19 = sessionStorage.getItem('roleId');
   }

  ngOnInit() {
    if(sessionStorage.getItem('roleId') == '1'){
        this.vedagya19 = true;

    }else{ this.vedagya19 = false;}
    this.getCounts.getDetails(sessionStorage.getItem('userName')).subscribe((data: UserLeads) => {
    this.leadsCount = data;
   // this.user =sessionStorage.getItem('userName');
    console.log('Aarif1');
   // console.log(this.leadsCount);
    return true;
  },
  error => {
    console.error("Error in Api!");
    return throwError(error);  // Angular 6/RxJS 6
  }
);
  }
  homenavigate(){
    console.log('hello')
this.router.navigate['admin'];

  }
  logOut() {
    sessionStorage.clear();
   // sessionStorage.
    this.router.navigate(['']);
  }
  showHide(){
    this.show=!this.show;
  }

}
