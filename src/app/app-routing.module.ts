import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { AuthguardService } from './environment/models/authguard.service';
import { UploadMoviesComponent } from './pages/upload-movies/upload-movies.component';
import { WatchComponent } from './pages/watch/watch.component';
import { RevokeSubscriptionComponent } from './pages/revoke-subscription/revoke-subscription.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent
  },
  {
    path:"featured",
    canActivate: [AuthguardService],
    component:FeaturedComponent
  },
  {
    path:"new-releases",
    canActivate: [AuthguardService],
    component:FeaturedComponent
  },
  {
    path:"upcoming",
    canActivate: [AuthguardService],
    component:FeaturedComponent
  },
  {
    path:"myList",
    canActivate: [AuthguardService],
    component:MyListComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"watch",
    canActivate: [AuthguardService],
    component:WatchComponent
  },
  {
    path:"upload-movies",
    canActivate: [AuthguardService],
    component:UploadMoviesComponent
  },
  {
    path:"revoke-user",
    canActivate: [AuthguardService],
    component:RevokeSubscriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
}
