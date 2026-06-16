/* ============================================================
   CarePoint Hospital — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. Emergency Bar & Nav Scroll Behaviour ────────────── */
  const emergBar = document.getElementById('emergBar');
  const nav      = document.getElementById('mainNav');

  // Set nav initial top based on emergency bar height
  const emergH = emergBar ? emergBar.offsetHeight : 0;
  nav.style.top = emergH + 'px';

  function onScroll() {
    const scrolled = window.scrollY > 80;

    // Toggle nav scrolled class (triggers frosted-glass style)
    nav.classList.toggle('scrolled', scrolled);

    // Slide emergency bar up when user scrolls down
    if (emergBar) {
      emergBar.style.transform = scrolled ? 'translateY(-100%)' : 'translateY(0)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  /* ── 2. Mobile Menu Toggle ──────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Called inline by mobile menu links (onclick="closeMobile()")
  window.closeMobile = function () {
    if (hamburger)  hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };


  /* ── 3. Scroll-Reveal Animation ─────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once revealed (one-time animation)
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ── 4. Appointment Form ────────────────────────────────── */
  const apptForm = document.getElementById('apptForm');

  if (apptForm) {
    // Block past dates in the date picker
    const dateInput = document.getElementById('appt-date');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    // Handle submission
    apptForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = apptForm.querySelector('.appt-submit');

      // Show success state
      btn.textContent = '✓ Appointment Requested — We\'ll confirm within 2 hours';
      btn.style.background = 'var(--green)';
      btn.disabled = true;

      // Reset after 5 seconds
      setTimeout(function () {
        btn.textContent = 'Confirm Appointment';
        btn.style.background = '';
        btn.disabled = false;
        apptForm.reset();
      }, 5000);
    });
  }


  /* ── 5. Smooth Active Nav Highlight on Scroll ───────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-appt)');

  function highlightNav() {
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.style.color = '#fff';
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

});
