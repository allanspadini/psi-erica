document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     MOBILE NAVIGATION MENU
     ========================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================
     SHRINKING HEADER ON SCROLL
     ========================================== */
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  /* ==========================================
     COELHO MODE (RABBIT MODE) TOGGLE
     ========================================== */
  const bunnyToggles = document.querySelectorAll('.bunny-toggle-trigger');
  const body = document.body;
  const whatsappBtns = document.querySelectorAll('.whatsapp-link');

  const WHATSAPP_NUMBER = '5511987993517';
  const MSG_CLINICAL = 'Olá, Érica! Vi seu site e gostaria de saber mais sobre as consultas de terapia.';
  const MSG_COELHO = 'Olá, Érica! Vi seu site de coelhinho e quero marcar meu salto terapêutico (cenouraterapia)! 🐰🥕';

  // Function to update WhatsApp links dynamically
  const updateWhatsAppLinks = (isCoelho) => {
    const textMsg = encodeURIComponent(isCoelho ? MSG_COELHO : MSG_CLINICAL);
    whatsappBtns.forEach(btn => {
      btn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${textMsg}`);
    });
  };

  // Function to toggle the mode
  const toggleCoelhoMode = (enable) => {
    if (enable) {
      body.classList.add('coelho-mode');
      localStorage.setItem('theme-coelho', 'enabled');
      updateWhatsAppLinks(true);
    } else {
      body.classList.remove('coelho-mode');
      localStorage.setItem('theme-coelho', 'disabled');
      updateWhatsAppLinks(false);
    }
  };

  // Check saved theme preference on load
  const savedTheme = localStorage.getItem('theme-coelho');
  if (savedTheme === 'enabled') {
    toggleCoelhoMode(true);
  } else {
    updateWhatsAppLinks(false);
  }

  // Bind click event to all triggers
  bunnyToggles.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = body.classList.contains('coelho-mode');
      toggleCoelhoMode(!isActive);
      
      // Hop micro-animation feedback
      trigger.style.transform = 'scale(0.85)';
      setTimeout(() => {
        trigger.style.transform = '';
      }, 150);
    });
  });

  /* ==========================================
     SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before coming into view
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: make all visible if browser doesn't support IntersectionObserver
    revealElements.forEach(el => {
      el.classList.add('visible');
    });
  }
});
