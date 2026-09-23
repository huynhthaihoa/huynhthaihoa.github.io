# Hoa Huynh Portfolio & Blog

This repository hosts the personal portfolio and technical blog for Hoa Huynh, a computer vision engineer and AI researcher.

It is a static website published through GitHub Pages, with multilingual pages for English, Vietnamese, and Korean, plus an archive of technical notes, case studies, publications, and project highlights.

## Overview

- Portfolio landing page with biography, experience, education, skills, and contact links
- Research blog covering computer vision, deep learning, depth estimation, geometry, and AI engineering
- Project case studies with detailed write-ups for real-world computer vision work
- Multilingual site variants for English, Vietnamese, and Korean
- Responsive dark/light theme with a lightweight JavaScript UI layer
- No application server or build pipeline required for local preview

## Site structure

```text
.
├── index.html
├── index-vi.html
├── index-ko.html
├── blog.html
├── blog-vi.html
├── blog-ko.html
├── projects.html
├── projects-vi.html
├── projects-ko.html
├── styles.css
├── script.js
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── LICENSE
├── README.md
├── .claude/
│   └── CLAUDE.md
├── assets/
│   ├── profile.jpg
│   ├── Resume_HoaHuynh.pdf
│   ├── apple-touch-icon.png
│   ├── blog/
│   ├── projects/
│   └── certifications/
└── public content and media assets used across the site
```

## Tech stack

This is a static HTML/CSS/JS site, not a Node or Ruby/Jekyll app in its current form.

- HTML for page structure
- CSS for layouts, theming, responsive behavior, and blog presentation
- JavaScript for:
  - light/dark theme toggle
  - mobile navigation menu
  - scroll-based fade-in effects
  - active nav highlighting
  - expandable certification sections
- KaTeX via jsDelivr for mathematical notation in technical articles
- GitHub Pages for hosting and deployment

## Local development

Because this repository is a static site, local development is simple:

```bash
git clone https://github.com/huynhthaihoa/huynhthaihoa.github.io.git
cd huynhthaihoa.github.io
python3 -m http.server 8000
```

Then open:

- http://localhost:8000/
- http://localhost:8000/index-vi.html
- http://localhost:8000/index-ko.html
- http://localhost:8000/blog.html
- http://localhost:8000/projects.html

## Deployment

This repository is designed for GitHub Pages hosting.

1. Push changes to the default branch or configured Pages branch.
2. Ensure GitHub Pages is enabled for the repository.
3. Use the repository root as the site source if configured that way.
4. The generated static site is served directly without a build step.

## Publishing workflow

The current workflow is intentionally lightweight:

- Edit HTML, CSS, or JS directly in the repository
- Refresh the local preview with a static file server
- Commit and push changes
- GitHub Pages serves the updated site automatically

This makes the site easy to maintain for content updates, portfolio changes, and blog posts without introducing toolchain complexity.

## Notes

- The repository originally included a legacy Jekyll Now template README, but the live project is now a hand-built static site.
- The site intentionally contains localized versions of the portfolio and project pages, making it easy to present the same material in multiple languages.
- Media-heavy content (project screenshots, illustrations, diagrams, certifications) is stored under `assets/`.

## License

See [LICENSE](LICENSE) for details.

## Contact

For professional inquiries or collaboration opportunities:

- Email: huynhthaihoa1995@gmail.com
- GitHub: https://github.com/huynhthaihoa
- LinkedIn: https://linkedin.com/in/huynhthaihoa/
- Google Scholar: https://scholar.google.com/citations?user=abuFJTkAAAAJ&hl=en
