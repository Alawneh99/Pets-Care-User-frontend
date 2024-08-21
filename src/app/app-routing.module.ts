import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { GetallPetsComponent } from './pages/getall-pets/getall-pets.component';
import { GetallItemsComponent } from './pages/getall-items/getall-items.component';
import { ErrorComponent } from './pages/error/error.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'signin',
    component:SignInComponent
  },
  {
    path:'forgetpassword',
    component:ForgetPasswordComponent
  },
  {
    path:'resetpassword',
    component:ResetPasswordComponent
  },
  {
    path:'getallpets',
    component:GetallPetsComponent
  },
  {
    path:'getallitems',
    component:GetallItemsComponent
  },
  {
    path:'aboutus',
    component:AboutusComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'**',
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
