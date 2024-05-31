import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../services/mail.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-send-register',
  templateUrl: './send-register.component.html',
  styleUrls: ['./send-register.component.css']
})
export class SendRegisterComponent implements OnInit {

  sendForm!: FormGroup;

  constructor(private fb: FormBuilder, private emailApi: MailService, httpClient: HttpClient){}

  ngOnInit(): void{
    this.sendForm = this.fb.group({
      name:['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      company: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.sendForm.value);
    var data = this.sendForm.value;
    /* Se envian los datos al servidor y se verifican que sean validos */

    /* Datos enviados al mail */
    this.emailApi.sendRegisterMail(
      data.name,
      data.lastName,
      data.email,
      data.company
    ).subscribe(
      (data: any) => {
        console.log('Formulario enviado');
        this.sendForm.reset();
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
