import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UtilitiesComponent } from './pages/utilities/utilities.component';
import { MenuComponent } from './pages/utilities/menu/menu.component';
import { SearchboxComponent } from './pages/utilities/searchbox/searchbox.component';
import { UpcomingSectionComponent } from './pages/utilities/upcoming-section/upcoming-section.component';
import { FeatureSectionComponent } from './pages/utilities/feature-section/feature-section.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { WatchComponent } from './pages/watch/watch.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UploadMoviesComponent } from './pages/upload-movies/upload-movies.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthInterceptor } from './environment/models/auth.interceptor';
import { RevokeSubscriptionComponent } from './pages/revoke-subscription/revoke-subscription.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    UtilitiesComponent,
    MenuComponent,
    SearchboxComponent,
    UpcomingSectionComponent,
    FeatureSectionComponent,
    FeaturedComponent,
    MyListComponent,
    WatchComponent,
    UploadMoviesComponent,
    RevokeSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
