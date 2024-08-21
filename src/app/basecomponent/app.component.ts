import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.showSpinner();
  }

  showSpinner() {
    this.spinner.show(undefined, {
      type: 'ball-scale-multiple',
      size: 'large',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: 'transparent', // Make spinner color transparent to show the paw shape
      fullScreen: true
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 3000); // Hide after 3 seconds
  }
}
