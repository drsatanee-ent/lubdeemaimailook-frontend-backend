# Lub Dee Mai Look? — Pediatric OSA Screening Prototype

A Thai-language, browser-based prototype for structured pediatric obstructive sleep apnea (OSA) risk-factor data collection.

## Live prototype
After enabling GitHub Pages with **Settings → Pages → Build and deployment → Source: GitHub Actions**, the app will be available at:

`https://drsatanee-ent.github.io/lubdeemaimailook-frontend-backend/`

The first deployment may take a few minutes after the workflow completes.

## What this prototype does
- Captures a project code and age in months (no child's name is requested).
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
