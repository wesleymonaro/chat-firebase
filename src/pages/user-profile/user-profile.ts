import { UserService } from './../../providers/user.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser : User;
  canEdit: boolean = false;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService : UserService
  ) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser.subscribe((user : User) =>{
      this.currentUser = user;
    })
  }

}
