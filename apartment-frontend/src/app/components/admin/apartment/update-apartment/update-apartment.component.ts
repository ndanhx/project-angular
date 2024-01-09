import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apartment } from 'src/app/model/apartment';
import { ApartmentService } from 'src/app/service/apartment.service';

@Component({
  selector: 'app-update-apartment',
  templateUrl: './update-apartment.component.html',
  styleUrls: ['./update-apartment.component.css'],
})
export class UpdateApartmentComponent implements OnInit {
  apartment: Apartment = new Apartment();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apartmentService: ApartmentService
  ) {}
  ngOnInit(): void {
    this.apartment.idApartment = this.route.snapshot.params['idApartment'];
    this.apartmentService.getApartmentById(this.apartment).subscribe(
      (data) => {
        this.apartment = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.apartmentService.updateApartment(this.apartment).subscribe(
      () => {
        window.alert('Update Successfully.');
        this.router.navigate(['apartment']);
      },
      (error) => console.log(error)
    );
  }

  selectedWardId: number;
  onWardSelected(wardId: number) {
    this.selectedWardId = wardId;
    this.apartment.idWard = wardId;
  }
  selectedTypeID: number;
  onTypeSelected(typeID: number) {
    this.selectedTypeID = typeID;
    this.apartment.idType = typeID;
  }
}
