import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './basecomponent/app.component';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { GetallPetsComponent } from './pages/getall-pets/getall-pets.component';
import { GetallItemsComponent } from './pages/getall-items/getall-items.component';
import { ConfirmDialogComponent } from './sharedcomponent/confirm-dialog/confirm-dialog.component';
import { ErrorComponent } from './pages/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './sharedcomponent/nav/nav.component';
import { AlertComponent } from './sharedcomponent/alert/alert.component';
import { FooterComponent } from './sharedcomponent/footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule } from '@angular/common/http';
import { RssFeedService } from '../app/backend/rss-feed.service';
import { PetTipsComponent } from './pages/pet-tips/pet-tips.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignupComponent,
    SignInComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    GetallPetsComponent,
    GetallItemsComponent,
    ConfirmDialogComponent,
    ErrorComponent,
    NavComponent,
    AlertComponent,
    ConfirmDialogComponent,
    FooterComponent,
    PetTipsComponent,
    AboutusComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxSpinnerModule.forRoot(),
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ RssFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
