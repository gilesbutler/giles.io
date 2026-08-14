---
title: "eGuarantee MVP"
date: 2023-04-01
excerpt: "MVP build for eGuarantee. Astro landing pages. Vue.js application with xState for state management. Hosted on AWS. Now a leading Australian commercial lease bond provider."
tags:
  - Vue
  - xState
  - MVP
image: /work/eguarantee.svg
imageLabel: eguarantee.svg
imageAlt: "eGuarantee MVP cover"
cardColor: "#ecb22e"
cardText: dark
order: 3
---

eGuarantee came to Fuzzy Logic Labs as a client engagement. We built their MVP, the Astro landing pages, and the Vue.js application that runs the underwriting flow.

## What I built

- The MVP that went live - now a leading Australian commercial lease bond provider, backed by a major global insurer.
- The Vue.js application with xState as the state machine layer, modelling the underwriting flow so the form is explicit, testable, and easy to extend.
- The Astro landing pages, deployed on AWS, that turn a complex commercial-lease product into something a tenant can actually evaluate.

The interesting choice was xState. For a flow with this many branches, hand-rolled state is where the bugs live. Modelling it as a state machine paid off the first time a regulator changed the rules.
