import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/environment/models/User/user.service';
import { AccountService } from 'src/app/environment/models/account/account.service';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';
import { tosterFunction } from 'src/app/util/utilities';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent {

  isLogin: boolean;
  data: any;

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _dashboardService: DashboardService,
    private _userService:UserService
  ) {
    this.isLogin = this._accountService.isAuthenticated();
    this.data = this._dashboardService.featureSubject.getValue()
  }

  ngOnInit() {
    
  }

  logout() {
    this._accountService.set(false);
    this._router.navigate(['/login']);
  }

  async addToList(data:any){
    const addData = await this.postMyList({id:(new Date().getTime())/4,movieId:data.id});
    if(addData) tosterFunction('success','Added Successfully');
  }

  postMyList(object:any):Promise<any>{
    object.id = parseInt(object.id);
    return new Promise((resolve,reject)=>{
      try{
        this._userService.addToList(object).subscribe(res=>{
          if(!Boolean(res))reject('err');
          else resolve(res);
        })
      }catch(err){
        console.error("ERROR",err);
        reject(err);
      }
    })
  }
}
