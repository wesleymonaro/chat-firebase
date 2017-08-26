import { AuthService } from './../../providers/auth.service';
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
    public authService : AuthService,
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

  onChatCreate(user : User) : void {
    console.log(user);
    
  }

}
