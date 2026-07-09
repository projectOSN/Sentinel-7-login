/* ==========================================================================
   SENTINEL-7 // signup.js
   ========================================================================== */

// ---------- Bubble field ----------
const field = document.getElementById('bubbleField');
for (let i = 0; i < 34; i++) {
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

// ---------- Password visibility toggle ----------
const newPass = document.getElementById('newPass');
const toggleVisNew = document.getElementById('toggleVisNew');
const eyeOpenIconNew = document.getElementById('eyeOpenIconNew');
const eyeClosedIconNew = document.getElementById('eyeClosedIconNew');

toggleVisNew.addEventListener('click', () => {
  const revealing = newPass.type === 'password';
  newPass.type = revealing ? 'text' : 'password';
  eyeOpenIconNew.style.display = revealing ? 'none' : 'block';
  eyeClosedIconNew.style.display = revealing ? 'block' : 'none';
  toggleVisNew.setAttribute('aria-label', revealing ? 'Sembunyikan sandi' : 'Tampilkan sandi');
});

// ---------- Password strength meter ----------
const strengthMeter = document.getElementById('strengthMeter');
newPass.addEventListener('input', () => {
  const v = newPass.value;
  let score = 0;
  if (v.length >= 4) score++;
  if (v.length >= 8 && /[0-9]/.test(v)) score++;
  if (v.length >= 8 && /[^a-zA-Z0-9]/.test(v)) score++;
  strengthMeter.classList.remove('weak', 'mid', 'strong');
  if (v.length === 0) return;
  if (score <= 1) strengthMeter.classList.add('weak');
  else if (score === 2) strengthMeter.classList.add('mid');
  else strengthMeter.classList.add('strong');
});

// ---------- Form submit ----------
const signupForm = document.getElementById('signupForm');
const signupAlert = document.getElementById('signupAlert');
const newUser = document.getElementById('newUser');
const confirmPass = document.getElementById('confirmPass');

function showAlert(el, message, isError) {
  el.textContent = message;
  el.classList.remove('alert-error', 'alert-ok');
  el.classList.add(isError ? 'alert-error' : 'alert-ok');
  el.classList.add('show');
}

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (newPass.value !== confirmPass.value) {
    showAlert(signupAlert, 'Konfirmasi kata sandi tidak cocok.', true);
    return;
  }

  const result = signUp(newUser.value, newPass.value);
  if (!result.ok) {
    showAlert(signupAlert, result.message, true);
    return;
  }

  // Auto sign-in right after successful registration
  logIn(newUser.value, newPass.value);
  showAlert(signupAlert, 'UNIT DIAKTIFKAN — MENYELAM...', false);

  const diveBtn = document.querySelector('button.dive');
  diveBtn.textContent = 'MENYELAM...';
  diveBtn.disabled = true;

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1200);
});
