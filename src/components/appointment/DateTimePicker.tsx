
'use client';

import React, { useState, useMemo, useEffect } from "react";
import "./DateTimePicker.css";
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, Timestamp } from "firebase/firestore";
import { startOfDay, endOfDay } from "date-fns";

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const TIMES = Array.from({ length: 13 }, (_, i) => {
  const hour = 8 + i;
  return `${String(hour).padStart(2, "0")}:00`;
});

type DateTimeValue = {
    date: Date;
    time: string;
} | undefined;

type DateTimePickerProps = {
    value?: DateTimeValue;
    onChange: (value: { date: Date; time: string }) => void;
};


export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());
  const { firestore } = useFirebase();

  const selectedDate = value?.date;
  const selectedTime = value?.time;

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const appointmentsQuery = useMemoFirebase(() => {
    if (!firestore || !selectedDate) return null;
    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);
    return query(
        collection(firestore, "appointments"),
        where("appointmentDateTime", ">=", Timestamp.fromDate(dayStart)),
        where("appointmentDateTime", "<=", Timestamp.fromDate(dayEnd))
    );
  }, [firestore, selectedDate]);

  const { data: appointmentsToday } = useCollection(appointmentsQuery);

  const bookedTimes = useMemo(() => {
    if (!appointmentsToday) return [];
    return appointmentsToday.map(apt => {
        const date = (apt.appointmentDateTime as Timestamp).toDate();
        return `${String(date.getHours()).padStart(2, '0')}:00`;
    });
  }, [appointmentsToday]);


  const firstDayOfMonth = new Date(year, month, 1);
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // 0=Mon, 6=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const today = useMemo(() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
  }, []);

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      cells.push(<div key={`e-${i}`} className="dtp-empty" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isDisabled = date < today;

      cells.push(
        <button
          key={d}
          type="button"
          className={`dtp-day ${isToday ? "dtp-today" : ""} ${isSelected ? "dtp-selected" : ""}`}
          onClick={() => onChange({ date, time: "" })}
          disabled={isDisabled}
        >
          {d}
        </button>
      );
    }
    return cells;
  }, [year, month, startingDayOfWeek, daysInMonth, selectedDate, onChange, today]);

  const now = useMemo(() => {
      return new Date();
  }, []);
  
  const isSelectedDateToday = selectedDate?.toDateString() === now.toDateString();
  const currentHour = now.getHours();

  return (
    <div className="dtp-wrapper">
      <div className="dtp-calendar">
        <div className="dtp-header">
          <button type="button" onClick={() => setCurrentMonthDate(new Date(year, month - 1))}>
            &#8249;
          </button>
          <span>
            {currentMonthDate.toLocaleString("tr-TR", { month: "long", year: "numeric" })}
          </span>
          <button type="button" onClick={() => setCurrentMonthDate(new Date(year, month + 1))}>
            &#8250;
          </button>
        </div>

        <div className="dtp-calendar-grid">
          {DAYS.map(d => (
            <div key={d} className="dtp-day-name">{d}</div>
          ))}
          {calendarCells}
        </div>
      </div>

      {selectedDate && (
        <div className="dtp-time">
          <p className="dtp-time-title">
            Uygun Saatler (08:00 – 20:00)
          </p>
          <div className="dtp-time-grid">
            {TIMES.map(time => {
              const timeHour = parseInt(time.split(':')[0]);
              const isPast = isSelectedDateToday && timeHour <= currentHour;
              const isBooked = bookedTimes.includes(time);
              const isDisabled = isBooked || isPast;

              return (
                <button
                  key={time}
                  type="button"
                  className={`dtp-time-slot ${isDisabled ? "dtp-time-disabled" : ""} ${selectedTime === time ? "dtp-time-selected" : ""}`}
                  disabled={isDisabled}
                  onClick={() => onChange({ date: selectedDate, time })}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
