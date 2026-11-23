# Lub Dee Mai Look? — Pediatric OSA Screening Prototype

A Thai-language, browser-based prototype for structured pediatric obstructive sleep apnea (OSA) risk-factor data collection.

## Live prototype
GitHub Pages is deployed at:

`https://drsatanee-ent.github.io/lubdeemaimailook-frontend-backend/`

The first deployment may take a few minutes after the workflow completes.

## What this prototype does
- Collects age in years without a name or Demo ID.
- Records five literature-derived risk factors as **Present / Absent / Not assessed**.
- Shows data completeness and prevents incomplete data from being interpreted as “low risk”.
- Saves demo assessments in the current browser's local storage.
- Lists saved assessments and supports JSON export and deletion.
- Includes a synthetic demo record.

## Clinical safety boundary
**This is a prototype for demonstration and workflow discussion, not a validated clinical decision-support tool.** The odds ratios shown beside risk factors are literature context only. They are not added, multiplied, or converted into a score. No Low / Intermediate / High risk category or treatment recommendation is generated because a validated scoring model and thresholds have not been supplied and clinically approved.

The app is a screening-support concept, not a diagnosis. Clinical assessment and decisions remain the responsibility of qualified clinicians.

## Data and privacy
- This static version stores data only in the browser's local storage on the device where it is entered.
- It does not connect to a server or database and does not transmit entries to GitHub.
- Use synthetic/demo data only. Do not enter identifiable patient or health information.
- Clearing browser storage or using another browser/device may remove or hide saved entries.

## Run locally
Open `index.html` in a modern browser. No build step or server is required.

## Tech stack
HTML5, CSS3, vanilla JavaScript, browser localStorage, GitHub Pages (static hosting).

## Planned next steps
1. Clinical review of the risk-factor set and data dictionary.
2. Define and validate the scoring model and thresholds before showing risk categories.
3. Add authenticated backend access, role-based authorization, consent records, audit logs, secure hosting, retention/deletion controls, and security testing before any real-world data use.
4. Conduct usability testing with intended users.

## References carried over from the project concept
- Andersen IG, Holm JC, Homøe P. (2019). Obstructive sleep apnea in children and adolescents with and without obesity. *European Archives of Oto-Rhino-Laryngology*, 276(3), 871–878.
- Gutierrez MJ, et al. (2021). Lower respiratory tract infections in early life are associated with obstructive sleep apnea diagnosis during childhood in a large birth cohort. *Sleep*, 44(12), 1–10.
- Johnson C, et al. (2022). Obstructive sleep apnea in underweight children. *Otolaryngology–Head and Neck Surgery*, 167(3), 566–572.
- Savini S, et al. (2019). Assessment of obstructive sleep apnoea (OSA) in children: An update. *Acta Otorhinolaryngologica Italica*, 39(5), 289–297.
- Szily M, et al. (2019). Genetic influences on the onset of obstructive sleep apnoea and daytime sleepiness: A twin study. *Respiratory Research*, 20(1), 125.

---
**Project status:** Working static prototype source. GitHub Pages deployment requires enabling the Pages workflow in repository settings. No security audit, clinical validation, or production readiness is claimed.

## Technical documentation and Git
- [Technical documentation](docs/technical-documentation.md) — architecture, components, data flow, and setup
- [Git workflow](docs/git-workflow.md) — branching, commits, pull requests, and deployment
- [Manual testing guide](docs/testing-guide.md) — test scenarios and expected results (not a completed test report)

## Thai SRBD-PSQ 22-item questionnaire (feature branch)
This branch adds a Thai-language form based on the supplied Thai_SRBD_PSQ_Form.pdf with Yes / No / Don't know responses. The calculation is **Yes / (Yes + No)** when all 22 items have an explicit response and at least one is known. It corresponds to the form's **Yes / (22 − Don't know)** formula.

- **Low screening risk:** score < 0.33.
- **High screening risk (positive screen):** score ≥ 0.33.
- **Unclassified:** unanswered responses, all Don't know, or any Don't know (additional conservative UI policy; an informational score may still display).
- **No medium category.** The score is a screening indicator and is **not** OSA severity, a diagnosis, or a substitute for clinical assessment or polysomnography.
- The questionnaire is not persisted or transmitted; demo-only synthetic data are required.

Run automated scoring tests with `node --test tests/psq-scoring.test.cjs`. See [PSQ implementation notes](docs/psq-scoring-method.md).

**The Thai SRBD-PSQ module is included in the deployed static prototype.** No clinical validation or production readiness is claimed.

## Installable PWA (iPhone / Android)
The site includes a web app manifest, offline app-shell service worker, and custom icon artwork. GitHub Pages generates PNG icons at deployment from the original design source `scripts/generate-icons.py`.

- **iPhone:** Open the live site in Safari → Share → **Add to Home Screen** → Add.
- **Android:** Open the live site in Chrome → menu (⋮) → **Install app** or **Add to Home screen** (availability varies by browser/device).
- **Desktop:** Chrome or Edge may show an Install icon in the address bar.

PWA installation is not App Store or Play Store distribution. The offline cache includes only the static app shell; questionnaire entries are not cached by the service worker. The existing five-factor demo may store **synthetic-only** records in browser localStorage. PWA data/storage can be different from the browser tab and may be cleared by the device.

**Offline caveat:** Offline operation is available after a successful first online load and icon cache installation. Do not rely on offline access for clinical care. Changes may require closing and reopening the installed app after a new deployment.

### PWA files
- `manifest.webmanifest` — installation name, display mode, icons, and scope
- `service-worker.js` — app-shell offline cache
- `icons/app-icon.svg` — original source artwork
- `scripts/generate-icons.py` — builds 192px, 512px, maskable, and Apple touch PNGs
- `.github/workflows/pages.yml` — generates PNGs and deploys them with GitHub Pages
