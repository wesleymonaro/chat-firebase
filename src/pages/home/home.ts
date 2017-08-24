import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';
import { FirebaseListObservable } from 'angularfire2';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users : FirebaseListObservable<User[]>;

  constructor(
    public navCtrl: NavController,
    public userService : UserService
  ) {

  }

  ionViewDidLoad(){
    this.users = this.userService.users;
  }

  onSignup() : void{
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user : User) : void {
    console.log(user);
    
  }

}
