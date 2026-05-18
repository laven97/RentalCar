import { Car } from "@/types/cars-type";
import CarForm from "../CarForm/CarForm";
import css from "./CarDetailsView.module.css";

interface CarDetailsViewProps {
  car: Car;
}

export default function CarDetailsView({ car }: CarDetailsViewProps) {
  return (
    <div className={css.container}>
      <section className={css.rightSide}>
        <div className={css.rightSideImg}>
          <img src={car.img} alt={car.brand} />
        </div>
        <div className={css.bookYourCar}>
          <CarForm carId={car.id} />
        </div>
      </section>

      <section className={css.leftSide}>
        <div className={css.summeryOfCar}>
          <div className={css.carInfo}>
            <h3 className={css.carName}>
              {car.model}, {car.year}
              <span className={css.carId}>Id:{car.id}</span>
            </h3>

            <div className={css.locationContainer}>
              <div className={css.location}>
                <svg width="16" height="16">
                  <use href="/icons/icons.svg#location"></use>
                </svg>
                <p className={css.city}>
                  {car.location.city}, {car.location.country}
                </p>
                <p className={css.mileage}>Mileage: {car.mileage} km</p>
              </div>
              <p className={css.carPrice}>${car.rentalPrice}</p>
            </div>

            <p className={css.aboutCar}>{car.description}</p>
          </div>
        </div>

        <div className={css.moreAboutCar}>
          <div className={css.title}>
            <h3 className={css.headerline}>Rental Conditions:</h3>
            <ul className={css.list}>
              {car.rentalConditions?.map((condition, index) => (
                <li key={index} className={css.itemsOfList}>
                  <svg width="16" height="16">
                    <use href="/icons/icons.svg#group"></use>
                  </svg>
                  <p className={css.listText}>{condition}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={css.title}>
            <h3 className={css.headerline}>Car Specifications:</h3>
            <ul className={css.list}>
              <li className={css.itemsOfList}>
                <svg width="16" height="16">
                  <use href="/icons/icons.svg#calendar"></use>
                </svg>
                <p className={css.listText}>Year: {car.year}</p>
              </li>
              <li className={css.itemsOfList}>
                <svg width="16" height="16">
                  <use href="/icons/icons.svg#car"></use>
                </svg>
                <p className={css.listText}>Type: {car.type}</p>
              </li>
              <li className={css.itemsOfList}>
                <svg width="16" height="16">
                  <use href="/icons/icons.svg#gasoline"></use>
                </svg>
                <p className={css.listText}>
                  Fuel Consumption: {car.fuelConsumption}
                </p>
              </li>
              <li className={css.itemsOfList}>
                <svg width="16" height="16">
                  <use href="/icons/icons.svg#gear"></use>
                </svg>
                <p className={css.listText}>Engine Size: {car.engine}</p>
              </li>
            </ul>
          </div>

          <div className={css.title}>
            <h3 className={css.headerline}>Accessories and functionalities:</h3>
            <ul className={css.list}>
              {car.features?.map((feature, index) => (
                <li key={index} className={css.itemsOfList}>
                  <svg width="16" height="16">
                    <use href="/icons/icons.svg#group"></use>
                  </svg>
                  <p className={css.listText}>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
