/* PAGE NAVIGATION */
function goPage(page) {
  window.location.href = page;
}

/* CURSOR HEART TRAIL */
document.addEventListener("mousemove", e => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 900);
});

/* ========= INFINITE DODGE BUTTON ========= */
const btn = document.getElementById("escapeBtn");

if (btn) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  btn.style.left = x + "px";
  btn.style.top = y + "px";

  document.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const bx = rect.left + rect.width / 2;
    const by = rect.top + rect.height / 2;

    const dx = e.clientX - bx;
    const dy = e.clientY - by;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 200) {
      const strength = (200 - dist) / 200;

      x -= dx * 0.18 * strength;
      y -= dy * 0.18 * strength;

      // random jitter to make it unpredictable
      x += (Math.random() - 0.5) * 25;
      y += (Math.random() - 0.5) * 25;

      x = Math.max(20, Math.min(window.innerWidth - rect.width - 20, x));
      y = Math.max(20, Math.min(window.innerHeight - rect.height - 20, y));

      btn.style.left = x + "px";
      btn.style.top = y + "px";
    }
  });

  // IF you manage to click, it works 😈
  btn.addEventListener("click", () => {
    showPopup();
  });
}

/* POPUP */
function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* FIREWORKS (INDEX PAGE ONLY) */
const canvas = document.getElementById("fireworks");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  let particles = [];

  function firework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    for (let i = 0; i < 40; i++) {
      particles.push({
        x, y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4 + 1,
        life: 80,
        color: `hsl(${Math.random()*360},100%,60%)`
      });
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i) => {
      p.x += Math.cos(p.angle)*p.speed;
      p.y += Math.sin(p.angle)*p.speed;
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x,p.y,3,3);
      if (p.life <= 0) particles.splice(i,1);
    });
    requestAnimationFrame(animate);
  }

  setInterval(firework, 900);
  animate();
}
