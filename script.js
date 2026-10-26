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
    'Junior Software Engineer @ Learning Shaper',
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
  const githubBtn = data.github
    ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
         View Source Code on GitHub ↗
       </a>`
    : `<span class="tech-chip" style="padding:8px 14px;">🏢 Enterprise Production Project @ Learning Shaper</span>`;

  container.innerHTML = `
    <div class="bento-tag">${data.tag}</div>
    <h3 class="bento-title" style="font-size:1.75rem;margin-bottom:12px;">${data.title}</h3>
    <div class="project-tech-stack" style="margin-bottom:18px;">${techHtml}</div>
    <p class="bento-text" style="font-size:1rem;">${data.overview}</p>
    ${videoHtml}
    <div class="modal-section-title">🛠️ Key Engineering Contributions</div>
    <ul class="modal-list">${respHtml}</ul>
    <div class="modal-section-title">⚡ Technologies &amp; Skills Demonstrated</div>
    <ul class="modal-list">${skillsHtml}</ul>
    <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
      ${githubBtn}
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
  if (iframe && !iframe.getAttribute('src')) {
    iframe.setAttribute('src', 'Faisal-Ahmed.cv.html?v=4');
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
