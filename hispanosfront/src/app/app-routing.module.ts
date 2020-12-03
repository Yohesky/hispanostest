import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateComponent } from './components/form/create/create.component';
import { ListsComponent } from './components/form/lists/lists.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  { path: 'register', component: RegisterComponent},
  { path: 'create-register', component: CreateComponent , canActivate: [AuthGuard]},
  { path: 'list', component: ListsComponent, canActivate: [AuthGuard]},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
