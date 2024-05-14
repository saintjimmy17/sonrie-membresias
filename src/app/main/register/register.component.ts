import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService){}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        name:['', Validators.required],
        phoneNumber:['', Validators.required]
      })
  }

  /* Funcion para crear usuario */
  handleSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password, name, phoneNumber } = this.registerForm.value;

      this.authService.register({ email, password, name, phoneNumber })
        .then(() => {
          console.log('Usuario registrado exitosamente en Firebase');
          console.log(phoneNumber)
          // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
        })
        .catch((error) => {
          console.error('Error al registrar usuario en Firebase:', error);
          // Puedes mostrar un mensaje de error al usuario aquí
        });
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  }
}
