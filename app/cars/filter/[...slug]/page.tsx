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

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars", initialFilters],
    queryFn: ({ pageParam = 1 }) => getCarList(pageParam, initialFilters),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsClient />
    </HydrationBoundary>
  );
}
