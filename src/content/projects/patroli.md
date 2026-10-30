---
title: 'Patroli'
description: 'Security Guard Patrol Dashboard & QR-Code Checkpoints'
type: 'Progressive Web-Application (PWA)'
pubDate: '2026-10-12'
heroImage: '../../assets/projects/patroli-images/patroli-cover.png'
location: 'Indonesia'
techStack: [
    'TypeScript', 
    'Preact', 
    'Tailwind CSS',
    'Vite',
    'PostgreSQL', 
    'Supabase', 
    'Leaflet',
    'Playwright',
    'Netlify'
    ]
githubLink: 'https://github.com/PT-KelapaAsiaAbadi/patroli-webapp'
---

## Background

A business owner once came up to me with a specific problem they wanted to solve: **to easily monitor if the security guards they hired had actually completed their assigned patrols**. Checking the CCTV everyday can be time-consuming, and guards might not always be truthful.

They proposed a modernized version of the [Watchclock](https://en.wikipedia.org/wiki/Watchclock) system, which used to be popular before the rise in electronic systems. Briefly explained, this is how the original system worked:

- Each guard would be given a mechanical clock inside a locked case. Inside it is a paper tape (or disc) that advances with time.
- Each lock (or locked case) can only be opened using its corresponding key.
- Each location (checkpoint) holds a unique key (commonly chained to the site).
- Each key has its own embossed number or pattern.
- A guard needs to use the keys to stamp the key's number onto the clock's paper tape, marking the current time position.
- Supervisors (with the keys) regularly check the timestamps against the guards' assigned schedule.

## My Role

I built Patroli on my own, with AI assistance. I worked with the owner to assess the situation and gather the functional and non-functional requirements. Then I planned, designed and built the whole platform: the UI/UX, the frontend, the database and the hosting.

## Requirements (What are we solving?)

**Functional**

- Guards prove they visited each checkpoint by scanning the QR sticker there, or typing the code printed under it.
- Supervisors can see during the shift which checkpoints have been visited, by whom and when, and which haven't.
- Guards can add a note and photos when they find a problem.
- Supervisors manage guard accounts, checkpoints and the shift schedule themselves.

**Non-functional**

- Hard to fake: each scan is checked against the checkpoint's GPS location, and made-up QR codes are rejected.
- Keeps working when the signal drops, since the sites are outside the city.
- Runs on the guards' own phones, Android or iPhone, with no app store.
- Available in Bahasa Indonesia and English.

## Solution (What is Patroli?)

![How Patroli works in four steps: the supervisor pins and prints the checkpoints, the guard scans at every stop, the phone sends the scan straight away or holds it until there's signal, and the supervisor sees the round on one page.](../../assets/projects/patroli-images/patroli-how-it-works.webp)

The platform has two user roles:

- **Supervisor:** Someone who checks what locations have been visited and who they've been visited by.
- **Guard:** Someone who patrols the perimeter of a location, and logs their visited assigned checkpoints.

Guards use Patroli on their phones; supervisors can use it on a phone, tablet or desktop, in light or dark mode.

Every checkpoint on a site has a printed QR code. During a round, the guard scans each code with their phone's camera, and Patroli records the checkpoint, the guard and the time.

![Guard facing interface screenshots](../../assets/projects/patroli-images/patroli-guard-app.webp)

The supervisor's dashboard shows each site's checkpoints for the current shift, with missed or late ones highlighted, and a history the owner can look back through.

![Today supervisor main dashboard](../../assets/projects/patroli-images/patroli-today.webp)

Additionally, guards can also submit images and text reports for each checkpoint (if they find any).

![Scan details screenshot](../../assets/projects/patroli-images/patroli-scan-detail.webp)

## Design & Architecture (How does it work?)

![Architecture diagram: the guard scans signed QR stickers with the guard app, a Preact PWA that queues scans offline. The guard and supervisor apps talk directly to Supabase: Auth for phone sign-in, Edge Functions for accounts, PostgreSQL with row-level security and a Vault key for QR signing, and Storage for report photos.](../../assets/projects/patroli-images/patroli-architecture.png)

The frontend is a Preact progressive web app written in TypeScript, so guards can install it on their phones without going through an app store. There's no server of my own: the app talks directly to Supabase, which provides sign-in, the PostgreSQL database, photo storage and a few Edge Functions.

The app runs on the guards' own phones, so the database doesn't trust it. The rules live in Postgres instead:

- The app never writes to a table directly. Every write goes through a database function that checks who's calling; for example, only a guard can submit a scan.
- Row-level security decides what each person can read: guards see only their own scans and reports, and supervisors see everything.
- Each QR sticker carries a signature made with a key that never leaves the database, so a made-up QR code is rejected.
- Creating accounts and resetting passwords happen in Edge Functions, the only place the admin key exists.

The data model is small:

- **profiles**: guards and supervisors, who sign in with a phone number and password
- **checkpoints**: each with its QR code, a backup code to type in, a map location and a radius
- **scans**: one row per checkpoint visit (guard, checkpoint, time on the phone, time received, GPS position)
- **reports**: a note and up to 5 photos attached to a scan
- **shifts**: the supervisors' weekly schedule

Patrol progress is calculated from the scans, so there's no separate status to keep in sync.

## Challenges

The sites are a little further out from the city, where mobile signal can be unreliable. I didn't want a dropped connection to lose a guard's scan, so I planned for offline scanning from the start, just in case. If the phone is offline, or sending fails, the scan is saved on the phone (in IndexedDB, so it survives the app being closed) and sent when the connection comes back, with a retry every 20 seconds. Each scan gets its ID on the phone, so sending it twice doesn't create a duplicate, and it keeps the time it was scanned, not the time it arrived. On the supervisor's dashboard, a scan that arrives more than an hour after it was made is flagged as "sent late".

![Diagram: three checkpoints scanned with no signal are saved on the phone, then sent by themselves with their original scan times once the phone is back in range.](../../assets/projects/patroli-images/patroli-no-signal-diagram.png)

## Outcome

Patroli is now being tested live with guards on site. Based on what we learn, I'm planning more features and some clean-up, starting with:

- showing each guard's shift on the Today dashboard and on their home screen
- giving each guard their own set of checkpoints
- letting supervisors mark a flagged scan as reviewed
