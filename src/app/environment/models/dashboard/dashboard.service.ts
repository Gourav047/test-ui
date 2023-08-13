import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { api } from '../api';
import { Observable } from 'rxjs';
type upcoming = {
  source:string,
  details:string,
}

type featureData={
  source:string,
  title:string
}

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  upcomingSubject = new BehaviorSubject<upcoming>({
    source:'',
    details:''
  })

  featureSubject = new BehaviorSubject<any>({
    source:'',
    title:''
  })
  httpOptions = {
    headers: new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'  // Example header
    })
  };
  constructor(private _http: HttpClient) {
    
  }

  dashboardData = new BehaviorSubject<any>([]);
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }

  getMovies():Observable<any>{
    const url = api.Dashboard.getMovies;
    return this._http.get(url,this.httpOptions);
  }

  getMovieById(id:string):Observable<any>{
    const url = `${api.Dashboard.getMoviesByIds}${id}`;
    return this._http.get(url,this.httpOptions);
  }

  getMoviesByCategory(category:string):Observable<any>{
    const url=api.Dashboard.getMoviewsByCategory;
    return this._http.get(url,this.httpOptions);
  }
}
