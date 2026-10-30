import { z } from "zod";
import { isValidSessionTime } from "./coaching-schedule";

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(5, "Please enter your phone number").max(30),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a date"),
  preferred_time: z.string().min(1, "Please pick a time"),
  session_type: z.enum(["1-on-1", "Small group"]),
  hours: z.coerce.number().int().min(2).max(6),
  notes: z.string().trim().max(1000).optional(),
}).refine((data) => isValidSessionTime(data.preferred_time, data.hours), {
  message: "Please choose a session that finishes by 10:00 PM.",
  path: ["preferred_time"],
});

export type BookingInput = z.infer<typeof bookingSchema>;