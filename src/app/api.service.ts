import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from './artist';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://localhost:5000';
  results:Object[];
  loading:boolean;

  constructor(private httpClient: HttpClient) {
    (2)
    this.results=[];
    this.loading =false;
  }

  search(term:string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiURL}?name=${term}`;
      this.httpClient.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            console.log("Done");
            resolve();
          }
        );
    });
    return promise;
  }
}