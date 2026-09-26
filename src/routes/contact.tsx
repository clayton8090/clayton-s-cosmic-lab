import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Copy, Check, Github, ArrowUpRight, Linkedin, Orbit, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/portfolio-ui";

const EMAIL = "rubbercarrott@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/clayton-aylor/";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Clayton Aylor" },
      { name: "description", content: "Get in touch with Clayton Aylor about web apps, side projects, or just an interesting idea." },
      { property: "og:title", content: "Contact — Clayton Aylor" },
      { property: "og:description", content: "Send Clayton a note about web apps, side projects, or an idea worth building." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const channels = [
  {
    id: "email" as const,
    icon: Mail,
    title: "Email",
    blurb: "Write a note — it opens in Gmail, ready to send.",
    hint: "Click to write",
  },
  {
    id: "linkedin" as const,
    icon: Linkedin,
    title: "LinkedIn",
    blurb: "Connect or send a quick message.",
    hint: "Opens LinkedIn",
    href: LINKEDIN_URL,
  },
  {
    id: "github" as const,
    icon: Github,
    title: "GitHub",
    blurb: "Check the repos, open an issue, or collaborate in code.",
    hint: "Opens GitHub",
    href: "https://github.com/",
  },
  {
    id: "companion" as const,
    icon: Orbit,
    title: "Ask my companion",
    blurb: "Quick question about my stack or projects? It can answer right away.",
    hint: "Opens chat",
  },
];

function Contact() {
  const [openChannel, setOpenChannel] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const su = subject.trim() || (name.trim() ? `Hello from ${name.trim()}` : "Hello Clayton");
  const body = `${message.trim()}\n\n—\n${name.trim()}${from.trim() ? `\n${from.trim()}` : ""}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(su)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(su)}&body=${encodeURIComponent(body)}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const pick = (id: string) => {
    if (id === "email") {
      setOpenChannel((cur) => (cur === "email" ? null : "email"));
      return;
    }
    if (id === "companion") {
      window.dispatchEvent(new Event("open-clayton-chat"));
    }
  };

  return (
    <main className="site-shell py-20 md:py-28">
      <SectionLabel>Let’s connect</SectionLabel>
      <h1 className="font-display text-4xl md:text-6xl font-medium mt-5 leading-[1.05]">
        Pick a way to <span className="text-primary">say hello.</span>
      </h1>
      <p className="text-muted-foreground mt-5 leading-relaxed max-w-xl">
        However you reach out, I read everything. Choose the channel that feels natural — email,
        LinkedIn, GitHub, or ask my companion a quick question.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {channels.map((ch) => {
          const Icon = ch.icon;
          const expanded = openChannel === ch.id;
          const isEmail = ch.id === "email";
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="w-11 h-11 rounded-full border border-primary/30 text-primary grid place-items-center bg-primary/5">
                  <Icon size={21} />
                </div>
                {isEmail && <ChevronDown size={18} className={`text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />}
              </div>
              <div className="mt-5">
                <div className="font-display text-lg font-semibold">{ch.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{ch.blurb}</p>
              </div>
              <div className="text-xs text-primary mt-4 flex items-center gap-1.5">
                {expanded ? "Close" : ch.hint}
                {!isEmail && ch.href && <ArrowUpRight size={13} />}
              </div>
            </>
          );
          const cls = `text-left border rounded-md p-5 bg-card/40 transition-colors w-full ${
            expanded
              ? "border-primary/50 shadow-[0_0_25px_var(--glow)]"
              : "border-border hover:border-primary/40 hover:shadow-[0_0_20px_var(--glow)]"
          }`;
          if (ch.href) {
            return (
              <a key={ch.id} href={ch.href} target="_blank" rel="noopener noreferrer" className={cls + " block"}>
                {inner}
              </a>
            );
          }
          return (
            <button key={ch.id} type="button" onClick={() => pick(ch.id)} className={cls} aria-expanded={isEmail ? expanded : undefined}>
              {inner}
            </button>
          );
        })}
      </div>

      {openChannel === "email" && (
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-start mt-12">
          <div className="border border-border rounded-md p-5 bg-card/40">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-primary">Email</p>
            <div className="flex items-center justify-between gap-3 mt-3">
              <span className="text-foreground break-all">{EMAIL}</span>
              <Button variant="ghost" size="icon" aria-label="Copy email address" onClick={copy}>
                {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
              </Button>
            </div>
          </div>

          <form onSubmit={submit} className="border border-border rounded-md bg-card/40 p-6 md:p-8 flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className="rounded-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="from">Your email</Label>
                <Input id="from" type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="you@example.com" className="rounded-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="An idea worth building" className="rounded-sm" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me what’s on your mind…"
                className="rounded-sm min-h-40"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button type="submit" className="rounded-sm h-11 px-5">
                Open in Gmail <Mail size={16} />
              </Button>
              <Button asChild variant="outline" className="rounded-sm h-11 px-5">
                <a href={mailtoUrl}>Use my mail app</a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Gmail opens in a new tab with your message already filled in — just hit send.
            </p>
          </form>
        </div>
      )}
    </main>
  );
}
