# Running the browser review

Run `npm run review:browser` from the project directory. It starts a dedicated local Astro server on an available port, launches Playwright Chromium, captures desktop (1440 × 900) and mobile (390 × 844, touch emulation) views, and closes its browser and server afterward. It leaves any existing development server alone.

The check covers home, work, contact, the menu toggle, and opening and closing every project dialog. It captures the beginning of each About scene. It fails on uncaught browser JavaScript errors and local HTTP responses of 400 or higher. This is a browser readiness check and a source of review evidence; it does not measure real visitor sentiment or establish complete accessibility or device compatibility.

Outputs are in `artifacts/browser-review/` (ignored by Git):

- Viewport screenshots for each page, menu, About scene, and project dialog.
- `results.json`: timestamp, completed checks, and errors.
- `server.log`: Astro output, including startup failures.

Each run replaces matching output files. Check the timestamp and errors in `results.json` before treating screenshots as a successful run.

## Why earlier attempts failed

The original Chromium installation lacked system libraries. After those were installed, Chromium hit an execution sandbox restriction. Astro also could not open its local port in that sandbox (`listen EPERM: operation not permitted 127.0.0.1:4321`).

Astro detects agent sessions and automatically launches its development server in the background. That hid the underlying port error in `.astro/dev.log`, while the command printed only `Dev server process exited before becoming ready.`

The browser check uses Astro's `--ignore-lock` option to keep its server in the foreground and capture the actual error. In Codex's restricted environment, run this command with approval outside the sandbox: both local port binding and Chromium require it. The script itself does not bypass permissions.

For an interactive local server with direct diagnostics, use:

```sh
npm run dev -- --host 127.0.0.1 --ignore-lock
```

For a fresh machine, install project dependencies and the matching browser:

```sh
npm ci
npx playwright install chromium
```

If Chromium reports missing Linux libraries, run `npx playwright install-deps chromium` in a terminal where administrator authentication is available. Restarting Astro cannot resolve missing browser libraries.

The installed Astro React integration declares Node >=22.23.4, while the environment used during diagnosis had Node 22.22.1 and npm 9.2.0. Astro also declares npm >=9.6.5. These produced installation warnings, but were not the observed cause of the startup failures; the browser check ran successfully with the current runtime. Use versions satisfying the dependencies' engine requirements when setting up a fresh environment.
