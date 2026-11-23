/*
 Thai SRBD-PSQ (22 items), binary screening prototype.
 Source: Thai_SRBD_PSQ_Form.pdf supplied by the user.
 Cutoff >= 0.33 is described in the supplied form.
 Neither group is a diagnosis or an OSA severity grade.
*/
(function (root, factory) {
  var api=factory();
  if (typeof module!=="undefined" && module.exports) module.exports=api;
  if (root) root.PSQScoring=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  var COUNT=22, CUTOFF=0.33;
  function calculate(answers){
    if(!Array.isArray(answers)||answers.length!==COUNT) throw new Error("Expected precisely 22 questionnaire answers");
    var yes=0,no=0,unknown=0,pending=0;
    answers.forEach(function(a){
      if(a==="yes") yes++;
      else if(a==="no") no++;
      else if(a==="unknown") unknown++;
      else if(a==null||a==="") pending++;
      else throw new Error("Invalid questionnaire response");
    });
    var known=yes+no;
    // Formula from the supplied form: "yes" / (22 - "don't know").
    // Incomplete/unanswered forms are not scored.
    var score=pending===0 && known>0 ? yes/known : null;
    // Conservative product safeguard: do not assign a low or high category
    // when "don't know" responses remain. The numeric PSQ score may still
    // be shown as information for forms with explicitly selected answers.
    var classification=score===null||unknown>0?"unclassified":(score>=CUTOFF?"high":"low");
    var screen=score===null?"unavailable":(score>=CUTOFF?"positive":"negative");
    return {total:COUNT,selected:COUNT-pending,yes:yes,no:no,unknown:unknown,pending:pending,known:known,score:score,cutoff:CUTOFF,classification:classification,screen:screen,redFlag:answers[3]==="yes"||answers[4]==="yes"||answers[5]==="yes"};
  }
  return {calculate:calculate,COUNT:COUNT,CUTOFF:CUTOFF};
});
