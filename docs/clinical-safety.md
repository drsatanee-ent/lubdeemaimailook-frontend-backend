# Clinical safety notes

## Intended use
Demonstration of a structured data-entry workflow for the pediatric OSA screening concept. It is not a diagnostic device and must not be used to make clinical or surgical decisions.

## Risk factors represented
The prototype displays the five risk factors and odds ratios from the project concept:
- Tonsillar hypertrophy — OR 3.55 (Johnson et al., 2022)
- Family history of OSA — OR 3.03 (Szily et al., 2019)
- Lower respiratory tract infection / RSV history — OR 2.59 (Gutierrez et al., 2021)
- Obesity — OR 1.74 (Andersen et al., 2019)
- Adenoid hypertrophy — OR 1.63 (Johnson et al., 2022)

These OR values are displayed as literature context only. They are not validated weights for an individual prediction model and are not combined into a score.

## Missing-data safeguard
Each item has three distinct states: present, absent, and not assessed. Only present/absent count toward completeness. The app never converts an unanswered item into absent and does not label an incomplete assessment as low risk.

## Output limitation
No risk category, probability, diagnosis, referral instruction, or treatment recommendation is generated. A complete form only means the five listed data items have been recorded. It does not mean the child is low risk or free of OSA.

## Required work before clinical use
- Confirm factor definitions and clinical relevance with pediatric sleep/ENT experts.
- Develop and externally validate a scoring model and thresholds in an appropriate population.
- Establish clinical governance, intended-user workflow, escalation rules, and human review.
- Implement authentication, authorization, secure server-side storage, consent and privacy processes, audit trails, backups, and incident response.
- Complete security testing, privacy review, usability testing, and institutional approvals as applicable.

Use synthetic data only in this static demo.
