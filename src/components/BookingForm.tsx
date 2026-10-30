import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { bookingSchema as schema } from "@/lib/booking-schema";
import { submitBooking } from "@/lib/booking.functions";
import { Button } from "@/components/ui/button";
import { availableStartTimes, isValidSessionTime } from "@/lib/coaching-schedule";

const field = "min-w-0 w-full max-w-full rounded-lg border border-input bg-background px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function BookingForm() {
  const sendBooking = useServerFn(submitBooking);
  const [emailed, setEmailed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [hours, setHours] = useState(2);
  const [preferredTime, setPreferredTime] = useState("");
  const times = availableStartTimes(hours);
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the form");
    setStatus("sending");
    try {
      const result = await sendBooking({ data: parsed.data });
      setEmailed(result.emailed);
      setStatus("done");
    } catch {
      setStatus("idle");
      return setError("Something went wrong. Please try again or contact me directly.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-card p-10 text-center text-card-foreground">
        <h3 className="font-display text-3xl uppercase">Request sent!</h3>
        <p className="mt-3 text-lg">{emailed ? "Your booking request has been saved and emailed to Coach Jason." : "Your request has been saved, but the email alert couldn't be sent. Please contact Coach Jason directly if needed."}</p>
        <p className="mt-3">Thanks! I'll get back to you to confirm your session and court.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid min-w-0 gap-4 rounded-2xl bg-card p-4 text-left text-card-foreground sm:grid-cols-2 sm:p-10">
      <label className="grid gap-1 font-semibold">Full name<input name="name" maxLength={100} required className={field} /></label>
      <label className="grid gap-1 font-semibold">Phone<input name="phone" type="tel" maxLength={30} required className={field} /></label>
      <label className="grid gap-1 font-semibold sm:col-span-2">Email<input name="email" type="email" maxLength={255} required className={field} /></label>
      <label className="grid gap-1 font-semibold">Preferred date<input name="preferred_date" type="date" min={today} required className={field} /></label>
      <label className="grid gap-1 font-semibold">Preferred time
        <select name="preferred_time" required value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className={field}>
          <option value="" disabled>Choose a time</option>
          {times.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="grid gap-1 font-semibold">Session type
        <select name="session_type" defaultValue="1-on-1" className={field}>
          <option>1-on-1</option>
          <option>Small group</option>
        </select>
      </label>
      <label className="grid gap-1 font-semibold">Hours
        <select name="hours" value={hours} onChange={(e) => {
          const nextHours = Number(e.target.value);
          setHours(nextHours);
          if (!isValidSessionTime(preferredTime, nextHours)) setPreferredTime("");
        }} className={field}>
          {[2, 3, 4, 5, 6].map((h) => <option key={h} value={h}>{h} hours (₱{h * 400})</option>)}
        </select>
      </label>
      <label className="grid gap-1 font-semibold sm:col-span-2">Skill level / notes (optional)
        <textarea name="notes" rows={3} maxLength={1000} className={field} />
      </label>
      {error && <p className="text-destructive sm:col-span-2">{error}</p>}
      <Button type="submit" disabled={status === "sending"} className="h-auto rounded-lg bg-accent px-6 py-4 font-display text-xl uppercase text-accent-foreground hover:bg-accent/90 disabled:opacity-60 sm:col-span-2">
        {status === "sending" ? "Sending…" : "Request Booking"}
      </Button>
      <p className="text-sm text-muted-foreground sm:col-span-2">Schedule subject to coach and court availability. Court rental not included.</p>
    </form>
  );
}
