import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  user: any;

  constructor(private authService: AuthService){}


  ngOnInit(): void {
      /* Para visualizar los datos del registrado */
      this.authService.userData.subscribe((userData) =>{
        this.user = userData;
        console.log(this.user.displayName)
      })


  }
}
