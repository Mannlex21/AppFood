import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth,
    public router: Router, public ngZone: NgZone, private db: AngularFireDatabase ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SendVerificationMail();
        return {status: 'ok', detail: result};
      }).catch((error) => {
        return {status: 'error', detail: error};
      });
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        return result;
      // this.SetUserData(result.user);
    }).catch((error) => {
      return error;
    });
  }
   // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      // this.ngZone.run(() => {
      //   this.router.navigate(['']);
      // });
      return {status: 'ok', detail: result};
    }).catch((error) => {
      return {status: 'error', detail: error};
    });
  }
  SetUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    // const userData: User = {
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   emailVerified: user.emailVerified
    // }
    // return userRef.set(userData, {
    //   merge: true
    // })
  }
  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // && user.emailVerified !== false  email is verified
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  // Returns true when user is looged in
  get access(): any {
    const _this = this;
    return _this.db.list('/usuario').valueChanges().subscribe(d => {
      let r;
      d.forEach((element: any) => {
       if (element.correo.toString().toLowerCase() === JSON.parse(localStorage.getItem('user')).email.toString().toLowerCase()) {
        r = element.type;
       }
      });
      return  (r === 'admin') ? true : false;
    });
    // && user.emailVerified !== false  email is verified
  }
}
