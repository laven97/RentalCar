"use client";

import { useState } from "react";
import Link from "next/link";

import css from "./CarList.module.css";
import { Car } from "@/types/cars-type";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  if (cars.length === 0) return null;

  return (
    <section className={css.carListSection}>
      {cars.map((car) => {
        const isFavorite = favorites.includes(car.id);

        return (
          <div key={car.id} className={css.carListCard}>
            <div className={css.carImg}>
              <button
                className={css.likeButton}
                onClick={() => toggleFavorite(car.id)}
              >
                <svg
                  className={`${css.likeIcon} ${
                    isFavorite ? css.likeIconActive : ""
                  }`}
                  width="20"
                  height="20"
                >
                  <use href="/icons/icons.svg#liked"></use>
                </svg>
              </button>

              <img src={car.img} alt={car.brand} className={css.carListImg} />
            </div>

            <div className={css.carDescriptionContainer}>
              <div className={css.carDescription}>
                <p className={css.carName}>
                  {car.brand}
                  <span className={css.carModel}> {car.model}</span>, {car.year}
                </p>

                <p className={css.carPrise}>${car.rentalPrice}</p>
              </div>

              <ul className={css.carInformationList}>
                <li className={css.carInfo}>
                  <p>{car.location?.city}</p>
                  <p>{car.location?.country}</p>
                  <p>{car.rentalCompany}</p>
                </li>

                <li className={css.carInfoNext}>
                  <p>{car.type}</p>
                  <p>{car.mileage} km</p>
                </li>
              </ul>
            </div>

            <Link href={`/cars/${car.id}`} className={css.carCardButton}>
              Read more
            </Link>
          </div>
        );
      })}
    </section>
  );
}
