import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { CustomerDialogComponent } from './customerDialog/customerDialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static: true})
  viewport: CdkVirtualScrollViewport;

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  searchFieldText = 'hledat  kontakt';
  defaultUrlCustomerThumb = 'https://randomuser.me/api/portraits/thumb/men/94.jpg';
  defaultUrlDetailThumb = 'https://randomuser.me/api/portraits/med/men/94.jpg';
  customerCountText = 'Počet kontaktů:';
  addressTitle = 'Adresa';
  streetTitle = 'Ulice';
  cityTitle = 'Město';
  postcodeTitle = 'PSČ';
  personalDataTitle = 'Osobní údaje';
  contactDataTitle = 'Telefon, email, věk';
  phoneTitle = 'Telefon';
  emailTitle = 'Email';
  ageTitle = 'Věk';

  usersAll: Customer[];
  users: Customer[];
  searchPerson: string;
  selectedPerson = new Customer();
  newPerson: Customer;
  lastSelected: Customer;
  personCount: number;
  numbers = [];
  selectPersonId = -1;

  latitude: number;
  longitude: number;
  zoom: number;
  private geoCoder: google.maps.Geocoder;

  constructor(private router: Router, private apiService: LoginService, public dialog: MatDialog,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    if (!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    });

    this.getPersons(); // it loads customer/contact data
  }

  onSelectPerson(event, clickedPerson) { // user click on card with contact
    this.selectedPerson = clickedPerson;
    this.lastSelected.selected = false;
    clickedPerson.selected = true;
    this.lastSelected = clickedPerson;

    this.geoCoder.geocode({
      address: this.selectedPerson.street + ', ' +  this.selectedPerson.stateName}, (results, status) => {

        this.ngZone.run(() => {
          if (results[0].geometry === undefined || results[0].geometry === null) {
            this.setCurrentLocation();
            return;
          }

          if (status === 'OK') {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            this.zoom = 12;
          }
        });
    });
   }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  newPersonClick(event): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {width: '700px', data: {}});

    dialogRef.afterClosed().subscribe(result => {
      this.newPerson = new Customer();
      this.newPerson = result;
      if (this.newPerson.firstName && this.newPerson.lastName) {
        this.apiService.createCustomer(this.newPerson).subscribe( data => {
          this.selectPersonId = Object(data).id;
          this.getPersons();
        });
      }
    });
  }

  updatePersonClick(event): void {
      let dialogInput = new Customer();
      dialogInput = this.selectedPerson;
      const dialogRef = this.dialog.open(CustomerDialogComponent, {width: '700px', data: dialogInput});

      dialogRef.afterClosed().subscribe(result => {
        this.newPerson = new Customer();
        this.newPerson = result;
        this.apiService.updateCustomer(this.newPerson)
          .subscribe( data => {
            this.selectPersonId = Object(data).id;
            this.getPersons();
          });
    });
  }

  deletePersonClick(event): void {
    this.users.forEach((value, index) => {
      if (value.id === this.selectedPerson.id) {
        if (index + 1 < this.users.length) {
          this.selectPersonId = this.users[index + 1].id;
        }
      }
    });

    this.apiService.deleteCustomer(this.selectedPerson.id)
    .subscribe( data => {
      this.selectedPerson = new Customer();
      this.getPersons();
    });
  }

  onChange(event, searchPerson: string) {
    if (searchPerson !== '') {
      this.users = this.usersAll.filter((value, index, array ) => {
        return value.lastName && value.firstName && (value.lastName.toLowerCase().startsWith(searchPerson.toLowerCase()) ||
          value.firstName.toLowerCase().startsWith(searchPerson.toLowerCase()));
      });
    } else {
      this.users = this.usersAll;
    }
    this.internalSelectPerson(this.users[0]);
  }

  getPersons() {
    this.apiService.getCustomers().subscribe( data => {
      this.usersAll = data; // Object.keys(data).map(i => data[i]);
      if (this.searchPerson) {
        this.users = this.usersAll.filter((value, index, array ) => {
          return value.lastName && value.firstName && (value.lastName.toLowerCase().startsWith(this.searchPerson.toLowerCase()) ||
            value.firstName.toLowerCase().startsWith(this.searchPerson.toLowerCase()));
        });
      } else {
        this.users = this.usersAll;
      }
      this.users.sort((n1, n2) => {
        if (!n1.firstName || !n2.firstName) {
          return 0;
        } else if (n1.firstName.toLowerCase() > n2.firstName.toLowerCase()) {
            return 1;
        } else if (n1.firstName.toLowerCase() < n2.firstName.toLowerCase()) {
            return -1;
        }

        return 0;
    });
      this.personCount = this.usersAll.length;
      if (this.selectPersonId > 0) {
        const person = this.users.find( x => x.id === this.selectPersonId);
        this.internalSelectPerson(person);
        this.selectPersonId = -1;
        this.viewport.scrollToIndex(this.users.indexOf(person) - 1);
      } else {
        this.internalSelectPerson(this.users[0]);
      }
    });
  }

  internalSelectPerson(person: Customer) {
    person.selected = true;
    this.selectedPerson = person;
    this.lastSelected = person;
    this.onSelectPerson(null, person);
   }
}
