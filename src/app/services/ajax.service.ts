import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AjaxResponse, DataPoint} from '../interfaces/ajax.interfaces';
import { Item } from '../interfaces/artist';

@Injectable({
  providedIn: 'root'
})

export class AjaxService {
  
  constructor(private httpClient: HttpClient) {
  }

  searchResult : any;
  search(term:string) {
   
      let url = `https://enigmatic-fjord-97696.herokuapp.com/search?name=${term}`;
      this.httpClient.get<AjaxResponse<Item[]>>(url, {observe: 'response'})
      .subscribe(data => this.searchResult = data.body);
      return this.searchResult;
 
  } 

  artist: any;
  profile(id:string) {
      let url = `https://enigmatic-fjord-97696.herokuapp.com/artist?id=${id}`;
      this.httpClient.get<AjaxResponse<Item[]>>(url, {observe: 'response'})
      .subscribe(data => this.artist = data.body);
      return this.artist;
  } 

  dataPoints: any;
  history(id:string) {
      let url = `https://enigmatic-fjord-97696.herokuapp.com/data?id=${id}`;
      this.httpClient.get<AjaxResponse<DataPoint[]>>(url, {observe: 'response'})
      .subscribe(data => this.dataPoints = data.body);
      return this.dataPoints;
  } 

  insert(dataPoint:DataPoint){
    this.httpClient.post<any>('https://enigmatic-fjord-97696.herokuapp.com/insert', dataPoint);
  }

  profileData : any;
  getProfile(id : string) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = `https://enigmatic-fjord-97696.herokuapp.com/artist?id=${id}`;
      this.httpClient
        .get<Item>(apiURL)
        .toPromise()
        .then((res: Item) => {
          // Success
          //console.log(res);
          resolve();
          return res;
          
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

