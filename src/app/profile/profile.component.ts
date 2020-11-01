import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets} from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {Item} from '../interfaces/artist';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { 
    this.sub = this.route.params.subscribe(params => {    
      this.id = params['id'];
    });   
  }

  private sub: any;
  id: string;
  err: string;
  dataPoints : any[] = [];
  dataLabels : any[] = [];
  aci: any;

  ngOnInit(): void {
    this.getProfile();
    this.startTimer();
  }

  timeLeft: number = 30;
  interval;

startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.getProfile();
        //every 30 seconds
        this.timeLeft = 30;
      }
    },1000)
  }

  data: Item;
  getProfile() {
    const promise = new Promise((resolve, reject) => {
      const apiURL = `https://enigmatic-fjord-97696.herokuapp.com/artist?id=${this.id}`;
      this.httpClient
        .get<Item>(apiURL)
        .toPromise()
        .then((res: Item) => {
          this.data = res;
          this.aci = this.setAci(this.data);
          this.updateDataPoints(this.data, this.aci);
          this.getDataPoints(this.id);
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

  getDataPoints(id : string) { 
   
    const promise = new Promise((resolve, reject) => {
      const apiURL = `https://enigmatic-fjord-97696.herokuapp.com/data?id=${id}`;
      this.httpClient
        .get<any>(apiURL)
        .toPromise()
        .then((res: any) => {
          // Success
          
          if(this.dataPoints == []){
            for (let entry of res) {
              this.dataPoints.push(entry.aci);
              this.dataLabels.push(entry.timestamp);
              this.dataPoints.reverse();
            }
            
          }else{
            this.dataPoints.push(this.aci);
            this.dataLabels.push(Date.now().toString());
          }
          

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

  setAci (data :Item){
    var f :number = data.followers.total; //each equals 1 cent
    var p = data.popularity; //for every popularity point subtract 1/100 (0.001) 
    var value = (101 - p) / 1000;
           return value * f;     
  };

  updateDataPoints(data : Item, aci : number){   
    var myObj = { "artist": data.id, "name":data.name, "aci":aci,"timestamp": Date.now().toString()};
    this.sendPostRequest(myObj).subscribe((responseBody) => {
      console.log(responseBody);
  });
    

  }

  sendPostRequest(data: Object): Observable<Object> {
    console.log(JSON.stringify(data));
    var config = {
      headers: { 'Content-Type': 'application/json'}
      }
    return this.httpClient.post("https://enigmatic-fjord-97696.herokuapp.com/insert/", data, config);
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  lineChartData: ChartDataSets[] = [
    { 
      data: this.dataPoints, 
      label: 'Artist ACI' 
    },
  ];

  lineChartLabels: Label[] = this.dataLabels;

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#1db954',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
}