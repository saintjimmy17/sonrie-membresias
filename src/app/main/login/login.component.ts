import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  handleSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password)
        .then((userCredential) => {
          // Inicio de sesión exitoso
          const user = userCredential.user;
          console.log(user.uid)
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
          );

          firstValueFrom(userRef.valueChanges()).then(r => console.log(r));


          console.log('Usuario autenticado correctamente');
          // Puedes redirigir al usuario a otra página o mostrar un mensaje de éxito aquí
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.error('Error al autenticar usuario:', error);
          // Puedes mostrar un mensaje de error al usuario aquí
        });
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  }
}
