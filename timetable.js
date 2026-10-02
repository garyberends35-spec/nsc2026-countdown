// Weekly timetable, from the official DBE Oct/Nov 2026 NSC timetable (Feb 2026 version).
const L = "Hindi, Gujarati, Tamil, Telugu, Urdu";
const Z = "isiZulu, isiXhosa, siSwati, isiNdebele";
const S = "Sepedi, Sesotho, Setswana, Xitsonga, Tshivenda";
const X = "Arabic, French, Italian, Mandarin, Modern Greek, Serbian, Spanish";
const NX = "NON-EXAMINATION DAY";
const WEEKS = [
 [["10-12",["Life Orientation (LO CAT) rewrite (2½h)"],[]],
  ["10-13",["Computer Applications Tech P1 Practical (3h)"],[`${L} HL, FAL, SAL P1 (2h)`,"Hebrew SAL P1 (2h)","German HL, FAL, SAL P1 (2h)"]],
  ["10-14",["Information Technology P1 Practical (3h)"],[`${X} SAL P1 (2h)`,"Latin SAL P1 (3h)","Portuguese HL, FAL, SAL P1 (2h)"]],
  ["10-15",["English HL P3 (3h)","English FAL P3 (2½h)","English SAL P3 (2½h)"],[`${L} HL P2 (2½h), FAL P2, SAL P2 (2h)`,"Hebrew SAL P2 (2h)","German HL P2 (2½h), FAL P2, SAL P2 (2h)"]],
  ["10-16",["Economics P1 (2h)","Mechanical Technology (3h)"],["Design P1 (3h)"]]],
 [["10-19",[`${Z} HL P3 (3h), FAL P3, SAL P3 (2½h)`],["Agricultural Sciences P1 (2½h)"]],
  ["10-20",["Afrikaans HL P3 (3h), FAL P3, SAL P3 (2½h)"],["History P1 (3h)","Maritime Economics (3h)"]],
  ["10-21",[`${S} HL P3 (3h), FAL P3, SAL P3 (2½h)`,"South African Sign Language HL P3 (3h)"],["Information Technology P2 Theory (3h)"]],
  ["10-22",["Accounting P1 (2h)"],["Engineering Graphics and Design P1 (3h)","Marine Sciences P1 (2½h)"]],
  ["10-23",["Mathematics P1 (3h)","Mathematical Literacy P1 (3h)","Technical Mathematics P1 (3h)"],[`${L} HL P3, FAL P3 (2½h)`,"Portuguese, German HL P3, FAL P3 (2½h)"]]],
 [["10-26",["Mathematics P2 (3h)","Mathematical Literacy P2 (3h)","Technical Mathematics P2 (3h)"],["Sport and Exercise Science (3h)"]],
  ["10-27",[`${S} HL, FAL, SAL P1 (2h)`,"South African Sign Language HL P1 (2h)"],["Engineering Graphics and Design P2 (3h)"]],
  ["10-28",["English HL, FAL, SAL P1 (2h)"],["Accounting P2 (2h)"]],
  ["10-29",["Geography (Climate and Weather, Geomorphology and Map Work) P1 (3h)"],["Computer Applications Tech P2 Theory (3h)"]],
  ["10-30",["Physical Sciences (Physics) P1 (3h)","Technical Sciences P1 (3h)"],["Tourism (3h)"]]],
 [["11-02",["Physical Sciences (Chemistry) P2 (3h)","Technical Sciences P2 (1½h)"],["Religion Studies P1 (2h)"]],
  ["11-03",[],[],NX],["11-04",[],[],NX],["11-05",[],[],NX],
  ["11-06",[`${Z} HL, FAL, SAL P1 (2h)`],["Consumer Studies (3h)","Hospitality Studies (3h)"]]],
 [["11-09",[],[],NX],
  ["11-10",[`${Z} HL P2 (2½h), FAL P2 (2½h), SAL P2 (1½h)`],["Electrical Technology (3h)","Nautical Science P1 (3h)"]],
  ["11-11",["Afrikaans HL, FAL, SAL P1 (2h)"],["Business Studies P1 (2h)"]],
  ["11-12",["Geography (Rural and Urban Settlements, Economic Geography of SA and Map Work) P2 (3h)"],["Religion Studies P2 (2h)"]],
  ["11-13",["Life Sciences P1 (2½h)"],[`${X} SAL P2 (2h)`,"Latin SAL P2 (2h)","Portuguese HL P2 (2½h), FAL, SAL P2 (2h)","Equine Studies (3h)"]]],
 [["11-16",["Life Sciences P2 (2½h)"],["Dramatic Arts (3h)","Civil Technology (3h)"]],
  ["11-17",[`${S} HL P2 (2½h), FAL P2 (2½h), SAL P2 (1½h)`,"South African Sign Language HL P2 (2½h)"],["Agricultural Sciences P2 (2½h)","Nautical Science P2 (3h)"]],
  ["11-18",["Business Studies P2 (2h)"],["Visual Arts P1 (3h)"]],
  ["11-19",["English HL P2 (2½h), FAL P2 (2½h), SAL P2 (1½h)"],["History P2 (3h)"]],
  ["11-20",["Afrikaans HL P2 (2½h), FAL P2 (2½h), SAL P2 (1½h)"],["Economics P2 (2h)"]]],
 [["11-23",["Agricultural Technology (3h)"],["Music P1 Theory (3h)"]],
  ["11-24",["Agricultural Management Practices (3h)","Marine Sciences P2 (2½h)"],["Dance Studies (3h)"]],
  ["11-25",["Music P2 Comprehension (1½h)"],[]],
  ["11-26",["CAT P1 Rewrite Practical (3h)","IT P1 Rewrite Practical (3h)"],[]]]
];
const root = document.getElementById("timetable");
if (root) {
  const dayFmt = new Intl.DateTimeFormat("en-ZA", { weekday: "long", timeZone: "UTC" });
  const dateFmt = new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "short", timeZone: "UTC" });
  const todayStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(new Date()).slice(5);
  let current = Math.max(0, WEEKS.findIndex(w => w.some(d => d[0] === todayStr)));
  const tabs = document.createElement("div"); tabs.className = "wk-tabs"; tabs.setAttribute("role", "tablist");
  const box = document.createElement("div");
  const show = i => {
    current = i;
    [...tabs.children].forEach((b, n) => b.setAttribute("aria-selected", n === i));
    const t = document.createElement("table");
    t.innerHTML = "<caption></caption><thead><tr><th>Day</th><th>Date</th><th>Morning<small>09:00</small></th><th>Afternoon<small>14:00</small></th></tr></thead><tbody></tbody>";
    const first = WEEKS[i][0][0], last = WEEKS[i][WEEKS[i].length - 1][0];
    const d = s => new Date(Date.UTC(2026, s.slice(0, 2) - 1, +s.slice(3)));
    t.caption.textContent = `Week ${i + 1}: ${dateFmt.format(d(first))} – ${dateFmt.format(d(last))} 2026`;
    const fill = (td, papers) => {
      if (!papers.length) { td.textContent = "–"; td.className = "none"; return; }
      const ul = document.createElement("ul");
      papers.forEach(p => { const li = document.createElement("li"); li.textContent = p; ul.appendChild(li); }); td.appendChild(ul);
    };
    WEEKS[i].forEach(([k, am, pm, note]) => {
      const tr = t.tBodies[0].insertRow(); if (k === todayStr) tr.className = "now";
      tr.insertCell().textContent = dayFmt.format(d(k)); tr.insertCell().textContent = dateFmt.format(d(k));
      if (note) { const td = tr.insertCell(); td.colSpan = 2; td.textContent = note; tr.classList.add("off"); }
      else { fill(tr.insertCell(), am); fill(tr.insertCell(), pm); }
    });
    const wrap = document.createElement("div"); wrap.className = "tt-wrap"; wrap.appendChild(t); box.replaceChildren(wrap);
  };
  WEEKS.forEach((_, i) => { const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "tab"); b.textContent = "Week " + (i + 1); b.addEventListener("click", () => show(i)); tabs.appendChild(b); });
  const pr = document.createElement("button"); pr.type = "button"; pr.className = "print"; pr.textContent = "Print"; pr.addEventListener("click", () => print());
  tabs.appendChild(pr); root.append(tabs, box); show(current);
}
