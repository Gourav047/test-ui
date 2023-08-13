import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/environment/models/account/account.service';
import { tosterFunction } from 'src/app/util/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any;
  constructor(
    private _accountServive:AccountService, 
    private _router: Router,
    ) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  async login() {
    const postLogin = await this.postLogin({
      email:this.loginForm.value.username,
      password:this.loginForm.value.password
    })

    if(postLogin.id){
      this._accountServive.set(true);
      this._accountServive.user.next(postLogin);
      postLogin.isAdmin?this._accountServive.isAdminSetter(true):this._accountServive.isAdminSetter(false);
      if(postLogin.isAdmin){
        this._accountServive.loginCred.next({
          email:this.loginForm.value.username,
          password:this.loginForm.value.password
        })
      }
      this.redirect('dashboard');
    }else{
      this._accountServive.set(false);
      tosterFunction('error','Oops..!! Wrong Details');
    }
  }

  postLogin(object:any):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._accountServive.login(object).subscribe(res=>{
        if(res!=null){
          resolve(res);
        }else reject({
          error:"Something Went Wrong"
        })
      })
    })
  }

  redirect(val:string){
    this._router.navigate([`/${val}`]);
  }
}
