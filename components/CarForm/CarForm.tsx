import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./CarForm.module.css";
import { createBookingRequest } from "@/lib/api/api.service";
import { initialDraft, useCarStore } from "@/lib/store/carStore";
import { IBooking } from "@/types/booking-type";

interface CarFormProps {
  carId: string;
}

export default function CarForm({ carId }: CarFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useCarStore();

  const formDraft = draft ?? initialDraft;

  const mutation = useMutation({
    mutationFn: (data: IBooking) => createBookingRequest(carId, data),

    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["car"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formDraft);
  };

  function handleDraftChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setDraft({ ...formDraft, [e.target.name]: e.target.value });
  }

  return (
    <section className={css.fromSection}>
      <div className={css.headerContainer}>
        <h3 className={css.headerline}>Book your car now</h3>
        <p className={css.text}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={css.formContainer}>
        <form onSubmit={handleSubmit} className={css.formWrap}>
          <ul className={css.fromInputs}>
            <li className={css.inputList}>
              <input
                id="name"
                type="text"
                name="name"
                value={formDraft.name}
                placeholder="Name"
                onChange={handleDraftChange}
                required
                className={css.input}
              />
            </li>
            <li className={css.inputList}>
              <input
                id="email"
                type="email"
                name="email"
                value={formDraft.email}
                placeholder="Email"
                onChange={handleDraftChange}
                required
                className={css.input}
              />
            </li>
            <li className={css.inputList}>
              <input
                id="bookingDate"
                name="bookingDate"
                type="text"
                value={formDraft.bookingDate}
                onChange={handleDraftChange}
                placeholder="Booking date"
                className={css.input}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = "text";
                  }
                }}
              />
            </li>
            <li className={css.inputList}>
              <textarea
                id="comment"
                name="comment"
                value={formDraft.comment}
                onChange={handleDraftChange}
                placeholder="Comment"
                className={css.input}
              />
            </li>
          </ul>
          <button type="submit" className={css.button}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
