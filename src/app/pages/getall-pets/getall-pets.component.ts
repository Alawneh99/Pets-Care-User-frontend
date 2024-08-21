import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainServiceService } from '../../backend/main-service.service';
import { Pet, Gender, PetType } from '../../dtos/pet.dto';

@Component({
  selector: 'app-getall-pets',
  templateUrl: './getall-pets.component.html',
  styleUrls: ['./getall-pets.component.css']
})
export class GetallPetsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(
    public spinner: NgxSpinnerService,
    private mainService: MainServiceService
  ) {}

  ngOnInit() {
    this.showSpinner();
    this.loadPets();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000); // Adjust the duration as needed
  }

  loadPets() {
    this.mainService.GetAllPets().subscribe(
      (data: Pet[]) => {
        this.pets = data;
        this.spinner.hide(); // Hide spinner once data is loaded
      },
      (error: any) => {
        console.error('Error fetching pets', error);
        this.spinner.hide(); // Hide spinner in case of error
      }
    );
  }

  // Methods to get enum names
  getGenderName(gender: Gender): string {
    return Gender[gender];
  }

  getPetTypeName(petType: PetType): string {
    return PetType[petType];
  }
}
