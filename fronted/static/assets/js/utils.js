/**
 * utils.js — Shared utility functions
 */

/** Debounce function */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Set URL search params without page reload */
export function setURLParams(params) {
  const url = new URL(location.href);
  Object.entries(params).forEach(([k, v]) => {
    if (v === null || v === '' || v === 'all' || v === '1' && k === 'page') {
      url.searchParams.delete(k);
    } else {
      url.searchParams.set(k, v);
    }
  });
  history.replaceState({}, '', url);
}

/** Get URL search param */
export function getURLParam(key, fallback = '') {
  return new URL(location.href).searchParams.get(key) || fallback;
}

/** Show a toast notification */
export function showToast(message, type = 'success', duration = 4000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <span class="toast__text"></span>
    `;
    document.body.appendChild(toast);
  }
  toast.className = `toast toast--${type}`;
  toast.querySelector('.toast__text').textContent = message;

  // Update icon based on type
  const iconSVG = type === 'success'
    ? '<polyline points="20 6 9 17 4 12"/>'
    : '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
  toast.querySelector('.toast__icon').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${iconSVG}
    </svg>
  `;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('is-visible'));
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, duration);
}

/** Scroll-reveal via IntersectionObserver */
export function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal--left, .reveal--right');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

/** Parallax on hero elements */
export function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/** Active nav link highlight based on current page */
export function highlightActiveNav() {
  const path = location.pathname;
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    let active = false;

    if (href === 'index.html' || href === '/' || href === './') {
      active = path === '/' || path.endsWith('index.html') || path === '';
    } else if (href && path.includes(href.replace('.html', ''))) {
      active = true;
    }

    link.classList.toggle('active', active);
  });
}

/** Format a date string nicely */
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('az-AZ', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

/** Create SVG icon string */
export function icon(name) {
  const icons = {
    search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    inbox: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.84L1.254 2.25H8.08l4.259 5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.45a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.7-1.7a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mapPin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    target: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    heart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  };
  return icons[name] || '';
}

/** Render HTML header with navigation */
export function renderHeader() {
  return `
    <header class="header" id="site-header">
      <div class="header__inner">
        <a href="index.html" class="header__logo" aria-label="Formula Blog Ana Səhifə">
          <div class="logo-mark">F</div>
          <span class="logo-text">Formula<span>Blog</span></span>
        </a>
        <nav class="header__nav" aria-label="Əsas naviqasiya">
          <a href="index.html" class="nav__link" id="nav-home">Ana Səhifə</a>
          <a href="blog.html" class="nav__link" id="nav-blog">Blog</a>
          <a href="about.html" class="nav__link" id="nav-about">Haqqımızda</a>
          <a href="contact.html" class="nav__link" id="nav-contact">Əlaqə</a>
        </nav>
        <div class="header__actions">
          <button class="hamburger" id="hamburger" aria-label="Menyunu aç/bağla" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobil naviqasiya">
      <a href="index.html" class="mobile-nav__link">Ana Səhifə</a>
      <a href="blog.html" class="mobile-nav__link">Blog</a>
      <a href="about.html" class="mobile-nav__link">Haqqımızda</a>
      <a href="contact.html" class="mobile-nav__link">Əlaqə</a>
      <div class="mobile-nav__socials">
        <a href="#" aria-label="Twitter">${icon('twitter')}</a>
        <a href="#" aria-label="Instagram">${icon('instagram')}</a>
        <a href="#" aria-label="YouTube">${icon('youtube')}</a>
      </div>
    </nav>
  `;
}

/** Render HTML footer */
export function renderFooter() {
  return `
    <footer class="footer" role="contentinfo">
      <div class="footer__main">
        <div class="footer__brand">
          <a href="index.html" class="footer__logo">
            <div class="logo-mark">F</div>
            <span class="logo-text">Formula<span>Blog</span></span>
          </a>
          <p>F1 dünyasının dərinliklərinə gedən, texniki analiz, yarış reportajı və motor idmanının hər kösesini araşdıran Azərbaycanın premier blog platforması.</p>
          <div class="footer__socials">
            <a href="#" aria-label="Twitter">${icon('twitter')}</a>
            <a href="#" aria-label="Instagram">${icon('instagram')}</a>
            <a href="#" aria-label="YouTube">${icon('youtube')}</a>
            <a href="#" aria-label="Facebook">${icon('facebook')}</a>
          </div>
        </div>
        <div>
          <p class="footer__col-title">Sürətli Keçidlər</p>
          <ul class="footer__links">
            <li><a href="index.html">Ana Səhifə</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">Haqqımızda</a></li>
            <li><a href="contact.html">Əlaqə</a></li>
          </ul>
        </div>
        <div>
          <p class="footer__col-title">Kateqoriyalar</p>
          <ul class="footer__links">
            <li><a href="blog.html?tag=Texnologiya">Texnologiya</a></li>
            <li><a href="blog.html?tag=Yarış">Yarış</a></li>
            <li><a href="blog.html?tag=Sürücü">Sürücülər</a></li>
            <li><a href="blog.html?tag=Komanda">Komandalar</a></li>
            <li><a href="blog.html?tag=Tarix">Tarix</a></li>
            <li><a href="blog.html?tag=Strategiya">Strategiya</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-inner">
          <p>&copy; ${new Date().getFullYear()} FormulaBlog. Bütün hüquqlar qorunur.</p>
          <div class="footer__badge">
            <span class="dot"></span>
            <span>F1 Sezonu Davam Edir</span>
          </div>
        </div>
      </div>
    </footer>
    <div class="toast" id="toast" role="alert" aria-live="polite">
      <div class="toast__icon"></div>
      <span class="toast__text"></span>
    </div>
  `;
}

/** Article card HTML */
export function renderArticleCard(post, author) {
  const authorName = author ? author.name : 'Müəllif';
  const authorAvatar = author ? author.avatar : 'https://i.pravatar.cc/150?img=1';
  const firstTag = post.tags[0] || '';
  const date = formatDate(post.date);

  return `
    <a href="blog-detail.html?slug=${post.slug}" class="article-card reveal" data-id="${post.id}">
      <div class="article-card__image-wrap">
        <img src="${post.image}" alt="${post.title}" loading="lazy" width="400" height="200">
        ${firstTag ? `<div class="article-card__tag-overlay"><span class="tag">${firstTag}</span></div>` : ''}
      </div>
      <div class="article-card__body">
        <h3 class="article-card__title">${post.title}</h3>
        <p class="article-card__excerpt">${post.excerpt}</p>
        <div class="article-card__footer">
          <div class="article-card__author">
            <img src="${authorAvatar}" alt="${authorName}" loading="lazy">
            <span>${authorName}</span>
          </div>
          <span class="article-card__date">
            ${icon('calendar')}
            ${date}
          </span>
        </div>
      </div>
    </a>
  `;
}

/** Skeleton card */
export function renderSkeletonCard() {
  return `
    <div class="article-card" style="pointer-events:none">
      <div class="skeleton skeleton--image"></div>
      <div class="article-card__body">
        <div class="skeleton skeleton--title" style="margin-bottom:.75rem"></div>
        <div class="skeleton skeleton--text" style="margin-bottom:.5rem"></div>
        <div class="skeleton skeleton--text" style="width:60%"></div>
      </div>
    </div>
  `;
}

/** Init header behaviour */
export function initHeaderBehavior() {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (!header || !hamburger || !mobileNav) return;

  // Scroll → add .scrolled
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on overlay click (outside nav links)
  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}
