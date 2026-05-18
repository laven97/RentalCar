"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./CarForm.module.css";

import { createBookingRequest } from "@/lib/api/api.service";
import { initialDraft, useCarStore } from "@/lib/store/carStore";
import { IBooking } from "@/types/booking-type";
import Calendar from "../Calendar/Calendar";

interface CarFormProps {
  carId: string;
}

export default function CarForm({ carId }: CarFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useCarStore();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const formDraft = draft ?? initialDraft;

  const mutation = useMutation({
    mutationFn: (data: IBooking) => createBookingRequest(carId, data),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["car"] });
      setShowNotification(true);
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

  const handleDateSelect = (date: string) => {
    setDraft({ ...formDraft, bookingDate: date });
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      clearDraft();
    };
  }, [clearDraft]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

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

            <li className={css.inputList} style={{ position: "relative" }}>
              <input
                id="bookingDate"
                name="bookingDate"
                type="text"
                value={formDraft.bookingDate}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                placeholder="Booking date"
                className={css.input}
                readOnly
              />
              {isCalendarOpen && (
                <div className={css.calendar} ref={calendarRef}>
                  <Calendar
                    selectedDate={formDraft.bookingDate}
                    onSelect={handleDateSelect}
                  />
                </div>
              )}
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
          <button
            type="submit"
            className={css.button}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      {showNotification && (
        <div className={css.toastNotification}>
          <span className={css.toastIcon}>✓</span>
          <p className={css.toastText}>Car booked successfully!</p>
        </div>
      )}
    </section>
  );
}
