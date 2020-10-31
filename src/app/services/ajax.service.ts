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
   
      let url = `http://localhost:5000/search?name=${term}`;
      this.httpClient.get<AjaxResponse<Item[]>>(url, {observe: 'response'})
      .subscribe(data => this.searchResult = data.body);
      return this.searchResult;
 
  } 

  artist: any;
  profile(id:string) {
      let url = `http://localhost:5000/artist?id=${id}`;
      this.httpClient.get<AjaxResponse<Item[]>>(url, {observe: 'response'})
      .subscribe(data => this.artist = data.body);
      return this.artist;
  } 

  dataPoints: any;
  history(id:string) {
      let url = `http://localhost:5000/data?id=${id}`;
      this.httpClient.get<AjaxResponse<DataPoint[]>>(url, {observe: 'response'})
      .subscribe(data => this.dataPoints = data.body);
      return this.dataPoints;
  } 

  insert(dataPoint:DataPoint){
    this.httpClient.post<any>('http://localhost:5000/insert', dataPoint);
  }

  profileData : any;
  getProfile(id : string) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = `http://localhost:5000/artist?id=${id}`;
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

