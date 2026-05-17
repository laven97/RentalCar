import { getCarList } from "@/lib/api/api.service";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CarsClient from "./Cars.client";

export default async function CarsPage() {
  const queryClient = new QueryClient();

  const initialFilters = {
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  };

  await queryClient.prefetchQuery({
    queryKey: ["cars", 1, initialFilters],

    queryFn: () =>
      getCarList(1, initialFilters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient />
    </HydrationBoundary>
  );
}