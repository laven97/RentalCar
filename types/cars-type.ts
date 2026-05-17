export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: CarLocation;
  rentalConditions: string[];
  mileage: number;
}

export interface CarPagination {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

interface CarLocation {
  country: string;
  city: string;
  address: string;
}


export interface CarFilter {
  brands:string[],
  price:Price
}

interface Price {
  min:number,
  max:number
}