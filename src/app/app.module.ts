import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {routing} from "./app-route";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserDataComponent } from './component/user-data/user-data.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDataComponent } from './component/product-data/product-data.component';
import { ProductRegistrationComponent } from './component/product-registration/product-registration.component';
import { StatsComponent } from './component/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserRegistrationComponent,
    UserListComponent,
    UserDataComponent,
    ProductListComponent,
    ProductDataComponent,
    ProductRegistrationComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    routing,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
