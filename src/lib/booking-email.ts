import { CONTACT_EMAIL } from "./contact";
import type { BookingInput } from "./booking-schema";

function base64(value: string) {
  return btoa(Array.from(new TextEncoder().encode(value), (byte) => String.fromCharCode(byte)).join(""));
}

export function bookingEmailRaw(data: BookingInput, bookingId: string) {
  const subject = `New pickleball booking — ${data.preferred_date}`;
  const message = [
    `To: ${CONTACT_EMAIL}`,
    `Reply-To: ${data.email}`,
    `Subject: =?UTF-8?B?${base64(subject)}?=`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    "New booking request for Coach Jason Silverio",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Date: ${data.preferred_date}`,
    `Time: ${data.preferred_time} (Manila time)`,
    `Session: ${data.session_type}`,
    `Duration: ${data.hours} hours`,
    `Coaching fee: ₱${data.hours * 400} (court rental not included)`,
    `Notes: ${data.notes || "None"}`,
    "",
    `Booking reference: ${bookingId}`,
  ].join("\r\n");
  return base64(message).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}