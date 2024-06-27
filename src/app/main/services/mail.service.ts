import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

   /* Envia el mensaje al servidor de NodeJS */
   sendMessage(body: any){
    let headers = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.post("http://localhost:3000/email",body, headers);
  }

  /* Enviar mail de la pagina de pedido de registro con todos los campos */
  sendRegisterMail(name: any, email: any, company: any, phoneNumber: any){
    var data = {
      name: name,

      email: email,
      company: company,
      phoneNumber: phoneNumber
    }
    return this.http.post(`${environment.api}/sendRegisterMail`, data)
  }
}
