import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home';
import { AuthGuard } from './helpers';
import { Role } from './models';

const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./components/users/users.module').then(x => x.UsersModule);
const citizensModule = () => import('./components/citizen/citizens.module').then(x => x.CitizensModule);
const citiesModule = () => import('./components/city/cities.module').then(x => x.CitiesModule);
const statesModule = () => import('./components/state/states.module').then(x => x.StatesModule);

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'users',
      loadChildren: usersModule,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin] }
    },
    {
      path: 'account',
      loadChildren: accountModule
    },
    {
      path: 'citizens',
      loadChildren: citizensModule,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin] }
    },
    {
      path: 'cities',
      loadChildren: citiesModule,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin, Role.User] }
    },
    {
      path: 'states',
      loadChildren: statesModule,
      canActivate: [AuthGuard],
      data: { roles: [Role.Admin, Role.User] }
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
