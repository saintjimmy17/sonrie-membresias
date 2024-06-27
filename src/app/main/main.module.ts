import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SendRegisterComponent } from './send-register/send-register.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalPasswordComponent } from './components/modal-password/modal-password.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    SendRegisterComponent,
    NavbarComponent,
    FooterComponent,
    ModalPasswordComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MainModule { }
