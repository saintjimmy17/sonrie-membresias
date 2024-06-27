import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendRegisterComponent } from './send-register/send-register.component';

const routes: Routes = [
  {
    path:'', component: LoginComponent,
  },
  {
    path:'layout', component: LayoutComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'registrarse', component: SendRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
