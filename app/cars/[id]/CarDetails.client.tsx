"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getCarById } from "@/lib/api/api.service";
import CarDetailsView from "@/components/CarDetails/CarDetailsView";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: carById,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !carById) return <p>Error</p>;

  return (
    <CarDetailsView car={carById}/>
  );
}
