import { expect, it } from "vitest";
import { bookingEmailRaw } from "@/lib/booking-email";
import { bookingSchema } from "@/lib/booking-schema";

const booking = {
  name: "Test student", email: "student@example.com", phone: "09950000000",
  preferred_date: "2026-11-02", preferred_time: "8:00 PM",
  session_type: "1-on-1" as const, hours: 2, notes: "Beginner",
};

it("sends booking alerts only to Jason's requested Gmail address", () => {
  const raw = bookingEmailRaw(booking, "test-reference");
  const decoded = new TextDecoder().decode(Uint8Array.from(atob(raw.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)));
  expect(decoded).toContain("To: silverio.jason@gmail.com\r\n");
  expect(decoded).toContain("Reply-To: student@example.com\r\n");
  expect(decoded).toContain("Coaching fee: ₱800");
});

it("rejects sessions extending beyond Jason's 10 PM closing time", () => {
  expect(bookingSchema.safeParse(booking).success).toBe(true);
  expect(bookingSchema.safeParse({ ...booking, preferred_time: "9:00 PM" }).success).toBe(false);
});