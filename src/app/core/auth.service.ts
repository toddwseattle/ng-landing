import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable, of } from "rxjs";

import { IUser } from "./user";
import { switchMap } from "rxjs/operators";

@Injectable()
export class AuthService {
  user$: Observable<IUser>;
  constructor(
    private afAuth: AngularFireAuth,
    private afdb: AngularFireDatabase,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afdb
            .object(`users/${user.uid}`)
            .valueChanges() as Observable<IUser>;
        } else {
          return of(null);
        }
      })
    );
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFireObject<IUser> = this.afdb.object(
      `users/${user.uid}`
    );
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      admin: user.admin
    };
    return userRef.set(data);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
}
