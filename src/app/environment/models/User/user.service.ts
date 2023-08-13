import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  addToList(object: any): Observable<any> {
    const url = api.User.addToList
    return this._http.post(url, object);
  }

  getMyList(page: any, pageSize: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('accept', '*/*');
    headers.append('Content-Type', 'application/json');
    headers.append('page', page);
    headers.append('pageSize', pageSize)
    const url = api.User.myList;
    return this._http.get(url, {headers})
  }
}
