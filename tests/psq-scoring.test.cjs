const test=require("node:test");
const assert=require("node:assert/strict");
const {calculate}=require("../psq-scoring.js");
const allNo=()=>Array(22).fill("no");

test("zero yes is low",()=>{
 const r=calculate(allNo());assert.equal(r.score,0);assert.equal(r.classification,"low");
});
test("seven yes of 22 is low",()=>{
 const a=allNo();a.fill("yes",0,7);assert.equal(calculate(a).classification,"low");
});
test("eight yes of 22 is high",()=>{
 const a=allNo();a.fill("yes",0,8);assert.equal(calculate(a).classification,"high");
});
test("unknown answers can yield a numeric positive screen but classification is withheld",()=>{
 const a=Array(22).fill("unknown");a.fill("yes",0,11);
 a.fill("no",11,20);const r=calculate(a);
 assert.equal(r.score,11/20);assert.equal(r.classification,"unclassified");assert.equal(r.screen,"positive");
});
test("don't know answer excludes denominator but prevents risk category",()=>{
 const a=allNo();a[0]="unknown";a[1]="yes";
 const r=calculate(a);assert.equal(r.score,1/21);assert.equal(r.classification,"unclassified");
});
test("pending answers block scoring",()=>{
 const a=allNo();a[5]=null;const r=calculate(a);
 assert.equal(r.score,null);assert.equal(r.classification,"unclassified");
});
test("all unknown cannot be scored",()=>{
 const r=calculate(Array(22).fill("unknown"));assert.equal(r.score,null);assert.equal(r.classification,"unclassified");
});
test("red flag independent of PSQ score",()=>{
 const a=allNo();a[4]="yes";const r=calculate(a);assert.equal(r.redFlag,true);assert.equal(r.classification,"low");
});
test("validations reject wrong size or response",()=>{
 assert.throws(()=>calculate(["yes"]),/22/);
 const a=allNo();a[0]="maybe";assert.throws(()=>calculate(a),/Invalid/);
});
