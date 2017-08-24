import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth, FirebaseAuthState } from "angularfire2";
import { BaseService } from "./base.service";


@Injectable()
export class AuthService extends BaseService{

  constructor(
    public auth : AngularFireAuth
    
  ) {
    super();
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(user : {email : string, password : string}): firebase.Promise<FirebaseAuthState>{
    return this.auth.createUser(user)
      .catch(this.handlePromiseError);
  }

}
