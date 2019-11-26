import { ICustomer } from './customer.interface';

export class Customer implements ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  thumb: string;
  thumb2: string;
  email: string;
  phone: string;
  street: string;
  stateName: string;
  postcode: string;
  selected: boolean;

  constructor() {
    // capitaliza contact name
    if (this.firstName) {
      this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
    }
    if (this.lastName) {
      this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
    }
  }

  // constructor(params: ICustomer = {} as ICustomer) {
  //   Object.assign(this, params);
  // }
}
