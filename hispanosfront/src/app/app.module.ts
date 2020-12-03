import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthGuard } from './guards/auth.guard';
import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';
import { TokenService } from './services/token.service';

import { CreateComponent } from './components/form/create/create.component';

import { ListsComponent } from './components/form/lists/lists.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CreateComponent,
    ListsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
