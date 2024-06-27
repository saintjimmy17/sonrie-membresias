import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interface';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from '@firebase/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject para mantener el estado del usuario
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    // Suscripción al estado de autenticación
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Si el usuario está autenticado, obtener sus datos de Firestore
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Si no hay usuario autenticado, devolver null
          return [null];
        }
      })
    ).subscribe(userData => {
      // Actualizar el BehaviorSubject con los datos del usuario o null
      this.userData.next(userData);
      if (userData) {
        // Guardar los datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // Eliminar los datos del usuario de localStorage
        localStorage.removeItem('user');
      }
    });
  }

  // Método para iniciar sesión con correo electrónico y contraseña
  async login(email: string, password: string): Promise<any> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para registrar un nuevo usuario
  register(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        // Actualizar el perfil del usuario con el nombre
        res.user!.updateProfile({
          displayName: user.name
        });
        // Guardar los datos del usuario en Firestore
        return this.setUserData(res.user, user.name, user.membershipNumber, user.phoneNumber, user.company);
      });
  }

  // Método para establecer los datos del usuario en Firestore
  setUserData(user: any, name: string, membershipNumber: string, phoneNumber:string, company: string): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: name || '',

      emailVerified: user.emailVerified,
      membershipNumber: membershipNumber,
      phoneNumber: phoneNumber,
      company: company,
      createAt: serverTimestamp(),
    };
    // Guardar los datos del usuario en el documento correspondiente en Firestore
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Método para cerrar sesión
  signOut(): void {
    this.afAuth.signOut().then((res) => {
      // Eliminar los datos del usuario de localStorage y actualizar BehaviorSubject
      localStorage.removeItem('user');
      this.userData.next(null);
    });
  }

  // Getter para verificar si hay un usuario autenticado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // Getter para obtener el UID del usuario autenticado
  get loggedInUserId(): string {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).uid;
    }
    return '';
  }
}
