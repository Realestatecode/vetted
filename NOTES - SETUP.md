# NOTES - SETUP

This document contains setup notes for the REAL ESTATE EDGE static site (magazine-style) and instructions for publishing, updating the hero video, subscription handling, SEO metadata, and smoke testing.

## Repo / Branch
- Repository: Realestatecode/vetted
- Branch this document will live on: gh-pages

## Full file list (pushed to gh-pages)
- index.html
- styles.css
- script.js
- terms.html
- privacy.html
- README.md
- Banner.png (repo root poster image used for hero)
- assets/.gitkeep (placeholder — add hero images/video if needed)

## SEO Metadata added to index.html
- meta description: "Explore trending finance and real estate investing insights in Los Angeles and California. Growth strategies, inflation hedges, and vetted property opportunities."
- meta keywords: finance, dividends, commercial real estate, real estate investing, Los Angeles property, California real estate, rebuilding projects, inflation protection, growth stocks, real estate opportunities, passive income, property investment, CRE trends, investment growth, LA real estate, real estate market, inflation hedge, opportunity zones, urban development, property growth
- Open Graph (og:description): "Discover the latest finance and real estate investing trends in Los Angeles and California, including growth strategies, inflation hedges, and rebuilding opportunities for investors."
- og:image: /Banner.png (uses the repository root Banner.png as the social card image)

## Google Forms and contact links
- Subscribe (newsletter) Google Form (used by Subscribe button):
  https://docs.google.com/forms/d/e/1FAIpQLSfVe3oUh3DJyBpnXPG7SchfCIlmFcr7DI5hICx3OnRA3_Du7g/viewform
- Property Consultation Signup (nav link):
  https://forms.gle/BguBawmFhehaZSba7
- Contact phone: 310.728.7974

## Hero video (YouTube) instructions
- The hero uses a lazy-loading YouTube embed. The element in index.html is:

  <div id="ytThumb" data-video-id="nGeXAXmhyAA" style="background-image: url('/Banner.png');"></div>

- To update the hero video monthly:
  1. Edit index.html (on the gh-pages branch) and change the data-video-id attribute to the new YouTube ID.
     Example: data-video-id="NEW_VIDEO_ID"
  2. Replace Banner.png in the repo root with a new poster image (use the same filename: Banner.png) if you want a new poster.
  3. Commit and push the changes to gh-pages — no build step is required.

- The page loads a YouTube iframe on click and sets autoplay=1 so the video plays immediately when the user interacts with the poster.

## Subscribe form behavior and destination
- Current behavior (default): the Subscribe form opens the provided Google Form in a new tab so the visitor can complete the subscription. Responses are stored in the Google Form's response sheet.
- Implementation details:
  - The subscribe form has attribute `data-gform-redirect` set to the Google Form URL. On submit the script opens that URL in a new tab.
- Optional: Auto-submit name + email into Google Form (hidden submit): requires Google Form entry IDs (entry.########). If you want this behavior, provide the public Google Form link for the newsletter form and I will derive the entry IDs and add the auto-post logic.
- Optional: Programmatic endpoint: set `data-endpoint` on the form to a Formspree or API endpoint; the script will POST JSON {name, email}.

## Contact and navigation
- Navigation anchors:
  - Subscribe -> #subscribe
  - Opportunities -> #opportunities
  - Contact -> #contact
  - Property Consultation -> external Google Form link (opens in a new tab)

## Terms and Privacy pages
- Files added: /terms.html and /privacy.html, linked from footer.
- Edit placeholders: replace [Date] and [Company Name] and add your governing law details before publishing.

## GitHub Pages setup steps (one-time)
1. Go to repository Settings → Pages.
2. Under "Source" choose: Branch: gh-pages, Folder: /(root).
3. Save. Wait a few minutes for the site to publish.
4. Expected URL: https://realestatecode.github.io/vetted/ (confirm in Settings after saving).

## Smoke-test workflow
- File path: .github/workflows/smoke-test.yml
- Purpose: verify the GitHub Pages URL responds with HTTP 200 after a push to gh-pages.

Smoke-test workflow contents:

```yaml
name: Smoke Test GitHub Pages
on:
  push:
    branches: [ gh-pages ]
  workflow_dispatch:

jobs:
  smoke-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Wait for Pages to be available
        run: |
          echo "Checking Pages URL"
          URL="https://realestatecode.github.io/vetted/"
          echo "Testing $URL"
          for i in {1..10}; do
            status=$(curl -s -o /dev/null -w "%{http_code}" "$URL") || status=000
            echo "Attempt $i: HTTP $status"
            if [ "$status" = "200" ]; then
              echo "Pages is live"
              exit 0
            fi
            sleep 6
          done
          echo "Pages did not respond with 200 after retries"
          exit 1
```

## How to add the smoke-test workflow (if not pushed automatically)
- Add file .github/workflows/smoke-test.yml in the gh-pages branch using the GitHub UI or push locally.

## Verification checklist (smoke test manual steps)
- After enabling Pages, run:
  - curl -I https://realestatecode.github.io/vetted/ -> expect HTTP 200
- Open the site in a browser and verify:
  - Banner.png displays as hero poster
  - Clicking poster loads YouTube iframe and plays the video
  - Subscribe opens the newsletter Google Form; submitting creates a response in the Form's sheet
  - Footer links /terms.html and /privacy.html load correctly

## Notes & next steps
- If you want auto-submission to Google Forms, provide the newsletter Google Form URL (I can derive entry IDs and wire the auto-post).
- If you want programmatic collection (Formspree/ConvertKit/Mailchimp), provide the endpoint details and I'll switch the form to POST JSON.
- If you want me to run the smoke test and finish Pages setup, I can attempt to add the workflow and enable Pages but I need repository write/admin permission (I will ask before changing repo settings).

## Contact
- Maintainer: Realestatecode
- Phone: 310.728.7974

End of NOTES - SETUP
