import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { featureData } from '../../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';
import { ENVIRONMENT } from 'src/app/environment/environment';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { tosterFunction } from 'src/app/util/utilities';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrls: ['./feature-section.component.scss']
})
export class FeatureSectionComponent {

  @Input() feature_data: any = {}

  copyFeatureData: any = [];

  isApiCalling: boolean = ENVIRONMENT.api;

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private _sanitizer: DomSanitizer
  ) {
  }

  async ngOnInit() {

    this.feature_data = await this.getData();
    this.copyFeatureData = this.feature_data;

    for (let i = 0; i < this.feature_data.length; i++) {
      const element = this.feature_data[i];
      const val = this.copyFeatureData[i];
      if (element.moviePoste != undefined) {
        element.moviePoster = this._sanitizer.bypassSecurityTrustResourceUrl(element?.moviePoster);
        val.moviePoster = this._sanitizer.bypassSecurityTrustResourceUrl(val?.moviePoster);
      }
    }

    this._dashboardService.searchQuery$.subscribe(query => {
      if (query && query != '') {
        this.copyFeatureData = this.feature_data.feature.filter((item: any) => {
          return item.title.toLowerCase() == query.toLowerCase();
        });
      } else {
        this.copyFeatureData = this.feature_data;
      }
    })
  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._dashboardService.getMovies().subscribe(res => {
        resolve(res);
      })
    })
  }

  async openWatchComponent(data: any) {
    if (this.isApiCalling) {
      const response = await this.getMoviesById(data.id);
      if (response != 'error') {
        this.setData(response)
        this._router.navigate(['/watch'])
      }else tosterFunction('error', 'Please Login First')
    } else {
      this.setData(data);
    }
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
}
