import { IBooking } from "@/types/booking-type";
import { Car, CarFilter } from "@/types/cars-type";

import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.study",
});

interface Answer {
  cars: Car[];
  totalCars: number;
  totalPages: number;
}

export interface Filters {
  brand: string;
  price: string;
  mileageFrom: string;
  mileageTo: string;
}

export async function getCarList(
  page: number,
  filters: Filters
): Promise<Answer> {

  const params: Record<string, any> = {
    page,
  };

  if (filters.brand) {
    params.brand = filters.brand;
  }

  if (filters.price) {
    params.price = Number(filters.price);
  }

  if (filters.mileageFrom) {
    params.minMileage = Number(filters.mileageFrom);
  }

  if (filters.mileageTo) {
    params.maxMileage = Number(filters.mileageTo);
  }

  const res = await api.get<Answer>(
    "/cars",
    { params }
  );

  return res.data;
}

export async function getCarById(id: string): Promise<Car> {
  const res: AxiosResponse<Car> = await api.get(`/cars/${id}`);
  return res.data;
}

export async function createBookingRequest(carId:string,data: IBooking): Promise<IBooking> {
  const res: AxiosResponse<IBooking> = await api.post(
    `/cars/${carId}/booking-requests`,
    {
      name: data.name,
      email: data.email,
      comment: data.comment,
    }
  );
  return res.data;
}

export async function filterForCar(): Promise<CarFilter> {
  const res: AxiosResponse<CarFilter> = await api.get("/cars/filters");
  return res.data;
}
