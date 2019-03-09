import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, 
    public router: Router, public ngZone: NgZone ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   this.userData = user;
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // })
  }
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        return result;
      }).catch((error) => {
        return error;
      })
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }  
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['/']);
        })
        return result;
      // this.SetUserData(result.user);
    }).catch((error) => {
      return error;
    })
  }
   // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }
  SignIn(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    }).catch((error) => {
      console.log(error)
    })
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
      this.router.navigate(['/login'])
    })
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

}