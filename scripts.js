document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
  }

  document.body.classList.add('page-visible');

  document.querySelectorAll('a[href]').forEach((link) => {
    const url = new URL(link.getAttribute('href'), location.href);

    if (link.target === '_blank' || url.origin !== location.origin) return;
    if (url.hash && url.pathname === location.pathname) return;
    if (link.getAttribute('href').startsWith('#')) return;

    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      document.body.classList.remove('page-visible');
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = url.href;
      }, 220);
    });
  });
});
