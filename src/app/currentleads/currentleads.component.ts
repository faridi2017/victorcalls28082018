import { Component, OnInit } from '@angular/core';
import { MyLead } from '../modal/MyLead';
import { VictorServiceService } from '../apiService/victor-service.service';
import {throwError} from 'rxjs';
import { MyItems } from '../modal/MyItems';
import {HttpResponse } from '@angular/common/http';
import { RouterModule, Routes, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-currentleads',
  templateUrl: './currentleads.component.html',
  styleUrls: ['./currentleads.component.css']
})
export class CurrentleadsComponent implements OnInit {

  remarks;
  x:string[] = [];
  expand=[true,true,true,true,true,true,true,true,true,true];
  collapse=[false,false,false,false,false,false,false,false,false,false];
  expandN=[true,true,true,true,true,true,true,true,true,true];
  collapseN=[false,false,false,false,false,false,false,false,false,false];
  name;
  xN:string[]=[];


blist;
loading = false;
 public myLead: MyLead[];
 public selectedLead: MyLead[];
   dropdownSettings = {};
   dropdownList = [];
   selectedUserList = [];
   userList = [];
   leadDetails:MyLead;
   dropdownSettingsA = {};
   dropdownListA = [];
   selectedUserListA = [];
  len;
   indexL;
   indexLI;
   leadItems: MyItems[];
 
   filter = false;
   isRowSelect= false;
   isUserSelect = false;
   isAssignSelect = false;
   isButton = false;
   msg = false;
   msg2 = false;
   public numberOfSelectedLead = 0;
   key;
   arr = [];
   newlist: string[];
 
   constructor(private currentLeadService: VictorServiceService, private router: Router,) {
     //this.myLead = new MyLead[10];
     this.newlist = [];
     this.myLead=[];
    // this.myLead= new MyItems;
    
    
     this.selectedLead = [];
     this.router.routeReuseStrategy.shouldReuseRoute = function(){
       return false;
    }
 
    this.router.events.subscribe((evt) => {
       if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
       }
   });
    } // end of constructor
 
   ngOnInit() {
 //reload page each time
 
 
 
 //reload page on each click
 
 
 
     this.dropdownSettings = {
       singleSelection: false,
       idField: 'item_id',
       textField: 'item_text',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 3,
       allowSearchFilter: true
     };
     this.dropdownSettingsA = {
       singleSelection: false,
       idField: 'item_id',
       textField: 'item_text',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 3,
       allowSearchFilter: true
     };
 
    /* this.rawLeadService.getLeadsByStausId(statusId)
 
 
    */
 // calling get api for raw leads
 this.loading = true;
     this.currentLeadService.getUserLeads('1',sessionStorage.getItem('userName')).subscribe((data: MyLead[]) => {
                            this.indexL = data.length;
                            this.myLead = data;
                            this.loading=false;

                            
                            for(let i =0;i<this.myLead.length;i++){
                              this.xN[i] = this.myLead[i].name.substring(0,20);
                             }//cmpctLabel.substring
                            console.log('CUrrent lead',this.myLead);

                            

                            return true;
                                 },
                                 error => {
                                   this.loading=false;
                                   console.error("Error in Api!");
                                   return throwError(error);  // Angular 6/RxJS 6
                                 }
                               ); 



                               
                               
   }  // end of ngOnInit
             onItemSelect(item: any, i) {
                            //   console.log('Aarif');
                          //    console.log(this.myLead[i].selectedUserList);
                               } // end of onItemSelect
 
                                onItemSelectA(item: any) {
                                  
                                  if(this.selectedUserListA.length!=0){
                                      this.isUserSelect = true;
                                  }
      
                                 } // end of onItemSelectA
                                
                                // event on check box
                                 onRowSelect(event: any, i) {
                                 if(event== true){
                                 this.numberOfSelectedLead = this.numberOfSelectedLead +1;
                                 this.arr.push(i);
                              
                               }else{
                                 
                                   let index = this.arr.indexOf(i); // returns 0
                                   this.arr.splice(index, 1);
                                   //The first parameter is the index at which we want to remove,
                                   // and the second is the number of elements to remove, starting from that index.
                                 
                                 this.numberOfSelectedLead = this.numberOfSelectedLead -1;

                               }
                                 
                                 }
                                 getDetails(myList:MyLead){
                                  this.leadDetails=myList;
                                 }
                                 showN(name,i){
                                  this.expandN[i]=!this.expandN[i];
                                  this.collapseN[i]=!this.collapseN[i];
                                  this.name=name;
                                  console.log('Show more');
                                } 
     
    
}
