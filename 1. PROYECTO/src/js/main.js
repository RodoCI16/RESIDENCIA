/**
 * Lógica Principal - Plataforma Integral Hospital Mazahua (SPA One-Page)
 */

window.addEventListener('pageshow', () => {
  document.body.classList.remove('fade-out');
});

const initMainPage = () => {

  // ========================================================
  // 1. MODO CLARO / OSCURO (ESCRITORIO Y MÓVIL SINCRONIZADOS)
  // ========================================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const sunIconMobile = document.getElementById('sun-icon-mobile');
  const moonIconMobile = document.getElementById('moon-icon-mobile');
  const themeTextMobile = document.getElementById('theme-text-mobile');

  const updateThemeUI = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      sunIcon?.classList.remove('hidden');
      moonIcon?.classList.add('hidden');
      sunIconMobile?.classList.remove('hidden');
      moonIconMobile?.classList.add('hidden');
      if (themeTextMobile) themeTextMobile.textContent = 'Modo Claro';
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon?.classList.add('hidden');
      moonIcon?.classList.remove('hidden');
      sunIconMobile?.classList.add('hidden');
      moonIconMobile?.classList.remove('hidden');
      if (themeTextMobile) themeTextMobile.textContent = 'Modo Oscuro';
    }
  };

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextThemeIsDark = !isCurrentlyDark;
    localStorage.setItem('theme', nextThemeIsDark ? 'dark' : 'light');
    updateThemeUI(nextThemeIsDark);
  };

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    updateThemeUI(true);
  } else {
    updateThemeUI(false);
  }

  themeToggle?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);

  // ========================================================
  // 2. MANEJO DEL MENÚ MÓVIL
  // ========================================================
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', '-translate-y-2');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
      }, 10);
    };

    const closeMenu = () => {
      if (mobileMenu.classList.contains('hidden')) return;
      mobileMenu.classList.remove('opacity-100', 'translate-y-0');
      mobileMenu.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }, 300);
    };

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });
  }

  // ========================================================
  // 3. CARRUSEL AUTOMÁTICO EN EL HERO
  // ========================================================
  const initCarousel = (selector) => {
    const slides = document.querySelectorAll(selector);
    if (slides.length > 1) {
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
      }, 5000);
    }
  };

  initCarousel('.hero-slide-desktop');
  initCarousel('.hero-slide-mobile');

  // ========================================================
  // 4. CONTROL DE PESTAÑAS: ESPECIALIDADES VS SERVICIOS
  // ========================================================
  const tabEsp = document.getElementById('tab-especialidades');
  const tabSer = document.getElementById('tab-servicios');
  const mainTrack = document.getElementById('slider-track');
  const sectionDesc = document.getElementById('section-desc');

  if (tabEsp && tabSer && mainTrack) {
    tabEsp.addEventListener('click', () => {
      mainTrack.style.transform = 'translateX(0%)';
      tabEsp.className = 'text-cyan-800 dark:text-cyan-400 border-b-2 border-cyan-800 dark:border-cyan-400 pb-1 transition-all duration-300 cursor-pointer';
      tabSer.className = 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-1 transition-all duration-300 cursor-pointer';
      if (sectionDesc) sectionDesc.textContent = 'Atención médica profesional respaldada por especialistas certificados.';
    });

    tabSer.addEventListener('click', () => {
      mainTrack.style.transform = 'translateX(-50%)';
      tabSer.className = 'text-cyan-800 dark:text-cyan-400 border-b-2 border-cyan-800 dark:border-cyan-400 pb-1 transition-all duration-300 cursor-pointer';
      tabEsp.className = 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-1 transition-all duration-300 cursor-pointer';
      if (sectionDesc) sectionDesc.textContent = 'Infraestructura clínica, diagnóstico oportuno y atención hospitalaria integral.';
    });
  }

  // ========================================================
  // 5. PAGINACIÓN HORIZONTAL: ESPECIALIDADES
  // ========================================================
  let pageEsp = 0;
  const trackEsp = document.getElementById('track-especialidades');
  const prevEsp = document.getElementById('prev-esp');
  const nextEsp = document.getElementById('next-esp');
  const dotEsp0 = document.getElementById('dot-esp-0');
  const dotEsp1 = document.getElementById('dot-esp-1');

  const updateEspPagination = () => {
    if (!trackEsp) return;
    trackEsp.style.transform = pageEsp === 0 ? 'translateX(0%)' : 'translateX(-50%)';
    if (prevEsp) prevEsp.disabled = pageEsp === 0;
    if (nextEsp) nextEsp.disabled = pageEsp === 1;

    if (dotEsp0 && dotEsp1) {
      dotEsp0.className = pageEsp === 0 ? 'w-3 h-3 rounded-full bg-cyan-700 transition-all' : 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 transition-all';
      dotEsp1.className = pageEsp === 1 ? 'w-3 h-3 rounded-full bg-cyan-700 transition-all' : 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 transition-all';
    }
  };

  prevEsp?.addEventListener('click', () => { if (pageEsp > 0) { pageEsp--; updateEspPagination(); } });
  nextEsp?.addEventListener('click', () => { if (pageEsp < 1) { pageEsp++; updateEspPagination(); } });
  updateEspPagination();

  // ========================================================
  // 6. PAGINACIÓN HORIZONTAL: SERVICIOS
  // ========================================================
  let pageSer = 0;
  const trackSer = document.getElementById('track-servicios');
  const prevSer = document.getElementById('prev-ser');
  const nextSer = document.getElementById('next-ser');
  const dotSer0 = document.getElementById('dot-ser-0');
  const dotSer1 = document.getElementById('dot-ser-1');

  const updateSerPagination = () => {
    if (!trackSer) return;
    trackSer.style.transform = pageSer === 0 ? 'translateX(0%)' : 'translateX(-50%)';
    if (prevSer) prevSer.disabled = pageSer === 0;
    if (nextSer) nextSer.disabled = pageSer === 1;

    if (dotSer0 && dotSer1) {
      dotSer0.className = pageSer === 0 ? 'w-3 h-3 rounded-full bg-cyan-700 transition-all' : 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 transition-all';
      dotSer1.className = pageSer === 1 ? 'w-3 h-3 rounded-full bg-cyan-700 transition-all' : 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 transition-all';
    }
  };

  prevSer?.addEventListener('click', () => { if (pageSer > 0) { pageSer--; updateSerPagination(); } });
  nextSer?.addEventListener('click', () => { if (pageSer < 1) { pageSer++; updateSerPagination(); } });
  updateSerPagination();

  // ========================================================
  // 7. PAGINACIÓN DE INSTALACIONES (3 COLUMNAS X 2 FILAS)
  // ========================================================
  let pageInst = 0;
  const trackInst = document.getElementById('track-instalaciones');
  const prevInst = document.getElementById('prev-inst');
  const nextInst = document.getElementById('next-inst');
  const dotInst0 = document.getElementById('dot-inst-0');
  const dotInst1 = document.getElementById('dot-inst-1');

  const updateInstPagination = () => {
    if (!trackInst) return;
    trackInst.style.transform = pageInst === 0 ? 'translateX(0%)' : 'translateX(-50%)';
    if (prevInst) prevInst.disabled = pageInst === 0;
    if (nextInst) nextInst.disabled = pageInst === 1;

    if (dotInst0 && dotInst1) {
      dotInst0.className = pageInst === 0 
        ? 'w-3 h-3 rounded-full bg-cyan-700 transition-all' 
        : 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 transition-all';
      dotInst1.className = pageInst === 1 
        ? 'w-3 h-3 rounded-full bg-cyan-700 transition-all' 
        : 'w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 transition-all';
    }
  };

  prevInst?.addEventListener('click', () => { if (pageInst > 0) { pageInst--; updateInstPagination(); } });
  nextInst?.addEventListener('click', () => { if (pageInst < 1) { pageInst++; updateInstPagination(); } });
  updateInstPagination();

  // ========================================================
  // 8. MODAL DE HORARIOS DE ATENCIÓN
  // ========================================================
  const btnOpenSchedules = document.getElementById('btn-open-schedules');
  const btnCloseSchedules = document.getElementById('btn-close-schedules');
  const schedulesModal = document.getElementById('schedules-modal');
  const schedulesCard = document.getElementById('schedules-card');

  if (btnOpenSchedules && schedulesModal && schedulesCard) {
    const openSchedules = () => {
      schedulesModal.classList.remove('opacity-0', 'pointer-events-none');
      schedulesModal.classList.add('opacity-100', 'pointer-events-auto');
      schedulesCard.classList.remove('scale-95', 'opacity-0');
      schedulesCard.classList.add('scale-100', 'opacity-100');
    };

    const closeSchedules = () => {
      schedulesCard.classList.remove('scale-100', 'opacity-100');
      schedulesCard.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        schedulesModal.classList.remove('opacity-100', 'pointer-events-auto');
        schedulesModal.classList.add('opacity-0', 'pointer-events-none');
      }, 200);
    };

    btnOpenSchedules.addEventListener('click', openSchedules);
    btnCloseSchedules?.addEventListener('click', closeSchedules);
    schedulesModal.addEventListener('click', (e) => {
      if (e.target === schedulesModal) closeSchedules();
    });
  }

  // ========================================================
  // 9. SCROLL SPY: RESALTADO DINÁMICO (PROTEGIDO EN DARK MODE)
  // ========================================================
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('#desktop-nav [data-nav-link]');
  const mobileLinks = document.querySelectorAll('#mobile-menu [data-nav-link]');

  const activeDesktopClasses = ['text-cyan-800', 'font-bold', 'border-b-2', 'border-cyan-800', 'pb-1'];
  const inactiveDesktopClasses = ['text-[#0b2545]', 'font-semibold'];

  const activeMobileClasses = ['text-cyan-800', 'font-bold', 'border-l-4', 'border-cyan-800', 'pl-2'];
  const inactiveMobileClasses = ['text-[#0b2545]', 'font-semibold'];

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');

        desktopLinks.forEach(link => {
          const target = link.getAttribute('data-nav-link');
          if (target === activeId) {
            link.classList.add(...activeDesktopClasses);
            link.classList.remove(...inactiveDesktopClasses);
          } else {
            link.classList.remove(...activeDesktopClasses);
            link.classList.add(...inactiveDesktopClasses);
          }
        });

        mobileLinks.forEach(link => {
          const target = link.getAttribute('data-nav-link');
          if (target === activeId) {
            link.classList.add(...activeMobileClasses);
            link.classList.remove('border-l-0', 'pl-0');
          } else {
            link.classList.remove(...activeMobileClasses);
            link.classList.add(...inactiveMobileClasses);
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => spyObserver.observe(section));

  // ========================================================
  // 10. ENLACE DIRECTO A TU login.js
  // ========================================================
  const btnLoginDesktop = document.getElementById('btn-open-login');
  const btnLoginMobile = document.getElementById('btn-open-login-mobile');

  const triggerCustomLogin = (e) => {
    // Si login.js expone alguna función global
    if (typeof window.openLoginModal === 'function') {
      e.preventDefault();
      window.openLoginModal();
    } else if (typeof window.toggleLoginModal === 'function') {
      e.preventDefault();
      window.toggleLoginModal();
    }
    // Si login.js escucha por evento de clic propio en el botón, no intervenimos para no bloquearlo
  };

  btnLoginDesktop?.addEventListener('click', triggerCustomLogin);
  btnLoginMobile?.addEventListener('click', triggerCustomLogin);
};

document.addEventListener('DOMContentLoaded', initMainPage);