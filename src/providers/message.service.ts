import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Message } from '../models/message.model';
import { BaseService } from "./base.service";


@Injectable()
export class MessageService extends BaseService {

  constructor(
    public af: AngularFire
  ) {
    super();
  }

  create(message: Message, listMessages: FirebaseListObservable<Message[]>): firebase.Promise<void> {
    return listMessages.push(message)
      .catch(this.handlePromiseError);
  }

  getMessages(userId1, userId2): FirebaseListObservable<Message[]> {
    return <FirebaseListObservable<Message[]>>this.af.database.list(`/messages/${userId1}-${userId2}`, {
      query: {
        orderByChild: 'timestamp',
        limitToLast: 50
      }
    }).catch(this.handleObservableError)
  }

}
