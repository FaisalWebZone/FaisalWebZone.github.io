/* ==========================================================================
   FAISAL AHMED.PORTFOLIO — INTERACTIVE PORTFOLIO ENGINE (script.js)
   Junior Software Engineer @ Learning Shaper Technologies Limited
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
    if (text) text.textContent = `INITIALIZING FAISAL AHMED.PORTFOLIO // ${progress}%`;
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
      this.color = Math.random() > 0.45 ? '#ef4444' : '#38bdf8';
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
  if (!card || window.matchMedia('(pointer: coarse)').matches) return;

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
    'Junior Software Engineer @ Learning Shaper',
    'Deep Learning & Computer Vision Researcher (ViT • GNN • TCN)',
    'Java 21, Spring Boot 3 & React 18 Engineer',
    'Laravel 12 & Multi-Tenant ERP Architect',
    'ASP.NET Core & C# Backend Developer',
    'Full-Stack SaaS & Database Specialist'
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

    let speed = isDeleting ? 38 : 75;

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

// 6. SCROLL PROGRESS, STICKY NAVBAR, SECTION ROUTING & SCROLL-SPY
(function initScrollFeatures() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockLinks = document.querySelectorAll('.dock-item[data-dock-link]');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  const HASH_ALIASES = {
    '#work': '#experience',
    '#research': '#thesis-research-group',
    '#thesis': '#thesis-research-group',
    '#education': '#qualifications'
  };

  // Ordered targets in the document for accurate scroll-spy across all 8 navbar routes
  const SPY_TARGETS = [
    { id: 'home', navHash: '#home', dockHash: '#home' },
    { id: 'experience', navHash: '#experience', dockHash: '#experience' },
    { id: 'projects', navHash: '#projects', dockHash: '#projects' },
    { id: 'thesis-research-group', navHash: '#thesis-research-group', dockHash: '#projects' },
    { id: 'academic-projects-group', navHash: '#projects', dockHash: '#projects' },
    { id: 'skills', navHash: '#skills', dockHash: '#skills' },
    { id: 'about', navHash: '#about', dockHash: '#about' },
    { id: 'qualifications', navHash: '#qualifications', dockHash: '#qualifications' },
    { id: 'contact', navHash: '#contact', dockHash: '#contact' }
  ];

  let isProgrammaticScroll = false;
  let scrollLockTimer = null;

  function setActiveRoute(navHash) {
    const normalized = HASH_ALIASES[navHash] || navHash || '#home';
    const dockHash = normalized === '#thesis-research-group' ? '#projects' : normalized;

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === normalized);
    });
    dockLinks.forEach((dlink) => {
      dlink.classList.toggle('active', dlink.getAttribute('data-dock-link') === dockHash);
    });
  }

  function ensureProjectSectionVisible(targetHash) {
    if (targetHash !== '#projects' && targetHash !== '#thesis-research-group') return;

    const targetGroup =
      targetHash === '#thesis-research-group'
        ? document.getElementById('thesis-research-group')
        : document.getElementById('professional-projects-group');

    if (targetGroup && targetGroup.classList.contains('hidden')) {
      const allBtn = document.querySelector('[data-project-filter="all"]');
      if (allBtn) allBtn.click();
    }
  }

  function navigateToSection(rawHash, pushHistory = true) {
    if (!rawHash || !rawHash.startsWith('#')) return;
    const targetHash = HASH_ALIASES[rawHash.toLowerCase()] || rawHash;

    ensureProjectSectionVisible(targetHash);

    const targetId = targetHash.slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl && targetHash !== '#home') return;

    if (navLinksContainer) {
      navLinksContainer.classList.remove('open');
    }

    isProgrammaticScroll = true;
    if (scrollLockTimer) clearTimeout(scrollLockTimer);
    setActiveRoute(targetHash);

    const navOffset = navbar ? navbar.offsetHeight + 22 : 92;
    const targetTop =
      targetHash === '#home'
        ? 0
        : Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - navOffset);

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });

    if (pushHistory && window.history && window.history.pushState) {
      window.history.pushState(null, '', targetHash);
    }

    scrollLockTimer = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 850);
  }

  // Intercept all in-page anchor clicks (navbar, mobile dock, hero buttons, etc.)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      navigateToSection(href, true);
    });
  });

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${pct}%`;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollTop > 40);
    }

    if (isProgrammaticScroll) return;

    const triggerLine = scrollTop + (navbar ? navbar.offsetHeight + 90 : 160);
    let activeNavHash = '#home';

    for (let i = 0; i < SPY_TARGETS.length; i++) {
      const item = SPY_TARGETS[i];
      const el = document.getElementById(item.id);
      if (!el || el.classList.contains('hidden')) continue;
      const elTop = el.getBoundingClientRect().top + scrollTop;
      if (triggerLine >= elTop) {
        activeNavHash = item.navHash;
      }
    }

    if (window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 40) {
      activeNavHash = '#contact';
    }

    setActiveRoute(activeNavHash);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  window.addEventListener('popstate', () => {
    if (window.location.hash) {
      navigateToSection(window.location.hash, false);
    } else {
      navigateToSection('#home', false);
    }
  });

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // Handle initial hash on page load
  if (window.location.hash && window.location.hash !== '#home') {
    setTimeout(() => {
      navigateToSection(window.location.hash, false);
    }, 300);
  } else {
    handleScroll();
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

          entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
            bar.style.width = bar.dataset.width || '85%';
          });

          entry.target.querySelectorAll('.stat-number[data-count]').forEach((counter) => {
            if (counter.dataset.animated) return;
            counter.dataset.animated = 'true';
            const target = parseInt(counter.dataset.count, 10);
            const suffix = counter.dataset.suffix || '';
            const duration = 1200;
            const start = performance.now();
            const startVal = 0;

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

  const projBtns = document.querySelectorAll('[data-project-filter]');
  const projCards = document.querySelectorAll('#projects-grid .project-card');
  const projGroups = document.querySelectorAll('#projects-grid .project-group-block');

  projBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.projectFilter;

      projCards.forEach((card) => {
        const categories = (card.dataset.pcat || '').split(/\s+/);
        const match = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hidden', !match);
      });

      projGroups.forEach((group) => {
        const visibleInGroup = group.querySelectorAll('.project-card:not(.hidden)').length;
        group.classList.toggle('hidden', visibleInGroup === 0);
      });
    });
  });
})();

// 9. PROJECT CASE STUDY MODAL DATA (6 PROFESSIONAL + 5 CORE PROJECTS)
const PROJECT_DATA = {
  banikos: {
    tag: 'PROFESSIONAL ENTERPRISE ERP // OCTOBER 2026',
    title: 'BanikOS — Tenant & Branch-Scoped Laravel 12 ERP & Offline POS',
    tech: ['PHP 8.2', 'Laravel 12', 'MySQL 8', 'Alpine.js', 'Vite', 'Service Worker (pos-sw.js)', 'E2E Browser QA'],
    overview:
      'BanikOS is a production tenant- and branch-scoped commercial ERP built on Laravel 12 and PHP 8.2. Authoritative transactions, role/state-dependent permissions, stock ledgers, double-entry accounting, and audit controls are enforced server-side with full offline POS continuity.',
    responsibilities: [
      'Engineered multi-tenant and branch-scoped workspaces across Administration, Orders, Sales/POS with offline Service Worker continuity (pos-sw.js), Purchases, Stock & Warehouse, Services, Production, and HR/Marketing',
      'Implemented Purchase-to-Stock inventory ledgers, Delivery/Courier COD settlement workflows, and double-entry accounting control mappings (Accounts Payable/Receivable)',
      'Built comprehensive automated end-to-end (E2E) browser verification gates and staging QC matrices to guarantee zero-defect transactional parity'
    ],
    skills: [
      'Laravel 12 & PHP 8.2 enterprise backend architecture',
      'Multi-tenant & branch-scoped authorization and audit logging',
      'Double-entry accounting & warehouse stock ledger mechanics',
      'Offline-first POS architecture & automated E2E QA suites'
    ]
  },
  saleserp: {
    tag: 'PROFESSIONAL MULTI-TENANT SAAS // OCTOBER 2026',
    title: 'Sales ERP — Commercial Sales, POS, Inventory & Accounting Platform',
    tech: ['Java 21 LTS', 'Spring Boot 3.3', 'React 18', 'Node.js / Express', 'Tailwind CSS', 'MySQL 8.4 InnoDB', 'JWT'],
    overview:
      'A modern, enterprise-grade Multi-Tenant SaaS Sales ERP, Point-of-Sale (POS), Warehouse Inventory, and Double-Entry Accounting Platform engineered for SMEs, retail chains, and wholesale distributors.',
    responsibilities: [
      'Executed hybrid feature-by-feature modernization from legacy Grails into clean Java 21 + Spring Boot 3.3 JPA entities, validated DTOs, and @Transactional service layers',
      'Developed interactive React 18 + Tailwind CSS SPA interfaces for commercial sales, purchase orders, stock ledgers, barcode printing (jsbarcode), and financial vouchers',
      'Implemented automated PDF/Excel reporting (jspdf, xlsx) and production WAR packaging pipelines'
    ],
    skills: [
      'Java 21 & Spring Boot 3.3 enterprise backend engineering',
      'React 18, Vite & Tailwind CSS frontend architecture',
      'Double-entry voucher posting & stock ledger algorithms',
      'Legacy Grails-to-Spring Boot modernization'
    ]
  },
  timesheet: {
    tag: 'PROFESSIONAL ENTERPRISE ERP // OCTOBER 2026',
    title: 'Timesheet Enterprise ERP — Workforce & Resource Management',
    tech: ['Java 21', 'Spring Boot 3.3', 'React 18', 'Tailwind CSS', 'Framer Motion', 'MySQL', 'JWT', 'SheetJS (xlsx)'],
    overview:
      'Modernized Enterprise Timesheet and Resource Management ERP built with Java 21, Spring Boot 3, and React 18 to track employee work logs, project resource allocations, leave workflows, and automated productivity analytics.',
    responsibilities: [
      'Migrated legacy Grails timesheet workflows into a high-performance Spring Boot 3 REST backend with JWT authentication',
      'Built an animated, responsive React 18 + Framer Motion frontend dashboard for daily/weekly timesheet submissions and supervisor approvals',
      'Integrated bulk employee & timesheet Excel import/export pipelines using SheetJS (xlsx)'
    ],
    skills: [
      'Java 21 & Spring Boot 3 RESTful API architecture',
      'React 18 & Framer Motion UI engineering',
      'Role-based resource & timesheet workflow automation',
      'Enterprise data migration & Excel reporting'
    ]
  },
  smartprod: {
    tag: 'PROFESSIONAL MANUFACTURING ERP // SEPTEMBER 2026',
    title: 'Smart Production Hub — Apparel Production & Supply Chain ERP',
    tech: ['Java 21', 'Spring Boot 3.3', 'React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'MySQL'],
    overview:
      'End-to-end Apparel Production & Supply Chain Orchestration ERP designed to manage garment manufacturing lifecycles, bill of materials (BOM), floor production tracking, quality assurance, and supply chain logistics.',
    responsibilities: [
      'Architected modular Spring Boot 3 backend services and MySQL schemas for apparel production stages, order tracking, and supply chain orchestration',
      'Developed real-time React 18 production floor dashboards with interactive status tracking and KPI analytics',
      'Configured automated production WAR builds and Ubuntu server deployment scripts'
    ],
    skills: [
      'Supply chain & manufacturing ERP domain modeling',
      'Spring Boot 3 & Java 21 backend development',
      'React 18 & Tailwind CSS dashboard engineering',
      'Production Linux/WAR deployment automation'
    ]
  },
  superadmin: {
    tag: 'PROFESSIONAL SAAS CONTROL PLANE // AUGUST 2026',
    title: 'SuperAdmin Hub — Multi-Tenant SaaS Subscription & Billing Portal',
    tech: ['React 18', 'Node.js', 'Express 5', 'MySQL', 'Tailwind CSS', 'Framer Motion', 'SSLCommerz Gateway'],
    overview:
      'Standalone Multi-Tenant SaaS Management Control Plane powering client onboarding, tenant status control, subscription tier management, automated invoicing with SSLCommerz payment gateway integration, per-client module feature flags, and security audit logs.',
    responsibilities: [
      'Built SuperAdmin Dashboard, Client Onboarding & Impersonation (/super-admin/clients), and per-tenant Module Feature Flags (/super-admin/module-settings)',
      'Implemented Subscription Plan & Pricing Tier managers alongside automated Billing & SSLCommerz payment gateway integration',
      'Engineered system-wide security event tracking and user activity Audit Logs with Express 5 and MySQL'
    ],
    skills: [
      'Multi-tenant SaaS control plane architecture',
      'SSLCommerz payment gateway & subscription billing integration',
      'React 18, Node.js & Express 5 full-stack development',
      'Feature flagging, tenant impersonation & security auditing'
    ]
  },
  lsportal: {
    tag: 'PROFESSIONAL 3-TIER MULTI-TENANT SAAS // AUGUST 2026',
    title: 'LS Portal — Multi-Tenant Job, Admission, Tender & Event Platform',
    tech: ['Java 17/21', 'Spring Boot 3.3', 'React 18 (Vite)', 'MySQL', 'JWT', 'Multi-Tenant Routing'],
    overview:
      'A 3-Tier Multi-Tenant Enterprise SaaS Platform built with Spring Boot 3, MySQL, and React 18 that empowers organizations (including Trust Innovation & Learning Shaper) to manage sub-institutions, job circulars, business tenders, events, and online admissions from a unified ecosystem with white-label custom domain routing.',
    responsibilities: [
      'Engineered 3-Tier Multi-Tenant routing and data isolation across Master Portal, Organization Tenants, and Sub-Institutions',
      'Migrated legacy MySQL dumps into normalized multi-tenant schemas with automated SQL migration scripts',
      'Developed full-stack modules for job circular publishing, applicant tracking, online admissions, and tender management'
    ],
    skills: [
      '3-Tier Multi-Tenant SaaS architecture & white-label routing',
      'Spring Boot 3, React 18 & JWT security',
      'Complex legacy database migration & SQL normalization',
      'Enterprise portal development'
    ]
  },
  perfume: {
    tag: 'MARCH 2026 // PYTHON & TKINTER DESKTOP APPLICATION',
    title: 'Perfume Decant Management App — Python, Tkinter',
    tech: ['Python', 'Tkinter GUI', 'Inventory Tracking', 'Sales & Expense Automation'],
    github: 'https://github.com/FaisalWebZone/Perfume_Decant_Management_App',
    overview:
      'Built a comprehensive business management desktop application for perfume decant inventory, sales, and expense tracking. The application automates daily record-keeping in Python through a clean, responsive graphical user interface built with Tkinter.',
    responsibilities: [
      'Built a complete business management application for inventory, sales, and expense tracking',
      'Automated record-keeping, decant volume calculations, and profit/expense reporting using Python',
      'Designed an intuitive desktop Graphical User Interface (GUI) using Tkinter'
    ],
    skills: [
      'Python application engineering',
      'Desktop GUI design with Tkinter',
      'Business workflow & record-keeping automation',
      'Problem-solving and modular code structure'
    ]
  },
  restaurant: {
    tag: 'JANUARY 2026 // ASP.NET CORE N-TIER ARCHITECTURE',
    title: 'Restaurant Order & Table Management System — ASP.NET Core',
    tech: ['ASP.NET Core', 'C#', 'N-Tier Architecture', 'SQL Server', 'Entity Framework Core (Code-First)', 'RESTful APIs', 'Postman'],
    github: 'https://github.com/FaisalWebZone/Restaurant_Order_Table_Management-ASP.Net',
    overview:
      'Built a scalable backend web application using ASP.NET Core following strict N-Tier Architecture (Presentation Layer, Business Logic Layer, Data Access Layer). Implemented complete CRUD operations and SQL Server database integration with Entity Framework Core (Code-First).',
    responsibilities: [
      'Built a web application using ASP.NET Core following N-Tier Architecture (Presentation, BLL, DAL)',
      'Implemented full CRUD operations and relational database integration with Microsoft SQL Server',
      'Applied Entity Framework Core (Code-First) migrations, Repository Pattern, and DTO mapping',
      'Focused on scalable and maintainable code structure, verified thoroughly via Postman'
    ],
    skills: [
      'ASP.NET Core & C# backend development',
      'N-Tier software architecture & Repository Pattern',
      'RESTful API design & DTO mapping',
      'SQL Server & Entity Framework Core (Code-First)'
    ]
  },
  recipe: {
    tag: 'OCTOBER 2025 // PHP & MYSQL FULL-STACK WEB APP',
    title: '👨‍🍳 Recipe Sharing Platform — PHP, MySQL',
    tech: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'XAMPP (Apache)'],
    github: 'https://github.com/FaisalWebZone/Recipe_Sharing_Platform_Project-with-PHP',
    overview:
      'Built a dynamic role-based web application for sharing, discovering, and managing recipes. Implemented full CRUD functionality and MySQL relational database integration on an Apache/XAMPP stack, paired with an interactive frontend designed using HTML, CSS, and JavaScript.',
    responsibilities: [
      'Built a dynamic web application for sharing and moderating recipes',
      'Implemented complete CRUD functionality and relational MySQL database integration',
      'Designed a responsive, user-friendly frontend using HTML, CSS, and JavaScript',
      'Implemented user authentication, role-based access control (Admin & User), ratings, and reviews'
    ],
    skills: [
      'Full-stack web development (PHP, JS, HTML, CSS)',
      'MySQL database design and integration',
      'Role-based authentication and authorization'
    ]
  },
  cargo: {
    tag: 'MARCH 2025 // C++ & OPENGL GRAPHICS SIMULATION',
    title: 'Cargo Flow – From Warehouse to Sea — C++, OpenGL',
    tech: ['C++', 'OpenGL', 'Computer Graphics', '2D/3D Scene Animation'],
    github: 'https://github.com/FaisalWebZone/Cargo_Logistics_Visualization_Graphics',
    videoEmbed: 'https://drive.google.com/file/d/1i_nVWrm0ZE2D-rrpGEQ6I9yhIUKLDK2l/preview',
    overview:
      'Built an interactive graphical cargo flow simulation using C++ and OpenGL that visualizes the real-world logistics process from warehouse loading to maritime sea transportation through animated scenes and moving objects.',
    responsibilities: [
      'Built a multi-stage cargo flow graphical simulation using C++ and OpenGL',
      'Implemented smooth keyframe animation and object movement across warehouse and sea scenes',
      'Visualized real-world logistics processes including warehouse structures, cranes, trucks, and cargo ships'
    ],
    skills: [
      'C++ & OpenGL computer graphics programming',
      'Real-time animation and object movement logic',
      'Visual simulation design & rendering techniques'
    ]
  },
  library: {
    tag: 'NOVEMBER 2024 // C#, .NET & SQL SERVER APPLICATION',
    title: 'Library Management System — C#, .NET, SQL Server',
    tech: ['C#', '.NET Framework', 'Microsoft SQL Server', 'Object-Oriented Programming (OOP2)'],
    github: 'https://github.com/FaisalWebZone/Library_Mangement_Project-Faisal',
    overview:
      'Built a desktop management system to manage books, inventory, billing, and multi-role user records. Implemented secure CRUD operations with Microsoft SQL Server and developed modular business logic using C# and the .NET Framework applying OOP2 principles.',
    responsibilities: [
      'Built a complete system to manage books, inventory, and multi-role user records (Admin, Employee, Customer)',
      'Implemented full CRUD operations and transaction history with Microsoft SQL Server',
      'Developed using C# and .NET Framework applying OOP2 principles (encapsulation, inheritance, abstraction)'
    ],
    skills: [
      'C# and .NET Framework application development',
      'Object-Oriented Programming (OOP2)',
      'SQL Server database design & CRUD integration'
    ]
  },

  thesis_slr_fer: {
    tag: '🎓 UNDERGRADUATE B.SC. THESIS (CSC 4298) • AIUB • OCT 2026',
    title: 'Beyond Hand Gestures: A Hybrid Deep Learning Framework for Joint Sign Language and Facial Emotion Recognition',
    tech: [
      'Python & PyTorch (CUDA)',
      'Vision Transformer (ViT)',
      'Graph Neural Network (GCN/GAT)',
      'Dilated Causal TCN',
      'Google MediaPipe Holistic & Face Mesh (478 3D Landmarks)',
      'Affective Computing & Spatio-Temporal AI'
    ],
    docUrl: 'assets/Faisal_Ahmed_BSc_Thesis_AIUB.pdf',
    docLabel: '📄 Read Full 80-Page AIUB Thesis Book (PDF) ↗',
    respHeading: '🔬 Research Methodology (4-Stage Pipeline & Equations 1–11)',
    skillsHeading: '📊 Quantitative Experimental Results & Lead Contributions',
    overview:
      'Submitted to the Department of Computer Science, Faculty of Science and Technology (FST), American International University-Bangladesh (AIUB) in partial fulfillment of B.Sc. in CSE (Supervised by Md. Hamid Uddin, Lecturer, Dept. of Computer Science, AIUB; Co-authors: Md Shahariar Kabir Bhuiya, Jiad Hasan, Faisal Ahmed [22-49591-3], Md Abdul Alim). This thesis addresses the linguistic gap between manual hand gestures and non-manual affective facial markers in Sign Language Recognition by introducing a dual-branch hybrid spatio-temporal deep learning architecture combining Vision Transformers (ViT), Graph Neural Networks (GNN), and Dilated Causal Temporal Convolutional Networks (TCN).',
    responsibilities: [
      'Stage 1 — Video Preprocessing & 3D Anatomical Keypoint Normalization (Eqs. 1–2): Uniformly samples T=30 RGB frames (224×224) for dynamic sign videos and T=32 frames for facial emotion videos. Extracts 3D anatomical coordinates L_i = (x_i, y_i, z_i) via Google MediaPipe Holistic & Face Mesh (21 hand keypoints per hand, 478 3D facial mesh landmarks, and 33 body pose anchors), applying root-anchor centering (L̂_i = (L_i - L_root) / ||L_scale||_2) and strict ≥70% face-presence quality filtering.',
      'Stage 2 — Global Visual Feature Representation via Vision Transformer (Eqs. 3–5): Partitions each frame into N=196 non-overlapping 16×16 patches projected into D=256 latent space with learnable positional embeddings (Z_0 = [x_p^1 E; ...; x_p^N E] + E_pos) and 8-head Multi-Head Self-Attention (Attention(Q,K,V) = softmax(QK^T / √d_k)V) to capture global hand-shape and upper-body context.',
      'Stage 3 — Spatial-Topological Modeling via Graph Neural Networks (Eqs. 6–8): Constructs undirected anatomical skeletal and facial graphs G=(V,E) with normalized adjacency matrix Â = D̃^(-1/2)(A+I)D̃^(-1/2) and 2 GCN/GAT message-passing layers (H^(l+1) = σ(Â H^(l) W^(l))) to model non-Euclidean finger joint articulations and facial muscle Action Units (eyebrows, lips, cheeks, jaw).',
      'Stage 4 — Long-Range Sequential Modeling via Dilated Causal TCN (Eqs. 9–11): Models inter-frame temporal dynamics across dilation factors d ∈ {1, 2, 4, 8} with kernel size k=3, 256 hidden channels, residual skip connections, and Cross-Entropy optimization with AdamW (lr=1e-4) and ReduceLROnPlateau.',
      'Faisal Ahmed Lead Contributions (WBS Table 5.3): Led WP-3 (Dataset Curation & 3D Landmark Pipeline across 47 dynamic sign classes and 144 emotion videos) and Co-Led WP-4 (Mathematical formulation & PyTorch implementation of the Hybrid ViT–GNN–TCN and lightweight GNN–TCN branches).'
    ],
    skills: [
      'Branch 1 (Dynamic Sign Language Recognition — ViT+GNN+TCN, ~14.2M params, 47 classes): Achieved 97.21% Peak Validation Accuracy (Epoch 25), 96.74% Test Accuracy, and 96.77% Macro-F1 (97.00% Precision & Recall; 416/430 correct) on the held-out split, with 1.00 F1-score on 27 sign classes.',
      'External Unseen Folder & Live Single-Video Inference: Achieved 96.43% Test Accuracy (96.47% Macro-F1) on the separate 336-clip evaluation set and 95.41% Softmax confidence on single-video inference (predict.py on mysign.mp4).',
      'Branch 2 (Lightweight Facial Emotion Recognition — Landmark GNN+TCN without ViT, 0.91M params, 3 classes: Angry, Neutral, Sad): Trained in ~1.2s/epoch (11 epochs), achieving 96.08% Training Accuracy, 100.00% Validation Accuracy (1.0000 Macro-F1), and 80.95% Unseen Test Accuracy (1.00 F1 on Sad).',
      'Demonstrated 15× parameter reduction (0.91M vs 14.2M) on the facial emotion branch by replacing raw pixel backbones with 478-point 3D facial mesh GNN topology.'
    ]
  },

  paper_asl_vit: {
    tag: '📑 MACHINE LEARNING RESEARCH PAPER (CSC 4234) • AIUB • JAN 2026',
    title: 'A Hybrid ViT–GNN–TCN Framework for Static and Video-Based American Sign Language Recognition',
    tech: [
      'Python & PyTorch',
      'Vision Transformer (ViT)',
      'Graph Neural Network (GNN)',
      'Temporal Convolutional Network (1D TCN)',
      'Kaggle ASL Alphabet (~87,000 Images)',
      'WLASL Dynamic Video Dataset (2,000+ Signs)'
    ],
    docUrl: 'assets/Faisal_Ahmed_ASL_ViT_GNN_TCN_Paper.docx',
    docLabel: '📥 Download Full Research Paper (.docx) ⬇',
    respHeading: '🔬 Research Methodology (Two-Stage Static & Video ASL Pipeline)',
    skillsHeading: '📊 Quantitative Benchmark Results & Research Findings',
    overview:
      'Authored for CSC 4234: Machine Learning (Section J) at American International University-Bangladesh (AIUB) (Instructor: Sharfuddin Mahmood; Authors: Md. Shahariar Kabir Bhuiya, Anika Tabassum Ria, Salma Akter, Faisal Ahmed [22-49591-3]). This research paper proposes a unified two-stage hybrid deep learning framework combining Vision Transformers (ViT), Graph Neural Networks (GNN), and Temporal Convolutional Networks (TCN) to bridge static hand-alphabet classification and continuous dynamic word-level American Sign Language (ASL) video recognition.',
    responsibilities: [
      'Stage 1 — Static ASL Alphabet Recognition Pipeline: Preprocessed the Kaggle ASL Alphabet dataset (~87,000 RGB images across 29 classes: A–Z, space, delete, nothing) resized to 224×224 with data augmentation (random rotation, scaling, brightness normalization). Extracted global spatial patch representations via Vision Transformer (ViT) self-attention coupled with relational Graph Neural Network (GNN) structural hand modeling.',
      'Stage 2 — Dynamic Video-Based Word-Level ASL Pipeline: Uniformly sampled T=16 frames (224×224) per video clip across multi-source dynamic ASL video datasets (WLASL, Kaggle ASL video sets, and curated real-world recordings spanning 2,000+ sign classes).',
      'Spatio-Temporal Feature Fusion: Extracted per-frame ViT visual embeddings, modeled inter-frame and anatomical structural relationships via a Temporal GNN, and captured sequential motion continuity via 1D Temporal Convolutional Networks (TCN) with causal dilated convolutions.',
      'Comparative Literature & Ablation Analysis: Benchmarked against 20+ recent peer-reviewed sign language architectures (I3D, 3D-ResNet, ST-GCN, SignBERT, SpotER, and CNN-LSTM hybrids).'
    ],
    skills: [
      'Stage 1 (Static ASL Alphabet Benchmark — ~87,000 Images, 29 Classes): Achieved 99.15% Training Accuracy and 99.65%–99.67% Testing Accuracy with rapid convergence and near-zero overfitting.',
      'Stage 2 (Dynamic Word-Level Video ASL Benchmark — T=16 Frames): Achieved 89%–90% Training Accuracy and 87.60% Testing Accuracy across diverse signers, lighting conditions, and motion speeds.',
      'Demonstrated that dilated 1D TCN layers provide superior training stability and parallel temporal receptive fields compared to recurrent Bi-LSTM/GRU sequence models.'
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
  const respHeading = data.respHeading || '🛠️ Key Engineering Contributions';
  const skillsHeading = data.skillsHeading || '⚡ Technologies &amp; Skills Demonstrated';
  const videoHtml = data.videoEmbed
    ? `<div class="modal-section-title">🎥 Project Demonstration Video</div>
       <div class="video-iframe-wrap">
         <iframe src="${data.videoEmbed}" allow="autoplay; fullscreen" allowfullscreen></iframe>
       </div>`
    : '';
  let actionBtnHtml = '';
  if (data.docUrl) {
    const isDocx = data.docUrl.toLowerCase().endsWith('.docx');
    actionBtnHtml = `<a href="${data.docUrl}" ${isDocx ? 'download' : 'target="_blank" rel="noopener noreferrer"'} class="btn btn-primary btn-sm">
         ${data.docLabel || 'Open Research Document ↗'}
       </a>`;
  } else if (data.github) {
    actionBtnHtml = `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
         View Source Code on GitHub ↗
       </a>`;
  } else {
    actionBtnHtml = `<span class="tech-chip" style="padding:8px 14px;">🏢 Enterprise Production Project @ Learning Shaper</span>`;
  }

  container.innerHTML = `
    <div class="bento-tag">${data.tag}</div>
    <h3 class="bento-title" style="font-size:1.75rem;margin-bottom:12px;">${data.title}</h3>
    <div class="project-tech-stack" style="margin-bottom:18px;">${techHtml}</div>
    <p class="bento-text" style="font-size:1rem;">${data.overview}</p>
    ${videoHtml}
    <div class="modal-section-title">${respHeading}</div>
    <ul class="modal-list">${respHtml}</ul>
    <div class="modal-section-title">${skillsHeading}</div>
    <ul class="modal-list">${skillsHtml}</ul>
    <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
      ${actionBtnHtml}
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

// 10. UPDATED CV PREVIEW MODAL
window.openCVModal = function () {
  const modal = document.getElementById('cv-modal');
  const iframe = document.getElementById('cv-iframe');
  if (iframe) {
    iframe.setAttribute('src', 'Faisal-Ahmed.cv.html?v=' + Date.now());
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

// 13. THEME TOGGLE (NOIR CRIMSON / CYBER BLUE / LIGHT MODE)
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const themes = ['dark', 'cyber', 'light'];
  const labels = {
    dark: 'Reel Noir & Crimson Mode',
    cyber: 'Cyber Indigo & Cyan Mode',
    light: 'Clean Light Mode'
  };
  const saved = localStorage.getItem('faisal-theme-v24') || 'dark';
  root.setAttribute('data-theme', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = themes[(themes.indexOf(current) + 1) % themes.length];
      root.setAttribute('data-theme', next);
      localStorage.setItem('faisal-theme-v24', next);
      showToast(`Switched to ${labels[next]}`);
    });
  }
})();

// 14. INSTAGRAM REEL "AGENTIC BUILD 🤖" — 18-AGENT LIVE WIREFRAME & AUTO-TOUR ENGINE
(function initAgenticBuildEngine() {
  const overlay = document.getElementById('agentic-overlay');
  const wireframesEl = document.getElementById('agentic-wireframes');
  const cursorsEl = document.getElementById('agentic-cursors');
  const snapH = document.getElementById('agentic-snap-h');
  const snapV = document.getElementById('agentic-snap-v');
  const hud = document.getElementById('agentic-hud');
  const hudAgents = document.getElementById('agentic-hud-agents');
  const hudLayers = document.getElementById('agentic-hud-layers');
  const hudBar = document.getElementById('agentic-hud-bar');
  const tourBtn = document.getElementById('agentic-tour-btn');
  const speedBtn = document.getElementById('agentic-speed-btn');
  const skipBtn = document.getElementById('agentic-skip-btn');
  const navDispatchBtn = document.getElementById('trigger-agent-build');

  if (!overlay || !wireframesEl || !cursorsEl || !hud) return;

  const AGENT_COLORS = [
    '#ef4444', '#38bdf8', '#10b981', '#f59e0b', '#a855f7', '#ec4899',
    '#06b6d4', '#84cc16', '#f97316', '#6366f1', '#14b8a6', '#eab308',
    '#d946ef', '#fb7185', '#22d3ee', '#4ade80', '#fbbf24', '#c084fc'
  ];
  const TOTAL_VIRTUAL_LAYERS = 252;

  const isHeadless = /HeadlessChrome/i.test(navigator.userAgent || '');
  let cursors = [];
  let isBuilding = false;
  let isTouring = !isHeadless;
  let speedMultiplier = 1;
  let buildRunId = 0;
  let orbitFrameId = null;

  function createCursors() {
    cursorsEl.innerHTML = '';
    cursors = AGENT_COLORS.map((color, idx) => {
      const el = document.createElement('div');
      el.className = 'agentic-cursor';
      el.style.filter = `drop-shadow(0 0 8px ${color}) drop-shadow(0 2px 5px rgba(0,0,0,0.85))`;
      el.innerHTML = `
        <svg width="19" height="19" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="1.3">
          <path d="M3 2L21 11L12.2 13.8L8.8 22L3 2Z"/>
        </svg>
      `;
      cursorsEl.appendChild(el);
      return { el, x: window.innerWidth / 2, y: window.innerHeight / 2, color, idx };
    });
  }

  function moveCursor(c, x, y, rotateDeg = 0) {
    c.x = x;
    c.y = y;
    c.el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) rotate(${rotateDeg}deg)`;
  }

  function setSwarmScanFormation() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    cursors.forEach((c, i) => {
      const isLeft = i < 9;
      const groupIdx = isLeft ? i : i - 9;
      const row = Math.floor(groupIdx / 3);
      const col = groupIdx % 3;
      const baseX = isLeft ? w * 0.22 + col * 24 : w * 0.74 + col * 24;
      const baseY = h * 0.34 + row * 72 + (col % 2) * 16;
      const rot = isLeft ? 35 : -135;
      c.el.style.opacity = '1';
      moveCursor(c, baseX, baseY, rot);
    });
  }

  function collectTargets() {
    const selectors = [
      '#navbar',
      '[data-agent-target="PORTFOLIO_OUTLINE"]',
      '[data-agent-target="HELLO_SCRIPT"]',
      '[data-agent-target="NAME_STAMP"]',
      '[data-agent-target="ROLE_BADGE"]',
      '[data-agent-target="ROLE_TYPEWRITER"]',
      '[data-agent-target="HERO_BIO"]',
      '[data-agent-target="HERO_CTA"]',
      '[data-agent-target="HERO_METRICS"]',
      '[data-agent-target="HERO_SOCIALS"]',
      '[data-agent-target="PORTRAIT_FRAME"]',
      '[data-agent-target="SPEC_CORE_01"]',
      '[data-agent-target="SPEC_CORE_02"]',
      '[data-agent-target="SPEC_TECH_STRIP"]',
      '.stat-card',
      '.marquee-section',
      '#experience .section-header',
      '#experience .timeline-item',
      '#projects .section-header',
      '#professional-projects-group .project-group-header',
      '#professional-projects-group .project-card',
      '#thesis-research-group .project-group-header',
      '#thesis-research-group .project-card',
      '#academic-projects-group .project-group-header',
      '#academic-projects-group .project-card',
      '#skills .section-header',
      '#skills .skill-category-card',
      '#about .section-header',
      '#about .bento-card',
      '#qualifications .section-header',
      '#qualifications .qual-card',
      '#contact .section-header',
      '#contact .contact-info-card',
      '#contact .contact-form-card'
    ];
    const seen = new Set();
    const list = [];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (!seen.has(el) && el.offsetParent !== null) {
          seen.add(el);
          list.push(el);
        }
      });
    });
    return list;
  }

  function renderWireframesForBatch(batch) {
    wireframesEl.innerHTML = '';
    const activeRects = [];

    batch.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) return;
      if (r.bottom < -50 || r.top > window.innerHeight + 120) return;

      activeRects.push({ el, rect: r });

      const box = document.createElement('div');
      box.className = 'agentic-wireframe-box';
      box.style.left = `${Math.round(r.left)}px`;
      box.style.top = `${Math.round(r.top)}px`;
      box.style.width = `${Math.round(r.width)}px`;
      box.style.height = `${Math.round(r.height)}px`;

      const rawText = (el.innerText || el.getAttribute('data-agent-target') || 'LAYER_NODE')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 38);

      box.innerHTML = `
        <span class="agentic-corner tl"></span>
        <span class="agentic-corner tr"></span>
        <span class="agentic-corner bl"></span>
        <span class="agentic-corner br"></span>
        <span class="agentic-dim-pill">${Math.round(r.width)} × ${Math.round(r.height)}</span>
        <span class="agentic-type-label">${rawText}▋</span>
      `;
      wireframesEl.appendChild(box);
    });

    if (activeRects.length > 0) {
      const primary = activeRects[0].rect;
      snapH.style.top = `${Math.round(primary.top)}px`;
      snapH.style.opacity = '1';
      snapV.style.left = `${Math.round(primary.left)}px`;
      snapV.style.opacity = '1';

      cursors.forEach((c, i) => {
        const target = activeRects[i % activeRects.length].rect;
        // Spread all 18 cursors around the perimeter & interior of the active boxes without clumping
        const ringPos = i / cursors.length;
        const angle = ringPos * Math.PI * 2 + (performance.now() * 0.002);
        const rx = Math.max(24, target.width * 0.48);
        const ry = Math.max(16, target.height * 0.48);
        const cx = target.left + target.width * 0.5;
        const cy = target.top + target.height * 0.5;
        const tx = cx + Math.cos(angle) * rx * (0.55 + (i % 3) * 0.22);
        const ty = cy + Math.sin(angle) * ry * (0.55 + ((i + 1) % 3) * 0.22);
        const rot = ((i % 5) - 2) * 12;
        moveCursor(c, tx, ty, rot);
      });
    }
  }

  function startOrbitCelebration(runId) {
    if (orbitFrameId) cancelAnimationFrame(orbitFrameId);
    let angle = 0;
    const startTime = performance.now();

    function stepOrbit(now) {
      if (runId !== buildRunId) return;
      const elapsed = now - startTime;
      if (elapsed > 4800) {
        cursors.forEach((c) => {
          c.el.style.opacity = '0';
        });
        return;
      }
      angle += 0.045;
      const cx = window.innerWidth * 0.84;
      const cy = window.innerHeight * 0.54;
      const radius = Math.min(110, window.innerWidth * 0.12);

      cursors.forEach((c, i) => {
        const theta = angle + (i / cursors.length) * Math.PI * 2;
        const x = cx + Math.cos(theta) * radius;
        const y = cy + Math.sin(theta) * radius;
        const deg = (theta * 180) / Math.PI + 90;
        c.el.style.transition = 'none';
        moveCursor(c, x, y, deg);
      });

      orbitFrameId = requestAnimationFrame(stepOrbit);
    }
    orbitFrameId = requestAnimationFrame(stepOrbit);
  }

  function finishBuildImmediately(elapsedSec = 18.4, showOrbit = false) {
    buildRunId++;
    const currentRun = buildRunId;
    isBuilding = false;
    wireframesEl.innerHTML = '';
    snapH.style.opacity = '0';
    snapV.style.opacity = '0';

    document.querySelectorAll('.agent-unbuilt, .agent-building').forEach((el) => {
      el.classList.remove('agent-unbuilt', 'agent-building');
      el.classList.add('agent-built');
    });
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));

    hudAgents.textContent = `Rebuilt by 18 agents in ${elapsedSec}s`;
    hudLayers.textContent = `${TOTAL_VIRTUAL_LAYERS} / ${TOTAL_VIRTUAL_LAYERS} layers`;
    if (hudBar) hudBar.style.width = '100%';
    if (tourBtn) {
      tourBtn.textContent = 'Done';
      tourBtn.classList.add('active');
    }
    if (skipBtn) {
      skipBtn.textContent = '↻ Replay';
    }

    if (showOrbit) {
      startOrbitCelebration(currentRun);
    } else {
      cursors.forEach((c) => {
        c.el.style.opacity = '0';
      });
    }
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function animateScrollTo(targetY, durationMs) {
    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) >= 4) {
      const steps = 8;
      const stepTime = Math.max(16, Math.round(durationMs / steps));
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        window.scrollTo(0, Math.round(startY + diff * eased));
        await sleep(stepTime);
      }
    }
    root.style.scrollBehavior = prevBehavior;
  }

  async function runAgenticBuild() {
    buildRunId++;
    const myRunId = buildRunId;
    if (orbitFrameId) cancelAnimationFrame(orbitFrameId);

    isBuilding = true;
    hud.style.display = 'inline-flex';
    createCursors();

    // Ensure all parent .reveal wrappers are visible so only leaf agent targets are controlled
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));

    const targets = collectTargets();
    targets.forEach((el) => {
      el.classList.remove('agent-built', 'agent-building');
      el.classList.add('agent-unbuilt');
    });

    const startTime = performance.now();
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';

    // Phase 1: "Scanning page..." exactly like t=0.0s in the Instagram Reel
    hudAgents.textContent = 'Scanning page...';
    hudLayers.textContent = `0 / ${TOTAL_VIRTUAL_LAYERS} layers`;
    if (hudBar) hudBar.style.width = '4%';
    if (tourBtn) {
      tourBtn.textContent = isTouring ? 'Touring' : 'Paused';
      tourBtn.classList.toggle('active', isTouring);
    }
    if (skipBtn) skipBtn.textContent = 'Skip';

    setSwarmScanFormation();
    await sleep(680 / speedMultiplier);
    if (myRunId !== buildRunId) return;

    hudAgents.textContent = '18 agents';

    // Group targets into sequential batches (Hero first in fine steps, then sections)
    const batches = [];
    const heroTargets = targets.slice(0, 14);
    for (let i = 0; i < heroTargets.length; i += 2) {
      batches.push(heroTargets.slice(i, i + 2));
    }
    const bodyTargets = targets.slice(14);
    for (let i = 0; i < bodyTargets.length; i += 3) {
      batches.push(bodyTargets.slice(i, i + 3));
    }

    for (let bIdx = 0; bIdx < batches.length; bIdx++) {
      if (myRunId !== buildRunId) return;
      const batch = batches[bIdx];
      const firstEl = batch[0];

      // Pause briefly right after the Hero section finishes so the full Hero can be admired
      if (bIdx === 7) {
        wireframesEl.innerHTML = '';
        snapH.style.opacity = '0';
        snapV.style.opacity = '0';
        await sleep(900 / speedMultiplier);
        if (myRunId !== buildRunId) return;
      }

      // Auto-scroll touring to bring the active batch into view (keep scrollY=0 during main Hero build)
      const isMainHeroBatch = bIdx <= 7;
      if (isTouring && firstEl && !isMainHeroBatch) {
        const rect = firstEl.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.72 || rect.top < 70) {
          const destY = Math.max(0, window.scrollY + rect.top - 130);
          await animateScrollTo(destY, 260 / speedMultiplier);
          if (myRunId !== buildRunId) return;
        }
      }

      batch.forEach((el) => {
        el.classList.remove('agent-unbuilt');
        el.classList.add('agent-building');
        el.classList.add('revealed');
      });

      renderWireframesForBatch(batch);

      // Jitter cursors mid-step to simulate live resizing & typing
      await sleep(175 / speedMultiplier);
      if (myRunId !== buildRunId) return;
      renderWireframesForBatch(batch);

      await sleep(185 / speedMultiplier);
      if (myRunId !== buildRunId) return;

      batch.forEach((el) => {
        el.classList.remove('agent-building');
        el.classList.add('agent-built');
      });

      const completedLayers = Math.min(
        TOTAL_VIRTUAL_LAYERS,
        Math.round(((bIdx + 1) / batches.length) * TOTAL_VIRTUAL_LAYERS)
      );
      const pct = Math.round((completedLayers / TOTAL_VIRTUAL_LAYERS) * 100);
      hudLayers.textContent = `${completedLayers} / ${TOTAL_VIRTUAL_LAYERS} layers`;
      if (hudBar) hudBar.style.width = `${pct}%`;
    }

    const totalSec = ((performance.now() - startTime) / 1000).toFixed(1);
    finishBuildImmediately(totalSec, true);
  }

  // Controls
  if (tourBtn) {
    tourBtn.addEventListener('click', () => {
      if (!isBuilding) {
        hud.style.display = 'none';
        cursors.forEach((c) => (c.el.style.opacity = '0'));
        return;
      }
      isTouring = !isTouring;
      tourBtn.textContent = isTouring ? 'Touring' : 'Manual';
      tourBtn.classList.toggle('active', isTouring);
    });
  }

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      speedMultiplier = speedMultiplier === 1 ? 2 : 1;
      speedBtn.textContent = `${speedMultiplier}x`;
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      if (isBuilding) {
        finishBuildImmediately(14.2, false);
      } else {
        isTouring = true;
        runAgenticBuild();
      }
    });
  }

  if (navDispatchBtn) {
    navDispatchBtn.addEventListener('click', () => {
      isTouring = true;
      runAgenticBuild();
    });
  }

  // Pause auto-scroll touring if user manually wheels/touches during build
  window.addEventListener(
    'wheel',
    () => {
      if (isBuilding && isTouring) {
        isTouring = false;
        if (tourBtn) {
          tourBtn.textContent = 'Manual';
          tourBtn.classList.remove('active');
        }
      }
    },
    { passive: true }
  );

  // Auto-launch the 18-agent live build on page load!
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      runAgenticBuild();
    }, 120);
  });
})();
