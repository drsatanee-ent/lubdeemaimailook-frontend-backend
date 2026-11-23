# Thai SRBD-PSQ Screening Module

## Status
Feature implementation for demo/portfolio purposes; requires clinical review and appropriate authorization of the questionnaire wording before real-world deployment.

## Questionnaire
22 Thai questions in three sections, transcribed from the user-supplied `Thai_SRBD_PSQ_Form.pdf`:
- Snoring and breathing (1–9)
- Daytime behavior and growth (10–15)
- Inattention and hyperactivity (16–22)

Each response is **Yes**, **No**, or **Don't know**; an unanswered question is represented separately.

## Calculation
For explicitly answered questionnaires with at least one known response:

`PSQ score = Yes / (22 − Don't know) = Yes / (Yes + No)`

Per the uploaded form, the two screening groups use the **0.33** threshold:
- **Low screening risk / below cutoff:** score < 0.33
- **High screening risk / positive screen:** score ≥ 0.33

There is **no medium category**. The app labels an assessment **Unclassified** if it contains any unanswered or Don't know responses; with Don't know responses, a numeric score may be shown as informational according to the supplied formula, but the UI does not assign low/high risk. This is a conservative product rule, not a separate validated PSQ scoring criterion.

## Safeguards
- Suspicious breathing / observed apnea / gasping responses prompt a clinical consultation warning regardless of overall score.
- Negative screening does not rule out pediatric OSA.
- A positive screening result does not diagnose OSA or quantify severity.
- Use synthetic data only, never actual child or patient data.
- No questionnaire results are saved or transmitted by this module.
- The displayed risk-factor odds ratios in the original five-item module are separate from PSQ and are **not** used for PSQ scoring.

## Next steps
- Confirm the rights and exact wording of the translated questionnaire.
- Clinician review of all 22 prompts and relevance for intended age groups.
- Review the completeness safeguard, cutoff messaging, and clinical referral language.
- Perform usability, accessibility, and automated/browser testing.
- Validate the full clinical workflow before using it with patients.

## Tests
`node --test tests/psq-scoring.test.cjs`
