import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/app/model/account';
import { Apartment } from 'src/app/model/apartment';
import { AccountService } from 'src/app/service/account.service';
import { ApartmentService } from 'src/app/service/apartment.service';

@Component({
  selector: 'app-pending-seller',
  templateUrl: './pending-seller.component.html',
  styleUrls: ['./pending-seller.component.css'],
})
export class PendingSellerComponent implements OnInit {
  apartments: Apartment[];
  apartment: Apartment = new Apartment();
  accounts: Account[];

  constructor(
    private apartmentService: ApartmentService,
    private accountService: AccountService,

    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getApartmentListOfSeller();
  }

  private getApartmentListOfSeller() {
    this.apartment.idAccount = Number(localStorage.getItem('idAccount'));

    this.apartmentService
      .getApartmentListOfSellerPending(this.apartment)
      .subscribe((data) => {
        this.apartments = data;
      });
  }

  deleteApartment(idApartment: number) {
    this.apartmentService.deleteApartment(idApartment).subscribe((data) => {
      this.getApartmentListOfSeller();
    });
  }

  updateApartment(idApartment: number) {
    this.router.navigate(['seller/update-apartment', idApartment]);
  }

  detailApartment(idApartment: number) {
    this.router.navigate(['apartment-detail', idApartment]);
  }
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  onTableDataChange(event: any): void {
    this.page = event;
    this.getApartmentListOfSeller();
  }
}
