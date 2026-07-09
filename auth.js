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
