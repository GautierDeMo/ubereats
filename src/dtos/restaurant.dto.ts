export interface CreateRestaurantDtoInputs {
  name: string;
  ownerName: string;
  foodTypes: [string];
  postalCode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}
