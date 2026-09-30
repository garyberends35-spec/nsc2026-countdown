const target = new Date("2026-10-13T00:00:00+02:00").getTime();
const $ = id => document.getElementById(id);
const d = $("days"), h = $("hours"), m = $("minutes"), s = $("seconds"), timer = $("timer");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pad = (n, l = 2) => String(n).padStart(l, "0");
let finished = false;

function setTimeValue(el, v, frac) {
    if (!el) return;
    if (el.textContent !== v) {
        el.textContent = v;
        el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
    }
    if (frac !== undefined) el.parentElement.style.setProperty("--p", frac);
}

function update() {
    const x = target - Date.now();
    if (x <= 0) {
        if (!finished) { finished = true; finish(); }
        return;
    }
    const t = Math.floor(x / 1000);
    timer.classList.toggle("urgent", x < 864e5);
    setTimeValue(d, pad(Math.floor(t / 86400), 3), 1);
    setTimeValue(h, pad(Math.floor((t % 86400) / 3600)), ((t % 86400) / 3600 | 0) / 24 + 0.04);
    setTimeValue(m, pad(Math.floor((t % 3600) / 60)), ((t % 3600) / 60 | 0) / 60 + 0.02);
    setTimeValue(s, pad(t % 60), (t % 60) / 60 + 0.02);
}

function finish() {
    timer.classList.remove("urgent");
    timer.innerHTML = `<div style="grid-column:1/-1;padding:40px 20px;border-color:#ffbe0b;background:rgba(255,190,11,.1)">
        <b style="font-size:clamp(34px,7vw,80px);color:#ffbe0b;text-shadow:0 0 30px rgba(255,190,11,.6)">NSC 2026 HAS ARRIVED</b>
        <small style="color:#fff;font-size:clamp(12px,2vw,18px)">GOOD LUCK, CLASS OF 2026 — FINISH STRONG!</small></div>`;
    if (!reduce) confetti();
}

// Bokeh lights
function initParticles() {
    const c = $("particles"); if (!c || reduce) return;
    for (let i = 0; i < 28; i++) {
        const p = document.createElement("div"); p.className = "particle";
        const z = Math.random() * 26 + 8;
        p.style.cssText = `width:${z}px;height:${z}px;left:${Math.random()*100}%;animation-delay:${-Math.random()*20}s;animation-duration:${Math.random()*14+16}s;opacity:${Math.random()*.5+.3}`;
        c.appendChild(p);
    }
}

// Mouse parallax + tile tilt (desktop only)
function initParallax() {
    if (reduce || !matchMedia("(hover:hover)").matches) return;
    const bg = document.querySelector(".bg"), tiles = [...timer.children];
    addEventListener("pointermove", e => {
        const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
        bg.style.translate = `${x * -18}px ${y * -12}px`;
        tiles.forEach(t => t.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`);
    });
}

// Confetti finale
function confetti() {
    const cv = $("confetti"), ctx = cv.getContext("2d");
    const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener("resize", fit);
    const cols = ["#ffbe0b", "#3a86ff", "#ffffff", "#ffd166"];
    const ps = Array.from({ length: 220 }, () => ({ x: Math.random() * cv.width, y: -Math.random() * cv.height * .6, w: Math.random() * 9 + 5, h: Math.random() * 5 + 4,
        vy: Math.random() * 3 + 2, vx: Math.random() * 2 - 1, r: Math.random() * 6, vr: Math.random() * .2 - .1, c: cols[Math.random() * 4 | 0] }));
    (function frame() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore(); });
        if (ps.some(p => p.y < cv.height + 20)) requestAnimationFrame(frame); else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
}

// WhatsApp share
const sh = $("share");
if (sh) sh.href = "https://wa.me/?text=" + encodeURIComponent("Countdown to GDE NSC 2026 — Success is Intentional! " + location.href.split("#")[0]);

initParticles(); initParallax(); update();
let timerId = setInterval(update, 250);
document.addEventListener("visibilitychange", () => { clearInterval(timerId); if (!document.hidden) { update(); timerId = setInterval(update, 250); } });
