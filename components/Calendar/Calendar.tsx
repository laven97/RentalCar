"use client";

import { useState } from "react";
import css from "./Calendar.module.css";

interface CalendarProps {
  selectedDate: string; 
  onSelect: (date: string) => void;
}

const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar({ selectedDate, onSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => 
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const firstDayIndex = new Date(year, month, 1).getDay();

  const startPadding = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (day: number, isCurrentMonth: boolean, isNextMonth = false) => {
    let clickMonth = month;
    let clickYear = year;

    if (!isCurrentMonth) {
      if (isNextMonth) {
        clickMonth += 1;
      } else {
        clickMonth -= 1;
      }
    }

    const dateObj = new Date(clickYear, clickMonth, day);
    const formattedDate = dateObj.toISOString().split("T")[0];
    onSelect(formattedDate);
  };

  const days: { day: number; isCurrent: boolean; isNext?: boolean }[] = [];

  for (let i = startPadding - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrent: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrent: true });
  }

  const totalCells = 42;
  const nextMonthDays = totalCells - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    days.push({ day: i, isCurrent: false, isNext: true });
  }

  return (
    <div className={css.calendarCard}>
      <div className={css.header}>
        <button type="button" onClick={handlePrevMonth} className={css.arrowBtn}>&lt;</button>
        <span className={css.monthTitle}>{MONTH_NAMES[month]} {year}</span>
        <button type="button" onClick={handleNextMonth} className={css.arrowBtn}>&gt;</button>
      </div>

      <div className={css.weekDaysGrid}>
        {WEEK_DAYS.map((d) => (
          <div key={d} className={css.weekDay}>{d}</div>
        ))}
      </div>

      <div className={css.daysGrid}>
        {days.map((item, index) => {
          const itemDateStr = new Date(year, item.isCurrent ? month : (item.isNext ? month + 1 : month - 1), item.day)
            .toISOString().split("T")[0];
          const isSelected = selectedDate === itemDateStr;

          return (
            <button
              key={index}
              type="button"
              className={`${css.dayBtn} ${item.isCurrent ? "" : css.outsideDay} ${isSelected ? css.selectedDay : ""}`}
              onClick={() => handleDayClick(item.day, item.isCurrent, item.isNext)}
            >
              {item.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}