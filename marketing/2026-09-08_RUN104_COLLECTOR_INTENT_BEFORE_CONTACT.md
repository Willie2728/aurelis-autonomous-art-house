# RUN104 — Collector Intent Before Contact

## Customer Truth
A collector brief is stronger growth evidence than a raw email address. AURELIS should measure whether a buyer can define the selected works, inquiry type, intended use, decision window, and unresolved decision before asking for contact.

## Creative Strategy
**AUR-TXT-002 — A collector brief is stronger than an email address.**

Select the works. Name the inquiry type. Define the intended use and decision window. Write the question that must be resolved before the work is worth a private conversation.

Then copy the Collector Review Brief without sharing contact information.

**CTA:** Build the Collector Review Brief first. Request private acquisition review only if the selected works and unresolved decision are worth a conversation.

## Production Readiness
Created anonymous Base44 entity `CollectorSignal` with events `brief_copy` and `review_request_click`. The active Checkout flow now records only artwork count, inquiry type, intended use, decision window, source, and timestamp. It does not store the collector's free-text question, name, or email in this signal record.

Final Base44 build exit: `0`.
Final checkpoint: `6aa036f57c554caf30cb5de9`.
Final Base44 commit: `5b86d934d73c7eab9c38304071807237fc7aeb7c`.

## Measurement / claims boundary
RUN104 baseline: `0` CollectorSignal records and `0` AcquisitionInquiry records. A brief copy is intermediate intent; a review-request click is stronger intent; neither is a sale. No availability, edition status, final price, licensing rights, reservation, payment, shipping, tax, fulfillment, acquisition acceptance, revenue, or conversion lift is claimed.
