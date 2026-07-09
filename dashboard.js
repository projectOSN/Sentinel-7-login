/* ==========================================================================
   SENTINEL-7 // dashboard.js
   ========================================================================== */

// Require an active session — bounce back to login if none found
requireSession('index.html');

const user = currentUser();
const whoami = document.getElementById('whoami');
const heroName = document.getElementById('heroName');
const avatarInitial = document.getElementById('avatarInitial');
const aboutName = document.getElementById('aboutName');

if (user) {
  whoami.textContent = user;
  heroName.textContent = user;
  avatarInitial.textContent = user.charAt(0).toUpperCase();
  aboutName.textContent = user;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  logOut();
  window.location.href = 'index.html';
});
