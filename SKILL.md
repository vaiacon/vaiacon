---
name: vaiacon-design
description: Use this skill to generate well-branded interfaces and assets for vaiacon (Schweizer KI-Beratung & Automatisierung für KMU, vaiacon.ch) and its «Büro-Bot» product, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key facts: warm terracotta/cream palette (#B25222 accent on #F4EDE1/#EAE0CC), Quicksand for everything + IBM Plex Mono for numeric details, strongly rounded corners, hairline borders instead of shadows, playful comic speech bubbles, German (Switzerland, «ss» never «ß»), per Sie, lowercase nav/CTAs, numbered UPPERCASE kickers («01 — …»), text glyphs (→ ✓ «») instead of icon sets, no emoji. Tokens live in `tokens/*.css` (entry: `styles.css`); components in `components/*/`; the vaiacon.ch landing page recreation in `ui_kits/website/`; logos and Büro-Bot mascot renderings in `assets/`.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
