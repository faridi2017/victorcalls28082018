import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../apiService/victor-service.service';
import { link } from 'fs';
import {throwError} from 'rxjs';
import { Projdocument } from '../modal/projdocument';


@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
  myFiles:string [] = [];
  myFile:string [] = [];
  btnDisabled = true;
  loading;
  newDocument: Projdocument;
  constructor(private router:Router,private srv:VictorServiceService) {
    this.newDocument = new Projdocument();
   }

  ngOnInit() {

  }
  getFileDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
      //this.newDocument.File = e.target.files[i];
    }
    this.btnDisabled = false;

  }

  cancel(){
    this.router.navigate(['/superadmin/document']);
  }
  
 uploadExcelFiles(){
  const frmData = new FormData();
  for (var i = 0; i < this.myFiles.length; i++) { 
    frmData.append("File", this.myFiles[i]);
    frmData.append("brochure","xyz");
    frmData.append("link","xyz.com/doc" );
  }
// this.srv.uploadsDocument(frmData,sessionStorage.getItem('prjID')).subscribe(res=>{
 // console.log('form data',frmData);
 this.loading=true;
  this.srv.uploadsDocument(frmData,1).subscribe(res=>{
    console.log('Document Added',res);
    this.loading=false;
    alert('file uploaded successfully');
    this.router.navigate(['/superadmin/document']);
  },error =>{
    this.loading=false;
    console.error('error in post api of create document');
    alert('document could not be added, Try again');
    this.router.navigateByUrl('/superadmin/manageCompanies');
    return throwError(error);
  }
  
);
  //this.router.navigate(['']);
 }

}
