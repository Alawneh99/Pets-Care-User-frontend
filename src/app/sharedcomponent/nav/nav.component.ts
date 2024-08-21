import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../../backend/main-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private mainService: MainServiceService) {}

  ngOnInit(): void {
    this.mainService.getAuthStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  signOut() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.mainService.SignOut(+userId).subscribe(() => {
        this.router.navigate(['/']); // Redirect to home or another page after sign-out
      });
    }
  }
}
