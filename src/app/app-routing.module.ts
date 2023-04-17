import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/login/login.component';
import { LoginlistComponent } from 'src/loginlist/loginlist.component';
import { RegisterComponent } from 'src/register/register.component';
import { UserlistComponent } from 'src/userlist/userlist.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'userlist', component: UserlistComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'loginlist', component: LoginlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
