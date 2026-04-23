/* ──────────────────────────────────────
   main.js — Portfolio Ilham
────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15,15,19,0.92)';
      navbar.style.backdropFilter = 'blur(14px)';
      navbar.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
      navbar.style.padding = '14px 0';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
      navbar.style.borderBottom = '';
      navbar.style.padding = '';
    }
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  /* ── HERO ANIMATIONS ── */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('#heroHey',  { y: 20, opacity: 0, duration: 0.5 })
    .from('#heroName', { y: 30, opacity: 0, duration: 0.65 }, '-=0.25')
    .from('#heroRole', { y: 20, opacity: 0, duration: 0.5  }, '-=0.35')
    .from('#heroDesc', { y: 15, opacity: 0, duration: 0.5  }, '-=0.3')
    .from('#heroBtns', { y: 15, opacity: 0, duration: 0.45 }, '-=0.25')
    .from('#heroDeco', { x: 20, opacity: 0, duration: 0.6  }, '-=0.4');

  /* ── FADE-UP ON SCROLL ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* ── PROJECT CARDS STAGGER ── */
  gsap.from('.project-card', {
    scrollTrigger: { trigger: '#projects', start: 'top 80%' },
    y: 35,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
  });

  /* ── SKILL ITEMS STAGGER ── */
  gsap.from('.skill-item', {
    scrollTrigger: { trigger: '#skills', start: 'top 80%' },
    y: 16,
    opacity: 0,
    duration: 0.45,
    stagger: 0.04,
    ease: 'power2.out',
  });

  /* ── CONTACT ITEMS STAGGER ── */
  gsap.from('.contact-item', {
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    y: 16,
    opacity: 0,
    duration: 0.45,
    stagger: 0.08,
    ease: 'power2.out',
  });

  /* ── ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}` ? '#e8e8f0' : '';
    });
  }, { passive: true });

  /* ── MODAL ── */
  const modalBg    = document.getElementById('modalBg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc  = document.getElementById('modalDesc');
  const modalTags  = document.getElementById('modalTags');
  const modalLink  = document.getElementById('modalLink');
  const modalThumb = document.getElementById('modalThumb');
  const modalClose = document.getElementById('modalClose');

  function openModal(card) {
    modalTitle.textContent = card.dataset.title || '';
    modalDesc.textContent  = card.dataset.desc  || '';
    modalLink.href         = card.dataset.link  || '#';
    modalThumb.textContent = card.dataset.title || '';

    modalTags.innerHTML = (card.dataset.tags || '')
      .split(',')
      .map(t => `<span class="text-[11px] font-semibold tracking-wide uppercase text-accent2 bg-accent/10 border border-accent/20 rounded-md px-2 py-[2px]">${t.trim()}</span>`)
      .join('');

    modalBg.classList.add('open');
    modalBg.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBg.classList.remove('open');
    modalBg.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    if (card.dataset.status === 'active') {
      card.addEventListener('click', () => openModal(card));
    }
  });

  modalClose.addEventListener('click', closeModal);
  modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

});