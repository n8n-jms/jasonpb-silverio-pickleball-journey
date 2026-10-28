import { createFileRoute } from "@tanstack/react-router";
import jason from "@/assets/jason.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coach Jason Silverio — Private Pickleball Coaching" },
      { name: "description", content: "PhPA Level 1 Certified Pickleball Coach. Private and small-group pickleball lessons in the Philippines from ₱400/hour." },
      { property: "og:title", content: "Coach Jason Silverio — Private Pickleball Coaching" },
      { property: "og:description", content: "Build your game. Train with confidence. Play better. Lessons from ₱400/hour." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const reasons = [
  { t: "Personalized Coaching", d: "Focused feedback based on your current skill level." },
  { t: "Better Shot Decisions", d: "Learn when to dink, reset, attack, and defend." },
  { t: "Footwork & Court Awareness", d: "Move smarter and position better during rallies." },
  { t: "Confidence Through Repetition", d: "Structured drills that help skills become game-ready." },
];

const journey = [
  { y: "The Spark", d: "Discovered pickleball and fell in love with a game that blends strategy, reflexes, and community." },
  { y: "Certified", d: "Earned the PhPA Level 1 Pickleball Coach certification to teach the game the right way." },
  { y: "Paddle Circle PH", d: "Coaching with Paddle Circle Philippines — One Game. One Circle. One Purpose." },
  { y: "Today", d: "Helping beginners and developing players improve, compete, and have fun on court." },
];

const details = [
  "Best for beginners to developing players",
  "1-on-1 or small-group coaching",
  "Court rental not included",
  "Coach can assist in finding available pro courts",
  "Schedule subject to coach and court availability",
];

function Index() {
  return (
    <main className="overflow-hidden">
      <section className="bg-hero text-navy-foreground">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-6 pt-12 md:grid-cols-2 md:pt-20">
          <div className="pb-12 md:pb-20">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Paddle Circle Philippines</p>
            <h1 className="mt-4 font-display text-7xl uppercase leading-[0.9] md:text-9xl">Coach<br />Jason</h1>
            <p className="skew-tag mt-6 inline-block bg-accent px-4 py-2 font-bold uppercase text-accent-foreground">Private Pickleball Coaching</p>
            <p className="mt-6 font-script text-3xl leading-snug">Build your game.<br />Train with confidence.<br />Play better.</p>
            <a href="#contact" className="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-bold uppercase text-accent-foreground transition hover:scale-105">Book a Session</a>
          </div>
          <img src={jason} alt="Coach Jason Silverio" className="mx-auto w-full max-w-md" />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="font-display text-5xl uppercase text-primary">My Coaching Journey</h2>
        <ol className="mt-10 space-y-8 border-l-4 border-accent pl-8">
          {journey.map((j) => (
            <li key={j.y} className="relative">
              <span className="absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
              <h3 className="font-display text-2xl uppercase">{j.y}</h3>
              <p className="mt-1 text-lg text-muted-foreground">{j.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-5xl uppercase">Why Train with <span className="text-primary">Coach Jason</span></h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div key={r.t} className="rounded-xl bg-card p-6 shadow-sm">
                <span className="font-display text-4xl text-accent-foreground/20">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{r.t}</h3>
                <p className="mt-2 text-muted-foreground">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
        <div className="rounded-2xl bg-navy p-10 text-navy-foreground">
          <p className="font-bold uppercase tracking-widest text-accent">Rate</p>
          <p className="mt-2 font-display text-8xl">₱400<span className="font-script text-3xl"> per hour</span></p>
          <p className="mt-4 text-lg">Minimum of 2 hours</p>
          <p className="skew-tag mt-4 inline-block bg-accent px-4 py-2 font-bold text-accent-foreground">Starting at ₱800 per session</p>
        </div>
        <div>
          <h2 className="font-display text-4xl uppercase">Session Details</h2>
          <ul className="mt-6 space-y-4">
            {details.map((d) => (
              <li key={d} className="flex gap-3 text-lg"><span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-sm text-primary-foreground">✓</span>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="bg-hero py-20 text-navy-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-script text-5xl">Get in Touch!</h2>
          <p className="mt-3 text-lg opacity-90">Message Paddle Circle Philippines or reach me directly to book your session.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a href="https://facebook.com/jason.silverio" target="_blank" rel="noreferrer" className="rounded-xl bg-navy-foreground/10 p-5 hover:bg-navy-foreground/20">Facebook<br /><b>jason.silverio</b></a>
            <a href="mailto:js@jasonsilverio.com" className="rounded-xl bg-navy-foreground/10 p-5 hover:bg-navy-foreground/20">Email<br /><b className="break-all">js@jasonsilverio.com</b></a>
            <a href="tel:09951480924" className="rounded-xl bg-navy-foreground/10 p-5 hover:bg-navy-foreground/20">Call / Text<br /><b>0995 148 0924</b></a>
          </div>
          <p className="mt-12 font-display text-2xl uppercase tracking-widest text-accent">Improve · Compete · Have Fun</p>
          <p className="mt-2 font-script text-2xl">Your Game, My Mission</p>
        </div>
      </section>
    </main>
  );
}
