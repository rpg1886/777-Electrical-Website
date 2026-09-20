const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const quoteForm = document.querySelector('#quote-form');
const sampleForm = document.querySelector('#sample-form');
const sampleModal = document.querySelector('#sample-modal');
const sampleDownload = document.querySelector('#sample-download');

function closeMenu() {
  siteNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'Menu';
}

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});

siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.querySelectorAll('[data-open-sample]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    sampleModal.hidden = false;
    document.body.classList.add('modal-open');
    document.querySelector('#sample-name').focus();
  });
});

document.querySelectorAll('[data-close-sample]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    sampleModal.hidden = true;
    document.body.classList.remove('modal-open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !sampleModal.hidden) {
    sampleModal.hidden = true;
    document.body.classList.remove('modal-open');
  }
});

async function submitToWeb3Forms(form, successMessage) {
  const submitButton = form.querySelector('button[type="submit"]');
  const formNote = form.querySelector('.form-note');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending <span>...</span>';
  formNote.textContent = 'Sending your details...';
  formNote.style.color = '';

  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
    submitButton.innerHTML = 'Sent <span>✓</span>';
    formNote.textContent = successMessage;
    formNote.style.color = '#9edb73';
    form.reset();
    if (form === sampleForm) {
      sampleDownload.hidden = false;
      sampleDownload.focus();
    }
  } catch (error) {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
    formNote.textContent = `We could not send your request. Please call 661-593-9252 or email us directly.`;
    formNote.style.color = '#ff9d85';
    console.error('Web3Forms submission failed:', error);
  }
}

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitToWeb3Forms(quoteForm, 'Thanks — your project details were sent successfully.');
});

sampleForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitToWeb3Forms(sampleForm, 'Thanks — check your inbox for the sample report.');
});

document.querySelector('#year').textContent = new Date().getFullYear();
