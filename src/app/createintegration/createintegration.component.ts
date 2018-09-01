import { Component, OnInit } from '@angular/core';
import { Integrations } from '../modal/integrations';
import { Router } from '@angular/router';

import { IdName } from '../modal/id-name';
import { VictorServiceService } from '../apiService/victor-service.service';
import { FormGroup, FormControl , Validators } from '@angular/forms';

import {throwError} from 'rxjs';
import { Company } from '../modal/company';

@Component({
  selector: 'app-createintegration',
  templateUrl: './createintegration.component.html',
  styleUrls: ['./createintegration.component.css']
})
export class CreateintegrationComponent implements OnInit {
newIntegration: Integrations;
createIntergrationForm;
companies: Company[];
lblComp = false;
lblUser = false;
lblPass = false;
companyName;
name="";
show=false;
companyId="";
userName="";
value="";
loading=false;
compId;
  constructor(private router: Router, private srv: VictorServiceService,) {
    this.newIntegration = new Integrations();
    this.newIntegration.sourceType = new IdName();
  
    this.compId=sessionStorage.getItem('compId');
    this.createIntergrationForm=new FormGroup({
      'Name':new FormControl('',Validators.compose([Validators.required])),
      'companyId':new FormControl('',Validators.compose([Validators.required])),
      'userName':new FormControl('',Validators.compose([Validators.required])),
      'value':new FormControl('',Validators.compose([Validators.required])),
    });

    this.srv.getAllCompanies().subscribe((data: Company[])=>{
      // console.log(data);
       this.companies = data;
       console.log('CompanyList',this.companies);
       this.loading=false;
     }, error=>{
      this.loading=false;
      console.error('Error in API');
      return throwError(error);
     }
    );

   }

  ngOnInit() {
    
  }
 
     //newIntegration.value
     createIntegration(createIntergrationForm){
       this.name=createIntergrationForm.Name;
       this.companyId=createIntergrationForm.companyId;
       this.userName=createIntergrationForm.userName;
       this.value=createIntergrationForm.value;
       if(this.name.length===0||this.companyId.length===0||
           this.userName.length===0||this.value.length===0){
             console.log(this.name,this.companyId,this.userName,this.value);
        alert('Please Fill All Filed');
        return;
       }else{
         this.loading=true;
         console.log('created integration:',this.newIntegration);
        this.srv.postIntegrations(sessionStorage.getItem('integCmpId'), this.newIntegration).subscribe((res:any)=>{
          console.log('integ created: ', res);
          this.loading=false;
        },error =>{
          this.loading=false;
          alert('Integration could not be added, Try again');
          this.router.navigateByUrl('/userhome/manageIntegrations');
          console.error('error in api');
          return throwError(error);
        }
      );
        alert('Company Intergatred Successfully');
        this.router.navigateByUrl('/userhome/manageIntegrations');
       }



      
     }
     cancelIntegration(){
      this.router.navigate(['/userhome/manageIntegrations']);
    }

    validateComp(){
      this.newIntegration.companyId=1;
      for(let i=0;i<=this.companies.length;i++){
        if(this.companyName===this.companies[i].companyName){
          this.newIntegration.companyId=this.companies[i].companyId;
          return;
        }
      }
         this.lblComp=true;
     }

    


    selectedProject(){
      //   <option>99 Acres</option>
     // <option>Magicbricks</option>
     if(this.newIntegration.sourceType.name=="99 Acres" || this.newIntegration.sourceType.name=="Magicbricks" ){
        this.show= true;
     }else{
       this.show = false;
     }
      return;
          }
}
