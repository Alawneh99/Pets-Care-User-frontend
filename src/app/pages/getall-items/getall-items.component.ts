import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainServiceService } from '../../backend/main-service.service';
import { Item } from '../../dtos/item.dto';

@Component({
  selector: 'app-getall-items',
  templateUrl: './getall-items.component.html',
  styleUrls: ['./getall-items.component.css']
})
export class GetallItemsComponent implements OnInit {
  items: Item[] = [];

  constructor(
    public spinner: NgxSpinnerService,
    private mainService: MainServiceService
  ) {}

  ngOnInit() {
    this.showSpinner();
    this.loadItems();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000); 
  }

  loadItems() {
    this.mainService.GetAllItems().subscribe(
      (data: Item[]) => {
        this.items = data;
        this.spinner.hide(); 
      },
      (error: any) => {
        console.error('Error fetching items', error);
        this.spinner.hide(); 
      }
    );
  }
}
