import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temptest',
  templateUrl: './temptest.component.html',
  styleUrls: ['./temptest.component.css']
})
export class TemptestComponent implements OnInit {
username = sessionStorage.getItem('userName');
userName2;
  constructor() { 
    localStorage.setItem('abcd',this.username);
    this.userName2 = localStorage.getItem('abcd');
  }

  ngOnInit() {
  }

}
