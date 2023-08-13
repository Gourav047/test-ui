import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/environment/models/dashboard/dashboard.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent {
  searchText:string='';
  @Input() showButtons:boolean=false;
  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private _router:Router,
    private _dashboardService:DashboardService,
  ){}

  ngOnInit(){
  }

  search() {
    this._dashboardService.setSearchQuery(this.searchText);
  }

  redirection(val:string){
    this._router.navigate([`/${val}`]);
  }
}
