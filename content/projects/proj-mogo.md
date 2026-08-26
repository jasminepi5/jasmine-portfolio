---
date: 2026-08-25
draft: true
showReadingTime: true
showTableOfContents: true
showPagination: true
#   cover:
#     image: "assets/mogo_placeholder.png"
#     alt: "alt text"
#     caption: "A screenshot of the app's home page."
title: "Mogo: Android Ridesharing App 🚗"
summary: "A university capstone Android ridesharing app for Monash students, with live location tracking and a Supabase backend."
# weight: 10
---
## About the project

Mogo is an Android ridesharing app built for Monash University students, developed as my final-year Computer Science capstone project with a team of four.

## How it works

The app uses an MVVM architecture, with live location updates handled through consistent polling during an active ride — the rider's device detects and writes its location, and the driver's device reads it. Live tracking and routing are powered by the Google Maps Platform (Routes API, Places API, and Maps SDK for Android). Supabase (PostgreSQL) handles the database and authentication.

## Process

The team worked in Agile/Scrum sprints, tracking tasks on a Jira Kanban board, with GitHub for version control and GitHub Actions for CI/CD. Database schemas were designed collaboratively in Lucidchart before implementation.

## Status

The app isn't published to the Play Store — it was demoed by installing directly onto a device via USB debugging. I'm currently continuing the project solo, refactoring it to improve performance.

## Tech stack

Kotlin, Android Studio, Supabase (PostgreSQL), Google Maps Platform, GitHub Actions, Jira, Lucidchart
