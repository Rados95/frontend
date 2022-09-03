import {LoginFormComponent} from "./component/login-form/login-form.component";
import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {UserRegistrationComponent} from "./component/user-registration/user-registration.component";
import {UserListComponent} from "./component/user-list/user-list.component";
import {AuthGuard} from "./guard/auth.guard";
import {AdminGuard} from "./guard/admin.guard";
import {UserDataComponent} from "./component/user-data/user-data.component";
import {ProductListComponent} from "./component/product-list/product-list.component";
import {ProductDataComponent} from "./component/product-data/product-data.component";
import {ProductRegistrationComponent} from "./component/product-registration/product-registration.component";
import {StatsComponent} from "./component/stats/stats.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'user-registration',
    component: UserRegistrationComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'user-data/:username',
    component: UserDataComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'product-registration',
    component: ProductRegistrationComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-data/:code',
    component: ProductDataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard, AdminGuard],
  }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);
