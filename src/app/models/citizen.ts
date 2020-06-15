import { City } from '@app/models';
export class Citizen {
  id: string;
  firstName: string;
  lastName: string;
  document: string;
  email: string;
  address: string;
  city: City;
}
