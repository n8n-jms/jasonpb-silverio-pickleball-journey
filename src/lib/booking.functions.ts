import { createServerFn } from "@tanstack/react-start";
import { bookingSchema } from "./booking-schema";
import { bookingEmailRaw } from "./booking-email";

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    // The only privileged operation is inserting this validated public request.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    const { error } = await supabaseAdmin.from("booking_requests").insert({
      ...data, id, notes: data.notes || null,
    });
    if (error) throw new Error("Your booking could not be saved. Please try again.");

    const apiKey = process.env["LOVABLE_API_KEY"];
    const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];
    if (!apiKey || !gmailKey) return { saved: true, emailed: false };
    try {
      const response = await fetch("https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "X-Connection-Api-Key": gmailKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: bookingEmailRaw(data, id) }),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Gmail booking notification failed [${response.status}]: ${errorBody}`);
        return { saved: true, emailed: false };
      }
      const result = await response.json() as { id?: string };
      return { saved: true, emailed: Boolean(result.id) };
    } catch {
      console.error("Gmail booking notification unavailable; booking is saved.");
      return { saved: true, emailed: false };
    }
  });