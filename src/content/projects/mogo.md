---
title: 'MoGo'
description: 'Green Ride-Sharing Android App for Monash Students & Staff'
type: 'Android App'
pubDate: '2026-03-25'
updatedDate: '2026-07-13'
heroImage: '../../assets/projects/mogo-images/mogo-cover-image.png'
location: 'Melbourne, Australia'
techStack: [
    'Kotlin', 
    'Jetpack Compose',
    'Android Studio',
    'PostgreSQL', 
    'Supabase',
    'Google Maps Platform'
    ]
githubLink: 'https://github.com/jasminepi5/MoGo'
---

***Note:** To DC and Green Lantern fans, the project name was not intended to be a reference to the Green Lantern character [Mogo](https://en.wikipedia.org/wiki/Mogo). It's a play on words: "Monash" + "Go". Nonetheless, I find it quite a cute coincidence.*

## Background (What are we solving?)

MoGo was our final-year Computer Science project (FIT3161 and FIT3162) at Monash University. Monash students and staff travel to the same few campuses at similar times, and plenty of cars arrive with empty seats. MoGo lets drivers offer those seats to other people from Monash heading the same way, which makes the trip cheaper and cuts its carbon emissions.

General rideshare apps don't fit this well: they're built for paid, one-off rides between strangers, not regular trips within one university community.

## My Role

We built MoGo as a team of four using Scrum, with Jira for the backlog. I worked mainly on the Google Maps Platform integration: the map screen, address autocomplete with the Places API, and route calculation with the Routes API. I also worked on the booking flow, including cancelling a booking and giving its seat back to the ride. I ran the manual testing for booking and location tracking, and wrote the testing documentation.

## Solution (What is MoGo?)

MoGo is an Android app for sharing rides between Monash students and staff. Each user can switch between rider and driver.

![How MoGo works in five steps: a driver posts a ride, a rider finds one by campus and date, picks a pickup point on the map and books, both see the ride live on the day, and afterwards the CO₂ saved is added to their dashboards.](../../assets/projects/mogo-images/mogo-how-it-works.png)

- **Post a ride:** drivers enter a start address (with autocomplete), a campus, a date and time, and the number of free seats. A ride can repeat weekly for up to 12 weeks.
- **Find and book:** riders search by campus and date, choose a pickup point on the map, see the route's distance and travel time, and book a seat straight away.
- **Ride day:** the driver starts the ride, and both see live locations on the map.
- **After the ride:** the CO₂ saved and the kilometres shared are added to both dashboards, and the rider can rebook the same ride for the next week.
- Either side can cancel with a reason, and the seat goes back to the ride.

![How the CO₂ saving is calculated: trip distance times an emission factor (0.21 kg per km for petrol, 0.12 for hybrid, 0.01 for electric), divided by 25 kg per tree for the trees equivalent. Clayton to Caulfield is 12 km, which is 2.52 kg of CO₂ for a petrol car.](../../assets/projects/mogo-images/mogo-carbon.png)

Safety was a big part of the design. Only Monash email addresses can sign up, and riders can choose to only see rides from drivers of a particular gender. During a ride, the rider can share the trip with someone, or press SOS to text every safety contact the ride's destination, driver, car and plate.

![Safety features: Monash-only accounts, a gender preference for riders, safety contacts picked from the phone, Share Trip, and an SOS button that texts every safety contact the ride's destination, driver, car and plate.](../../assets/projects/mogo-images/mogo-safety.png)

## Design & Architecture (How does it work?)

![Architecture diagram: the Kotlin and Jetpack Compose Android app, built with MVVM, talks to Supabase for sign-in and data (Auth with a Monash-only email check, a trigger that creates each user's profile, and PostgreSQL tables) and to Google Maps Platform for the map, address autocomplete and routes. It also uses the phone's contacts, SMS and GPS.](../../assets/projects/mogo-images/mogo-architecture.png)

The app is written in Kotlin with Jetpack Compose and follows MVVM: each screen has a view model, which gets its data from repositories. There's no backend server of our own. Supabase provides sign-in and the PostgreSQL database. A database trigger refuses any sign-up that isn't a Monash email address, and another creates each user's profile when they sign up.

The main tables are **users**, **vehicles**, **rides** and **bookings**, plus tables for safety contacts. A unique constraint allows only one booking per rider per ride, so nobody can book the same ride twice.

For maps, the app uses three parts of Google Maps Platform:

- the **Maps SDK for Android** to show the map and live locations
- the **Places API** for address autocomplete
- the **Routes API** for each route's distance and travel time

On the phone itself, it uses the contacts picker for safety contacts, SMS for the SOS alert, and GPS for live location.

## Challenges

Cancelling a booking doesn't delete it. It's kept with the status *cancelled*, along with who cancelled, when and why, and the seat goes back to the ride. That caused a bug when a rider cancelled and then tried to book the same ride again. The database allows only one booking per rider per ride, and the cancelled booking still counted, so the new booking was refused. I fixed it by having the app delete that rider's cancelled booking for the same ride before saving the new one. Active bookings are never touched, so the rule still stops double bookings.

![Rebooking after a cancellation in three steps: a booking is saved as confirmed; cancelling keeps it with the status cancelled and gives the seat back; booking the same ride again is refused because the database allows one booking per rider per ride. The fix: the app deletes the rider's cancelled booking for that ride first, then saves the new one.](../../assets/projects/mogo-images/mogo-rebooking.png)

## Outcome

We demoed MoGo at the end of semester, running the app on Android Studio's emulator and on our own phones against a shared Supabase project.

***Note:** The GitHub link on this page goes to my fork of the original team repo.*

## What I Learned

Keeping cancelled bookings instead of deleting them meant we still had a record of who cancelled and why, but it taught me to check how a change like that interacts with the database's existing rules. MoGo was also my first time building on external APIs (Google Maps, Places and Routes), and my first time working in a team of four, with Scrum and a shared codebase.
