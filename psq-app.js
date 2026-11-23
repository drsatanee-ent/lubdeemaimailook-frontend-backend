/* Thai 22-item SRBD-PSQ form, adapted solely from the user's uploaded form.
   Prototype demonstration only — not clinically validated or approved for real patient use. */
(function () {
  "use strict";
  var mount = document.getElementById("psqMount");
  var scoring = window.PSQScoring;
  if (!mount || !scoring) return;

  var domains = [
    {
      title: "หมวดที่ 1: อาการนอนกรนและการหายใจขณะหลับ",
      subtitle: "Snoring & Breathing · ข้อ 1–9",
      questions: [
        "ลูกนอนกรนเสียงดังบ่อยครั้ง (มากกว่าครึ่งหนึ่งของเวลาที่หลับ)",
        "ลูกนอนกรนเสียงดังตลอดเวลาในขณะที่หลับ",
        "ลูกนอนกรนเสียงดังมากจนได้ยินเสียงชัดเจน (แม้จะปิดประตูห้อง)",
        "ลูกมีอาการหายใจลำบาก หายใจสะดุด หรือหายใจติดขัดขณะหลับ",
        "ผู้ปกครองเคยเห็นลูกมีอาการหยุดหายใจขณะหลับ",
        "ลูกมีอาการสะดุ้งตื่น ผวา หรือพยายามสูดหายใจเฮือกใหญ่ขณะหลับ",
        "ลูกชอบนอนอ้าปาก หรือหายใจทางปากขณะหลับ",
        "ลูกตื่นมาพร้อมกับอาการปากแห้งในตอนเช้า",
        "ลูกมีอาการปัสสาวะรดที่นอนหลังจากที่เคยควบคุมได้แล้ว (หรือปัสสาวะบ่อยผิดปกติกลางดึก)"
      ]
    },
    {
      title: "หมวดที่ 2: อาการตอนกลางวัน พฤติกรรม และการเจริญเติบโต",
      subtitle: "Daytime Behavior & Growth · ข้อ 10–15",
      questions: [
        "ลูกตื่นนอนมาด้วยความยากลำบากในตอนเช้า (ปลุกยากมาก)",
        "ลูกมีอาการง่วงนอนมาก หรือดูเพลีย ๆ ในเวลากลางวัน",
        "ครูที่โรงเรียนหรือผู้ดูแลเคยบอกว่าลูกดูง่วงนอนในเวลากลางวัน",
        "ลูกตื่นนอนมาแล้วมักบ่นว่าปวดศีรษะในตอนเช้า",
        "ลูกหยุดเจริญเติบโตตามวัยปกติ (น้ำหนักหรือส่วนสูงไม่เพิ่มขึ้นตามเกณฑ์)",
        "ลูกมีภาวะน้ำหนักเกินเกณฑ์มาตรฐาน หรือมีภาวะอ้วน"
      ]
    },
    {
      title: "หมวดที่ 3: สมาธิและพฤติกรรมกระสับกระส่าย",
      subtitle: "Inattention & Hyperactivity · ข้อ 16–22",
      questions: [
        "ลูกไม่ค่อยฟังเวลาคนอื่นพูดด้วย หรือดูเหม่อลอย",
        "ลูกมักทำสิ่งของที่จำเป็นสำหรับการเรียนหรือกิจกรรมหายอยู่บ่อย ๆ",
        "ลูกวอกแวกง่าย ขาดสมาธิในการทำสิ่งใดสิ่งหนึ่งให้สำเร็จ",
        "ลูกนั่งไม่สุข ชอบขยับมือขยับเท้า หรือลุกลี้ลุกลนลุกจากที่นั่งบ่อย ๆ",
        "ลูกชอบวิ่งไปมาหรือปีนป่ายสิ่งต่าง ๆ มากเกินไปอย่างไม่รู้จักเหนื่อย",
        "ลูกมักพูดมากเกินไป หรือชอบพูดแทรกเวลาผู้อื่นกำลังสนทนา",
        "ลูกมีปัญหาในการรอคิว หรือไม่สามารถรอตามลำดับขั้นตอนได้"
      ]
    }
  ];

  mount.innerHTML =
    '<section class="psq-section" aria-labelledby="psqTitle">' +
    '<div class="psq-head">' +
    '<span class="psq-kicker">SCREENING MODULE · DEMO</span>' +
    '<h2 id="psqTitle">แบบสอบถามการหายใจขณะหลับในเด็ก (Thai SRBD-PSQ)</h2>' +
    '<p>แบบสอบถาม 22 ข้อจากเอกสารที่แนบ · อาการและพฤติกรรมในช่วง <strong>1 เดือนที่ผ่านมา</strong></p>' +
    '<div class="psq-warning"><strong>สำหรับทดลองด้วยข้อมูลสมมติเท่านั้น</strong> การจัดระดับ 3 ขั้นเป็นการสาธิต ยังไม่ใช่เกณฑ์คัดกรอง 3 ระดับที่ได้รับการตรวจสอบทางคลินิก และไม่สามารถใช้วินิจฉัย OSA หรือกำหนดความรุนแรงได้</div>' +
    '</div>' +
    '<form id="psqForm" class="psq-form">' +
    '<div class="psq-meta"><label for="psqRespondent">ผู้ให้ข้อมูล (ไม่ระบุชื่อ)</label><select id="psqRespondent"><option value="parent">บิดา/มารดา</option><option value="guardian">ผู้ดูแลเด็ก</option><option value="other">อื่น ๆ</option></select></div>' +
    '<div class="psq-progress-wrap"><span id="psqCount">ตอบแล้ว 0/22 ข้อ</span><span id="psqKnown">ประเมินได้ 0 ข้อ</span><div class="psq-track" aria-hidden="true"><span id="psqProgress"></span></div></div>' +
    '<div id="psqQuestions"></div>' +
    '<label class="psq-ack"><input type="checkbox" id="psqSynthetic" required> ฉันยืนยันว่าใช้ข้อมูลสมมติเท่านั้น และเข้าใจว่าไม่ใช่ผลวินิจฉัยโรค</label>' +
    '<div class="psq-actions"><button class="primary" type="submit">คำนวณคะแนนแบบสอบถาม</button><button class="secondary" id="psqDemo" type="button">กรอกข้อมูลตัวอย่าง</button><button class="secondary" type="reset">ล้างคำตอบ</button></div>' +
    '<p class="psq-subtle">ข้อมูลคำตอบในแบบสอบถามนี้ไม่ถูกบันทึกลงในฐานข้อมูลหรือ localStorage และไม่ถูกส่งไปยังเซิร์ฟเวอร์</p>' +
    '</form>' +
    '<div id="psqResult" class="psq-result" role="status" aria-live="polite" hidden></div>' +
    '<div class="psq-method"><h3>เกณฑ์คะแนนและข้อจำกัด</h3>' +
    '<p><strong>PSQ Score = จำนวนข้อที่ตอบ “ใช่” / (22 − จำนวนข้อที่ตอบ “ไม่ทราบ”)</strong> เมื่อผู้ใช้ตอบครบทั้ง 22 ข้อ โดย “ไม่ทราบ” ไม่ถูกนับเป็น “ไม่ใช่”</p>' +
    '<p>ผลคัดกรองบวกตามแบบฟอร์มที่แนบ: คะแนนตั้งแต่ <strong>0.33 ขึ้นไป</strong> แต่เกณฑ์ในเอกสารต้นทางแบ่งเพียงผลบวก/ลบ ไม่ได้กำหนดระดับปานกลาง</p>' +
    '<p><strong>เกณฑ์สาธิต 3 ระดับ (ไม่ผ่าน validation):</strong> น้อย &lt; 0.20 · ปานกลาง 0.20 ถึง &lt; 0.33 · มาก ≥ 0.33; หากมีข้อ “ไม่ทราบ” หรือยังไม่ได้ตอบ ระบบจะ <strong>ไม่จัดระดับ</strong> แม้จะรายงานคะแนนที่คำนวณได้เมื่อผู้ใช้เลือกครบทุกข้อแล้ว</p>' +
    '<p>อ้างอิง: แบบฟอร์ม Thai_SRBD_PSQ_Form.pdf ที่ผู้ใช้จัดเตรียม (ดัดแปลงจาก Chervin RD และคณะ), American Thoracic Society; การใช้แบบสอบถามสาธารณะต้องตรวจสอบสิทธิการใช้ฉบับแปลและเงื่อนไขการอนุญาต</p>' +
    '</div></section>';

  var holder = document.getElementById("psqQuestions");
  var index = 0;
  domains.forEach(function (domain) {
    var area = document.createElement("section");
    area.className = "psq-domain";
    var heading = document.createElement("div");
    heading.className = "psq-domain-heading";
    var h3 = document.createElement("h3");
    h3.textContent = domain.title;
    var sm = document.createElement("p");
    sm.textContent = domain.subtitle;
    heading.appendChild(h3);
    heading.appendChild(sm);
    area.appendChild(heading);

    domain.questions.forEach(function (question) {
      index++;
      var fieldset = document.createElement("fieldset");
      fieldset.className = "psq-question";
      var legend = document.createElement("legend");
      legend.textContent = index + ". " + question;
      fieldset.appendChild(legend);
      var choices = document.createElement("div");
      choices.className = "psq-options";
      [["yes","ใช่"],["no","ไม่ใช่"],["unknown","ไม่ทราบ"]].forEach(function (pair) {
        var label = document.createElement("label");
        label.className = "psq-option";
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "psq-q" + index;
        radio.value = pair[0];
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + pair[1]));
        choices.appendChild(label);
      });
      fieldset.appendChild(choices);
      area.appendChild(fieldset);
    });
    holder.appendChild(area);
  });

  var form = document.getElementById("psqForm");
  var result = document.getElementById("psqResult");
  var latest = null;

  function collect() {
    var a = [];
    for (var i=1; i<=22; i++) {
      var selected = form.querySelector('input[name="psq-q' + i + '"]:checked');
      a.push(selected ? selected.value : null);
    }
    return a;
  }
  function updateProgress() {
    var stat = scoring.calculate(collect());
    document.getElementById("psqCount").textContent = "ตอบแล้ว " + stat.selected + "/22 ข้อ";
    document.getElementById("psqKnown").textContent = "ประเมินได้ " + stat.known + " ข้อ · ไม่ทราบ " + stat.unknown;
    document.getElementById("psqProgress").style.width = (stat.selected / 22 * 100) + "%";
    result.hidden = true;
    latest = null;
  }
  function node(tag, klass, text) {
    var el = document.createElement(tag);
    if (klass) el.className = klass;
    el.textContent = text;
    return el;
  }
  function show(stat) {
    result.hidden = false;
    result.className = "psq-result";
    result.replaceChildren();
    if (stat.pending !== 0) {
      result.classList.add("psq-incomplete");
      result.appendChild(node("h3","", "กรุณาตอบแบบสอบถามให้ครบทั้ง 22 ข้อ"));
      result.appendChild(node("p","", "ยังไม่ได้เลือกคำตอบ " + stat.pending + " ข้อ · หากไม่ทราบให้เลือก “ไม่ทราบ” แทนการเว้นว่าง"));
      return;
    }
    if (stat.score === null) {
      result.classList.add("psq-incomplete");
      result.appendChild(node("h3","", "ยังคำนวณคะแนนไม่ได้"));
      result.appendChild(node("p","", "ไม่มีคำตอบที่ประเมินได้ (ทุกข้อเลือก “ไม่ทราบ”) กรุณาทบทวนข้อมูลร่วมกับบุคลากรทางการแพทย์"));
      return;
    }
    var scoreString = stat.score.toFixed(3) + " (" + (stat.score * 100).toFixed(1) + "%)";
    result.appendChild(node("div","psq-score", "PSQ Score " + scoreString));
    result.appendChild(node("p","psq-equation", stat.yes + " คำตอบใช่ / (22 − " + stat.unknown + " ไม่ทราบ) = " + stat.score.toFixed(3)));
    var binary = stat.screen === "positive"
      ? "ผลคัดกรองบวกตามจุดตัด 0.33 ในไฟล์แบบสอบถาม — ควรปรึกษาแพทย์เพื่อประเมินเพิ่มเติม"
      : "คะแนนต่ำกว่าจุดตัด 0.33 ในไฟล์แบบสอบถาม — ไม่ได้แปลว่าไม่มี OSA";
    result.appendChild(node("p","psq-binary", binary));

    if (stat.demoTier === "unclassified") {
      result.classList.add("psq-incomplete");
      result.appendChild(node("h3","", "ยังไม่จัดระดับ 3 ขั้น: มีคำตอบ “ไม่ทราบ”"));
      result.appendChild(node("p","", "แม้สูตรในแบบฟอร์มจะไม่นับข้อไม่ทราบในตัวหาร แต่เพื่อความปลอดภัย ต้นแบบนี้ไม่กำหนดความเสี่ยงต่ำ/ปานกลาง/มากเมื่อข้อมูลยังไม่ครบ"));
    } else {
      var labels = {low:"น้อย",moderate:"ปานกลาง",high:"มาก"};
      result.classList.add("psq-level-" + stat.demoTier);
      result.appendChild(node("h3","", "ระดับสัญญาณจากแบบสอบถาม: " + labels[stat.demoTier] + " (สาธิตเท่านั้น)"));
      result.appendChild(node("p","psq-caveat", "เกณฑ์ 3 ระดับยังไม่ได้รับการตรวจสอบหรือรับรองทางคลินิก โดยเฉพาะจุดแบ่ง 0.20 สำหรับระดับปานกลาง ไม่ใช่เกณฑ์มาตรฐาน PSQ"));
    }
    if (stat.redFlag) {
      result.appendChild(node("div","psq-alert", "พบคำตอบเกี่ยวกับหายใจติดขัด หยุดหายใจ หรือสะดุ้งเฮือกขณะหลับ ควรปรึกษากุมารแพทย์หรือแพทย์หูคอจมูก แม้คะแนนจะต่ำกว่าจุดตัด"));
    }
    result.appendChild(node("p","psq-subtle", "แบบสอบถามเป็นเพียงข้อมูลประกอบการคัดกรอง ไม่สามารถวินิจฉัยโรคหรือบอกความรุนแรงจาก AHI ได้ การตรวจและพิจารณา Sleep Study ต้องอาศัยแพทย์"));
    latest = stat;
  }
  form.addEventListener("change", updateProgress);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!document.getElementById("psqSynthetic").checked) {
      form.reportValidity();
      return;
    }
    show(scoring.calculate(collect()));
    result.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
  document.getElementById("psqDemo").addEventListener("click", function () {
    var positive = new Set([1,2,4,5,6,8,11,18]);
    for (var i=1; i<=22; i++) {
      var value=positive.has(i) ? "yes" : "no";
      var radio=form.querySelector('input[name="psq-q' + i + '"][value="' + value + '"]');
      radio.checked=true;
    }
    document.getElementById("psqSynthetic").checked = true;
    updateProgress();
  });
  form.addEventListener("reset", function () {
    window.setTimeout(updateProgress, 0);
  });
  updateProgress();
})();