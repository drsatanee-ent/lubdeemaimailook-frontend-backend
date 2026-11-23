# Manual Testing Guide — Static Demo

**Status:** Test plan, not a completed test report.  
**Test data:** Synthetic values only. Never use real patient information.

| ID | Scenario | Procedure | Expected result |
|---|---|---|---|
| T01 | Initial page | Open `index.html` | Thai UI, five risk factors, demo warning visible |
| T02 | Empty form | Submit without project code/age | Browser prevents submission |
| T03 | Synthetic sample | Click **เติมตัวอย่าง Demo** | Sample code, age, and factor values populate |
| T04 | Incomplete factors | Leave at least one factor **ยังไม่ประเมิน** | Completeness less than 5/5; no Low Risk label |
| T05 | Complete factors | Mark every factor Present or Absent | Completeness 5/5; no risk category generated |
| T06 | Save record | Confirm demo-only checkbox and submit | Record appears in history |
| T07 | Reload | Reload same browser profile | Saved demo record remains in localStorage |
| T08 | View details | Click record detail button | Selected factor states shown |
| T09 | Export | Click **Export JSON** | JSON file downloads with demo records |
| T10 | Delete one | Delete a selected record and confirm | Selected record disappears |
| T11 | Delete all | Click delete-all and confirm | History and counters reset |
| T12 | Cancel deletion | Cancel confirmation dialog | Records remain |
| T13 | Mobile viewport | Resize browser to narrow width | Layout stacks and controls remain usable |
| T14 | Input escaping | Use a synthetic code containing HTML-like text | Record display renders as text, not executable markup |
| T15 | Privacy | Inspect browser network requests while saving | No assessment data sent to an application backend |

## Recording results
For each test, record: date, browser/version, test ID, Pass/Fail/Blocked, actual result, issue link, and reviewer. Do not label a test **Pass** until actually executed.

## Not covered by this plan
Automated testing, accessibility certification, penetration testing, backend/database integration, clinical accuracy, and regulatory compliance. These require separate evaluation.
