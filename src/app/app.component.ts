import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyCPLmrh68wD3vt3LcwqqF34zLxQ5LvyvEI",
      authDomain: "ng-recipe-book-975b7.firebaseapp.com"
    });
  }
}
