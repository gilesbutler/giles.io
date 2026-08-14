---
title: "Mixo"
date: 2022-01-01
excerpt: "Co-founded. Scaled to 500,000 users from launch in 4 months. Created over 3 million websites and regularly mentioned alongside major website builders."
tags:
  - Founder
  - Growth
  - Product
image: /work/mixo-prompt.webp
imageLabel: mixo-prompt.webp
imageAlt: "Mixo AI website prompt"
cardColor: "#e01e5a"
cardText: light
order: 1
---

# Mixo

Mixo is the headline product of Fuzzy Logic Labs. I co-founded it and have worked across the entire product. From strategy and UI/UX to frontend architecture, backend services, infrastructure, growth and customer support.

We built Mixo to help businesses get online in seconds, not weeks. Today, the platform is trusted by more than 750,000 businesses and has generated over three million websites.

## How it scaled

We grew from 500 to 500,000 users in four months after launch.

The playbook was not secret: ship the smallest thing that is actually useful, learn where users get stuck, then keep shipping. Every release was a bet on the next bottleneck facing a small-business owner.

The product kept getting simpler while the underlying system became significantly more capable—including the move from single landing pages to complete multi-page websites.

## What I engineered

I architected and built Mixo’s Vue 3 application using Vite, XState, VueUse, FormKit and Tailwind CSS, alongside a Node.js serverless backend.

The generated customer sites use a static-first islands architecture. Earlier sites were built with a static site generator, with newer work moving to Astro. Pages ship as static HTML by default, and Vue components are selectively hydrated only where interactivity or external data is required.

That approach matters at Mixo’s scale: generated sites share global delivery infrastructure through GCP and Cloudflare, so decisions about templates, images, fonts, assets and client-side JavaScript affect millions of websites, not one application.

## Performance at scale

Performance is treated as a product requirement rather than a final optimisation pass.

I’ve worked on:

- Static HTML generation and selective component hydration
- Image processing, sizing and delivery
- Font and asset-loading strategies
- Responsive template architecture
- Semantic markup, keyboard interaction and focus management
- Shared delivery through global CDN infrastructure
- Monitoring product and website behaviour through PostHog and Cloudflare

The core constraint is repeatability: every improvement must work safely across a large and diverse estate of customer-created websites.

## Product and platform integrations

I’ve built or materially worked on integrations across:

- AI model providers
- Stripe subscriptions, billing and webhooks
- Firebase authentication and services
- Google APIs
- Resend and SendGrid
- PostHog, Mixpanel and Google Analytics
- Cloudflare and Namecheap domains and DNS
- Image processing and storage
- Slack and other service webhooks

I currently work across product, frontend, backend and customer support, using an agentic engineering workflow and reviewing the code and pull requests it produces.

## What I learned

Scaling Mixo has been less about finding one clever technical solution and more about keeping product, design and engineering decisions aligned as the system grows.

The strongest architecture is not necessarily the most elaborate one. It is the architecture that keeps the product fast, understandable and changeable while millions of independently generated sites continue to work.
