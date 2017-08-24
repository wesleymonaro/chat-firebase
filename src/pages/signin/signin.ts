import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(
    public alertCtrl : AlertController,
    public authService : AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl : LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void{
    let loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged : boolean) => {
        if(isLogged){
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error : any) =>{
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
        
      })
    
  }

  onSignUp() : void{
    this.navCtrl.push(SignupPage);
  }

   private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
