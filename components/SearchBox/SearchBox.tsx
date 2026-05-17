"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import css from "./SearchBox.module.css";
import { filterForCar } from "@/lib/api/api.service";

interface SearchBoxProps {
  onSearch: (filters: {
    brand: string;
    price: string;
    mileageFrom: string;
    mileageTo: string;
  }) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const { data } = useQuery({
    queryKey: ["filter"],
    queryFn: filterForCar,
  });

  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const prices: number[] = [];

  if (data) {
    for (
      let price = data.price.min;
      price <= data.price.max;
      price += 10
    ) {
      prices.push(price);
    }
  }

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  onSearch({
    brand: selectedBrand,
    price: selectedPrice,
    mileageFrom,
    mileageTo,
  });

  setSelectedBrand("");
  setSelectedPrice("");
  setMileageFrom("");
  setMileageTo("");

  setBrandOpen(false);
  setPriceOpen(false);
};

  return (
    <section className={css.searchSection}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <div className={css.selectGroup}>
          <label className={css.label}>Car brand</label>
          <div className={css.dropdown}>
            <button
              type="button"
              className={css.dropdownButton}
              onClick={() => setBrandOpen(!brandOpen)}
            >
              {selectedBrand || "Choose a brand"}
              <svg
                className={`${css.icon} ${brandOpen ? css.iconOpen : ""}`}
                width="16"
                height="16"
              >
                <use href="/icons/icons.svg#chevron-down"></use>
              </svg>
            </button>
            {brandOpen && (
              <ul className={css.dropdownMenu}>
                {data?.brands.map((brand) => (
                  <li
                    key={brand}
                    className={css.dropdownItem}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setBrandOpen(false);
                    }}
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>


        <div className={css.selectGroup}>
          <label className={css.label}>Price / 1 hour</label>
          <div className={css.dropdown}>
            <button
              type="button"
              className={css.dropdownButton}
              onClick={() => setPriceOpen(!priceOpen)}
            >
              {selectedPrice ? `$${selectedPrice}` : "Choose a price"}
              <svg
                className={`${css.icon} ${priceOpen ? css.iconOpen : ""}`}
                width="16"
                height="16"
              >
                <use href="/icons/icons.svg#chevron-down"></use>
              </svg>
            </button>
            {priceOpen && (
              <ul className={css.dropdownMenu}>
                {prices.map((price) => (
                  <li
                    key={price}
                    className={css.dropdownItem}
                    onClick={() => {
                      setSelectedPrice(String(price));
                      setPriceOpen(false);
                    }}
                  >
                    {price}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>


        <div className={css.inputGroup}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.mileageInputs}>
            <input
              type="text"
              placeholder="From"
              className={css.mileageInput}
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
            />
            <input
              type="text"
              placeholder="To"
              className={css.mileageInput}
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </section>
  );
}