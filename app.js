// ---------- NAVBAR (burger) ----------
const menuBtn = document.getElementById('mobile-menu');
const navbarMenu = document.getElementById('navbar__menu');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
  menuBtn.setAttribute('aria-expanded', !expanded);
  menuBtn.classList.toggle('open');         // toggles bars transforms via CSS
  navbarMenu.classList.toggle('active');
  // show/hide menu for small screens
  if (navbarMenu.classList.contains('active')) {
    navbarMenu.style.display = 'flex';
    navbarMenu.style.flexDirection = 'column';
    navbarMenu.style.position = 'absolute';
    navbarMenu.style.top = '64px';
    navbarMenu.style.left = '0';
    navbarMenu.style.width = '100%';
    navbarMenu.style.background = '#131313';
    navbarMenu.style.padding = '12px 0';
  } else {
    navbarMenu.style.display = '';
    navbarMenu.style.position = '';
    navbarMenu.style.top = '';
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.navbar__links').forEach(link => {
  link.addEventListener('click', () => {
    if (menuBtn.classList.contains('open')) {
      menuBtn.classList.remove('open');
      navbarMenu.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', false);
      navbarMenu.style.display = '';
    }
  });
});

// ---------- HEADER BG CHANGE ON SCROLL ----------
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.background = 'linear-gradient(180deg, rgba(19,19,19,0.96), rgba(17,17,17,0.96))';
    header.style.backdropFilter = 'saturate(120%) blur(6px)';
  } else {
    header.style.background = '';
    header.style.backdropFilter = '';
  }

  // show scroll to top
  const scrollBtn = document.getElementById('scrollTop');
  if (window.scrollY > 400) scrollBtn.style.display = 'flex';
  else scrollBtn.style.display = 'none';
});

// ---------- SCROLL TO TOP ----------
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- FETCH (GET) example ----------
async function loadUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users'); // GET demo
    const users = await res.json();
    const container = document.getElementById('users-list');
    container.innerHTML = '';
    users.slice(0,6).forEach(u => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `<strong>${escapeHtml(u.name)}</strong><div>${escapeHtml(u.email)}</div><div>${escapeHtml(u.company.name)}</div>`;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to fetch users', err);
    document.getElementById('users-list').innerText = 'Failed to load data.';
  }
}
loadUsers();

// small helper to avoid naive injection
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function (m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
  });
}

// ---------- FORM VALIDATION ----------
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const terms = document.getElementById('terms');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const pwdError = document.getElementById('password-error');
const confirmError = document.getElementById('confirm-error');
const termsError = document.getElementById('terms-error');
const success = document.getElementById('form-success');

function validateEmail(email) {
  // simple regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(String(email).toLowerCase());
}
function validatePassword(pwd) {
  // at least 8 chars, one number, one letter
  const re = /^(?=.*[0-9])(?=.*[A-Za-z]).{8,}$/;
  return re.test(pwd);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  // name
  if (!nameInput.value || nameInput.value.trim().length < 2) {
    nameError.textContent = 'Enter your name (min 2 chars).';
    ok = false;
  } else nameError.textContent = '';

  // email
  if (!validateEmail(emailInput.value)) {
    emailError.textContent = 'Enter a valid email.';
    ok = false;
  } else emailError.textContent = '';

  // password
  if (!validatePassword(pwdInput.value)) {
    pwdError.textContent = 'Password must be 8+ chars and include a number.';
    ok = false;
  } else pwdError.textContent = '';

  // confirm
  if (pwdInput.value !== confirmInput.value) {
    confirmError.textContent = 'Passwords do not match.';
    ok = false;
  } else confirmError.textContent = '';

  // terms
  if (!terms.checked) {
    termsError.textContent = 'You must accept the terms.';
    ok = false;
  } else termsError.textContent = '';

  if (ok) {
    success.textContent = 'Registration successful (demo). Data not sent to server in this example.';
    // Optionally store user data (without password) in localStorage as demo
    const demoUser = { name: nameInput.value.trim(), email: emailInput.value.trim(), date: new Date().toISOString() };
    const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
    users.push(demoUser);
    localStorage.setItem('demo_users', JSON.stringify(users));
    form.reset();
    setTimeout(()=> success.textContent = '', 4000);
  }
});

// show/hide password
const togglePwdBtn = document.getElementById('toggle-password');
togglePwdBtn.addEventListener('click', () => {
  const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
  pwdInput.setAttribute('type', type);
  togglePwdBtn.innerHTML = type === 'text' ? '<i class="fa fa-eye-slash"></i>' : '<i class="fa fa-eye"></i>';
});

// ---------- COOKIE consent (localStorage) ----------
const cookieEl = document.getElementById('cookie');
const acceptBtn = document.getElementById('accept-cookie');
const declineBtn = document.getElementById('decline-cookie');

function hideCookie() {
  cookieEl.style.display = 'none';
}
if (localStorage.getItem('cookie_accepted') === 'yes') {
  hideCookie();
} else {
  cookieEl.style.display = 'flex';
}

acceptBtn.addEventListener('click', () => {
  localStorage.setItem('cookie_accepted','yes');
  hideCookie();
});
declineBtn.addEventListener('click', () => {
  localStorage.setItem('cookie_accepted','no');
  hideCookie();
});

// ---------- small accessibility: set footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
