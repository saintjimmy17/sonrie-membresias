import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

     /* Funcion que al hacer click envia al enlace en una nueva pestaña */
     goTo(url: string) {

      window.open(url, '_blank');
      console.log("go to");
     }
}
