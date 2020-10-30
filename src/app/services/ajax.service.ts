import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AjaxResponse } from '../interfaces/ajax.interfaces';
import { Item} from '../interfaces/artist';

@Injectable({
  providedIn: 'root'
})

export class AjaxService {
  
  constructor(private httpClient: HttpClient) {
  }

  data : any;
  search(term:string) {
   
      let url = `http://localhost:5000/search?name=${term}`;
      this.httpClient.get<AjaxResponse<Item[]>>(url, {observe: 'response'})
      .subscribe(data => this.data = data.body);
      return this.data
 
  } 
}

