import { IBooking } from "@/types/booking-type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const initialDraft: IBooking = {
  name: "",
  email: "",
  comment: "",
  bookingDate: "",
};

interface CarStore {
  draft: IBooking;
  setDraft: (car: IBooking) => void;
  clearDraft: () => void;
}

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (car) => set({ draft: car }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "car-draft",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
