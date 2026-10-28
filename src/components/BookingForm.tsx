import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const TIMES = ["6:00 AM", "8:00 AM", "10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"];

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(5, "Please enter your phone number").max(30),
  preferred_date: z.string().min(1, "Please pick a date"),
  preferred_time: z.string().min(1, "Please pick a time"),
  session_type: z.enum(["1-on-1", "Small group"]),
  hours: z.coerce.number().int().min(2).max(6),
  notes: z.string().trim().max(1000).optional(),
});

const field = "w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setStatus("sending");
    const { error } = await supabase.from("booking_requests").insert({ ...parsed.data, notes: parsed.data.notes || null });
    if (error) {
      setStatus("idle");
      return setError("Something went wrong. Please try again or contact me directly.");
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-card p-10 text-center text-card-foreground">
        <h3 className="font-display text-3xl uppercase">Request sent!</h3>
        <p className="mt-3 text-lg">Thanks! I'll get back to you to confirm your session and court.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-card p-6 text-left text-card-foreground sm:grid-cols-2 sm:p-10">
      <label className="grid gap-1 font-semibold">Full name<input name="name" maxLength={100} required className={field} /></label>
      <label className="grid gap-1 font-semibold">Phone<input name="phone" type="tel" maxLength={30} required className={field} /></label>
      <label className="grid gap-1 font-semibold sm:col-span-2">Email<input name="email" type="email" maxLength={255} required className={field} /></label>
      <label className="grid gap-1 font-semibold">Preferred date<input name="preferred_date" type="date" min={today} required className={field} /></label>
      <label className="grid gap-1 font-semibold">Preferred time
        <select name="preferred_time" required defaultValue="" className={field}>
          <option value="" disabled>Choose a time</option>
          {TIMES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="grid gap-1 font-semibold">Session type
        <select name="session_type" defaultValue="1-on-1" className={field}>
          <option>1-on-1</option>
          <option>Small group</option>
        </select>
      </label>
      <label className="grid gap-1 font-semibold">Hours
        <select name="hours" defaultValue="2" className={field}>
          {[2, 3, 4, 5, 6].map((h) => <option key={h} value={h}>{h} hours (₱{h * 400})</option>)}
        </select>
      </label>
      <label className="grid gap-1 font-semibold sm:col-span-2">Skill level / notes (optional)
        <textarea name="notes" rows={3} maxLength={1000} className={field} />
      </label>
      {error && <p className="text-destructive sm:col-span-2">{error}</p>}
      <button disabled={status === "sending"} className="rounded-lg bg-accent px-6 py-4 font-display text-xl uppercase text-accent-foreground hover:opacity-90 disabled:opacity-60 sm:col-span-2">
        {status === "sending" ? "Sending…" : "Request Booking"}
      </button>
      <p className="text-sm text-muted-foreground sm:col-span-2">Schedule subject to coach and court availability. Court rental not included.</p>
    </form>
  );
}
