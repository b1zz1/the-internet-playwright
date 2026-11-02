# the-internet-playwright

End-to-end tests for [the-internet](https://the-internet.herokuapp.com), a practice site for UI test automation, written with [Playwright](https://playwright.dev) and TypeScript.

## What's covered

| Spec                                                                     | Scenarios                                                                            |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| [`tests/home.spec.ts`](tests/home.spec.ts)                               | Home page shows the "Welcome to the-internet" heading                                |
| [`tests/add_remove_elements.spec.ts`](tests/add_remove_elements.spec.ts) | Navigating from the home page, adding and deleting an element, adding three elements |

Tests run against Chromium (Desktop Chrome). Firefox, WebKit, mobile and branded-browser projects are stubbed out in [`playwright.config.ts`](playwright.config.ts) and can be enabled by uncommenting them.

## Requirements

- Node.js 20.12 or newer (the config uses `process.loadEnvFile`)
- npm

## Setup

```bash
git clone https://github.com/b1zz1/the-internet-playwright.git
cd the-internet-playwright
npm ci
npx playwright install --with-deps chromium
```

Optionally create a `.env` file from the example:

```bash
cp .env.example .env
```

| Variable   | Default                              | Purpose                                                      |
| ---------- | ------------------------------------ | ------------------------------------------------------------ |
| `BASE_URL` | `https://the-internet.herokuapp.com` | Site under test, e.g. a locally hosted copy of the-internet  |
| `CI`       | unset                                | When set: 2 retries, 1 worker, and `test.only` fails the run |

`.env` is optional and is ignored by git. Note that `.env.example` sets `CI=true`; remove that line if you want local runs to be fully parallel with no retries.

## Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm test`             | Run all tests headlessly              |
| `npm run test:ui`      | Open Playwright's interactive UI mode |
| `npm run typecheck`    | Type-check with `tsc` (no emit)       |
| `npm run lint`         | Lint with ESLint                      |
| `npm run lint:fix`     | Lint and auto-fix                     |
| `npm run format`       | Format with Prettier                  |
| `npm run format:check` | Check formatting without writing      |

Useful Playwright flags can be passed through `npm test --`, for example:

```bash
npm test -- tests/home.spec.ts   # run a single file
npm test -- --headed             # watch the browser
npx playwright show-report       # open the last HTML report
```

## Reports and traces

Results are written to `playwright-report/` as an HTML report. Traces are recorded on the first retry of a failing test (`trace: "on-first-retry"`), so they're only captured when retries are enabled, i.e. with `CI` set. Open a trace from the report or with `npx playwright show-trace <path-to-trace.zip>`.

## Continuous integration

[`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs the suite on every push and pull request to `main`/`master` using the latest Node LTS. The HTML report is uploaded as a `playwright-report` artifact and kept for 30 days.

You can also run it on demand from **Actions → Playwright Tests → Run workflow**. The `publish_report` checkbox (ticked by default) controls whether that run publishes its report to GitHub Pages.

### Hosted report

The latest HTML report is published to <https://b1zz1.github.io/the-internet-playwright/>:

- pushes to `main`/`master` always publish, manual runs publish only when `publish_report` is ticked, and pull requests never publish
- each publish overwrites the previous report, including re-runs
- the report is published even when tests fail
- [`.github/workflows/expire-report.yml`](.github/workflows/expire-report.yml) runs hourly and replaces a report older than 24 hours with a "No report available" page (it can also be run manually)

One-time setup: in the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. By default, the `github-pages` environment only accepts deployments from the default branch, so manual runs on other branches will run the tests but fail to deploy.

## Project structure

```text
.
├── .github/workflows/playwright.yml   # CI pipeline
├── .github/workflows/expire-report.yml # Takes the hosted report down after 24h
├── tests/                             # Playwright specs
├── playwright.config.ts               # Test runner configuration
├── eslint.config.mjs                  # ESLint (flat config) + Prettier compat
├── .prettierrc.json                   # Prettier settings
├── tsconfig.json                      # TypeScript settings for type-checking
└── .env.example                       # Example environment variables
```

## License

[MIT](LICENSE) © 2026 Eduardo Bizzi Martins
