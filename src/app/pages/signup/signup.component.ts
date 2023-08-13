import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/environment/models/account/account.service';
import Swal from 'sweetalert2';
import {tosterFunction} from '../../util/utilities'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  signUpForm: any;
  checked: boolean = false;
  indeterminate: boolean = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled: boolean = false;

  constructor(
    private _accountService: AccountService
  ) {
    this.setForm(); // Calling from cunstroctor so can be generated when component reload.
  }

  ngOnInit() {
  }

  setForm() {
    // Creating FormGroup
    this.signUpForm = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    })
  }

  async signUp() {
    if (!this.checkPassword(this.signUpForm.value.password, this.signUpForm.value.confirm_password)) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'Password Missmatch'
      })
      return;
    } else {
      const postDataStatus = await this.postData({
        fullName: this.signUpForm.value.fullname,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        passwordConfirm: this.signUpForm.value.confirm_password
      })

      if(postDataStatus){
        setTimeout(()=>{
          this.redirect('login');
        },4000);
      }
    }
  }

  postData(object:any):Promise<any>{
    return new Promise((resolve,reject)=>{
      this._accountService.signUp(object).subscribe(res => {
        console.log(res);
        if (res) {
          tosterFunction('success','Signed in successfully')
          resolve(true);
        }else{
          tosterFunction('error','Oops..!! Something Not Right..');
          reject(false)
        }
      },(err:HttpErrorResponse)=>{
        console.log("res",err)
        tosterFunction('error','Oops..!! Something Not Right..');
        reject(false);
      })
    })
  }

  checkPassword(password: string, confirmPassword: string): boolean {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

    if (!pattern.test(password)) {
      console.log("Hello")
      return false; // Password doesn't meet pattern requirements
    }
    console.log(this.signUpForm)
    return password === confirmPassword;
  }

  redirect(val:string){
    window.location.href = val;
  }

}
