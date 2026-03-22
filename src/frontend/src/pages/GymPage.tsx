import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Apple,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Dumbbell,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Twitter,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Classes", href: "#classes" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    desc: "State-of-the-art free weights, machines, and power racks for every level.",
  },
  {
    icon: Zap,
    title: "Cardio Zone",
    desc: "50+ treadmills, bikes, rowers, and ellipticals with live performance data.",
  },
  {
    icon: Apple,
    title: "Nutrition Plans",
    desc: "Personalised meal plans crafted by certified dietitians to fuel your goals.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Join thousands of members who motivate each other every single day.",
  },
];

const BENEFITS = [
  "Expert-designed progressive training programmes",
  "Recovery suites with sauna, ice bath & foam rolling",
  "Monthly fitness assessments & progress tracking",
  "On-site sports physio and injury rehabilitation",
  "24/7 access with app-controlled smart locks",
];

const CLASSES = [
  {
    id: 1,
    title: "HIIT Blast",
    img: "https://picsum.photos/seed/hiit/480/300",
    schedule: "Mon / Wed / Fri – 6:00 AM",
    trainer: "Marcus Reid",
    level: "All Levels",
    color: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  {
    id: 2,
    title: "Power Yoga",
    img: "https://picsum.photos/seed/yoga42/480/300",
    schedule: "Tue / Thu – 7:30 AM",
    trainer: "Aisha Patel",
    level: "Beginner",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  {
    id: 3,
    title: "Powerlifting",
    img: "https://picsum.photos/seed/powerlifting/480/300",
    schedule: "Mon / Thu – 5:30 PM",
    trainer: "Jake Torres",
    level: "Advanced",
    color: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
  {
    id: 4,
    title: "Spin Cycling",
    img: "https://picsum.photos/seed/cycling77/480/300",
    schedule: "Daily – 6:30 AM & 7:00 PM",
    trainer: "Priya Chen",
    level: "All Levels",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    id: 5,
    title: "Boxing Fundamentals",
    img: "https://picsum.photos/seed/boxing55/480/300",
    schedule: "Tue / Fri – 8:00 PM",
    trainer: "Leon Hayes",
    level: "Intermediate",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  {
    id: 6,
    title: "Pilates Core",
    img: "https://picsum.photos/seed/pilates3/480/300",
    schedule: "Wed / Sat – 9:00 AM",
    trainer: "Sofia Müller",
    level: "Beginner",
    color: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  },
];

const PLANS = [
  {
    name: "Basic",
    price: 29,
    period: "month",
    desc: "Everything you need to get started.",
    features: [
      "Full gym floor access",
      "Locker room & showers",
      "2 group classes / week",
      "Fitness assessment",
      "Mobile app access",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 59,
    period: "month",
    desc: "Our most popular plan for serious athletes.",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "1 PT session / month",
      "Nutrition consultation",
      "Recovery suite access",
      "Guest pass (2 / month)",
    ],
    highlight: true,
    cta: "Join Pro",
  },
  {
    name: "Elite",
    price: 99,
    period: "month",
    desc: "The ultimate performance experience.",
    features: [
      "Everything in Pro",
      "Unlimited PT sessions",
      "Custom nutrition plan",
      "Sports physio access",
      "Priority class booking",
      "Unlimited guest passes",
    ],
    highlight: false,
    cta: "Go Elite",
  },
];

const TRAINERS = [
  {
    name: "Marcus Reid",
    specialty: "Strength & Conditioning",
    years: 8,
    img: "https://picsum.photos/seed/trainer1/320/320",
    rating: 4.9,
  },
  {
    name: "Aisha Patel",
    specialty: "Yoga & Mobility",
    years: 6,
    img: "https://picsum.photos/seed/trainer2/320/320",
    rating: 4.8,
  },
  {
    name: "Jake Torres",
    specialty: "Powerlifting & Olympic",
    years: 10,
    img: "https://picsum.photos/seed/trainer3/320/320",
    rating: 5.0,
  },
  {
    name: "Priya Chen",
    specialty: "Cycling & Cardio",
    years: 5,
    img: "https://picsum.photos/seed/trainer4/320/320",
    rating: 4.7,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md border-b border-navy-border"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded bg-lime flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-navy" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              IRON<span className="text-lime">FORGE</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="bg-lime text-navy font-bold hover:bg-lime-dark hover:shadow-lime transition-all"
              onClick={() =>
                document
                  .getElementById("membership")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="nav.primary_button"
            >
              Join Now
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-card border-t border-navy-border"
          >
            <div className="container px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="bg-lime text-navy font-bold mt-2"
                onClick={() => {
                  setOpen(false);
                  document
                    .getElementById("membership")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="nav.primary_button"
              >
                Join Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-navy overflow-hidden"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.91 0.22 122) 1px, transparent 1px), linear-gradient(90deg, oklch(0.91 0.22 122) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Lime glow top-left */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-lime/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lime/5 rounded-full blur-3xl" />

      <div className="container max-w-[1200px] mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 bg-lime/10 text-lime border border-lime/30 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              #1 Gym in the City
            </Badge>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Forge Your <span className="text-lime">Ultimate</span> Body
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-lg">
              Transform your physique and mindset at IronForge — where
              world-class training meets cutting-edge facilities and a community
              that pushes you beyond every limit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-lime text-navy font-bold text-base px-8 hover:bg-lime-dark hover:shadow-lime transition-all"
                onClick={() =>
                  document
                    .getElementById("membership")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.primary_button"
              >
                Start Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-navy-mid transition-all text-base px-8"
                onClick={() =>
                  document
                    .getElementById("classes")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.secondary_button"
              >
                View Classes
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-12">
              {[
                { value: "5K+", label: "Members" },
                { value: "40+", label: "Classes" },
                { value: "20+", label: "Trainers" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-lime">
                    {s.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-navy-border shadow-card">
              <img
                src="https://picsum.photos/seed/gymhero/700/560"
                alt="IronForge Gym Training"
                className="w-full h-[560px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-navy-card border border-navy-border backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-lime" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Today's Active Members
                  </div>
                  <div className="font-bold text-lg">1,248 Training</div>
                </div>
              </div>
            </div>
            {/* Decorative lime border */}
            <div className="absolute -bottom-3 -right-3 w-32 h-32 rounded-2xl border-2 border-lime/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesStrip() {
  return (
    <section className="py-20 bg-navy-card border-y border-navy-border">
      <div className="container max-w-[1200px] mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-navy-mid rounded-xl p-6 border border-navy-border hover:border-lime/30 hover:shadow-lime-sm transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center mb-4 group-hover:bg-lime/20 transition-colors">
                <f.icon className="w-6 h-6 text-lime" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-24 bg-navy overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-navy-border">
              <img
                src="https://picsum.photos/seed/gymfloor/600/500"
                alt="IronForge gym floor"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-navy/50 to-transparent pointer-events-none" />
            </div>
            {/* Lime accent square */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-lime/20 rounded-xl -z-10" />
            {/* Stat badge */}
            <div className="absolute top-6 -right-6 hidden lg:flex bg-navy-card border border-lime/30 rounded-xl px-5 py-4 flex-col items-center shadow-lime">
              <span className="font-display text-3xl font-bold text-lime">
                12+
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Years of Excellence
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-lime text-sm font-semibold uppercase tracking-widest">
              Why IronForge
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-6 leading-tight">
              Training Built for
              <span className="text-lime"> Real Results</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We're not just a gym — we're a performance ecosystem. From your
              first day to your biggest PR, our expert team, premium equipment,
              and science-backed programming are with you every rep of the way.
            </p>
            <ul className="space-y-4">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-lime/10 border border-lime/40 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-lime" />
                  </div>
                  <span className="text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-10 bg-lime text-navy font-bold hover:bg-lime-dark hover:shadow-lime transition-all"
              onClick={() =>
                document
                  .getElementById("membership")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="about.primary_button"
            >
              Explore Memberships
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClassesSection() {
  return (
    <section
      id="classes"
      className="py-24 bg-navy-card border-t border-navy-border"
    >
      <div className="container max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-lime text-sm font-semibold uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Our <span className="text-lime">Classes</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From explosive HIIT to mindful yoga — find a class that ignites your
            passion and accelerates your progress.
          </p>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="classes.list"
        >
          {CLASSES.map((cls, i) => (
            <motion.article
              key={cls.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-navy-mid rounded-xl overflow-hidden border border-navy-border hover:border-lime/30 hover:shadow-lime-sm transition-all group"
              data-ocid={`classes.item.${i + 1}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cls.img}
                  alt={cls.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-mid/80 to-transparent" />
                <Badge
                  className={`absolute top-3 right-3 text-xs font-semibold border ${cls.color}`}
                >
                  {cls.level}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-3">
                  {cls.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-lime" />
                    <span>{cls.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-lime" />
                    <span>{cls.trainer}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 text-lime text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  data-ocid={`classes.secondary_button.${i + 1}`}
                >
                  Book Class <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MembershipSection() {
  return (
    <section
      id="membership"
      className="py-24 bg-navy border-t border-navy-border"
    >
      <div className="container max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-lime text-sm font-semibold uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Choose Your <span className="text-lime">Plan</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Flexible plans designed for every goal. Cancel anytime — no lock-in
            contracts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.highlight
                  ? "bg-lime/5 border-lime/50 shadow-lime scale-105"
                  : "bg-navy-card border-navy-border hover:border-lime/30"
              }`}
              data-ocid={`membership.item.${i + 1}`}
            >
              {plan.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-navy font-bold border-none text-xs px-3 py-1">
                  Most Popular
                </Badge>
              )}
              <h3 className="font-display font-bold text-2xl mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
              <div className="flex items-end gap-1 mb-8">
                <span className="font-display text-5xl font-bold">
                  ${plan.price}
                </span>
                <span className="text-muted-foreground mb-2">
                  /{plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-lime/10 border border-lime/40 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-lime" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full font-bold ${
                  plan.highlight
                    ? "bg-lime text-navy hover:bg-lime-dark hover:shadow-lime"
                    : "bg-navy-mid border border-border hover:border-lime/50 hover:bg-lime/5"
                } transition-all`}
                data-ocid={`membership.primary_button.${i + 1}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainersSection() {
  return (
    <section
      id="trainers"
      className="py-24 bg-navy-card border-t border-navy-border"
    >
      <div className="container max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-lime text-sm font-semibold uppercase tracking-widest">
            Expert Team
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Meet Your <span className="text-lime">Trainers</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our certified coaches bring decades of combined experience across
            strength, cardio, mobility, and nutrition.
          </p>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="trainers.list"
        >
          {TRAINERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-navy-mid rounded-xl overflow-hidden border border-navy-border hover:border-lime/30 hover:shadow-lime-sm transition-all group text-center"
              data-ocid={`trainers.item.${i + 1}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-mid/60 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-lg">{t.name}</h3>
                <p className="text-lime text-sm font-medium mt-1">
                  {t.specialty}
                </p>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{t.years} yrs exp</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-lime text-lime" />
                    {t.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-navy border-t border-navy-border">
      <div className="container max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-lime text-sm font-semibold uppercase tracking-widest">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Visit <span className="text-lime">IronForge</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Drop in for a free trial session or send us a message — our team is
            ready to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="rounded-2xl overflow-hidden border border-navy-border h-56">
              <img
                src="https://picsum.photos/seed/gymbuilding/600/300"
                alt="IronForge building"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-5">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: "47 Iron Works Ave, Downtown District",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Mon–Fri 5 AM–11 PM · Sat–Sun 6 AM–9 PM",
                },
                { icon: Phone, label: "Phone", value: "+1 (555) 467-6674" },
                { icon: Mail, label: "Email", value: "hello@ironforge.gym" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-sm mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-navy-card rounded-2xl border border-navy-border p-8 space-y-5"
              data-ocid="contact.modal"
            >
              <h3 className="font-display font-bold text-xl mb-2">
                Send a Message
              </h3>
              <div className="space-y-2">
                <Label
                  htmlFor="contact-name"
                  className="text-sm text-muted-foreground"
                >
                  Full Name
                </Label>
                <Input
                  id="contact-name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="bg-navy-mid border-navy-border focus:border-lime/50 focus:ring-lime/20"
                  data-ocid="contact.input"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact-email"
                  className="text-sm text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  className="bg-navy-mid border-navy-border focus:border-lime/50 focus:ring-lime/20"
                  data-ocid="contact.input"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact-msg"
                  className="text-sm text-muted-foreground"
                >
                  Message
                </Label>
                <Textarea
                  id="contact-msg"
                  placeholder="Tell us about your fitness goals..."
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  className="bg-navy-mid border-navy-border focus:border-lime/50 focus:ring-lime/20 resize-none"
                  data-ocid="contact.textarea"
                />
              </div>

              {sent ? (
                <div
                  className="flex items-center gap-3 text-sm text-lime bg-lime/10 border border-lime/30 rounded-xl px-4 py-3"
                  data-ocid="contact.success_state"
                >
                  <Check className="w-4 h-4" />
                  Message sent! We'll get back to you within 24 hours.
                </div>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-lime text-navy font-bold hover:bg-lime-dark hover:shadow-lime transition-all"
                  data-ocid="contact.submit_button"
                >
                  Send Message
                </Button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-card border-t border-navy-border">
      <div className="container max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-lime flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-navy" />
              </div>
              <span className="font-display font-bold text-xl">
                IRON<span className="text-lime">FORGE</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The city's premier performance gym — where serious athletes and
              beginners alike come to achieve greatness.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#social"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-navy-mid border border-navy-border flex items-center justify-center text-muted-foreground hover:text-lime hover:border-lime/40 transition-all"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-lime transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              Programs
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "HIIT Training",
                "Strength & Power",
                "Yoga & Mobility",
                "Boxing",
                "Nutrition Coaching",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#classes"
                    className="hover:text-lime transition-colors"
                    data-ocid="footer.link"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lime mt-0.5 flex-shrink-0" />
                47 Iron Works Ave, Downtown
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-lime flex-shrink-0" />
                +1 (555) 467-6674
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime flex-shrink-0" />
                hello@ironforge.gym
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-lime mt-0.5 flex-shrink-0" />
                Mon–Fri 5 AM–11 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {year} IronForge Gym. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="text-lime hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function GymPage() {
  return (
    <div className="min-h-screen bg-navy text-foreground">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesStrip />
        <AboutSection />
        <ClassesSection />
        <MembershipSection />
        <TrainersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
