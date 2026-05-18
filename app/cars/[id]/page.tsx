import { getCarById } from "@/lib/api/api.service";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CarDetails from "./CarDetails.client";

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CarPageProps) {
  const { id } = await params;

  const car = await getCarById(id);

  return {
    title: car.brand,
    description: car.description.slice(0, 50),
    openGraph: {
      title: car.brand,
      description: car.description.slice(0, 50),
      url: car.img,
      images: [
        {
          url: car.img,
          width: 1200,
          height: 630,
          alt: "Car",
        },
      ],
      type: "article",
    },
  };
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetails />
    </HydrationBoundary>
  );
}
