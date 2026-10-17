# AcadHomepage theme source

Upstream: https://github.com/RayeRen/acad-homepage.github.io

Imported revision: `2cc1577eeaf2f74dede6d016a70722dbd409ea2f`.

The reference homepage https://heatingma.github.io/ uses a fork of this template.

- `styles/` contains the upstream Sass partials and their original notices.
- `main.scss` is the upstream Sass entry point with Jekyll front matter removed and unused Font Awesome imports omitted. This site uses inline SVG icons.
- The HTML templates adapt the upstream `default`, `masthead`, and `author-profile` structure for bilingual data and LiquidJS rendering.
- Project-specific responsive behavior and content styling live in `src/site.scss`; the imported partials remain separate.

The theme is MIT licensed; the upstream license is included here and at the project root. The upstream theme incorporates work from Minimal Mistakes and Academic Pages, with original notices retained in the source. Its vendored Sass libraries retain their license headers.
