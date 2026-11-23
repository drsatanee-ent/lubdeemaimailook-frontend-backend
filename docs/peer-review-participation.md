# Peer Review Participation — Review Request and Evidence Log

**Project:** Lub Dee Mai Look? — Pediatric OSA Screening Application  
**Status:** Review requested / awaiting independent feedback. **No completed peer review is claimed.**

## Purpose
Demonstrate a transparent GitHub pull-request review workflow, with a documented checklist, reviewer comments, follow-up commits, and an eventual review outcome. This is a *software/documentation peer review*, not clinical journal peer review.

## Review scope
Please inspect:
1. **Clinical safety communication** — Does the interface clearly say this is a prototype, not a diagnosis? Are OR values kept separate from any scoring model?
2. **Missing data** — Are `present`, `absent`, and `unknown` kept distinct? Is a low-risk label avoided?
3. **Privacy** — Does the app warn against real patient data? Is browser localStorage accurately described?
4. **Functional correctness** — Try the sample record, form validation, saving, reloading, deleting, and exporting synthetic data.
5. **Accessibility and usability** — Thai wording, mobile layout, keyboard access, and visible status messages.
6. **Documentation** — Compare README, technical documentation, testing guide, and actual code.
7. **Security** — Identify unsafe assumptions and document unresolved issues. Do not enter patient data.

## Review instructions
- Open the linked Pull Request and choose **Files changed**.
- Leave specific comments with file paths and suggested improvements.
- If available, choose **Review changes** → Comment / Request changes / Approve.
- The author should respond to findings with a follow-up commit and link the resolution.
- Do not mark a review complete until a real reviewer has submitted feedback.

## Review log (fill after actual review)
| Date | Reviewer (GitHub handle) | Review link | Findings | Resolution commit | Outcome |
|---|---|---|---|---|---|
| Pending | Not yet assigned | Pending | Not reviewed | Pending | Pending |

## Suggested review report format
**Summary:**  
**What was examined:**  
**Strengths:**  
**Major concerns:**  
**Minor suggestions:**  
**Tests personally performed:**  
**Recommendation:** Comment / Request changes / Approve

## Portfolio evidence criteria
A completed Peer Review Participation entry should include the PR URL, reviewer name/handle (with permission if appropriate), dated review comments, changes addressing the feedback, and final review outcome. Opening a PR alone is **review preparation**, not proof of participation by an independent reviewer.
