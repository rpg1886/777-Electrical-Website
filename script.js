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

quoteForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = quoteForm.querySelector('button');
  const originalText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending <span>...</span>';
  formNote.textContent = 'Sending your project details...';
  formNote.style.color = '';

  try {
    const response = await fetch(quoteForm.action, {
      method: 'POST',
      body: new FormData(quoteForm),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Submission failed');
    }

    submitButton.innerHTML = 'Request sent <span>✓</span>';
    formNote.textContent = 'Thanks — your project details were sent successfully.';
    formNote.style.color = '#33815a';
    quoteForm.reset();
  } catch (error) {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
    formNote.textContent = 'Something went wrong. Please call 661-593-9252 or email us directly.';
    formNote.style.color = '#c0392b';
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();