import { MessageService } from './../../providers/message.service';
import { FirebaseListObservable } from 'angularfire2';
import { UserService } from './../../providers/user.service';
import { Message } from './../../models/message.model';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(
    public authService: AuthService,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
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
    this.messages.push(newMessage);
  }

}
