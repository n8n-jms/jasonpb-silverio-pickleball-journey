import { createFileRoute } from "@tanstack/react-router";
import jasonPhoto from "@/assets/jason-transparent.png";
import journeyBg from "@/assets/journey-bg.jpeg.asset.json";
import whyTrainBg from "@/assets/why-train-bg.jpeg.asset.json";
import { BookingForm } from "@/components/BookingForm";

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
        <div className="mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)] items-stretch gap-x-3 px-5 py-10 md:gap-x-6 md:px-6 md:py-16">
          <p className="col-span-2 mb-3 text-xs font-semibold uppercase text-accent md:mb-4 md:text-sm">Paddle Circle Philippines</p>
          <div className="flex min-w-0 flex-col items-start">
            <h1 className="font-display text-5xl uppercase leading-[0.9] md:text-8xl lg:text-9xl">Coach<br />Jason</h1>
            <p className="skew-tag mt-4 inline-block bg-accent px-2 py-2 text-xs font-bold uppercase text-accent-foreground md:mt-6 md:px-4 md:text-base">Private Pickleball Coaching</p>
            <p className="mt-4 font-script text-lg leading-snug md:mt-6 md:text-3xl">Build your game.<br />Train with confidence.<br />Play better.</p>
            <a href="#contact" className="mt-5 inline-block rounded-full bg-accent px-4 py-3 text-xs font-bold uppercase text-accent-foreground transition hover:scale-105 md:mt-8 md:px-8 md:text-base">Book a Session</a>
          </div>
          <div className="min-w-0 self-stretch">
            <figure className="relative h-full w-full overflow-hidden md:max-w-[23rem]">
                <img src={jasonPhoto} alt="Coach Jason Silverio" width={450} height={1040} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-top" />
            </figure>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <img src={journeyBg.url} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="relative mx-auto max-w-4xl px-6">
          <h2 className="font-display text-5xl uppercase text-navy">My Coaching Journey</h2>
          <ol className="mt-10 space-y-8 border-l-4 border-accent pl-8">
            {journey.map((j) => (
              <li key={j.y} className="relative">
                <span className="absolute -left-[2.6rem] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary" />
                <h3 className="font-display text-2xl uppercase text-primary">{j.y}</h3>
                <p className="mt-1 text-lg font-medium text-navy/85">{j.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <img src={whyTrainBg.url} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative mx-auto max-w-6xl px-6">
          <h2 className="font-display text-5xl uppercase text-navy">Why Train with <span className="text-primary">Coach Jason</span></h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div key={r.t} className="rounded-xl bg-card/95 p-6 shadow-md ring-1 ring-navy/5">
                <span className="font-display text-4xl text-primary/25">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold text-navy">{r.t}</h3>
                <p className="mt-2 text-navy/70">{r.d}</p>
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

      <section id="book" className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-display text-4xl uppercase">Book a Session</h2>
          <p className="mt-3 mb-10 text-center text-lg">Pick a time that works for you and I'll confirm by text or email.</p>
          <BookingForm />
        </div>
      </section>

      <section id="contact" className="bg-hero py-20 text-navy-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-script text-5xl">Get in Touch!</h2>
          <p className="mt-3 text-lg opacity-90">Reach me directly to book your session.</p>
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
