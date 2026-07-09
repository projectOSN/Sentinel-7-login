/* ==========================================================================
   SENTINEL-7 // Abyssal Access Terminal
   script.js
   ========================================================================== */

// ---------- Bubble field ----------
const field = document.getElementById('bubbleField');
const total = 34;
for (let i = 0; i < total; i++) {
  const b = document.createElement('div');
  b.className = 'bubble';
  const size = 4 + Math.random() * 14;
  b.style.width = size + 'px';
  b.style.height = size + 'px';
  b.style.left = Math.random() * 100 + 'vw';
  b.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  const duration = 7 + Math.random() * 10;
  b.style.animationDuration = duration + 's';
  b.style.animationDelay = (Math.random() * duration) + 's';
  field.appendChild(b);
}

/* ---------- SHARK EYE REACTIONS ---------- */
const sharkSvg = document.getElementById('sharkSvg');
const userInput = document.getElementById('user');
const passInput = document.getElementById('pass');
const toggleVis = document.getElementById('toggleVis');
const eyeOpenIcon = document.getElementById('eyeOpenIcon');
const eyeClosedIcon = document.getElementById('eyeClosedIcon');

// Blink once whenever the operator types their ID
userInput.addEventListener('input', () => {
  sharkSvg.classList.remove('blink-once');
  void sharkSvg.getBBox(); // restart animation
  sharkSvg.classList.add('blink-once');
});
sharkSvg.addEventListener('animationend', (e) => {
  if (e.animationName === 'blinkLid') sharkSvg.classList.remove('blink-once');
});

// Eye closes while the password is hidden and being typed, opens when empty or revealed
function updateEyeState() {
  const hiddenAndFilled = passInput.type === 'password' && passInput.value.length > 0;
  sharkSvg.classList.toggle('eye-closed', hiddenAndFilled);
}
passInput.addEventListener('input', updateEyeState);

// Show / hide password toggle -> also opens/closes the shark's eye
toggleVis.addEventListener('click', () => {
  const revealing = passInput.type === 'password';
  passInput.type = revealing ? 'text' : 'password';
  eyeOpenIcon.style.display = revealing ? 'none' : 'block';
  eyeClosedIcon.style.display = revealing ? 'block' : 'none';
  toggleVis.setAttribute('aria-label', revealing ? 'Sembunyikan sandi' : 'Tampilkan sandi');
  updateEyeState();
});

/* ---------- LOGIN SUBMIT -> DIVE SEQUENCE ---------- */
const form = document.getElementById('loginForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const diveBtn = document.querySelector('button.dive');
    if (diveBtn) {
      diveBtn.textContent = 'MENYELAM...';
      diveBtn.disabled = true;
      setTimeout(() => {
        diveBtn.textContent = 'Selami Sistem';
        diveBtn.disabled = false;
      }, 1800);
    }
  });
}
