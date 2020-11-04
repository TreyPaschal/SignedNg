import { Component, OnInit, Input } from '@angular/core';
import { Album, Tracks, Track } from '../../interfaces/ajax.interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  @Input() id: string;
  albumTracks : any[];
  albums: Album;
  albumId: string;

  json: string;

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.getAlbums();
    
  }
 
  getAlbums() { 
    const promise = new Promise((resolve, reject) => {
      const apiURL = `https://enigmatic-fjord-97696.herokuapp.com/albums?id=${this.id}`;
      this.httpClient
        .get<Album>(apiURL)
        .toPromise()
        .then((res: Album) => {
          this.albums = res['items'];
          this.getTracks(this.albums[0].id);
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

  getTracks(id:string) { 
    console.log(id);
    console.log(" ");
    
    const promise = new Promise((resolve, reject) => {
      const apiURL = `https://enigmatic-fjord-97696.herokuapp.com/tracks?id=${id}`;
      this.httpClient
        .get<Track[]>(apiURL)
        .toPromise()
        .then((res: Track[]) => {
          this.albumTracks = res['items']; 
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
