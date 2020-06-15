import { Component } from '@angular/core';

import { AccountService } from './services';
import { User, Role } from './models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    get isAdmin() {
      return this.user && this.accountService.userValue.role === Role.Admin;
    }

    logout() {
        this.accountService.logout();
    }
}
