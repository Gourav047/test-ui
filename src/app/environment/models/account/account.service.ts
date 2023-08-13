import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { api } from '../api';

type signup = {
  fullName: string,
  email: string,
  password: string,
  passwordConfirm: string
}

type login = {
  email: string,
  password: string
}

type user = {
  id:string,
  email:string,
  isAdmin:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  user = new BehaviorSubject<user>({
    id:'',
    email:'',
    isAdmin:false
  })

  loginCred = new BehaviorSubject<login>({
    email:'',
    password:''
  })
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'  // Example header
    })
  };

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAdminGetter(): boolean {
    return this.isAdminSubject.value;
  }

  isAdminSetter(val: boolean) {
    this.isAdminSubject.next(val);
  }

  set(val: boolean) {
    this.isAuthenticatedSubject.next(val);
  }

  signUp(object: signup): Observable<any> {
    const url = api.Account.Signup;
    return this._http.post(url, JSON.stringify(object), this.httpOptions);
  }

  login(object: login): Observable<any> {
    const url = api.Account.Login;
    return this._http.post(url, JSON.stringify(object), this.httpOptions);
  }

}
