import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Copy, Check, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/portfolio-ui";

const EMAIL = "rubbercarrott@gmail.com";

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

function Contact() {
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

  return (
    <main className="site-shell py-20 md:py-28">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
        <div>
          <SectionLabel>Let’s connect</SectionLabel>
          <h1 className="font-display text-4xl md:text-6xl font-medium mt-5 leading-[1.05]">
            Say <span className="text-primary">hello.</span>
          </h1>
          <p className="text-muted-foreground mt-5 leading-relaxed max-w-md">
            Got an idea, a question, or something you think is cool? Write a few lines and it opens
            straight in Gmail, ready to send.
          </p>
          <div className="mt-9 border border-border rounded-md p-5 bg-card/40">
            <p className="font-mono text-xs uppercase tracking-[.2em] text-primary">Email</p>
            <div className="flex items-center justify-between gap-3 mt-3">
              <span className="text-foreground break-all">{EMAIL}</span>
              <Button variant="ghost" size="icon" aria-label="Copy email address" onClick={copy}>
                {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} />}
              </Button>
            </div>
          </div>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mt-6"
          >
            <Github size={17} /> Find me on GitHub <ArrowUpRight size={14} />
          </a>
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
    </main>
  );
}
