import { Component } from '@angular/core';
import { EmailService } from '../../backend/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from 'src/app/sharedcomponent/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private emailService: EmailService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.spinner.show(); // Show the spinner when the form is submitted
      this.emailService.sendEmail(this.contactForm.value)
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          this.spinner.hide(); // Hide the spinner after email is sent successfully
          this.openSuccessDialog();
        }, (err) => {
          console.error('Failed to send email. Error: ', err);
          this.spinner.hide(); // Hide the spinner if there is an error
        });
    }
  }

  openSuccessDialog(): void {
    this.dialog.open(ConfirmDialogComponent);
  }
}
