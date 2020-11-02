import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Item} from '../interfaces/artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  public term : string;
  public json : string;
  public data : any[];
  
  ngOnInit(){
    this.term = "Trey";
  }

  search() {
    //this.data = this.ajaxService.search(this.term);
    const promise = new Promise((resolve, reject) => {
      let url = `https://enigmatic-fjord-97696.herokuapp.com/search?name=${this.term}`;
      this.httpClient
        .get<any>(url)
        .toPromise()
        .then((res: Item[]) => {
          this.data = res;
          resolve();
        },
          err => {
            // Error
            reject(err);
            console.log(err);
          }
        );
    });
    return promise;
  }
}