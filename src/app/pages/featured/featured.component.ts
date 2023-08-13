import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/environment/models/account/account.service';
import { feature } from 'src/dummyData/upcommingData';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { tosterFunction } from 'src/app/util/utilities';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  isLogin: boolean = true;
  showButtons: boolean = false;
  featuredData: any[] = [];

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _dashboardService: DashboardService,
    private _sanitizer: DomSanitizer,
    private _cdr: ChangeDetectorRef
  ) {

  }

  async ngOnInit() {
    const response = await this.getData()
    this.featuredData = response
    console.log(this.featuredData)
    for (let i = 0; i < this.featuredData.length; i++) {
      const element = this.featuredData[i];
      if (element.moviePoste != undefined) {
        element.moviePoster = this._sanitizer.bypassSecurityTrustResourceUrl(element?.moviePoster);
      }
    }
    this._cdr.detectChanges()
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
}
