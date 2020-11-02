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
}
