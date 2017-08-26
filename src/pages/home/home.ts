import { Chat } from './../../models/chat.model';
import { ChatService } from './../../providers/chat.service';
import { ChatPage } from './../chat/chat';
import { AuthService } from './../../providers/auth.service';
import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';
import { FirebaseListObservable } from 'angularfire2';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users : FirebaseListObservable<User[]>;
  view : string = 'chats';

  constructor(
    public authService : AuthService,
    public chatService : ChatService,
    public navCtrl: NavController,
    public userService : UserService
  ) {

  }

  ionViewCanEnter(): Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onSignup() : void{
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(recipientUser : User) : void {
    
    this.userService.currentUser
      .first()
      .subscribe((currentUser : User) => {
        this.chatService.getDeepChat(currentUser.$key, recipientUser.$key)
          .first()
          .subscribe((chat : Chat) => {
            if(chat.hasOwnProperty('$value')){

              let timestamp : Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, '');
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, '');
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);

            }
          });
      })

    this.navCtrl.push(ChatPage, {
      recipientUser : recipientUser
    });
  }

}
