"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import css from "./CarsPage.module.css";
import { Filters, getCarList } from "@/lib/api/api.service";

import CarList from "@/components/CarList/CarList";
import SearchBox from "@/components/SearchBox/SearchBox";

export default function CarsClient() {
  const [search, setSearch] = useState<Filters>({
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["cars", search],

      queryFn: ({ pageParam = 1 }) => getCarList(pageParam, search),

      initialPageParam: 1,

      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;

        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
    });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];
  const showLoadMore = !isLoading && hasNextPage && cars.length > 0;

  return (
    <div className={css.allCarsContainer}>
      <SearchBox onSearch={setSearch} />

      {cars.length > 0 && <CarList cars={cars} />}

      {showLoadMore && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={css.button}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
