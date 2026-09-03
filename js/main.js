/**
 * ADVOCACIA BRUNA SIMÕES PEREIRA DE ALMEIDA
 * Modern Luxury Client-Side Interactions & UI Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollSpy();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initTestimonialsCarousel();
  initFaqAccordion();
  initContactForm();
  initWhatsAppFloating();
});

/* --------------------------------------------------------------------------
   1. Sticky Header with Glassmorphism
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-open') && 
        !navMenu.contains(e.target) && 
        !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   3. ScrollSpy (Active Navigation Link on Scroll)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Smooth Scrolling with Offset for Sticky Header
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-fade, .reveal-fade-left, .reveal-fade-right, .reveal-scale');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. Animated Metric Counters
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.metric-number');
  if (!counters.length) return;

  const formatNumber = (num) => {
    return num.toLocaleString('pt-BR');
  };

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counterInterval = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(target * easeOut);

      el.textContent = formatNumber(currentVal);

      if (currentFrame >= totalFrames) {
        el.textContent = formatNumber(target);
        clearInterval(counterInterval);
      }
    }, frameRate);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   7. Testimonials Carousel
   -------------------------------------------------------------------------- */
function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  let autoplayInterval;

  // Create dot indicators
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Ir para depoimento ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.carousel-dot');

  const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    updateCarousel();
    resetAutoplay();
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  const handleSwipe = () => {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  };

  // Autoplay
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    startAutoplay();
  };

  startAutoplay();

  const wrapper = document.querySelector('.testimonials-carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    wrapper.addEventListener('mouseleave', startAutoplay);
  }
}

/* --------------------------------------------------------------------------
   8. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other accordion items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Contact Form Validation & Masking
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('lawContactForm');
  const phoneInput = document.getElementById('phone');
  const modal = document.getElementById('successModal');
  const closeModalBtns = document.querySelectorAll('.close-modal-trigger');

  if (phoneInput) {
    // Phone Mask: (99) 99999-9999
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 11) val = val.slice(0, 11);

      if (val.length > 6) {
        val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
      } else if (val.length > 2) {
        val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
      } else if (val.length > 0) {
        val = `(${val}`;
      }
      e.target.value = val;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const area = document.getElementById('area').value;
      const message = document.getElementById('message').value.trim();
      const sendWhatsApp = document.getElementById('sendWhatsApp')?.checked;

      if (!name || !email || !phone || !area || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // If user selected to dispatch via WhatsApp directly
      if (sendWhatsApp) {
        const areaLabelMap = {
          'civil': 'Direito Civil',
          'familia': 'Direito de Família',
          'trabalhista': 'Direito do Trabalho',
          'outro': 'Outro Assunto Jurídico'
        };

        const areaName = areaLabelMap[area] || area;
        const encodedText = encodeURIComponent(
          `Olá, Dra. Bruna Simões. Meu nome é *${name}*.\n\n` +
          `• *Telefone:* ${phone}\n` +
          `• *E-mail:* ${email}\n` +
          `• *Área de Interesse:* ${areaName}\n\n` +
          `*Mensagem:*\n${message}`
        );

        // WhatsApp redirect
        const waUrl = `https://wa.me/5511999999999?text=${encodedText}`;
        window.open(waUrl, '_blank');
      }

      // Show luxury confirmation modal
      if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
    });
  }

  // Modal close handlers
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   10. WhatsApp Quick Connect
   -------------------------------------------------------------------------- */
function initWhatsAppFloating() {
  const waBtn = document.querySelector('.whatsapp-btn');
  if (!waBtn) return;

  waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const defaultMsg = encodeURIComponent('Olá, Dra. Bruna Simões. Gostaria de agendar uma consulta jurídica.');
    window.open(`https://wa.me/5511999999999?text=${defaultMsg}`, '_blank');
  });
}
