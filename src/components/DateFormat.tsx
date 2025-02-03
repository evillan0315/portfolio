"use client";
import React from "react";
import { DateTime } from "luxon";
interface DateFormatProps {
  date?: string;
  ago?: boolean;
  format?: string;
}
const DateFormat: React.FC<DateFormatProps> = ({ date, ago, format }) => {

  if (!date) return null;
  if(format) {
  	return DateTime.fromISO(date).toFormat(format);
  }
  const formattedDate = ago
    ? DateTime.fromISO(date).toRelative() // Shows the time ago format (e.g., "2 hours ago")
    : DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED); // Shows formatted date (e.g., "Jan 30, 2025, 2:30 PM")

  return <>{formattedDate}</>;
};
export default DateFormat;
