import { ChatService } from './../../providers/chat.service';
import { Chat } from './../../models/chat.model';
import { MessageService } from './../../providers/message.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { UserService } from './../../providers/user.service';
import { Message } from './../../models/message.model';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) { }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .first()
          .subscribe((messages: Message[]) => {
            if (messages.length == 0) {
              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);
            }
          })
      })
  }

  sendMessage(newMessage: string): void {

    if (newMessage) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(
        new Message(
          this.sender.$key,
          newMessage,
          currentTimestamp
        ),
        this.messages
      ).then(() => {

        this.chat1
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });

        this.chat2
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });

      });
    }
  }

}
