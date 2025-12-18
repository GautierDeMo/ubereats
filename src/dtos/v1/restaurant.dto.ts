import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateRestaurantDtoInputs {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  ownerName: string

  foodTypes: [string]

  @IsNotEmpty()
  @IsString()
  postalcode: string

  @IsNotEmpty()
  @IsString()
  address: string

  @IsNotEmpty()
  @IsString()
  phone: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export interface EditRestaurantDtoInputs {
  name?: string
  ownerName?: string
  foodTypes?: string[]
  address?: string
  phone?: string
}

export interface loginDtoInputs {
  email: string
  password: "string"
}

export interface RestaurantPayload {
  id: string
  name: string
  ownerName: string
  email: string
  foodTypes: string[]
}
