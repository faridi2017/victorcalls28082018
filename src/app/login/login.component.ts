import { Component, OnInit } from '@angular/core';
import { VictorServiceService } from '../apiService/victor-service.service';

import { FormGroup , FormControl , Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { User } from '../modal/User';

import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm;
bUserName= false;
bPassword = false;
bForm = false;
val1: string;
val2: string;
result: any;
result1: any;
failedLogin = false;
loginResult;

public userData: User;
  constructor(private router: Router,private loginPost: VictorServiceService) { 
         this.userData = new User;
       this.loginForm = new FormGroup( {
          'userName': new FormControl('', Validators.compose([Validators.required])),
          'password': new FormControl('', Validators.compose([Validators.required])),
         });
    }// end of constructor
              
    
  ngOnInit() {
  }
  checkPassword(event: any){
   this.val2= event.target.value;
   if(this.val2.length === 0){
    this.bPassword = true;
   }

    }
  
  checkUsername(event: any){
    this.val1= event.target.value;
    if(this.val1.length === 0){
     this.bUserName = true;
    }
  }

  onSubmit(loginDetails) {
    //console.log(loginDetails.userName);
                  this.userData.username = loginDetails.userName;
                  this.userData.password = loginDetails.password;
                  this.userData.grant_type = 'password';
                  if(this.userData.username.length ===0 || this.userData.password.length=== 0){
                    this.bForm = true;
                    return;
                  }else{           
        
                 this.loginResult= this.loginPost.sendPost(this.userData).subscribe((res: any)=> {
                  
                    console.log('loginurl response', res);
                    sessionStorage.setItem('role',res.rolename);
                    sessionStorage.setItem('CompanyId',res.CompanyId);
                 // let ress = JSON.stringify(res);
                 //  console.log(ress["userName"]);
                  sessionStorage.setItem('roleId', res.roleid);
                  //console.log(res.roleid);
                  
                      sessionStorage.setItem('userName', this.userData.username);
                  if(this.userData.username === res.userName){
                  sessionStorage.setItem('vctoken', res.access_token);
                  console.log('accesss token',res.access_token);
                  //console.log('token',res.access_token);
                      this.router.navigate(['/userhome']);
                    } //else{ alert('wrong user id or password');}
                 
                   },error=>{
                   // this.loading = false;
                    console.error('Error in calling Login Api! Login Again');
                   return throwError(error);
                  });   
                 //  console.log('loginurl response', this.loginResult.HttpResponse);
                  }
                   
              

  }  // end of onSubmit
}
