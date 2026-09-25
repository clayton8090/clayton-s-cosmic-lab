# Clayton's Cosmic Lab

Build a personal developer portfolio and project lab website for Clayton Aylor.

Design & Theme:
- Starlight-and-cyan cosmic palette on deep obsidian surfaces (#06080e) with subtle starlight micro-borders and soft ambient glows.
- Centralize all colors, glows, and surface styles in design tokens (CSS variables / Tailwind config) so the palette can easily be tuned or swapped later.
- Tone is conversational, personal, and approachable: 'Hey, I'm Clayton. I build web apps, tinker with ideas, and share things I think are cool.'
- Avoid any obvious AI clichés (no fake terminal windows, no cartoon robots). Keep it high-craft, polished, and human.

Pages & Core Features:
1. Home Page (/):
   - Hero section with a personal, friendly intro, social/GitHub links, and an active status badge.
   - Featured Projects Showcase: Full-stack web app cards that lead with 'The Idea & Why It's Cool', screenshot previews, links to live demos and GitHub repos, and an expandable technical details section (tech stack badges, architecture notes).
   - 'Currently Tinkering' / Lab Bento: A modular section for smaller experiments, tools being tested, and side prototypes.
2. Project Deep-Dive Case Study (/projects/:slug):
   - Comprehensive project view with live demo and GitHub buttons.
   - 'The Story & Spark': Why Clayton built it and what makes it interesting.
   - System Architecture Breakdown: Interactive diagram showing the client, API routes, database, and third-party services.
   - Tough challenges solved and tech stack highlights.
3. The Lab (/lab):
   - A dedicated space for side experiments, micro-tools, and creative code prototypes, filterable by category (Experiments, Tools, Open Source).
4. Interactive AI Companion:
   - A sleek floating celestial chat widget in the bottom-right corner with starter prompt chips to answer questions about Clayton's work, tech stack, and background.
5. Admin Management Portal (/admin):
   - A password-protected interface backed by a database to quickly add, edit, or feature new projects and experiments on the fly without modifying code.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4e31a7a0-a3c1-4322-8801-6898da7634b3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
