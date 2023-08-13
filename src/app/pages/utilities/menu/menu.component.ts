import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/environment/models/account/account.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  isAdmin: boolean;
  constructor(
    private _router: Router,
    private _accountService: AccountService
  ) {
    this.isAdmin = this._accountService.isAdminGetter();
  }

  redirect(val: string) {
    this._router.navigate([`/${val}`]);
  }
}
