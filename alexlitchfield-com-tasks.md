# alexlitchfield.com — Development Tasks

**Project:** Personal Portfolio Website
**Platform:** React + TypeScript + Vite + Tailwind CSS, hosted on AWS (S3 + CloudFront + Route 53 + ACM), deployed via GitHub Actions
**Owner:** Alex Litchfield — solo project. All tasks are self-assigned, so the per-task **Assignee** field used in team-based task lists is omitted here.

**Reference:** alexlitchfield.com PDR (Versions 1–9)

---

## TASK STRUCTURE

Each task follows this format:
- **Task ID**: `Version.Phase.Task` — matches the PDR's version/phase numbering exactly (e.g. Task 3.2.1 implements PDR section v3.2)
- **Title**: Brief task name
- **PDR Reference**: The exact PDR version/phase this task fulfills
- **Description**: What needs to be done
- **Dependencies**: Task IDs that must be completed first
- **Acceptance Criteria**: Specific, testable outcomes
- **Testing Notes**: Special testing considerations (where applicable)

---

# VERSION 1 — FOUNDATION: HOSTING + MVP SCAFFOLD

## v1.1 — Infrastructure & Hosting Setup

### 1.1.1 - Provision Private S3 Origin Bucket
**PDR Reference:** v1.1
**Description:** Create the S3 bucket that stores built site assets, with public access fully blocked and CloudFront as the only reader.
**Dependencies:** None
**Acceptance Criteria:**
- Bucket created with all four Block Public Access settings enabled
- Server-side encryption enabled (SSE-S3)
- Bucket versioning disabled
**Status:** Complete

---

### 1.1.2 - Create CloudFront Distribution with SPA Error Handling
**PDR Reference:** v1.1
**Description:** Create a CloudFront distribution using the S3 bucket as origin, redirecting HTTP to HTTPS and serving `index.html` on 403/404 so client-side routing works on hard refresh/deep links.
**Dependencies:** 1.1.1
**Acceptance Criteria:**
- Distribution created, origin = S3 bucket
- Viewer protocol policy: Redirect HTTP to HTTPS; allowed methods GET, HEAD
- Default root object: `index.html`
- Custom error responses: 403 → `/index.html` (200), 404 → `/index.html` (200)
**Status:** Complete

---

### 1.1.3 - Issue ACM Certificate and Configure Route 53
**PDR Reference:** v1.1
**Description:** Request a DNS-validated ACM certificate covering the apex domain and wildcard subdomain, attach it to CloudFront, and point DNS at the distribution.
**Dependencies:** 1.1.2
**Acceptance Criteria:**
- ACM certificate issued (us-east-1, DNS validation) for `alexlitchfield.com` and `*.alexlitchfield.com`
- CloudFront alternate domain names configured with the certificate attached
- Route 53 alias records created for apex and `www`, both pointing to the CloudFront distribution
- Site loads over HTTPS at both `alexlitchfield.com` and `www.alexlitchfield.com`
**Status:** Complete

---

### 1.1.4 - Create Least-Privilege IAM Deploy User
**PDR Reference:** v1.1
**Description:** Create an IAM user and policy scoped only to syncing the site bucket and invalidating the CloudFront distribution, for CI use.
**Dependencies:** 1.1.1, 1.1.2
**Acceptance Criteria:**
- Policy grants only `s3:PutObject`/`GetObject`/`ListBucket`/`DeleteObject` on the site bucket and `cloudfront:CreateInvalidation`/`GetInvalidation`
- No console access granted to the user
- Access key generated and stored outside the repo
**Status:** Complete

---

### 1.1.5 - Configure GitHub Actions CI/CD Pipeline
**PDR Reference:** v1.1
**Description:** Add a GitHub Actions workflow that builds and deploys the site to S3/CloudFront on every push to `main`.
**Dependencies:** 1.1.4
**Acceptance Criteria:**
- Repository secrets configured: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`
- `deploy.yml` builds with Node 20, runs `npm ci` and `npm run build`
- Workflow syncs `dist/` to S3 with `--delete` and invalidates `/*` on CloudFront
- A push to `main` results in the live site updating within minutes
**Status:** Complete

---

## v1.2 — Project Scaffold & MVP Code

### 1.2.1 - Scaffold Vite + React + TypeScript Project
**PDR Reference:** v1.2
**Description:** Initialize the project using Vite's `react-ts` template and confirm it runs locally.
**Dependencies:** None
**Acceptance Criteria:**
- Project created via `npm create vite@latest -- --template react-ts`
- `npm run dev` serves the app locally without errors
- `npm run build` produces a working `dist/` output
**Status:** Complete

---

### 1.2.2 - Integrate Tailwind CSS and Brand Theme
**PDR Reference:** v1.2
**Description:** Add Tailwind via the Vite plugin and define the brand color palette as theme tokens.
**Dependencies:** 1.2.1
**Acceptance Criteria:**
- `@tailwindcss/vite` configured in `vite.config.ts`
- `index.css` imports Tailwind and defines brand colors under an `@theme` block
- Body background/text colors apply the brand palette by default
**Status:** Complete

---

### 1.2.3 - Set Up Client-Side Routing and Layout Shell
**PDR Reference:** v1.2
**Description:** Add `react-router-dom` with a shared `Layout` (Navbar + `Outlet` + Footer) and route stubs for Home, Resume, Projects, and Apps.
**Dependencies:** 1.2.2
**Acceptance Criteria:**
- `BrowserRouter` wraps the app; a `Layout` route wraps the index/resume/projects/apps child routes
- Navbar renders Home/Resume/Projects links with active-link styling; Apps link present but disabled pending v6
- Footer renders a static copyright line
**Status:** Complete

---

### 1.2.4 - Build Typed Resume Data Layer
**PDR Reference:** v1.2
**Description:** Create typed data files for education, skills, resume-scoped projects, and work experience, and wire the Resume page to them.
**Dependencies:** 1.2.1
**Acceptance Criteria:**
- `resumeEducation.ts`, `resumeSkills.ts`, `resumeProjects.ts`, `resumeWorkExperience.ts` created with explicit TypeScript interfaces
- Resume page renders all four sections from this data with no hardcoded content in JSX
- "Show more" toggles implemented for the Projects and Work Experience sections
**Status:** Complete

---

### 1.2.5 - Build Projects Page and Data Source
**PDR Reference:** v1.2
**Description:** Create the site-wide Projects data file and the Projects page grid that reads from it.
**Dependencies:** 1.2.1
**Acceptance Criteria:**
- `projectsData.ts` created with a typed `ProjectItem` interface
- Projects page renders a responsive card grid (thumbnail, title, course, short description, tools/skills, GitHub link) from this data
**Status:** Complete

---

### 1.2.6 - Stub Apps Page
**PDR Reference:** v1.2
**Description:** Add a minimal placeholder Apps page so the route exists ahead of v6's full build-out.
**Dependencies:** 1.2.3
**Acceptance Criteria:**
- `/apps` route renders a "coming soon" placeholder
- No console errors when navigating to the route
**Status:** Complete

---

# VERSION 2 — HOME PAGE EXPERIENCE

## v2.1 — "What's New" Data Foundation

### 2.1.1 - Define WhatsNewEntry Interface and Data File
**PDR Reference:** v2.1
**Description:** Create `data/whatsNew.ts` with a typed `WhatsNewEntry` interface (title, summary, image, date, target route).
**Dependencies:** 1.2.1
**Acceptance Criteria:**
- Interface and exported array compile with no `any` types
- Array supports an arbitrary number of entries without layout code changes
**Status:** Complete

---

### 2.1.2 - Implement getLatestUpdate Helper
**PDR Reference:** v2.1
**Description:** Add a helper that returns the single most recent entry by date for use in the Home highlight block.
**Dependencies:** 2.1.1
**Acceptance Criteria:**
- Helper returns the correct entry regardless of array insertion order
- Returns `undefined` gracefully if the array is empty (no crash)
**Status:** Complete

---

### 2.1.3 - Seed Initial "What's New" Entries
**PDR Reference:** v2.1
**Description:** Add seed entries documenting the v1 → v2 milestones so the feed isn't empty at launch.
**Dependencies:** 2.1.1
**Acceptance Criteria:**
- At least one entry present documenting the MVP launch
- Each entry has a valid target route that resolves to a real page

---

## v2.2 — Home Page Block Build-Out

### 2.2.1 - Build What's New Highlight Block
**PDR Reference:** v2.2
**Description:** Add the highlight block to Home showing the latest update (image, blurb, date, "take me there →").
**Dependencies:** 2.1.2
**Acceptance Criteria:**
- Block renders the correct latest entry
- "Take me there →" navigates to the entry's target route

---

### 2.2.2 - Build "All Updates" Page
**PDR Reference:** v2.2
**Description:** Add an `/updates` route listing the full What's New history in reverse-chronological order.
**Dependencies:** 2.1.1
**Acceptance Criteria:**
- Route lists every entry in `whatsNew.ts`, newest first
- "See all updates" link on Home routes here

---

### 2.2.3 - Build Resume Preview Block
**PDR Reference:** v2.2
**Description:** Add a Home block previewing education + top skills with a "To Resume →" link.
**Dependencies:** 1.2.4
**Acceptance Criteria:**
- Block pulls live data from `resumeEducation.ts`/`resumeSkills.ts` (no duplicated content)
- "To Resume →" routes to `/resume`

---

### 2.2.4 - Build Projects Preview Block
**PDR Reference:** v2.2
**Description:** Add a Home block showing the first ~5 project cards with a "View all projects" link.
**Dependencies:** 1.2.5
**Acceptance Criteria:**
- Block renders a capped slice of `projectsData.ts`, not the full list
- "View all projects" routes to `/projects`

---

### 2.2.5 - Build Apps Preview Block (Empty-State Safe)
**PDR Reference:** v2.2
**Description:** Add a Home block mirroring the Projects preview pattern for apps, functioning correctly before any apps exist.
**Dependencies:** 1.2.6
**Acceptance Criteria:**
- Block renders without error when the apps data source is empty
- Once v6 ships real app data, the block requires no code changes to display it

---

## v2.3 — "Recent Work" Automated Commit Feed

### 2.3.1 - Write Build-Time GitHub Commit Fetch Script
**PDR Reference:** v2.3
**Description:** Write a Node script that queries the GitHub REST API's commits endpoint for configured repos and writes a static `recentWork.json`.
**Dependencies:** 1.1.5
**Acceptance Criteria:**
- Script runs standalone with `node scripts/fetch-recent-work.ts` (or compiled equivalent)
- Output matches schema `{ repo, message, date, url }[]`, sorted by date descending, capped to a defined maximum count

---

### 2.3.2 - Integrate Fetch Script into Deploy Workflow
**PDR Reference:** v2.3
**Description:** Add the fetch script as a step in `deploy.yml` before `npm run build`.
**Dependencies:** 2.3.1
**Acceptance Criteria:**
- Workflow step runs the script and produces `public/recentWork.json` before the build step
- Generated JSON is bundled into the deployed `dist/` output

---

### 2.3.3 - Implement Fetch Failure Fallback
**PDR Reference:** v2.3
**Description:** Ensure a failed or rate-limited GitHub API call doesn't fail the whole deploy.
**Dependencies:** 2.3.2
**Acceptance Criteria:**
- On fetch failure, the workflow keeps the last committed copy of `recentWork.json` rather than failing the build
- Failure is logged in the workflow output for visibility

**Testing Notes:** Simulate failure by pointing the script at an invalid repo name and confirming the build still succeeds.

---

### 2.3.4 - Build Recent Work Component
**PDR Reference:** v2.3
**Description:** Add a "Recent Work" block beneath What's New on Home that renders `recentWork.json` at build time.
**Dependencies:** 2.3.2
**Acceptance Criteria:**
- Component renders repo name, trimmed commit message, date, and a link to the commit
- No client-side calls to the GitHub API (data is static at build time)

---

### 2.3.5 - Configure Source Repo List
**PDR Reference:** v2.3
**Description:** Decide and configure which repos feed the Recent Work block.
**Dependencies:** 2.3.1
**Acceptance Criteria:**
- Repo list stored in a single config location (not hardcoded inline in the fetch script)
- Portfolio repo and at least one active project repo included

---

# VERSION 3 — ABOUT & CONTACT

## v3.1 — About Page

### 3.1.1 - Add /about Route and Navbar Entry
**PDR Reference:** v3.1
**Description:** Add the About route and enable its Navbar link.
**Dependencies:** 1.2.3
**Acceptance Criteria:**
- `/about` route renders and is reachable from the Navbar
- Active-link styling matches the existing nav pattern

---

### 3.1.2 - Build About Page Content Layout
**PDR Reference:** v3.1
**Description:** Build the photo + bio paragraph layout for the About page.
**Dependencies:** 3.1.1
**Acceptance Criteria:**
- Photo and bio paragraph render correctly at desktop and mobile widths
- No additional sections beyond photo, bio, and the v3.2 contact form (scope confirmed as-is)

---

### 3.1.3 - Source and Optimize About Photo Asset
**PDR Reference:** v3.1
**Description:** Select, crop, and compress the photo used on the About page.
**Dependencies:** None
**Acceptance Criteria:**
- Image delivered at an appropriately compressed file size for web
- Image has descriptive `alt` text

---

## v3.2 — Contact Form (EmailJS)

### 3.2.1 - Create EmailJS Service and Template
**PDR Reference:** v3.2
**Description:** Set up an EmailJS account, one email service, and one template mapping form fields to an outgoing email.
**Dependencies:** None
**Acceptance Criteria:**
- Template accepts name, email, and message fields
- A test send from the EmailJS dashboard successfully delivers an email

---

### 3.2.2 - Build ContactForm Component
**PDR Reference:** v3.2
**Description:** Build the controlled form UI (name, email, message) with client-side validation.
**Dependencies:** 3.1.2
**Acceptance Criteria:**
- Required-field and email-format validation block submission with inline error messaging
- Form does not cause a full page reload on submit

---

### 3.2.3 - Wire Form to EmailJS SDK
**PDR Reference:** v3.2
**Description:** Integrate `@emailjs/browser` and connect the form submit handler to `emailjs.send`.
**Dependencies:** 3.2.1, 3.2.2
**Acceptance Criteria:**
- Successful submission sends a real email using the configured template
- EmailJS public key is read from a build-time environment variable, not hardcoded

---

### 3.2.4 - Add Honeypot Spam Mitigation
**PDR Reference:** v3.2
**Description:** Add a hidden honeypot field to reduce automated spam submissions.
**Dependencies:** 3.2.2
**Acceptance Criteria:**
- Hidden field is invisible to and unreachable by real users (off-screen, not just `display: none` if that proves insufficient against bots)
- Submissions with the honeypot filled are silently discarded client-side

---

### 3.2.5 - Implement Success/Error UI States
**PDR Reference:** v3.2
**Description:** Add clear success and error feedback states after submission.
**Dependencies:** 3.2.3
**Acceptance Criteria:**
- Success state confirms the message was sent and clears the form
- Error state (e.g. EmailJS failure or rate limit) shows a retry-friendly message without losing the user's typed input

---

### 3.2.6 - Add EmailJS Key to CI Build Environment
**PDR Reference:** v3.2
**Description:** Add the EmailJS public key as a GitHub Actions secret / build-time env var so production builds include it.
**Dependencies:** 3.2.3, 1.1.5
**Acceptance Criteria:**
- Key is available to `npm run build` in the deploy workflow via an env var
- Key is not committed to the repository in any form

---

# VERSION 4 — INDIVIDUAL PROJECT PAGES & ROUTING

## v4.1 — Dynamic Routing

### 4.1.1 - Add /projects/:slug Dynamic Route
**PDR Reference:** v4.1
**Description:** Add a dynamic route that resolves a slug to a project entry in `projectsData.ts`.
**Dependencies:** 1.2.5
**Acceptance Criteria:**
- Visiting `/projects/{valid-slug}` renders that project's data
- Route uses `useParams` + a lookup against `projectsData`

---

### 4.1.2 - Extend ProjectItem for Detail Pages
**PDR Reference:** v4.1
**Description:** Extend the `ProjectItem` interface with `contentPath` (markdown file reference) and `screenshots: string[]`.
**Dependencies:** 4.1.1
**Acceptance Criteria:**
- Interface change compiles with existing `projectsData.ts` entries updated to match
- No existing Projects page or Resume page functionality breaks

---

### 4.1.3 - Build Not-Found Fallback for Unknown Slugs
**PDR Reference:** v4.1
**Description:** Handle the case where a slug in the URL doesn't match any project.
**Dependencies:** 4.1.1
**Acceptance Criteria:**
- Unknown slug renders a graceful "project not found" state instead of a blank page or crash
- A link back to `/projects` is present on the not-found state

---

## v4.2 — Long-Form Content via Markdown

### 4.2.1 - Install and Configure react-markdown Pipeline
**PDR Reference:** v4.2
**Description:** Add `react-markdown` with `remark-gfm` and a code-highlighting plugin.
**Dependencies:** 4.1.1
**Acceptance Criteria:**
- Markdown with tables, task lists, and fenced code blocks renders correctly
- Code blocks display with syntax highlighting

---

### 4.2.2 - Set Up Per-Project Markdown Content Files
**PDR Reference:** v4.2
**Description:** Create one markdown file per project under `content/projects/`, imported via Vite's raw-text import.
**Dependencies:** 4.2.1
**Acceptance Criteria:**
- At least one project's full write-up is authored in markdown and renders on its detail page
- Import pattern documented for adding future project write-ups

---

### 4.2.3 - Migrate Existing Long-Form Content to Markdown
**PDR Reference:** v4.2
**Description:** Move any existing long-form project descriptions out of TS strings into the new markdown files.
**Dependencies:** 4.2.2
**Acceptance Criteria:**
- No project detail content remains as a multi-paragraph TS template string
- Rendered output matches the intended formatting (headings, lists, code)

---

### 4.2.4 - Style Markdown Output Container
**PDR Reference:** v4.2
**Description:** Apply consistent typography styling to rendered markdown content.
**Dependencies:** 4.2.1
**Acceptance Criteria:**
- Headings, lists, links, and code blocks are legibly styled and consistent with the site's brand theme
- Rendered content stays within a readable max-width on large screens

---

## v4.3 — Project Detail Page Template

### 4.3.1 - Install Swiper and Build ScreenshotGallery Component
**PDR Reference:** v4.3
**Description:** Add the `swiper` package and build a reusable screenshot gallery component.
**Dependencies:** 4.1.2
**Acceptance Criteria:**
- Gallery supports swipe (touch) and arrow (click) navigation
- Component is generic enough to be reused by v5.4 and v6.2

---

### 4.3.2 - Build In-Page Table of Contents
**PDR Reference:** v4.3
**Description:** Generate an anchor-linked table of contents from the markdown document's headings.
**Dependencies:** 4.2.1
**Acceptance Criteria:**
- TOC links jump to the correct heading anchor on the page
- TOC updates automatically if headings are added/removed in the markdown source (no manual TOC maintenance)

---

### 4.3.3 - Add Skill Badges with Cross-Links
**PDR Reference:** v4.3
**Description:** Render the project's tools/skills as badges matching the Resume page's badge styling.
**Dependencies:** 4.1.2
**Acceptance Criteria:**
- Badges display each skill listed in the project's `toolsAndLanguages`
- Clicking a badge navigates toward the corresponding skill on the Resume page

---

### 4.3.4 - Add GitHub Link and Conditional App Link
**PDR Reference:** v4.3
**Description:** Render the GitHub repo link, and an "Open the App →" link only when the project has an associated app.
**Dependencies:** 4.1.2
**Acceptance Criteria:**
- GitHub link renders whenever `githubUrl` is present
- App link renders only when the project has an associated `appSlug`; absent otherwise

---

### 4.3.5 - Assemble Full Project Detail Page Layout
**PDR Reference:** v4.3
**Description:** Combine title, course/personal tag, markdown body, TOC, screenshot gallery, skill badges, and links into the final page layout.
**Dependencies:** 4.3.1, 4.3.2, 4.3.3, 4.3.4
**Acceptance Criteria:**
- All elements render together without layout collisions at desktop and mobile widths
- Page matches the visual style of the rest of the site

---

### 4.3.6 - Populate Screenshots for Existing Projects
**PDR Reference:** v4.3
**Description:** Source and add screenshot images for each existing project.
**Dependencies:** 4.3.1
**Acceptance Criteria:**
- Every project in `projectsData.ts` has at least 2 screenshots populated
- Images are appropriately compressed for web delivery

---

## v4.4 — Repoint Existing Links

### 4.4.1 - Repoint Projects Page Cards
**PDR Reference:** v4.4
**Description:** Wrap Projects page cards in a `Link` to the new detail route, keeping the GitHub link as a secondary action.
**Dependencies:** 4.3.5
**Acceptance Criteria:**
- Clicking a project card (outside the GitHub link) navigates to `/projects/{slug}`
- GitHub link still opens externally without triggering the card navigation

---

### 4.4.2 - Repoint Resume Project Cards
**PDR Reference:** v4.4
**Description:** Update the Resume page's "View Project →" links to route to the same detail pages.
**Dependencies:** 4.3.5
**Acceptance Criteria:**
- "View Project →" and the project title both navigate to `/projects/{slug}`

---

# VERSION 5 — INTERACTIVE RESUME ENHANCEMENTS

## v5.1 — Skill Popover System

### 5.1.1 - Extend ResumeSkills Data with Popover Content
**PDR Reference:** v5.1
**Description:** Add `proficiencyNote` and `usedInProjects` fields to the skills data.
**Dependencies:** 1.2.4
**Acceptance Criteria:**
- Every skill entry includes a proficiency note
- `usedInProjects` references valid project slugs where applicable

---

### 5.1.2 - Build Accessible Popover Component
**PDR Reference:** v5.1
**Description:** Build the popover with `aria-expanded`, `aria-controls`, focus management, and Escape-to-close.
**Dependencies:** 5.1.1
**Acceptance Criteria:**
- Popover is operable via Tab + Enter with visible focus states
- Escape key closes the popover and returns focus to the triggering badge

---

### 5.1.3 - Implement Desktop Hover / Mobile Tap-to-Toggle Branch
**PDR Reference:** v5.1
**Description:** Detect pointer capability and branch behavior: hover-triggered on desktop, tap-to-toggle on touch.
**Dependencies:** 5.1.2
**Acceptance Criteria:**
- Desktop: popover opens on hover, persists on click until click-outside
- Touch device: popover opens on tap, closes on tap-outside; no reliance on hover

---

### 5.1.4 - Implement Viewport-Edge Clamping
**PDR Reference:** v5.1
**Description:** Ensure the popover repositions so it never renders partially off-screen.
**Dependencies:** 5.1.2
**Acceptance Criteria:**
- Popovers on skills near the left/right/bottom viewport edges remain fully visible
- Verified at common mobile widths (360px–430px)

---

### 5.1.5 - Wire Skill Badges into Resume Page
**PDR Reference:** v5.1
**Description:** Replace the static skill badges with the new interactive `SkillBadge` component.
**Dependencies:** 5.1.3, 5.1.4
**Acceptance Criteria:**
- All skills in the Technical Skills section use the new interactive component
- Existing badge color-coding by category is preserved

---

## v5.2 — Skill Ordering/Filtering

### 5.2.1 - Build Order-By Dropdown
**PDR Reference:** v5.2
**Description:** Add a dropdown to sort the skills list by proficiency, category, or alphabetically.
**Dependencies:** 5.1.5
**Acceptance Criteria:**
- Selecting each option re-sorts the displayed skills accordingly
- Underlying `ResumeSkills` data is not mutated (sort is derived/memoized)

---

### 5.2.2 - Persist Sort Selection During Session
**PDR Reference:** v5.2
**Description:** Keep the chosen sort order stable while the user interacts with skill popovers on the same page visit.
**Dependencies:** 5.2.1
**Acceptance Criteria:**
- Opening/closing a popover does not reset the selected sort order
- Sort resets to default on full page reload (no persistence required beyond the session)

---

## v5.3 — Skill → Project Cross-Linking

### 5.3.1 - Link Popover "Used In" Entries to Project Pages
**PDR Reference:** v5.3
**Description:** Render each skill's `usedInProjects` slugs as links to their project detail pages.
**Dependencies:** 5.1.5, 4.3.5
**Acceptance Criteria:**
- Clicking a "used in" entry navigates to the correct `/projects/{slug}` page
- Skills with no associated projects show no "used in" list (no broken/empty links)

---

## v5.4 — Organizational Achievements Carousel

### 5.4.1 - Source Achievement Photos
**PDR Reference:** v5.4
**Description:** Collect and compress the photos to display in the achievements carousel.
**Dependencies:** None
**Acceptance Criteria:**
- At least 4 photos sourced and optimized for web
- `data/achievementPhotos.ts` created listing them with alt text

---

### 5.4.2 - Configure Swiper Autoplay for Achievements Carousel
**PDR Reference:** v5.4
**Description:** Reuse the `ScreenshotGallery`/Swiper component with autoplay and pause-on-interaction enabled.
**Dependencies:** 4.3.1, 5.4.1
**Acceptance Criteria:**
- Carousel auto-advances on a timer
- Autoplay pauses when the user manually navigates via arrows or swipe, and resumes after a delay

---

### 5.4.3 - Integrate Carousel into Achievements Section
**PDR Reference:** v5.4
**Description:** Place the carousel into the Resume page's Organizational Achievements section alongside the existing achievements list.
**Dependencies:** 5.4.2
**Acceptance Criteria:**
- Carousel and achievements list render side-by-side or stacked appropriately at all breakpoints
- Manual arrow controls remain usable during autoplay

---

## v5.5 — Extended Education Detail

### 5.5.1 - Add High School Entry to Education Data
**PDR Reference:** v5.5
**Description:** Add a second `resumeEducation.ts` entry for high school.
**Dependencies:** 1.2.4
**Acceptance Criteria:**
- High school entry includes school, location, dates, and any relevant honors

---

### 5.5.2 - Add "Show More Education" Toggle
**PDR Reference:** v5.5
**Description:** Add the expand/collapse toggle revealing the high school entry beneath the college card.
**Dependencies:** 5.5.1
**Acceptance Criteria:**
- Toggle pattern matches the existing Projects/Work Experience show-more UI
- High school entry is hidden by default and revealed on click

---

# VERSION 6 — APPS PLATFORM

## v6.1 — Apps Data Model & Page Rebuild

### 6.1.1 - Define AppItem Interface and Data File
**PDR Reference:** v6.1
**Description:** Create `data/appsData.ts` with an `AppItem` interface (slug, name, subdomain URL, thumbnail, short description, linked project slug).
**Dependencies:** 1.2.6
**Acceptance Criteria:**
- Interface compiles; file exports an empty array by default
- Scope note documented in-code: for self-hosted apps only, not third-party/mobile-only projects

---

### 6.1.2 - Rebuild Apps Page from Data Source
**PDR Reference:** v6.1
**Description:** Replace the placeholder Apps page with a card grid reading from `appsData.ts`.
**Dependencies:** 6.1.1
**Acceptance Criteria:**
- Page renders a card per entry (thumbnail, name, "Launch") when data exists
- Page layout matches the visual pattern of the Projects grid

---

### 6.1.3 - Build Empty-State UI
**PDR Reference:** v6.1
**Description:** Add a clear "nothing here yet" state for when `appsData` is empty.
**Dependencies:** 6.1.2
**Acceptance Criteria:**
- Empty state renders correctly with zero entries (current real-world state)
- No layout break or console error when the array is empty

---

### 6.1.4 - Re-Enable Apps Navbar Link
**PDR Reference:** v6.1
**Description:** Uncomment and enable the Apps link in the Navbar.
**Dependencies:** 6.1.2
**Acceptance Criteria:**
- Apps link visible and functional in the Navbar
- Active-link styling matches other nav items

---

## v6.2 — Individual App Page Template

### 6.2.1 - Add /apps/:slug Dynamic Route
**PDR Reference:** v6.2
**Description:** Add a dynamic route resolving a slug to an entry in `appsData.ts`, mirroring the v4.1 pattern.
**Dependencies:** 6.1.1, 4.1.1
**Acceptance Criteria:**
- Visiting `/apps/{valid-slug}` renders that app's detail page
- Unknown slug renders a graceful not-found state

---

### 6.2.2 - Build Per-App "What's New in This Version" Block
**PDR Reference:** v6.2
**Description:** Add `data/appUpdates.ts` keyed by app slug and render the latest version notes on the app detail page.
**Dependencies:** 6.2.1
**Acceptance Criteria:**
- Block renders the most recent update entry for the given app
- Structure reuses the `WhatsNewEntry`-style shape for consistency

---

### 6.2.3 - Add Back-Link to Project Detail Page
**PDR Reference:** v6.2
**Description:** Add a link from the app detail page back to its associated project detail page.
**Dependencies:** 6.2.1, 4.3.5
**Acceptance Criteria:**
- Link navigates to the correct `/projects/{slug}` page
- Link is clearly labeled as "see how it was built" (or similar) to distinguish it from the app description itself

---

## v6.3 — Subdomain Launch Pattern

### 6.3.1 - Document Per-App Hosting Checklist
**PDR Reference:** v6.3
**Description:** Write a repeatable checklist for standing up hosting for a new app subdomain (bucket/distribution or equivalent target, Route 53 record).
**Dependencies:** 6.1.1
**Acceptance Criteria:**
- Checklist covers DNS, hosting target, and certificate steps needed for any future `{app}.alexlitchfield.com`
- Checklist confirms the existing wildcard ACM certificate from v1.1 covers new subdomains with no re-issuance

---

### 6.3.2 - Implement "Launch" as External Link
**PDR Reference:** v6.3
**Description:** Ensure the "Launch" action on app cards/detail pages is a plain external `<a>` link, not an in-app router link.
**Dependencies:** 6.1.2
**Acceptance Criteria:**
- Clicking "Launch" navigates the browser to the app's subdomain URL, leaving the SPA
- Confirmed working for at least one placeholder/test subdomain URL

---

### 6.3.3 - Validate Wildcard Certificate Coverage
**PDR Reference:** v6.3
**Description:** Confirm the existing `*.alexlitchfield.com` ACM certificate covers a newly created test subdomain without additional certificate work.
**Dependencies:** 1.1.3
**Acceptance Criteria:**
- A test subdomain resolves over HTTPS without certificate warnings
- No new ACM certificate request was required

---

# VERSION 7 — SITE-WIDE RESPONSIVENESS & ACCESSIBILITY

## v7.1 — Mobile Navigation

### 7.1.1 - Build Hamburger/Drawer Mobile Menu
**PDR Reference:** v7.1
**Description:** Add a breakpoint-based hamburger toggle and slide-out/dropdown menu replacing the horizontal nav below the mobile breakpoint.
**Dependencies:** 1.2.3
**Acceptance Criteria:**
- Nav links no longer overflow/wrap at mobile widths
- Menu opens/closes via the hamburger toggle with a visible open/closed state

---

### 7.1.2 - Add Close-on-Navigate and Close-on-Outside-Tap
**PDR Reference:** v7.1
**Description:** Ensure the mobile menu closes automatically after route changes or taps outside the menu.
**Dependencies:** 7.1.1
**Acceptance Criteria:**
- Selecting a nav link closes the menu and navigates correctly
- Tapping outside the open menu closes it without navigating

---

## v7.2 — Touch & Keyboard Interaction Pass

### 7.2.1 - Audit and Fix Touch Target Sizing
**PDR Reference:** v7.2
**Description:** Audit nav links, skill badges, and buttons for minimum touch target size and fix any that fall short.
**Dependencies:** 5.1.5, 7.1.1
**Acceptance Criteria:**
- Interactive elements meet a ~44px minimum touch target across the audited components
- No regressions to desktop layout from the fix

---

### 7.2.2 - Keyboard Navigation Audit
**PDR Reference:** v7.2
**Description:** Verify Tab order and focus visibility across the whole site, including the skill popovers and carousels.
**Dependencies:** 5.1.5, 5.4.3, 7.1.1
**Acceptance Criteria:**
- All interactive elements are reachable via Tab in a logical order
- Focus state is visibly distinct on every interactive element

---

### 7.2.3 - ARIA Labeling Pass
**PDR Reference:** v7.2
**Description:** Add/correct ARIA landmarks and attributes on custom components (nav, popovers, carousels, forms).
**Dependencies:** 7.2.2
**Acceptance Criteria:**
- Landmarks (`nav`, `main`, `footer`) present and correctly scoped
- Custom interactive components expose correct `aria-*` state (expanded, selected, current, etc.)

**Testing Notes:** Spot-check with a screen reader (VoiceOver or NVDA) on the Navbar and skill popovers.

---

## v7.3 — Responsive Media & Performance

### 7.3.1 - Implement Responsive Image Sizing
**PDR Reference:** v7.3
**Description:** Add `srcset`/`sizes` or pre-sized asset variants for project, app, and achievement images.
**Dependencies:** 4.3.6, 5.4.1
**Acceptance Criteria:**
- Mobile viewports load appropriately sized images, not full desktop-resolution assets
- No visible quality loss at the images' displayed sizes

---

### 7.3.2 - Add Lazy Loading for Below-the-Fold Images
**PDR Reference:** v7.3
**Description:** Apply `loading="lazy"` to images not visible on initial load.
**Dependencies:** 7.3.1
**Acceptance Criteria:**
- Below-the-fold images do not block initial page render
- Above-the-fold images (hero, etc.) remain eagerly loaded

---

### 7.3.3 - Run and Address Lighthouse Mobile Performance Pass
**PDR Reference:** v7.3
**Description:** Run Lighthouse in mobile mode against key pages and address flagged performance issues.
**Dependencies:** 7.3.1, 7.3.2
**Acceptance Criteria:**
- Home, Resume, Projects, and a project detail page each score reasonably on Lighthouse mobile performance
- Any critical flagged issues (e.g. render-blocking resources) are resolved or documented as accepted trade-offs

---

## v7.4 — WCAG 2.1 AA Audit

### 7.4.1 - Run Automated Accessibility Audit
**PDR Reference:** v7.4
**Description:** Run an automated audit (axe-core or Lighthouse accessibility) across all major pages.
**Dependencies:** 7.2.3
**Acceptance Criteria:**
- Audit run and results documented for Home, Resume, Projects, Project Detail, Apps, About
- All critical/serious findings resolved

---

### 7.4.2 - Manual Screen-Reader Walkthrough
**PDR Reference:** v7.4
**Description:** Manually walk through Navbar, contact form, and a project detail page using a screen reader.
**Dependencies:** 7.4.1
**Acceptance Criteria:**
- All content and interactive elements are announced correctly and in a sensible order
- Contact form errors are announced to screen reader users on validation failure

---

### 7.4.3 - Verify Color Contrast Against Brand Palette
**PDR Reference:** v7.4
**Description:** Check the brand color palette against WCAG 2.1 AA contrast thresholds and adjust any failing combinations.
**Dependencies:** 7.4.1
**Acceptance Criteria:**
- Body text meets ≥4.5:1 contrast against its background
- UI component boundaries/icons meet ≥3:1 contrast
- Any palette adjustments documented in `index.css`

---

# VERSION 8 — SEO, DISCOVERABILITY & ANALYTICS

## v8.1 — Meta Tags & Open Graph

### 8.1.1 - Implement Per-Route Title and Meta Description Management
**PDR Reference:** v8.1
**Description:** Add per-route `<title>` and meta description management (e.g. via `react-helmet-async`).
**Dependencies:** 4.1.1, 6.2.1
**Acceptance Criteria:**
- Every route (including dynamic project/app pages) sets a distinct, accurate title and description
- Verified by inspecting the rendered `<head>` per route

---

### 8.1.2 - Add Open Graph and Twitter Card Tags
**PDR Reference:** v8.1
**Description:** Add OG/Twitter meta tags per route, with a site-wide default image and per-project/app override.
**Dependencies:** 8.1.1
**Acceptance Criteria:**
- Sharing a link to a project or app page in a supporting platform preview tool shows the correct title, description, and image
- Pages without a specific OG image fall back to the site-wide default

---

## v8.2 — Sitemap & Crawlability

### 8.2.1 - Generate Build-Time Sitemap
**PDR Reference:** v8.2
**Description:** Write a build-time script that enumerates static routes plus dynamic project/app slugs into `sitemap.xml`.
**Dependencies:** 4.1.1, 6.2.1
**Acceptance Criteria:**
- `sitemap.xml` is produced on every build and included in `dist/`
- Every real route (static and dynamic) is represented

---

### 8.2.2 - Add robots.txt
**PDR Reference:** v8.2
**Description:** Add a `robots.txt` allowing full crawl and referencing the sitemap location.
**Dependencies:** 8.2.1
**Acceptance Criteria:**
- `robots.txt` served at the site root
- File references the sitemap URL and does not block any real content route

---

## v8.3 — AWS-Native Analytics (CloudWatch RUM)

### 8.3.1 - Create CloudWatch RUM App Monitor
**PDR Reference:** v8.3
**Description:** Create a RUM app monitor for the CloudFront domain in the AWS console.
**Dependencies:** 1.1.3
**Acceptance Criteria:**
- App monitor created and associated with `alexlitchfield.com`
- Default telemetry (page load timing, JS errors, HTTP status) enabled; no custom PII attributes configured

---

### 8.3.2 - Create Scoped Cognito Identity Pool for RUM
**PDR Reference:** v8.3
**Description:** Create an unauthenticated-only Cognito Identity Pool with an IAM role scoped to `rum:PutRumEvents` against the app monitor's ARN only.
**Dependencies:** 8.3.1
**Acceptance Criteria:**
- Identity pool grants no permissions beyond `rum:PutRumEvents` on the specific app monitor
- No authenticated role/flow is configured (guest-only)

---

### 8.3.3 - Embed RUM Web Client Snippet
**PDR Reference:** v8.3
**Description:** Add the AWS RUM Web Client snippet to `index.html`, configured with the app monitor ID, guest role ARN, identity pool ID, and session sample rate.
**Dependencies:** 8.3.2
**Acceptance Criteria:**
- Snippet loads without console errors on production build
- Events appear in the CloudWatch RUM console after a test visit

---

### 8.3.4 - Verify No PII Is Collected
**PDR Reference:** v8.3
**Description:** Confirm the RUM configuration does not capture personally identifiable information.
**Dependencies:** 8.3.3
**Acceptance Criteria:**
- Reviewed RUM event payloads contain no user-identifying data beyond standard anonymized telemetry
- Configuration documented for future reference

---

# VERSION 9 — CONTACT FORM MIGRATION TO AWS-NATIVE PIPELINE (FUTURE/STRETCH)

## v9.1 — SES Setup

### 9.1.1 - Verify Sending Domain in SES
**PDR Reference:** v9.1
**Description:** Verify `alexlitchfield.com` as a domain identity in SES and add required DKIM/SPF records in Route 53.
**Dependencies:** 1.1.3
**Acceptance Criteria:**
- Domain identity shows "Verified" status in SES
- DKIM CNAME and SPF/DMARC TXT records present in Route 53

---

### 9.1.2 - Request Production Access (Exit Sandbox)
**PDR Reference:** v9.1
**Description:** Submit and receive approval for SES production access so emails can be sent to any address, not just verified ones.
**Dependencies:** 9.1.1
**Acceptance Criteria:**
- SES account is out of sandbox mode
- Test email successfully delivered to an unverified external address

---

## v9.2 — Lambda + API Gateway

### 9.2.1 - Build Contact Lambda Function
**PDR Reference:** v9.2
**Description:** Write a Lambda function that validates the incoming payload and sends an email via `ses:SendEmail`.
**Dependencies:** 9.1.2
**Acceptance Criteria:**
- Function rejects malformed/incomplete payloads with a clear error response
- Valid payloads result in a delivered email

---

### 9.2.2 - Configure API Gateway Endpoint
**PDR Reference:** v9.2
**Description:** Create an API Gateway HTTP API with a `POST /contact` route in front of the Lambda, with CORS restricted to the production domain.
**Dependencies:** 9.2.1
**Acceptance Criteria:**
- Endpoint only accepts requests from `https://alexlitchfield.com` (CORS enforced)
- Non-POST requests to the route are rejected

---

### 9.2.3 - Add Basic Rate Limiting / Abuse Protection
**PDR Reference:** v9.2
**Description:** Configure throttling at the API Gateway stage level to limit abuse.
**Dependencies:** 9.2.2
**Acceptance Criteria:**
- Requests exceeding the configured rate are rejected with an appropriate status code
- Normal usage patterns are unaffected by the limit

---

## v9.3 — Frontend Swap

### 9.3.1 - Swap Submit Handler from EmailJS to API Gateway
**PDR Reference:** v9.3
**Description:** Replace the `emailjs.send` call in `ContactForm` with a `fetch` POST to the new API Gateway endpoint.
**Dependencies:** 9.2.2, 3.2.3
**Acceptance Criteria:**
- Form successfully sends through the new endpoint
- EmailJS dependency and key removed once the swap is verified working

---

### 9.3.2 - Preserve Existing Validation and UX
**PDR Reference:** v9.3
**Description:** Confirm validation, honeypot, and success/error states still function identically after the swap.
**Dependencies:** 9.3.1
**Acceptance Criteria:**
- Honeypot spam mitigation still functions
- Success/error UI states behave the same as the EmailJS version from the user's perspective

---

## v9.4 — IAM & CI Updates

### 9.4.1 - Review and Scope Lambda Execution Role
**PDR Reference:** v9.4
**Description:** Ensure the Lambda's execution role is scoped only to `ses:SendEmail` and basic CloudWatch Logs permissions, separate from the deploy IAM user.
**Dependencies:** 9.2.1
**Acceptance Criteria:**
- Lambda execution role has no permissions beyond what sending email and logging require
- Role is confirmed distinct from the v1.1 deploy user's policy

---

### 9.4.2 - Update Project Documentation for New Stack
**PDR Reference:** v9.4
**Description:** Document the SES/Lambda/API Gateway stack alongside the existing S3/CloudFront stack for future maintenance.
**Dependencies:** 9.4.1
**Acceptance Criteria:**
- Documentation describes both hosting stacks (static site + contact pipeline) and how they relate
- Any new GitHub Actions secrets or env vars introduced by this version are documented

---

---

# COMPLETION CHECKLIST BY VERSION

- [x] **v1** — Hosting live on AWS; MVP deployed with working routing and data-driven Resume/Projects pages
- [ ] **v2** — Home page fully block-built; What's New and Recent Work feeds live
- [ ] **v3** — About page live; contact form delivers email via EmailJS
- [ ] **v4** — Individual project pages live; Markdown-driven long-form content; existing links repointed
- [ ] **v5** — Skill popovers, ordering, cross-linking, achievements carousel, and extended education detail all functional
- [ ] **v6** — Apps page live and ready for future app entries; subdomain launch pattern documented and tested
- [ ] **v7** — Mobile nav, touch/keyboard accessibility, responsive media, and WCAG 2.1 AA audit complete
- [ ] **v8** — Meta/OG tags, sitemap/robots.txt, and CloudWatch RUM analytics live
- [ ] **v9** — Contact form migrated to Lambda + API Gateway + SES (stretch — only if pursued)

---

# APPENDIX: SUGGESTED BUILD ORDER / CRITICAL PATH

1. v1 (done) → foundation for everything below.
2. v2 → static Home experience; no dependency on v3+.
3. v3 → independent of v2; can be built in parallel if desired.
4. v4 → required before v5.3 (skill cross-links) and v6.2 (app back-links) can be completed.
5. v5 → v5.3 specifically depends on v4.3; the rest of v5 only depends on v1.
6. v6 → v6.2/v6.3 depend on v4 and v6.1 respectively.
7. v7 → best scheduled after v2–v6 so there are real interactive components to audit, though v7.1 (mobile nav) has no such dependency and can start anytime.
8. v8 → v8.1/8.2 depend on v4.1 and v6.1 for dynamic route enumeration; v8.3 only depends on v1.
9. v9 → stretch goal, depends on v3.2 existing to replace.

---

**END OF TASKS.MD**
