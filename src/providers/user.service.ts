import { FirebaseAuthState } from 'angularfire2';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { User } from './../models/user.model';
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

@Injectable()
export class UserService extends BaseService{

  users : FirebaseListObservable<User[]>;
  currentUser : FirebaseObjectObservable<User>;

  constructor(
    public af : AngularFire  
  ) {
    super();
    this.users = this.af.database.list(`/users`);
    this.listenAuthState();
  }

  private listenAuthState() : void{
    this.af.auth
      .subscribe((authState : FirebaseAuthState) => {
        if(authState){
          this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`)
        }
      })
  }

  create(user : User, uuid : string) : firebase.Promise<void>{
    return this.af.database.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  userExists(username : string) : Observable<boolean>{
    return this.af.database.list(`/users`, {
      query : {
        orderByChild : 'username',
        equalTo : username
      }
    }).map((users : User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }

}
