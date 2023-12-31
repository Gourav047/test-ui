import { Component, ChangeDetectorRef } from '@angular/core';
import { upcommingData, featureDataSet } from '../../../dummyData/upcommingData'
import { AccountService } from 'src/app/environment/models/account/account.service';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';
import { ENVIRONMENT } from 'src/app/environment/environment';
import { Subject } from 'rxjs';

export interface imageObj {
  id: string | ''
  name: string | '',
  category: string | '',
  yearOfRelease: number | 0,
  description: string | '',
  isFeatured: boolean | false,
  moviePoste: string | '', // Image file
  contentPath: string | null,
  availabilityStarts: string | ''
  source: string | '',
}
type feature = {
  source: string | null,
  title: string | null
}

type newRelease = {
  source: string | null,
  title: string | null
}

export interface featureData {
  feature: feature[],
  newRelease: newRelease[]
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  // upcoming_data: imageObj[] = upcommingData;
  upcoming_data: any = [];
  feature_data: any = [];
  filterItems: any = [];
  isLogin: boolean;
  showButtons: boolean;
  API_CALLING_CHECK: boolean = ENVIRONMENT.api
  daashboard = new Subject();

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _dashboardService: DashboardService,
    private _cdr: ChangeDetectorRef
  ) {
    this.isLogin = this._accountService.isAuthenticated();
    this.showButtons = this._accountService.isAuthenticated();
  }

  ngOnInit() {
    //Fetching Dashboard details
    if (this.API_CALLING_CHECK) {
      this.getData().then(res=>{
        this.upcoming_data = res;
        this.feature_data = res;
        this._dashboardService.dashboardData.next(res);
        this._cdr.detectChanges();
      });
    }
  }

  getData():Promise<any> {
    return new Promise((resolve,reject)=>{
      this._dashboardService.getMovies().subscribe((res: any) => {
        res.length>0?resolve(res):reject('ERR')
      })
    })
  }

  logout() {
    this._accountService.set(false);
    this._router.navigate(['/login']);
  }

}
