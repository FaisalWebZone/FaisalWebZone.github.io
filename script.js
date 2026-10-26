/* ==========================================================================
   FAISAL AHMED — INTERACTIVE PORTFOLIO ENGINE (script.js)
   60fps Neural Canvas • 3D Tilt • Spotlight Cards • Case Study Modals
   ========================================================================== */

// 1. PRELOADER BOOT SEQUENCE
window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('loader-bar');
  const text = document.getElementById('loader-text');
  let progress = 0;

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 22) + 14;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 250);
    }
    if (bar) bar.style.width = `${progress}%`;
    if (text) text.textContent = `INITIALIZING FAISAL.DEV // ${progress}%`;
  }, 90);
});

// 2. INTERACTIVE NEURAL NETWORK CANVAS
(function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.65;
      this.vy = (Math.random() - 0.5) * 0.65;
      this.size = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          this.x -= (dx / dist) * 0.8;
          this.y -= (dy / dist) * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(Math.floor((width * height) / 16000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 135) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 135) * 0.25})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();

// 3. CUSTOM MAGNETIC CURSOR & SPOTLIGHT CARDS
(function initCursorAndSpotlight() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  let outlineX = 0, outlineY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (dot) {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    if (outline) {
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  const hoverables = document.querySelectorAll('a, button, .spotlight-card, input, textarea');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => outline && outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline && outline.classList.remove('hovering'));
  });

  // Spotlight radial coordinates
  document.querySelectorAll('.spotlight-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
})();

// 4. 3D HERO PROFILE CARD TILT
(function init3DTilt() {
  const card = document.getElementById('hero-tilt-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
})();

// 5. TYPEWRITER EFFECT
(function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const roles = [
    'Data Science & ML Enthusiast',
    'ASP.NET Core & C# Developer',
    'Full-Stack Web Developer',
    'Database & N-Tier Architect',
    'Final-Year CSE Student @ AIUB'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function tick() {
    const current = roles[roleIdx];
    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    el.textContent = current.substring(0, charIdx);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      speed = 1900;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 350;
    }

    setTimeout(tick, speed);
  }

  tick();
})();

// 6. SCROLL PROGRESS, STICKY NAVBAR & SCROLL-SPY
(function initScrollFeatures() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${pct}%`;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollTop > 40);
    }

    let currentId = 'home';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (scrollTop >= top) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
    navLinks.forEach((l) =>
      l.addEventListener('click', () => navLinksContainer.classList.remove('open'))
    );
  }
})();

// 7. INTERSECTION OBSERVER (REVEAL, SKILL BARS & COUNTERS)
(function initObservers() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          // Animate skill progress bars inside revealed element
          entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
            bar.style.width = bar.dataset.width || '85%';
          });

          // Animate stat counters
          entry.target.querySelectorAll('.stat-number[data-count]').forEach((counter) => {
            if (counter.dataset.animated) return;
            counter.dataset.animated = 'true';
            const target = parseInt(counter.dataset.count, 10);
            const suffix = counter.dataset.suffix || '';
            const duration = 1200;
            const start = performance.now();
            const startVal = target > 1000 ? 2018 : 0;

            function step(now) {
              const elapsed = Math.min((now - start) / duration, 1);
              const val = Math.floor(startVal + (target - startVal) * elapsed);
              counter.textContent = `${val}${suffix}`;
              if (elapsed < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

// 8. SKILLS & PROJECTS FILTER TABS
(function initFilters() {
  // Skill Filters
  const skillBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('#skills-grid .skill-card');

  skillBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.skillFilter;

      skillCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Project Filters
  const projBtns = document.querySelectorAll('[data-project-filter]');
  const projCards = document.querySelectorAll('#projects-grid .project-card');

  projBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.projectFilter;

      projCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.pcat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();

// 9. PROJECT CASE STUDY MODAL DATA & FUNCTIONS
const PROJECT_DATA = {
  cargo: {
    tag: 'PROJECT 01 // COMPUTER GRAPHICS & SIMULATION',
    title: 'Cargo Flow – From Warehouse to Sea',
    tech: ['C++', 'OpenGL', 'Computer Graphics', '2D/3D Scene Animation'],
    github: 'https://github.com/FaisalWebZone/Cargo_Logistics_Visualization_Graphics',
    videoEmbed: 'https://drive.google.com/file/d/1i_nVWrm0ZE2D-rrpGEQ6I9yhIUKLDK2l/preview',
    overview:
      'Cargo Flow is a graphical simulation developed using C++ and OpenGL that visualizes the logistics process from warehouse loading to sea transportation. The project demonstrates how goods move through different stages of the logistics chain using animated scenes and interactive graphical elements.',
    responsibilities: [
      'Designed multi-stage graphical scenes and spatial layouts',
      'Implemented object movement and smooth keyframe animations using OpenGL',
      'Created visual elements including warehouse structures, cranes, trucks, and sea transportation vessels',
      'Assisted in debugging rendering pipelines and animation state logic in a collaborative team environment'
    ],
    skills: [
      'Computer graphics programming',
      'OpenGL rendering techniques',
      'Real-time animation logic implementation',
      'Team collaboration and algorithmic problem solving'
    ]
  },
  recipe: {
    tag: 'PROJECT 02 // FULL-STACK WEB APPLICATION',
    title: '👨‍🍳 Recipe Sharing Platform',
    tech: ['PHP', 'JavaScript', 'HTML5 & CSS3', 'MySQL', 'XAMPP (Apache)'],
    github: 'https://github.com/FaisalWebZone/Recipe_Sharing_Platform_Project-with-PHP',
    overview:
      'Recipe Sharing Platform is a role-based web application developed for the Web Technology course using PHP, JavaScript, and CSS. Running on an Apache & MySQL environment, the platform allows users to share, explore, and manage recipes through an interactive interface with secure authentication and role-based access control.',
    responsibilities: [
      'Designed and developed the responsive web interface for a smooth and user-friendly recipe sharing experience',
      'Implemented secure user authentication and role-based access control (User & Admin)',
      'Developed backend logic with PHP for dynamic recipe content management',
      'Created and managed the relational MySQL database schema',
      'Implemented recipe ratings, user reviews, favorites (watchlist), and admin approval workflows for recipe submissions',
      'Conducted end-to-end testing and debugging between frontend and backend'
    ],
    skills: [
      'Full-stack web development',
      'Relational database design and management (MySQL)',
      'User authentication and role-based authorization',
      'Web application architecture and moderation workflows'
    ]
  },
  library: {
    tag: 'PROJECT 03 // C# & .NET APPLICATION (OOP2)',
    title: 'Library & Inventory Management System – C# Application',
    tech: ['C#', '.NET Framework', 'Microsoft SQL Server', 'OOP2', 'Role-Based Auth'],
    github: 'https://github.com/FaisalWebZone/Library_Mangement_Project-Faisal',
    overview:
      'An individual desktop management system developed in C# and SQL Server applying core Object-Oriented Programming (OOP2) principles (encapsulation, inheritance, abstraction, polymorphism) to deliver modular, maintainable, and secure operations across Admin, Employee, and Customer roles.',
    responsibilities: [
      'Designed and implemented a multi-tier role-based authentication system (Admin, Employee, Customer)',
      'Developed complete CRUD operations for catalog and inventory management',
      'Implemented automated billing and invoice generation with transaction history',
      'Created user management and access control panels',
      'Applied OOP2 principles (encapsulation, inheritance, abstraction) for clean modularity',
      'Structured and secured persistent data storage using Microsoft SQL Server'
    ],
    skills: [
      'Object-Oriented Programming (OOP2)',
      'C# and .NET desktop application development',
      'Database design and management using SQL Server',
      'Role-based access control (RBAC) systems',
      'Application debugging and testing'
    ]
  },
  restaurant: {
    tag: 'PROJECT 04 // N-TIER BACKEND ARCHITECTURE',
    title: 'Restaurant Order & Library N-Tier Management API',
    tech: ['ASP.NET Core', 'C#', 'Entity Framework Core (Code-First)', 'SQL Server', 'N-Tier Architecture', 'Postman'],
    github: 'https://github.com/FaisalWebZone/Restaurant_Order_Table_Management-ASP.Net',
    overview:
      'A scalable backend web application built using ASP.NET Core following strict N-Tier Architecture (Presentation Layer, Business Logic Layer, Data Access Layer) and Repository Pattern. It demonstrates modern enterprise backend practices including RESTful API design, DTO mapping, role-based access control, and structured database management with Entity Framework Core (Code-First).',
    responsibilities: [
      'Architected the backend using clean N-Tier separation (Presentation Controllers, BLL, DAL)',
      'Developed RESTful APIs for core entities with full CRUD, search, and filtering capabilities',
      'Implemented Entity Framework Core (Code-First) with automated SQL Server migrations',
      'Created Data Transfer Objects (DTOs) and clean entity-response mapping',
      'Implemented role-based access control and Repository Pattern for high maintainability',
      'Verified and stress-tested all API endpoints using Postman'
    ],
    skills: [
      'Enterprise backend web development (ASP.NET Core)',
      'RESTful API design & DTO mapping',
      'N-Tier software architecture & Repository Pattern',
      'Entity Framework Core (Code-First) & SQL Server',
      'API testing and debugging with Postman'
    ]
  },
  perfume: {
    tag: 'PROJECT 05 // PYTHON SOFTWARE APPLICATION',
    title: 'Perfume Decant Management App',
    tech: ['Python', 'Data Management', 'Inventory & Order Workflows'],
    github: 'https://github.com/FaisalWebZone/Perfume_Decant_Management_App',
    overview:
      'A Python-based application designed to streamline perfume decant inventory, bottle volume splits, pricing calculations, and customer order tracking with a clean, reliable workflow.',
    responsibilities: [
      'Developed core inventory and decant volume tracking logic in Python',
      'Automated pricing and stock deduction calculations',
      'Structured modular code for easy maintenance and extensibility'
    ],
    skills: [
      'Python application development',
      'Data modeling and workflow automation',
      'Problem solving and clean code practices'
    ]
  }
};

window.openProjectModal = function (key) {
  const data = PROJECT_DATA[key];
  if (!data) return;
  const modal = document.getElementById('project-modal');
  const container = document.getElementById('project-modal-content');

  const techHtml = data.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('');
  const respHtml = data.responsibilities.map((r) => `<li>${r}</li>`).join('');
  const skillsHtml = data.skills.map((s) => `<li>${s}</li>`).join('');
  const videoHtml = data.videoEmbed
    ? `<div class="modal-section-title">🎥 Project Demonstration Video</div>
       <div class="video-iframe-wrap">
         <iframe src="${data.videoEmbed}" allow="autoplay; fullscreen" allowfullscreen></iframe>
       </div>`
    : '';

  container.innerHTML = `
    <div class="bento-tag">${data.tag}</div>
    <h3 class="bento-title" style="font-size:1.8rem;margin-bottom:12px;">${data.title}</h3>
    <div class="project-tech-stack" style="margin-bottom:18px;">${techHtml}</div>
    <p class="bento-text" style="font-size:1rem;">${data.overview}</p>
    ${videoHtml}
    <div class="modal-section-title">🛠️ My Role &amp; Responsibilities</div>
    <ul class="modal-list">${respHtml}</ul>
    <div class="modal-section-title">⚡ Skills Demonstrated</div>
    <ul class="modal-list">${skillsHtml}</ul>
    <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap;">
      <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        View Source Code on GitHub ↗
      </a>
      <button class="btn btn-outline btn-sm" onclick="closeProjectModal()">Close</button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function () {
  const modal = document.getElementById('project-modal');
  const container = document.getElementById('project-modal-content');
  if (modal) modal.classList.remove('open');
  if (container) container.innerHTML = '';
  document.body.style.overflow = '';
};

// 10. CV PREVIEW MODAL
window.openCVModal = function () {
  const modal = document.getElementById('cv-modal');
  const iframe = document.getElementById('cv-iframe');
  if (iframe && !iframe.src.includes('drive.google.com')) {
    iframe.src = 'https://drive.google.com/file/d/1L-VcS2QZ3bzO51ZPSIdkXYX_ThqqgXFl/preview';
  }
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCVModal = function () {
  const modal = document.getElementById('cv-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
};

// Close modals on backdrop click or Escape key
window.addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') closeProjectModal();
  if (e.target.id === 'cv-modal') closeCVModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeCVModal();
  }
});

// 11. COPY TO CLIPBOARD & TOAST
window.copyText = function (text, message) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message || 'Copied to clipboard!');
  });
};

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// 12. CONTACT FORM HANDLER
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const subject = document.getElementById('sender-subject').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    const mailtoLink = `mailto:faisalahmed49591@gmail.com?subject=${encodeURIComponent(
      subject + ' — from ' + name
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    showToast('Opening your email client to send message...');
    window.location.href = mailtoLink;
    form.reset();
  });
})();

// 13. THEME TOGGLE (DARK / LIGHT MODE)
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('faisal-theme') || 'dark';
  root.setAttribute('data-theme', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', current);
      localStorage.setItem('faisal-theme', current);
      showToast(`Switched to ${current === 'dark' ? 'Cyber Dark' : 'Clean Light'} Mode`);
    });
  }
})();
