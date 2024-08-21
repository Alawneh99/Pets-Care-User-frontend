import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainServiceService } from 'src/app/backend/main-service.service';
import { Signup } from 'src/app/dtos/signup.dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent {
  signup: Signup = new Signup('', '', '', '', '', '', 2, ''); // Initializing with default values
  selectedFileName: string = '';
  file: File | null = null; // Store selected file

  constructor(private mainService: MainServiceService, private router: Router, public spinner: NgxSpinnerService) {}

  // Method to handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file; // Store file for later use
      this.selectedFileName = file.name;
    }
  }

  // Method to handle date change
  onDateChange(event: any): void {
    const dateValue = event.target.value; // Get the value from the input element
    if (dateValue) {
      this.signup.birthDate = new Date(dateValue).toISOString(); // Convert the date to ISO format
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    // Check if all required fields are filled
    if (!this.signup.firstName || !this.signup.lastName || !this.signup.email || !this.signup.phone || !this.signup.birthDate || !this.signup.password) {
      alert('Please fill in all fields');
      return;
    }

    this.spinner.show(); // Show the spinner when the form is submitted

    if (this.file) {
      this.mainService.uploadImage(this.file).subscribe(
        (imageUrl: string) => {
          this.signup.profileImage = imageUrl;
          this.submitSignup(); // Proceed with signup after image upload
        },
        error => {
          console.error('Image upload failed:', error);
          this.spinner.hide(); // Hide the spinner if image upload fails
        }
      );
    } else {
      this.submitSignup(); // Proceed without image upload if no file is selected
    }
  }

  // Method to handle actual signup process
  private submitSignup(): void {
    const formData = new FormData();
    formData.append('firstName', this.signup.firstName);
    formData.append('lastName', this.signup.lastName);
    formData.append('email', this.signup.email);
    formData.append('phone', this.signup.phone);
    formData.append('birthDate', this.signup.birthDate);
    formData.append('password', this.signup.password);
    formData.append('profileImage', this.signup.profileImage);  // Store the image URL
    formData.append('userRoleID', '2'); // Hardcoded to 2 (User role)

    this.mainService.Signup(formData).subscribe({
      next: () => {
        this.spinner.hide(); // Hide the spinner after signup is complete
        this.router.navigate(['/signin']); // Navigate to the sign-in page
      },
      error: (error) => {
        console.error('Signup failed', error);
        this.spinner.hide(); // Hide the spinner if signup fails
      }
    });
  }
}
