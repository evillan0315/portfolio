"use client";
import React from "react";
import { DateTime } from "luxon";
interface DateFormatProps {
  date?: string;
  ago?: boolean;
}
const DateFormat: React.FC<DateFormatProps> = ({ date, ago }) => {
  if (!date) return null;
  const formattedDate = ago
    ? DateTime.fromISO(date).toRelative() // Shows the time ago format (e.g., "2 hours ago")
    : DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED); // Shows formatted date (e.g., "Jan 30, 2025, 2:30 PM")

  return <>{formattedDate}</>;
};
export default DateFormat;
