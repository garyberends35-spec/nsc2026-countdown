// Paper dates from the official DBE Oct/Nov 2026 NSC timetable (dd/mm). Sessions (09:00 / 14:00) are on the official PDF.
const LANG = { "English HL": "28/10 19/11 15/10", "English FAL": "28/10 19/11 15/10", "Afrikaans HL": "11/11 20/11 20/10", "Afrikaans FAL": "11/11 20/11 20/10",
  "isiZulu / isiXhosa / siSwati / isiNdebele HL": "06/11 10/11 19/10", "isiZulu / isiXhosa / siSwati / isiNdebele FAL": "06/11 10/11 19/10",
  "Sepedi / Sesotho / Setswana / Xitsonga / Tshivenda HL": "27/10 17/11 21/10", "Sepedi / Sesotho / Setswana / Xitsonga / Tshivenda FAL": "27/10 17/11 21/10" };
const EXAMS = {
  "Mathematics": ["P1 23/10", "P2 26/10"], "Mathematical Literacy": ["P1 23/10", "P2 26/10"], "Technical Mathematics": ["P1 23/10", "P2 26/10"],
  "Physical Sciences": ["P1 Physics 30/10", "P2 Chemistry 02/11"], "Technical Sciences": ["P1 30/10", "P2 02/11"], "Life Sciences": ["P1 13/11", "P2 16/11"],
  "Accounting": ["P1 22/10", "P2 28/10"], "Business Studies": ["P1 11/11", "P2 18/11"], "Economics": ["P1 16/10", "P2 20/11"],
  "Geography": ["P1 29/10", "P2 12/11"], "History": ["P1 20/10", "P2 19/11"], "Religion Studies": ["P1 02/11", "P2 12/11"],
  "Agricultural Sciences": ["P1 19/10", "P2 17/11"], "Tourism": ["Paper 30/10"], "Consumer Studies": ["Paper 06/11"], "Hospitality Studies": ["Paper 06/11"],
  "Information Technology": ["P1 Practical 14/10", "P2 Theory 21/10"], "Computer Applications Technology": ["P1 Practical 13/10", "P2 Theory 29/10"],
  "Engineering Graphics & Design": ["P1 22/10", "P2 27/10"], "Mechanical Technology": ["Paper 16/10"], "Electrical Technology": ["Paper 10/11"], "Civil Technology": ["Paper 16/11"],
  "Design": ["P1 16/10"], "Dramatic Arts": ["Paper 16/11"], "Visual Arts": ["P1 18/11"], "Music": ["P1 Theory 23/11", "P2 25/11"], "Dance Studies": ["Paper 24/11"],
  "Sport & Exercise Science": ["Paper 26/10"], "Maritime Economics": ["Paper 20/10"], "Marine Sciences": ["P1 22/10", "P2 24/11"], "Nautical Science": ["P1 10/11", "P2 17/11"],
  "Equine Studies": ["Paper 13/11"], "Agricultural Technology": ["Paper 23/11"], "Agricultural Management Practices": ["Paper 24/11"]
};
for (const [k, v] of Object.entries(LANG)) { const [a, b, c] = v.split(" "); EXAMS[k] = ["P1 " + a, "P2 " + b, "P3 " + c]; }

// a = morning (09:00), p = afternoon (14:00); one letter per paper, in the order listed above
const SES = { "Mathematics":"aa","Mathematical Literacy":"aa","Technical Mathematics":"aa","Physical Sciences":"aa","Technical Sciences":"aa","Life Sciences":"aa",
  "Accounting":"ap","Business Studies":"pa","Economics":"ap","Geography":"aa","History":"pp","Religion Studies":"pp","Agricultural Sciences":"pp","Tourism":"p",
  "Consumer Studies":"p","Hospitality Studies":"p","Information Technology":"ap","Computer Applications Technology":"ap","Engineering Graphics & Design":"pp",
  "Mechanical Technology":"a","Electrical Technology":"p","Civil Technology":"p","Design":"p","Dramatic Arts":"p","Visual Arts":"p","Music":"pa","Dance Studies":"p",
  "Sport & Exercise Science":"p","Maritime Economics":"p","Marine Sciences":"pa","Nautical Science":"pp","Equine Studies":"p","Agricultural Technology":"a","Agricultural Management Practices":"a" };
for (const k of Object.keys(LANG)) SES[k] = "aaa";

const sel = document.getElementById("subject"), list = document.getElementById("papers");
if (sel && list) {
  const sast = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" });
  const dayNum = ymd => Date.UTC(...ymd.split("-").map((n, i) => i === 1 ? n - 1 : +n)) / 864e5;
  const fmt = new Intl.DateTimeFormat("en-ZA", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
  const render = () => {
    const today = dayNum(sast.format(new Date())); list.textContent = "";
    EXAMS[sel.value].map((s, i) => { const m = s.match(/^(.*?)\s*(\d\d)\/(\d\d)$/); return { name: m[1], t: Date.UTC(2026, m[3] - 1, +m[2]) / 864e5, time: SES[sel.value][i] === "a" ? "09:00" : "14:00" }; })
      .sort((a, b) => a.t - b.t).forEach(p => {
        const n = p.t - today, li = document.createElement("li");
        const left = n > 1 ? n + " days" : n === 1 ? "Tomorrow" : n === 0 ? "TODAY" : "Done";
        li.innerHTML = `<span class="pn"></span><span class="pd"></span><span class="pt"></span><b class="pl"></b>`;
        li.children[0].textContent = p.name; li.children[1].textContent = fmt.format(new Date(p.t * 864e5)); li.children[2].textContent = p.time; li.children[3].textContent = left;
        if (n <= 0 && n > -1) li.classList.add("today"); if (n < 0) li.classList.add("done");
        list.appendChild(li);
      });
  };
  Object.keys(EXAMS).sort().forEach(k => sel.add(new Option(k, k)));
  try { const v = localStorage.getItem("nsc-subject"); if (v && EXAMS[v]) sel.value = v; } catch (e) {}
  if (!sel.value || !EXAMS[sel.value]) sel.value = "Mathematics";
  sel.addEventListener("change", () => { try { localStorage.setItem("nsc-subject", sel.value); } catch (e) {} render(); });
  render(); setInterval(render, 60000);
}
