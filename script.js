const target = new Date("2026-10-13T00:00:00+02:00").getTime();
const d = document.getElementById("days"),
      h = document.getElementById("hours"),
      m = document.getElementById("minutes"),
      s = document.getElementById("seconds"),
      timer = document.getElementById("timer");

const pad = (n, l = 2) => String(n).padStart(l, "0");

function update() {
    let x = target - Date.now();
    
    if (x <= 0) {
        timer.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 40px 20px; border-color: #ffbe0b; background: rgba(255, 190, 11, 0.08);">
                <b style="font-family: 'Segoe UI', Arial, sans-serif; font-size: clamp(22px, 4.5vw, 42px); text-shadow: 0 0 25px rgba(255,190,11,0.4); color: #ffbe0b;">
                    NSC 2026 HAS ARRIVED
                </b>
            </div>`;
        return;
    }
    
    let t = Math.floor(x / 1000);
    d.textContent = pad(Math.floor(t / 86400), 3);
    h.textContent = pad(Math.floor((t % 86400) / 3600));
    m.textContent = pad(Math.floor((t % 3600) / 60));
    s.textContent = pad(t % 60);
}

update();
setInterval(update, 250);