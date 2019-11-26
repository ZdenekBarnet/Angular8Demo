import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICustomer } from 'src/app/model/customer.interface';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customerDialog.component.html'
})

export class CustomerDialogComponent {

  header = 'Nový kontakt';
  firstNameLabel = 'Jméno';
  lastNameLabel = 'Příjmení';
  ageLabel = 'Věk';
  strretLabel = 'Ulice';
  cityLabel = 'Město';
  postCodeLabel = 'PSČ';
  phoneLabel = 'Telefon';
  emailLabel = 'Email';
  saveButtonLabel = 'Uložit';
  cancelButtonLabel = 'Zpět';


  constructor(
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICustomer) {
      this.header = 'Nový kontakt';
      if (data.firstName !== '') {
        this.header = 'Upravit kontakt';
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
