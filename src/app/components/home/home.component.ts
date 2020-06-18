import { Component } from '@angular/core';

import { User, Role } from '@app/models';
import { AccountService } from '@app/services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    get isUser() {
      const userRole = this.accountService.userValue.role;
      return this.user && userRole === Role.User;
    }

    get isAdmin(){
      const userRole = this.accountService.userValue.role;
      return this.user && (userRole === Role.Admin);
    }
}
