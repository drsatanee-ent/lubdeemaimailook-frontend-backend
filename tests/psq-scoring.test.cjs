const test = require("node:test");
const assert = require("node:assert/strict");
const { calculate } = require("../psq-scoring.js");
const blank = () => Array(22).fill("no");
test("0 of 22 yes is negative and low demo tier", () => {
 const r=calculate(blank()); assert.equal(r.score,0); assert.equal(r.screen,"negative"); assert.equal(r.demoTier,"low");
});
test("four yes answers is low demonstration tier", () => {
 const a=blank(); a.fill("yes",0,4); const r=calculate(a);
 assert.equal(r.yes,4); assert.equal(r.screen,"negative"); assert.equal(r.demoTier,"low");
});
test("five yes answers is moderate demo tier but still screen-negative", () => {
 const a=blank(); a.fill("yes",0,5); const r=calculate(a);
 assert.equal(r.demoTier,"moderate"); assert.equal(r.screen,"negative");
});
test("eight yes of 22 is screen positive and high demo tier", () => {
 const a=blank(); a.fill("yes",0,8); const r=calculate(a);
 assert.equal(r.yes,8); assert.equal(r.screen,"positive"); assert.equal(r.demoTier,"high");
});
test("seven yes of 22 is still below the 0.33 cutoff", () => {
 const a=blank(); a.fill("yes",0,7); const r=calculate(a);
 assert.equal(r.screen,"negative");
});
test("unknown answers are excluded from the denominator but block demo risk tiers", () => {
 const a=blank(); a[0]="unknown"; a[1]="unknown"; a[2]="yes"; const r=calculate(a);
 assert.equal(r.score,1/20); assert.equal(r.unknown,2); assert.equal(r.demoTier,"unclassified");
});
test("unanswered items block score and classification", () => {
 const a=blank(); a[2]=null; const r=calculate(a);
 assert.equal(r.selected,21); assert.equal(r.score,null); assert.equal(r.screen,"unavailable"); assert.equal(r.demoTier,"unclassified");
});
test("all unknown responses do not permit divide by zero", () => {
 const r=calculate(Array(22).fill("unknown"));
 assert.equal(r.score,null); assert.equal(r.demoTier,"unclassified");
});
test("observed apnea flags follow-up independent of the score", () => {
 const a=blank(); a[4]="yes"; const r=calculate(a);
 assert.equal(r.redFlag,true); assert.equal(r.demoTier,"low");
});
test("invalid length and unknown response values are rejected", () => {
 assert.throws(()=>calculate(["yes"]),/22/);
 const a=blank(); a[0]="maybe"; assert.throws(()=>calculate(a),/Invalid/);
});
