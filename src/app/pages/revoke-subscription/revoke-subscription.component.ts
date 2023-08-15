import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/environment/models/Admin/admin.service';
import { AccountService } from 'src/app/environment/models/account/account.service';
import { tosterFunction } from 'src/app/util/utilities';

@Component({
  selector: 'app-revoke-subscription',
  templateUrl: './revoke-subscription.component.html',
  styleUrls: ['./revoke-subscription.component.scss']
})
export class RevokeSubscriptionComponent {

  isLogin:boolean=false;
  displayedColumns: string[] = ['position', 'name', 'email', 'action'];
  dataSource = new MatTableDataSource<any>;

  refreshData = new Subject()

  @ViewChild(MatPaginator) paginator: any ;

  constructor(
    private _accountService:AccountService,
    private _router:Router,
    private _adminService:AdminService,
    private _cdr:ChangeDetectorRef
  ){
    this.isLogin = this._accountService.isAuthenticated();
  }

  ngOnInit(){
    this.getAllUser();
  }

  getAllUser(){
    this._adminService.getAllUser().subscribe((res:any)=>{
      if(res.length>0){
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this._cdr.detectChanges();
  }

  logout(){
    this._accountService.set(false);
    this._router.navigate(['/login']);
  }

  toggleStatus(object:any){
    this._adminService.revokeUser(object.id).subscribe(res=>{
      if(res){
        tosterFunction('sucess','User Revoked');
        this.getAllUser();
        this._cdr.detectChanges();
      }
    })
  }
}
