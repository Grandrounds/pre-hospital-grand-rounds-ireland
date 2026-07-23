/* EMS E Café — site behaviour. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  /* Mobile navigation ------------------------------------------------------ */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.site-nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Header shadow once the page scrolls ------------------------------------ */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Scroll reveal ---------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealables.length && 'IntersectionObserver' in window && !reduced) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { observer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Site search ------------------------------------------------------------ */
  var pages = [
    { t: 'Home', u: 'index.html', d: 'Independent education and Grand Rounds for Ireland\u2019s pre-hospital community.', k: 'home welcome start' },
    { t: 'Learning Caf\u00e9', u: 'learning.html', d: 'ECG decision-making, airway, trauma, paediatrics and medical emergencies.', k: 'courses modules cpd education ecg airway trauma paediatrics learning' },
    { t: 'Case Discussions', u: 'case-studies.html', d: 'De-identified cases for clinical reasoning and reflective practice.', k: 'case study cases clinical reasoning reflection discussion' },
    { t: 'Grand Rounds', u: 'grand-rounds.html', d: 'Live, recorded and multidisciplinary sessions.', k: 'events sessions webinar live recording speaker programme' },
    { t: 'Reference Library', u: 'resources.html', d: 'Guidelines, journal club, infographics, ECG library, pharmacology, research.', k: 'library resources guidelines journal club ecg drugs pharmacology research audit' },
    { t: 'The Break Room', u: 'community.html', d: 'Professional dialogue, reflection and shared learning.', k: 'community forum discussion break room' },
    { t: 'About EMS E Caf\u00e9', u: 'about.html', d: 'Purpose, values and who the platform serves.', k: 'about mission values purpose independence' },
    { t: 'Clinical Governance', u: 'governance.html', d: 'Standards, accountability and patient confidentiality.', k: 'governance policy editorial peer review confidentiality safeguarding complaints' },
    { t: 'Learning Portal', u: 'portal.html', d: 'Secure access to learning, discussion and professional records.', k: 'portal sign in login account cpd certificates dashboard' },
    { t: 'Profile Verification', u: 'membership.html', d: 'Free verification for secure professional access.', k: 'membership register account verify phecc imc nmbi hcpc' },
    { t: 'Submit a Case', u: 'submit-case.html', d: 'Contribute safely to shared learning.', k: 'submit case contribute author propose' },
    { t: 'Get Involved', u: 'contact.html', d: 'Contribute, teach, review or collaborate.', k: 'contact email enquiry speaker reviewer volunteer' },
    { t: 'Privacy Notice', u: 'privacy.html', d: 'How information will be handled.', k: 'privacy gdpr data protection cookies hosting' }
  ];

  var overlay = document.querySelector('.search-overlay');
  var searchBtn = document.querySelector('.search-btn');
  var input = document.querySelector('.search-field input');
  var results = document.querySelector('.search-results');

  function render(query) {
    var q = query.trim().toLowerCase();
    var matches = q
      ? pages.filter(function (p) { return (p.t + ' ' + p.d + ' ' + p.k).toLowerCase().indexOf(q) > -1; })
      : pages.slice(0, 6);

    if (!matches.length) {
      results.innerHTML = '<p class="search-note">No pages match that yet. Try &ldquo;ECG&rdquo;, &ldquo;grand rounds&rdquo; or &ldquo;governance&rdquo;.</p>';
      return;
    }
    results.innerHTML = matches.map(function (p) {
      return '<a href="' + p.u + '"><strong>' + p.t + '</strong><span>' + p.d + '</span></a>';
    }).join('');
  }

  function openSearch() {
    overlay.classList.add('open');
    input.value = '';
    render('');
    input.focus();
  }

  function closeSearch() {
    overlay.classList.remove('open');
    if (searchBtn) searchBtn.focus();
  }

  if (searchBtn && overlay && input && results) {
    searchBtn.addEventListener('click', openSearch);
    input.addEventListener('input', function () { render(input.value); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('.search-close')) closeSearch();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) { closeSearch(); return; }
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === '/' && !overlay.classList.contains('open')) { e.preventDefault(); openSearch(); }
    });
  }

  /* Preview forms ---------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('form[data-demo]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-status');
      if (!note) {
        note = document.createElement('p');
        note.className = 'form-status notice notice-info';
        note.setAttribute('role', 'status');
        form.appendChild(note);
      }
      note.textContent = 'This is a preview site, so nothing was sent. Forms will connect to the secure learning platform before launch.';
    });
  });

  /* Footer year ------------------------------------------------------------ */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
