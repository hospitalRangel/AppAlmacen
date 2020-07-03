import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  getAlbumes(){
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
  }
}
