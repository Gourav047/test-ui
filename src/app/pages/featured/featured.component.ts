import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/environment/models/account/account.service';
import { feature } from 'src/dummyData/upcommingData';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { tosterFunction } from 'src/app/util/utilities';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  isLogin: boolean = true;
  showButtons: boolean = false;
  featuredData: any[] = [];
  searchText:string='';

  @ViewChild(MatPaginator) paginator: any;
  pageSize = 10;
  pageSizeOptions:number[]=[5,10,20,30];
  
  currentPage = 0;

  paginatedData:any[]=[];
  copySearchData:any=[];

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _dashboardService: DashboardService,
    private _sanitizer: DomSanitizer,
    private _cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.getData().then(res=>{
      this.paginatedData = res;
      this.featuredData = res;
      this.paginateData();
      
      for (let i = 0; i < this.paginateData.length; i++) {
        const element = this.paginatedData[i];
        if (element.moviePoste != undefined) {
          element.moviePoster = this._sanitizer.bypassSecurityTrustResourceUrl(element?.moviePoster);
        }
      }
      this._cdr.detectChanges()
    })
  }


  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._dashboardService.getMovies().subscribe(res => {
        resolve(res);
      })
    })
  }

  signout() {
    this._accountService.set(false);
    this._router.navigate(['/login']);
  }

  async openWatchComponent(data: any) {
    const response = await this.getMoviesById(data.id);
    if (response != 'error') {
      this.setData(response)
      this._router.navigate(['/watch'])
    } else tosterFunction('error', 'Please Login First')
  }

  getMoviesById(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._dashboardService.getMovieById(id).subscribe(res => {
        if (res) {
          resolve(res);
        } else {
          reject("error")
        }
      }, error => {
        reject('error');
      })
    })
  }

  setData(response: any) {
    this._dashboardService.featureSubject.next({
      id: response.id,
      source: response.moviePoste,
      title: response.title,
      category: response.category,
      description: response.description,
      name: response.name,
      yearOfRelease: response.yearOfRelease
    })
  }

  paginateData(){
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.featuredData.slice(startIndex, endIndex);
    this._cdr.detectChanges();
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateData();
  }

  searchFeatures():void{
    this.paginatedData = this.featuredData.filter(feature =>
      feature.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
