import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { AjaxResponse } from '../interfaces/ajax.interfaces';
import { Item,Image} from '../interfaces/artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private ajaxService: AjaxService) { }

  public term : string;
  public json : string;
  public data : any[];
  


  ngOnInit(){
    this.term = "Trey";
  }

  search() {
    this.data = this.ajaxService.search(this.term);
    this.json = JSON.stringify(this.data);

    for (const item in this.data) {
      console.log(`value = ${this.data[item].name}`)
    }
  }
}