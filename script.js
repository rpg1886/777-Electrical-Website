const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const quoteForm = document.querySelector('#quote-form');
const formNote = document.querySelector('.form-note');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = 'Menu';
  });
});

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = quoteForm.querySelector('button');
  submitButton.innerHTML = 'Request prepared <span>✓</span>';
  submitButton.disabled = true;
  formNote.textContent = 'Thanks — your project details are ready. Connect this form to your preferred email or CRM to receive live submissions.';
  formNote.style.color = '#33815a';
});

document.querySelector('#year').textContent = new Date().getFullYear();