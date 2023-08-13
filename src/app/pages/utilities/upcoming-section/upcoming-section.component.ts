import { Component, Input } from '@angular/core';
import { DashboardComponent, imageObj } from '../../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';
import { ENVIRONMENT } from 'src/app/environment/environment';
import { convertBase64ToImageUrl } from 'src/app/util/utilities';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upcoming-section',
  templateUrl: './upcoming-section.component.html',
  styleUrls: ['./upcoming-section.component.scss']
})



export class UpcomingSectionComponent {
  @Input() upcoming_data: any = [];

  isApiCalling: boolean = ENVIRONMENT.api;

  data = new Subject();

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private _sanitizer: DomSanitizer
  ) {
  }

  async ngOnInit() {
    if (this.isApiCalling) {
      this.upcoming_data = await this.getData();
      for (let i = 0; i < this.upcoming_data.length; i++) {
        const element = this.upcoming_data[i];
        element.moviePoster = this._sanitizer.bypassSecurityTrustResourceUrl(element?.moviePoster);
      }
    }
  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._dashboardService.getMovies().subscribe(res => {
        resolve(res);
      })
    })
  }

  openWatchComponent(data: any) {
    if (this.isApiCalling) {
      this._dashboardService.getMovieById(data.id).subscribe(res => {
        this.setData(res)
        this._router.navigate(['/watch'])
      })
    } else {
      this.setData(data);
    }
  }

  setData(response: any) {
    this._dashboardService.featureSubject.next({
      source: response.source,
      title: response.title
    })
  }
}
