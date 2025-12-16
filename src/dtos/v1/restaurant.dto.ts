export interface CreateRestaurantDtoInputs {
  name: string;
  ownerName: string;
  foodTypes: [string];
  postalcode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface EditRestaurantDtoInputs {
  name?: string;
  ownerName?: string;
  foodTypes?: string[];
  address?: string;
  phone?: string;
}

export interface loginDtoInputs {
  email: string;
  password: "string";
}

export interface RestaurantPayload {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  foodTypes: string[];
}
