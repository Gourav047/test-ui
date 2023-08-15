import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/environment/models/User/user.service';
import { AccountService } from 'src/app/environment/models/account/account.service';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';
import { tosterFunction } from 'src/app/util/utilities';
import { myList } from 'src/dummyData/upcommingData';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent {

  isLogin:boolean=false;
  showButtons:boolean=false;
  listData:any=[];
  showList:boolean=true;
  searchText:string='';
  filterData:any=[];

  constructor(
    private _accountService:AccountService,
    private _router:Router,
    private _userService:UserService,
    private _dashboardService:DashboardService
  ){
    this.isLogin=this._accountService.isAuthenticated();
  }

  async ngOnInit(){
    this.getList().then(res=>{
      this.listData=res;
      this.filterData=res;
    });
  }

  getList():Promise<any>{
    return new Promise((resolve,reject)=>{
      try{
        this._userService.getMyList(1,10).subscribe(res=>{
          if(res.length>0)resolve(res);
          else reject('err')
        })
      }catch (err){
        reject(err);
      }
    })
  }
  logout() {
    this._accountService.set(false);
    this._router.navigate(['/login']);
  }

  async openWatchComponent(data: any) {
      const response = await this.getMoviesById(data.id);
      if (response != 'error') {
        this.setData(response)
        this._router.navigate(['/watch'])
      }else tosterFunction('error', 'Please Login First')

  }

  getMoviesById(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._dashboardService.getMovieById(id).subscribe(res => {
        if (res) {
          resolve(res);
        } else {
          reject("error")
        }
      },error=>{
        reject('error');
      })
    })
  }

  setData(response: any) {
    this._dashboardService.featureSubject.next({
      id:response.id,
      source: response.moviePoste,
      title: response.title,
      category:response.category,
      description:response.description,
      name:response.name,
      yearOfRelease:response.yearOfRelease
    })
  }

  searchFeatures():void{
    this.filterData = this.listData.filter((feature:any) =>
      feature.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
