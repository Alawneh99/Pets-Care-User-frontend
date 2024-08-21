import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainServiceService } from '../../backend/main-service.service';
import { LoginRequest } from '../../dtos/login.dto';
import { ForgetPasswordRequest } from '../../dtos/forgetpasswod.dto';
import { ResetPasswordRequest } from '../../dtos/resetpassword.dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  forgotPassword: boolean = false;
  resetStep: number = 0; 
  emailForReset: string = '';
  token: string = '';
  newPassword: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    public spinner: NgxSpinnerService,
    private mainService: MainServiceService
  ) {}

  ngOnInit() {
    this.showSpinner();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000); 
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleForgotPassword(event: Event) {
    event.preventDefault(); 
    this.forgotPassword = !this.forgotPassword;
    this.resetStep = 0;
  }

  login() {
    this.spinner.show();
    const loginRequest = new LoginRequest(this.email, this.password);
    this.mainService.Login(loginRequest.email, loginRequest.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        this.spinner.hide();
        this.navigateTo('/'); 
      },
      error => {
        console.error('Login failed', error);
        this.spinner.hide();
      }
    );
  }

  resetPassword() {
    this.spinner.show();
    const forgetPasswordRequest = new ForgetPasswordRequest(this.emailForReset);
    this.mainService.ForgetPassword(forgetPasswordRequest.email).subscribe(
      response => {
        this.spinner.hide();
        this.resetStep = 1; 
      },
      error => {
        console.error('Failed to send reset password email', error);
        this.spinner.hide();
      }
    );
  }

  submitNewPassword() {
    this.spinner.show();
    const resetPasswordRequest = new ResetPasswordRequest(this.emailForReset, this.token, this.newPassword);
    this.mainService.ResetPassword(resetPasswordRequest.email, resetPasswordRequest.token, resetPasswordRequest.newPassword).subscribe(
      response => {
        this.spinner.hide();
        this.forgotPassword = false;
      },
      error => {
        console.error('Password reset failed', error);
        this.spinner.hide();
      }
    );
  }
}
