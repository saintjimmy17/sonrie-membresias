import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date().getFullYear();

   /* Funcion que al hacer click envia al enlace en una nueva pestaña */
   goTo(url: string) {

    window.open(url, '_blank');
    console.log("go to");
}
}
