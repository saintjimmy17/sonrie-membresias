import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../../services/mail.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.css']
})
export class ModalPasswordComponent {
  showModal: boolean = false;
  formSubmitted: boolean = false;
  sendForm!: FormGroup;
  loading: boolean = false;

  constructor(private modalService: ModalService, private fb: FormBuilder, private emailApi: MailService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.modalService.showModal$.subscribe(show => {
      this.showModal = show;
    });

    this.sendForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.sendForm.valid) {
      this.loading = true; // Mostrar el loader

      const data = this.sendForm.value;

      /* Datos enviados al mail */
      this.emailApi.sendRecoverPassword(data.email).subscribe(
        (response: any) => {
          console.log('Formulario enviado');
          this.formSubmitted = true; // Cambiar el estado del formulario a enviado
          this.sendForm.reset();
        },
        (err) => {
          console.log(err);
        }
      ).add(() => {
        this.loading = false; // Ocultar el loader después de completar la operación
      });
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.formSubmitted = false; // Restablecer el estado del formulario cuando se cierra el modal
  }
}
