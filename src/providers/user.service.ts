import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { User } from './../models/user.model';

@Injectable()
export class UserService {

  users : FirebaseListObservable<User[]>;

  constructor(
    public af : AngularFire  
  ) {
    this.users = this.af.database.list(`/users`);
  }

  create(user : User) : firebase.Promise<void>{
    return this.af.database.object(`/users/${user.uid}`)
      .set(user);
  }

}
