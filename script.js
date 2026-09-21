const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const quoteForm = document.querySelector('#quote-form');
const sampleForm = document.querySelector('#sample-form');
const sampleModal = document.querySelector('#sample-modal');
const sampleDownloads = document.querySelector('#sample-downloads');
const modalCard = sampleModal.querySelector('.modal-card');
const modalClose = sampleModal.querySelector('.modal-close');
let lastFocusedElement;

function addConsentField(form, message) {
  if (form.querySelector('[name="consent"]')) return;
  const field = document.createElement('label');
  field.className = 'consent-field full';
  field.innerHTML = `<input type="checkbox" name="consent" required><span>${message}</span>`;
  const submitButton = form.querySelector('button[type="submit"]');
  form.insertBefore(field, submitButton);
}

addConsentField(quoteForm, 'I agree to be contacted about this estimate request. Project details are handled confidentially.');
addConsentField(sampleForm, 'I agree to be contacted about this request.');
quoteForm.querySelector('button[type="submit"]').firstChild.textContent = 'Get a Bid-Ready Estimate ';

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
    lastFocusedElement = trigger;
    sampleModal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose.focus();
  });
});

function closeSampleModal() {
  sampleModal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('[data-close-sample]').forEach((trigger) => {
  trigger.addEventListener('click', closeSampleModal);
});

document.addEventListener('keydown', (event) => {
  if (sampleModal.hidden) return;
  if (event.key === 'Escape') closeSampleModal();
  if (event.key !== 'Tab') return;
  const focusable = modalCard.querySelectorAll('button, input, a[href]');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.querySelector('#plans').addEventListener('input', (event) => {
  event.target.setCustomValidity(event.target.value && !/^https?:\/\//i.test(event.target.value) ? 'Enter a complete link beginning with https:// or http://' : '');
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
      sampleDownloads.hidden = false;
      sampleDownloads.querySelector('a').focus();
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
  if (!quoteForm.reportValidity()) return;
  submitToWeb3Forms(quoteForm, 'Thanks — your project details were sent successfully.');
});

sampleForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitToWeb3Forms(sampleForm, 'Thanks — check your inbox for the sample report.');
});

document.querySelector('#year').textContent = new Date().getFullYear();
