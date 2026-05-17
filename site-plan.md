# RealFiModel Site Plan

## Primary Pages

- `/` - Main RealFiModel homepage, briefing, financial model, contact form, and visible report links.
- `/PRIVATE.html` - Private market fixer-upper report: where to invest now on the Westside.
- `/GOLDMINE.html` - GOLDMINE Series rental-market report.
- `/LUX.html` - Multifamily urban real estate report, currently linked from the footer.

## Homepage Structure

1. Brillo-style top strip with location and contact signal.
2. Main brand block with RealFiModel positioning and CTA.
3. Orange topical strip for Westside and tech-worker search signals.
4. Briefing section:
   - Left report feature: PRIVATE, GOLDMINE Series, and LUX|Urban.
   - Right condensed briefing cards 1-7 in a 2-card, 2-wide-card, 3-card layout with existing expandable article bodies.
5. Cultural essay section.
6. Interactive financial model.
7. Contact form with existing Google event tracking.
8. Footer with external properties and report links.

## Google Mapping Requirements

- Keep the existing Google tag in `index.html`.
- Keep the existing canonical URL on the homepage.
- Publish `sitemap.xml` at `https://www.realfimodel.com/sitemap.xml`.
- Publish `robots.txt` at `https://www.realfimodel.com/robots.txt`.
- Submit the sitemap in Google Search Console.
- Confirm all sitemap URLs return HTTP 200 after deploy, especially `/GOLDMINE.html` and `/LUX.html`.
- Keep internal links visible on the homepage and footer so Google can discover the report pages from HTML links, not only from the sitemap.

## Current Crawl Files

- `sitemap.xml`
- `robots.txt`
