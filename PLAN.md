# Portfolio Redesign Plan

Self-contained implementation plan for `nabeelshaikh.github.io`. Each task below is independent enough to be done in its own chat. Work them **in order** — later tasks assume earlier ones are done.

---

## How to use this plan (instructions for the implementing agent)

- Read this whole file first, then read `index.html`, `styles.css`, and `scripts.js` in full before touching anything.
- Do **one task per chat**. When the user says "do Task N", complete only Task N and its acceptance criteria.
- After each task: open `index.html` in a browser (or `python3 -m http.server`) and verify it visually at desktop (≥1024px) and mobile (≤768px) widths. Then `git add -A && git commit -m "<task summary>"`. Do not push unless asked.
- Do not add a build step, framework, bundler, or npm. This site is **static HTML + Tailwind CDN + vanilla JS + one CSS file**, deployed via GitHub Pages. Keep it that way.
- Keep the existing visual language: white/gray-50 backgrounds, `--accent: #7e22ce` purple, rounded-2xl cards, `shadow-sm` → `shadow-md` on hover, Lucide icons via `data-lucide`, Devicon for tech logos.
- Do not modify the `#contact` or `#resume` sections, the footer, or `CNAME`.
- Prefer surgical edits over rewriting whole files.

### Existing code you'll interact with

- `styles.css` — `.fade-in`/`.fade-in.show` and `.reveal`/`.reveal.active` are the two scroll-reveal patterns (driven by `IntersectionObserver` in `scripts.js`). `.experience-item` is the timeline row. Skills carousel styles are lines ~143–350.
- `scripts.js` — fade/reveal observers, navbar active-link logic (iterates `section` elements by `id`), particles.js config, `initSkillsCarousel()`.
- `index.html` sections in order: `#home`, `#about` (contains skills carousel), `#experience` (titled "Education & Experience", contains the BSc card), `#projects`, `#contact`, `#resume`.
- Navbar links: Home, About, Experience, Projects, Contact, Resume.

### Values to fill in before starting

None — all values are filled in. For reference: All & Sundry start date = **Feb 2026**; location = **Greater Toronto Area**; Claribase Airtable-lens bullets are confirmed final.

---

## Task 1 — Experience section: two-lens toggle + add All & Sundry

**Goal:** Replace the combined "Education & Experience" timeline with an "Experience" timeline that has a toggle for two views: **Software Engineering** (default) and **Airtable & No-Code**. The same roles appear in both views but with different bullets. Roles with no relevance to a lens are hidden in that lens. Move the BSc card out (it gets its own section in Task 2 — for this task, just delete it from the timeline).

### Structure

```html
<section id="experience" class="py-24 bg-gray-50 overflow-hidden">
  <div class="max-w-5xl mx-auto px-6">
    <h2 class="text-4xl font-bold mb-6 text-center text-gray-900 reveal">Experience</h2>
    <p class="text-center text-gray-500 mb-8 reveal">Same roles, two perspectives. Pick the lens that matters to you.</p>

    <!-- Lens toggle -->
    <div class="flex justify-center mb-16 reveal" role="tablist" aria-label="Experience lens">
      <div class="inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
        <button class="lens-btn active" data-lens="swe" role="tab" aria-selected="true">Software Engineering</button>
        <button class="lens-btn" data-lens="airtable" role="tab" aria-selected="false">Airtable &amp; No-Code</button>
      </div>
    </div>

    <div class="space-y-12 relative" id="experienceTimeline">
      <!-- timeline line (keep existing) -->
      <!-- experience items -->
    </div>
  </div>
</section>
```

Each `.experience-item` gets `data-lenses="swe airtable"` (space-separated list of lenses it appears in). Inside the card, bullets live in two `<ul>`s: `<ul data-lens="swe">` and `<ul data-lens="airtable">`. Only the `<ul>` matching the active lens is displayed. Job title may also differ per lens — use `<span data-lens="swe">` / `<span data-lens="airtable">` inside the `<h3>` when needed.

Keep the alternating left/right timeline layout and the center line + dots. Order is reverse-chronological. When items are hidden in a lens, the remaining items should re-alternate cleanly (simplest approach: use CSS `:nth-child(even)` on visible items, or re-apply `md:flex-row-reverse` in JS after filtering).

### Content

**All & Sundry** — `data-lenses="swe airtable"` — Feb 2026 – Present
- Title (both lenses): **React & Airtable Developer** · All & Sundry
- SWE bullets:
  - Building one of the first enterprise full-stack Airtable custom extension apps in **React and TypeScript**, supporting **5,000+** product managers, project managers, and business partners.
  - Designing interfaces in **Figma** and shipping them as production React components inside the Airtable extension runtime.
  - Building and deploying internal tools with **React and Vercel** that integrate with Airtable's REST API.
- Airtable bullets:
  - Developing one of the first enterprise-scale **custom Airtable extensions** (Blocks SDK), serving **5,000+** PMs and business partners across the organization.
  - Designing base schemas, views, and interface flows in collaboration with product and project management stakeholders.
  - Building internal Airtable-connected apps on Vercel to extend what native Airtable interfaces and automations can do.

**Claribase** — `data-lenses="swe airtable"` — May 2023 – Dec 2024
- Title (both): **Junior Database Developer** · Claribase
- SWE bullets:
  - Built custom extensions and backend features using Airtable's JavaScript environment and React-based Blocks SDK.
  - Designed scalable relational schemas and improved performance by optimizing data access patterns.
  - Integrated Airtable with external systems via REST APIs, webhooks, and automation platforms, and wrote data migration scripts to move client datasets from spreadsheets and legacy databases.
- Airtable bullets (final):
  - Designed and built client Airtable bases end-to-end across multiple industries — schema and linked-record architecture, views, and Interface dashboards.
  - Replaced manual client workflows with Airtable Automations and custom scripting, and connected bases to external tools through Zapier/Make, APIs, and webhooks.
  - Built custom extensions with the Blocks SDK where native Airtable features fell short.
  - Owned the client relationship: gathered requirements, migrated legacy data (spreadsheets, other databases) into Airtable, and trained teams on their new systems.

**Thermo Fisher Scientific** — `data-lenses="swe"` — Sept 2022 – Dec 2022
- Keep existing card and bullets unchanged.

**Teaching Assistant, Wilfrid Laurier University** — `data-lenses="swe"` — Sept 2021 – Apr 2022
- Keep existing card and bullets unchanged.

### CSS (add to `styles.css`)

```css
.lens-btn {
  padding: 0.5rem 1.25rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600;
  color: #4b5563; transition: all 0.25s ease; border: none; background: transparent; cursor: pointer;
}
.lens-btn:hover { color: var(--accent); }
.lens-btn.active { background: var(--accent); color: #fff; box-shadow: 0 2px 8px rgba(126,34,206,0.3); }
.experience-item.lens-hidden { display: none; }
[data-lens] { display: none; }
[data-lens].lens-visible { display: block; }
ul[data-lens].lens-visible { display: flex; flex-direction: column; gap: 0.75rem; }
```

### JS (add to `scripts.js`)

```js
function initExperienceLens() {
  const buttons = document.querySelectorAll('.lens-btn');
  if (!buttons.length) return;
  const saved = localStorage.getItem('exp-lens');
  function apply(lens) {
    buttons.forEach(b => {
      const on = b.dataset.lens === lens;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on);
    });
    document.querySelectorAll('.experience-item').forEach(item => {
      const lenses = (item.dataset.lenses || '').split(' ');
      item.classList.toggle('lens-hidden', !lenses.includes(lens));
    });
    document.querySelectorAll('[data-lens]').forEach(el => {
      if (el.classList.contains('lens-btn')) return;
      el.classList.toggle('lens-visible', el.dataset.lens === lens);
    });
    localStorage.setItem('exp-lens', lens);
  }
  buttons.forEach(b => b.addEventListener('click', () => apply(b.dataset.lens)));
  apply(saved === 'airtable' ? 'airtable' : 'swe');
}
initExperienceLens();
```

Note: the `.reveal` observer only fires once per element. Items hidden on first load and later shown must still be visible — make sure `.lens-hidden` toggling doesn't fight `.reveal` (either add `.active` to all experience items after the first reveal, or exclude `.experience-item` from the reveal pattern and reveal the whole timeline container instead).

### Acceptance criteria

- Default view on fresh load is Software Engineering with 4 roles; Airtable view shows 2 roles.
- Toggling swaps bullets with no layout jump; choice persists on reload.
- BSc card is gone from this section. Timeline line and dots still render correctly in both views on desktop; on mobile items stack.
- Keyboard: toggle buttons are focusable and work with Enter/Space.

---

## Task 2 — Education & Certifications section

**Goal:** New `#education` section between `#experience` and `#projects`. Add "Education" to the navbar after "Experience".

### Layout

Two-column on desktop (`lg:grid-cols-5`, degree takes 3 cols, certs take 2), stacked on mobile.

**Left — Degree card** (reuse existing card styling: `bg-white p-8 rounded-2xl shadow-sm border border-gray-100`):
- `BSc in Computer Science`
- `Wilfrid Laurier University | Sept 2020 – Aug 2025` (accent, semibold)
- Bullets with `graduation-cap` lucide icon:
  - Minor: User Experience Design
  - Developed foundations in memory management, algorithm design & optimization, and database systems.
  - Teaching Assistant for core CS courses (2021–2022).

**Right — Certifications** heading + stacked compact cards:
1. **Airtable Builder Certification** — Airtable — status pill `Completed` (green: `bg-green-50 text-green-700 border-green-200`).
2. **Airtable Admin Certification** — Airtable — status pill `In Progress` (purple: `bg-purple-50 text-accent border-purple-200`) with a small pulsing dot (`animate-pulse`) before the text.

Each cert card: `flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm`, a `award` lucide icon in an `icon-circle` (existing class), name in bold, issuer in `text-sm text-gray-500`, pill right-aligned.

Add a `reveal` class to the cards so they animate in like the experience items.

### Acceptance criteria

- Section appears in the correct position; "Education" nav link scrolls to it and highlights when active (the navbar active-link logic in `scripts.js` iterates all `section` elements, so this should work automatically — verify).
- Two cert cards with correct statuses; the In Progress pill pulses.
- Responsive: stacks on mobile.

---

## Task 3 — About section rewrite

**Goal:** Update copy to reflect current employment. No structural changes.

Replace the two paragraphs in `#about` with:

> I'm a Computer Science graduate from Wilfrid Laurier University (with a minor in UX Design) currently working as a React & Airtable Developer at All & Sundry, where I'm building one of the first enterprise full-stack Airtable extensions — serving 5,000+ product and project managers.
>
> I sit at the intersection of software engineering and low-code platforms: I write production React and TypeScript, but I also understand how teams actually work inside tools like Airtable. That combination lets me build things that are both technically solid and genuinely adopted. I'm always open to interesting engineering problems and Airtable consulting conversations.

Also update the hero subtitle in `#home`:

> A Software Engineer building full-stack products and enterprise Airtable extensions. React, TypeScript, and data-driven systems.

Update `#contact` intro text (this is the one allowed edit in `#contact`):

> Whether it's a software engineering role, an Airtable project, or just a question — I'll get back to you.

### Acceptance criteria

- No mention of "seeking a full-time role" anywhere on the page.
- Copy renders without overflow at mobile width.

---

## Task 4 — Skills: replace carousel with grouped grid, add new tech

**Goal:** Remove the skills carousel (visitors don't click through slides). Replace with a grouped, all-visible grid in the same right-hand column of `#about`.

### Structure

Four groups, each a small heading (`text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3`) followed by a `flex flex-wrap gap-3` of skill chips. Chip style — new class `.skill-chip`:

```css
.skill-chip {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.75rem; border-radius: 0.5rem;
  background: #fff; border: 1px solid #e5e7eb; font-size: 0.8rem; font-weight: 600; color: #374151;
  transition: all 0.2s ease;
}
.skill-chip i { font-size: 1.1rem; }
.skill-chip:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(126,34,206,0.12); }
```

### Groups & items

- **Languages:** TypeScript, JavaScript, Python, Java, SQL, C++, PHP, HTML, CSS, VBA
- **Frameworks & Libraries:** React, Node.js, Express, Tailwind, Airtable Blocks SDK
- **Platforms & Tools:** Airtable, Vercel, Figma, Git, GitHub, Docker, Kubernetes, AWS
- **Databases:** PostgreSQL, MySQL, MongoDB, SQLite

Devicon classes: `devicon-vercel-original`, `devicon-figma-plain colored`. Devicon has **no Airtable icon** — for Airtable and Airtable Blocks SDK use the Lucide `table-2` icon (`<i data-lucide="table-2" class="w-4 h-4 text-accent"></i>`) instead of a Devicon `<i>`. For VBA keep `devicon-visualstudio-plain`.

### Cleanup

- Delete the carousel HTML (`.skills-carousel-container` block) and the carousel CSS in `styles.css` (everything from `/* Skills Carousel Styles */` through the responsive carousel rules, but keep `.reveal` rules and `.experience-item`).
- Delete `initSkillsCarousel()` and its invocation from `scripts.js`. Keep the final `lucide.createIcons()` call.

### Acceptance criteria

- No carousel arrows/dots remain. All skills visible without interaction.
- Icons render (check Vercel and Figma load from Devicon; Airtable uses Lucide).
- No JS console errors.

---

## Task 5 — "At a glance" bento block

**Goal:** Insert a Bento-grid section directly after `#home` and before `#about`, `id="glance"`, `class="py-16 bg-white"`. It gives visitors the key facts in 5 seconds. This also replaces the separate "Now" section idea.

### Grid

`grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)]`. Tiles share a base class `.bento-tile`:

```css
.bento-tile {
  background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem;
  display: flex; flex-direction: column; justify-content: space-between;
  transition: all 0.3s ease;
}
.bento-tile:hover { border-color: rgba(126,34,206,0.4); box-shadow: 0 10px 25px rgba(126,34,206,0.08); transform: translateY(-3px); }
.bento-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; }
```

Tiles (in DOM order):

1. **Now building** — `col-span-2 row-span-2`, accent gradient background (`bg-gradient-to-br from-purple-600 to-purple-800 text-white`). Label "Currently", heading "Enterprise Airtable extension for 5,000+ users", body "React · TypeScript · Airtable Blocks SDK — at All & Sundry". Small `zap` lucide icon top-right.
2. **Role** — `col-span-2 md:col-span-1`. Label "Role", value "React & Airtable Developer", sub "All & Sundry".
3. **Location** — `col-span-1`. Label "Based in", value "Greater Toronto Area". `map-pin` icon.
4. **Certifications** — `col-span-2 md:col-span-1`. Label "Certified", value "Airtable Builder", sub "Admin — in progress" with pulsing dot.
5. **GitHub** — `col-span-1`, link tile to `https://github.com/nabeel-shaikh`, Devicon github icon, label "GitHub", value "@nabeel-shaikh".
6. **Education** — `col-span-2 md:col-span-1`. Label "Education", value "BSc Computer Science", sub "Wilfrid Laurier · UX Design minor".
7. **Open to** — `col-span-2 md:col-span-1`. Label "Open to", value "Engineering roles & Airtable projects", link arrow to `#contact`.

Give the section `fade-in`.

### Acceptance criteria

- Tiles form a clean rectangle with no gaps on both `md` (4 columns) and mobile (2 columns). Adjust spans if a gap appears.
- Hover states work; GitHub and Open-to tiles are clickable.

---

## Task 6 — Dark mode

**Goal:** Class-based dark mode with a toggle in the navbar. Respects `prefers-color-scheme` on first visit, persists to `localStorage`.

### Setup

Tailwind CDN needs config **before** first use. In `<head>`, immediately after the Tailwind `<script>`:

```html
<script>tailwind.config = { darkMode: 'class' };</script>
<script>
  (function () {
    const s = localStorage.getItem('theme');
    if (s === 'dark' || (!s && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');
  })();
</script>
```

(This runs before paint to avoid a flash.)

### Toggle

Add to the navbar `<ul>` a final `<li>` with `<button id="themeToggle" aria-label="Toggle theme">` containing two lucide icons, `sun` (shown in dark) and `moon` (shown in light), using `hidden dark:inline` / `inline dark:hidden`.

JS:

```js
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});
```

### Styling approach

- For Tailwind utility classes in HTML, add `dark:` variants: `bg-white` → `dark:bg-gray-900`, `bg-gray-50` → `dark:bg-gray-950`, `text-gray-900` → `dark:text-gray-100`, `text-gray-600/700` → `dark:text-gray-300`, `border-gray-100/200` → `dark:border-gray-800`.
- For custom classes in `styles.css` that hardcode colors (`body`, `nav.scrolled`, `.nav-link`, `.contact-card`, `.icon-circle`, `.project-card`, `#home` gradient, `.lens-btn`, `.skill-chip`, `.bento-tile`, `.bento-label`), add `.dark` overrides, e.g. `.dark .contact-card { background: #111827; border-color: #1f2937; }`.
- Particles: on theme change, no need to re-init; the purple particles look fine on dark. Just ensure `#home` gradient has a dark variant (`.dark #home { background: linear-gradient(to bottom, #111827, #030712); }`).
- The resume `<iframe>` will stay white — acceptable; wrap it with a `dark:border-gray-800` border only.

### Acceptance criteria

- No white flash on reload in dark mode.
- Every section readable in both modes; no invisible text (check accent-on-dark contrast, check gray-500 labels).
- Toggle icon swaps; preference persists.

---

## Task 7 — Scroll-linked timeline progress

**Goal:** In `#experience`, the vertical timeline line fills with accent color as the user scrolls, and the dot of the card currently in view is highlighted.

### Implementation

- The existing line is `absolute ... w-0.5 bg-purple-100`. Add a child `<div id="timelineProgress" class="absolute top-0 left-0 w-full bg-accent origin-top" style="height:0%"></div>`.
- On `scroll`, compute progress: `(viewportCenter - timelineTop) / timelineHeight`, clamp 0–1, set `height` as a percentage. Use `requestAnimationFrame` throttling.
- Dots: existing `w-4 h-4 bg-accent rounded-full` dots — default them to `bg-purple-200`, and add `.dot-active` (accent + `ring-4 ring-purple-100` + `scale-125`) to the dot of the item whose card is closest to viewport center. Use an `IntersectionObserver` with `rootMargin: '-40% 0px -40% 0px'`.
- Only visible items (not `.lens-hidden`) participate. Recompute when the lens toggle fires (dispatch a custom `lenschange` event from `initExperienceLens` and listen for it).

### Acceptance criteria

- Line fills smoothly on scroll, resets on scroll-up, hidden on mobile like the existing line (`hidden md:block`).
- Exactly one dot is highlighted at a time on desktop.
- Works after toggling lens.

---

## Task 8 — Rotating hero tagline

**Goal:** In `#home`, under the `<h1>`, add a typewriter line that cycles through roles.

- Markup: `<p class="text-xl md:text-2xl font-medium text-accent h-8 mb-6"><span id="typewriter"></span><span class="typewriter-cursor">|</span></p>`
- Phrases: `["Software Engineer", "React & TypeScript Developer", "Airtable Builder", "Full-Stack Problem Solver"]`
- Behaviour: type at ~70ms/char, pause 1800ms, delete at ~40ms/char, pause 400ms, loop. Respect `prefers-reduced-motion: reduce` — if set, just show the first phrase statically.
- CSS: `.typewriter-cursor { animation: blink 1s step-end infinite; } @keyframes blink { 50% { opacity: 0; } }`

### Acceptance criteria

- No layout shift as text changes (fixed height on the `<p>`).
- Reduced-motion users see static text.

---

## Task 9 — Final QA pass

- Run through every section in light and dark mode, desktop and mobile.
- Check the browser console for errors.
- Verify all nav links scroll to the right section and highlight correctly (Home, About, Experience, Education, Projects, Contact, Resume).
- Update the footer year to the current year.
- Run a Lighthouse audit (Chrome DevTools) and fix any accessibility issues flagged (missing `aria-label`s, contrast).
- Commit and report a short summary of what was verified.

---

## Deferred (phase two — not in this plan)

- Airtable-powered content (projects/experience fetched from an Airtable base via a Vercel edge function).
- `Cmd+K` command palette.
