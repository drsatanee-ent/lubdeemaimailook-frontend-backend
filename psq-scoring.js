/*
 * Thai SRBD-PSQ scoring utility for a non-clinical demonstration.
 * Source PDF: Thai_SRBD_PSQ_Form.pdf (user-provided, 22 items).
 * PSQ screen-positive cutoff: >= 0.33 as specified in the supplied PDF.
 * IMPORTANT: the 0.20 intermediate boundary is an UNVALIDATED UI
 * demonstration placeholder; it is NOT a clinical threshold.
 */
(function (root, factory) {
  var scoring = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = scoring;
  if (root) root.PSQScoring = scoring;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  var COUNT = 22;
  var SCREEN_POSITIVE = 0.33;
  var DEMO_INTERMEDIATE = 0.20; // Never treat as clinically validated.

  function calculate(answers) {
    if (!Array.isArray(answers) || answers.length !== COUNT) {
      throw new Error("Expected precisely 22 questionnaire answers");
    }
    var yes = 0, no = 0, unknown = 0, pending = 0;
    answers.forEach(function (answer) {
      if (answer === "yes") yes++;
      else if (answer === "no") no++;
      else if (answer === "unknown") unknown++;
      else if (answer === null || answer === undefined || answer === "") pending++;
      else throw new Error("Invalid questionnaire response");
    });
    var selected = COUNT - pending;
    var known = yes + no;
    // The PDF formula is Yes / (22 - Unknown), provided every item
    // has been explicitly answered yes, no, or unknown.
    var score = pending === 0 && known > 0 ? yes / (COUNT - unknown) : null;
    var screen = score === null ? "unavailable" : (score >= SCREEN_POSITIVE ? "positive" : "negative");
    var demoTier = "unclassified";
    if (score !== null && unknown === 0) {
      if (score >= SCREEN_POSITIVE) demoTier = "high";
      else if (score >= DEMO_INTERMEDIATE) demoTier = "moderate";
      else demoTier = "low";
    }
    var redFlag = answers[3] === "yes" || answers[4] === "yes" || answers[5] === "yes";
    return {
      total: COUNT, selected: selected, yes: yes, no: no,
      unknown: unknown, pending: pending, known: known,
      score: score, cutoff: SCREEN_POSITIVE,
      screen: screen, demoTier: demoTier,
      redFlag: redFlag, demoBoundary: DEMO_INTERMEDIATE
    };
  }
  return { calculate: calculate, COUNT: COUNT, SCREEN_POSITIVE: SCREEN_POSITIVE,
    DEMO_INTERMEDIATE: DEMO_INTERMEDIATE };
});
