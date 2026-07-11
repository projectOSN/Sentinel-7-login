/* ==========================================================================
   SENTINEL-7 // Abyssal Access Terminal
   auth.js — simulasi autentikasi sisi klien (localStorage)

   CATATAN: Ini adalah demo front-end murni (tanpa server/database).
   Password disimpan apa adanya di localStorage browser pengguna,
   BUKAN untuk digunakan di produksi nyata. Untuk sistem sungguhan,
   ganti bagian ini dengan backend + hashing password yang tepat.
   ========================================================================== */

const SENTINEL_USERS_KEY   = 'sentinel7_users';
const SENTINEL_SESSION_KEY = 'sentinel7_session';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(SENTINEL_USERS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(SENTINEL_USERS_KEY, JSON.stringify(users));
}

function signUp(username, password) {
  username = (username || '').trim();
  if (!username || !password) {
    return { ok: false, message: 'ID Operator dan Kata Sandi wajib diisi.' };
  }
  if (password.length < 4) {
    return { ok: false, message: 'Kata sandi minimal 4 karakter.' };
  }
  const users = getUsers();
  const key = username.toLowerCase();
  if (users[key]) {
    return { ok: false, message: 'ID Operator ini sudah terdaftar.' };
  }
  users[key] = { username, password, joined: new Date().toISOString() };
  saveUsers(users);
  return { ok: true, message: 'Registrasi berhasil.' };
}

function logIn(username, password) {
  username = (username || '').trim();
  const users = getUsers();
  const key = username.toLowerCase();
  const record = users[key];
  if (!record || record.password !== password) {
    return { ok: false, message: 'ID Operator atau kata sandi salah.' };
  }
  localStorage.setItem(SENTINEL_SESSION_KEY, record.username);
  return { ok: true, message: 'Login berhasil.' };
}

function currentUser() {
  return localStorage.getItem(SENTINEL_SESSION_KEY);
}

function logOut() {
  localStorage.removeItem(SENTINEL_SESSION_KEY);
}

// Guard for pages that require an active session (e.g. dashboard.html)
function requireSession(redirectTo) {
  if (!currentUser()) {
    window.location.href = redirectTo || 'index.html';
  }
}

/* ==========================================================================
   SITE-WIDE EXTRAS
   Berjalan otomatis di setiap halaman yang memuat auth.js (index, signup,
   dashboard) — TIDAK perlu edit file HTML apa pun untuk mengaktifkannya.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  injectTopBanner();
  injectWalkingDiver();
  loadProfilePhoto();
});

// ---------- Top status banner ----------
function injectTopBanner() {
  const bar = document.createElement('div');
  bar.className = 'top-banner';
  bar.innerHTML =
    '<div class="tb-avatar" id="tbAvatar">S7</div>' +
    '<span class="tb-dot"></span>' +
    '<div class="tb-ticker"><span>SENTINEL-7 DIVISION &nbsp;&bull;&nbsp; JARINGAN LAUT DALAM AKTIF &nbsp;&bull;&nbsp; KONEKSI TERENKRIPSI &nbsp;&bull;&nbsp; SELAMAT DATANG DI MARKAS ABYSSAL &nbsp;&bull;&nbsp; STATUS: SIAGA</span></div>' +
    '<div class="tb-clock" id="tbClock">--:--:--</div>';
  document.body.prepend(bar);

  const clockEl = document.getElementById('tbClock');
  function tick() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('id-ID', { hour12: false });
  }
  tick();
  setInterval(tick, 1000);
}

// ---------- Profile photo auto-loader ----------
// Upload salah satu file berikut ke ROOT repo (sejajar dengan index.html),
// tanpa perlu edit file apa pun — fotonya otomatis muncul di banner atas
// dan di kartu "Tentang Saya" pada dashboard:
//   profile.jpg   atau   profile.png   atau   foto.jpg
function loadProfilePhoto() {
  const candidates = ['profile.jpg', 'profile.png', 'foto.jpg'];
  let i = 0;
  function tryNext() {
    if (i >= candidates.length) return; // belum ada foto yang diupload, pakai tampilan default
    const src = candidates[i++];
    const img = new Image();
    img.onload = () => applyPhoto(src);
    img.onerror = tryNext;
    img.src = src;
  }
  tryNext();
}

function applyPhoto(src) {
  const tb = document.getElementById('tbAvatar');
  if (tb) {
    tb.style.backgroundImage = "url('" + src + "')";
    tb.textContent = '';
  }
  const dashAvatar = document.getElementById('avatarInitial');
  if (dashAvatar) {
    dashAvatar.style.backgroundImage = "url('" + src + "')";
    dashAvatar.style.backgroundSize = 'cover';
    dashAvatar.style.backgroundPosition = 'center';
    dashAvatar.textContent = '';
  }
}

// ---------- Walking diver (pojok kiri bawah) ----------
function injectWalkingDiver() {
  const wrap = document.createElement('div');
  wrap.className = 'diver-wrap';
  wrap.innerHTML =
    '<div class="diver-bubble"></div>' +
    '<div class="diver-bubble"></div>' +
    '<div class="diver-bubble"></div>' +
    '<div class="diver-dust dl"></div>' +
    '<div class="diver-dust dr"></div>' +
    '<svg viewBox="0 0 58 96" xmlns="http://www.w3.org/2000/svg">' +
      '<g class="diver-body">' +
        '<rect x="24" y="18" width="10" height="24" rx="3" fill="#2b3641" stroke="#0c1116" stroke-width="1"/>' +
        '<rect x="20" y="30" width="18" height="26" rx="6" fill="#37444f" stroke="#0c1116" stroke-width="1.2"/>' +
        '<circle cx="29" cy="18" r="11" fill="#414f5b" stroke="#0c1116" stroke-width="1.2"/>' +
        '<circle cx="29" cy="18" r="7" fill="#9fd8e0" opacity=".55"/>' +
        '<circle cx="29" cy="18" r="7" fill="none" stroke="#0c1116" stroke-width="1"/>' +
        '<rect class="arm-l" x="17" y="32" width="5" height="18" rx="2.5" fill="#37444f" stroke="#0c1116" stroke-width="1"/>' +
        '<rect class="arm-r" x="36" y="32" width="5" height="18" rx="2.5" fill="#37444f" stroke="#0c1116" stroke-width="1"/>' +
        '<rect class="leg-l" x="21" y="54" width="7" height="26" rx="3" fill="#2b3641" stroke="#0c1116" stroke-width="1"/>' +
        '<rect class="leg-r" x="30" y="54" width="7" height="26" rx="3" fill="#2b3641" stroke="#0c1116" stroke-width="1"/>' +
      '</g>' +
    '</svg>';
  document.body.appendChild(wrap);
}
