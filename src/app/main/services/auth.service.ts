import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { User } from '../interface';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Subject<any> = new Subject<any>();

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.userData.next(null);
        localStorage.removeItem('user');
      }
    });
  }

  async login(email: string, password: string): Promise<any> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);

  }

/*   register(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        this.setUserData(res.user, user.name  user.username );
      });
  } */

  register(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        res.user!.updateProfile({
          displayName: user.name,
          phoneNumber: user.phoneNumber
        })
        //this.setUserData(res.user, user.name /* user.username */);
      });
  }
  /* register(user: any): Promise<any> {
  if (user.email === 'italianomariano198@gmail.com') {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((res) => {
      this.setUserData(res.user, user.name);
      this.afAuth.signOut(); // Cerrar sesión del usuario recién creado
      this.afAuth.signInWithEmailAndPassword('italianomariano198@gmail.com', 'contraseña'); // Volver a iniciar sesión como usuario activo
    });
  } else {
    return Promise.reject('Solo se permite el registro para italianomariano198@gmail.com');
  }
} */

  setUserData(user: any, name?: string /* username?: string */, phoneNumber?: string): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: name || '',
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber || '',
      createAt: serverTimestamp(),
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut(): void {
    this.afAuth.signOut().then((res) => {
      localStorage.removeItem('user');
    });
  }

  get isLoogedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get loggedInUserId(): string {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData).uid;
    }
    return '';
  }
}
