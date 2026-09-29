const target = new Date("2026-10-13T00:00:00+02:00").getTime();
const d = document.getElementById("days"),
      h = document.getElementById("hours"),
      m = document.getElementById("minutes"),
      s = document.getElementById("seconds"),
      timer = document.getElementById("timer");

const pad = (n, l = 2) => String(n).padStart(l, "0");

// Safe DOM update wrapper to apply micro-scale animations only when time digits tick over
function setTimeValue(element, newValue) {
    if (element && element.textContent !== newValue) {
        element.textContent = newValue;
        element.classList.remove("pop");
        void element.offsetWidth; // Explict reflow execution to reset the CSS animation timeline state
        element.classList.add("pop");
    }
}

function update() {
    let x = target - Date.now();
    
    // Check if the target milestone has arrived or passed
    if (x <= 0) {
        if (timer) {
            timer.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 40px 20px; border-color: #ffbe0b; background: rgba(255, 190, 11, 0.08); border-radius: 20px;">
                    <b style="font-family: 'Segoe UI', Arial, sans-serif; font-size: clamp(22px, 4.5vw, 42px); text-shadow: 0 0 25px rgba(255,190,11,0.4); color: #ffbe0b; font-weight: 700; display: block; text-align: center;">
                        NSC 2026 HAS ARRIVED
                    </b>
                </div>`;
        }
        return;
    }
    
    let t = Math.floor(x / 1000);
    
    setTimeValue(d, pad(Math.floor(t / 86400), 3));
    setTimeValue(h, pad(Math.floor((t % 86400) / 3600)));
    setTimeValue(m, pad(Math.floor((t % 3600) / 60)));
    setTimeValue(s, pad(t % 60));
}

// Background Particle Engine
function initParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    
    const count = 35; // Maximum floating background nodes to preserve processing capacity
    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        // Randomize sizing constraints between 3px and 9px
        const size = Math.random() * 6 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Stagger generation delays and speeds to distribute flow arrays uniformly
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        container.appendChild(particle);
    }
}

// Initialization runtime triggers
initParticles();
update();
setInterval(update, 250);