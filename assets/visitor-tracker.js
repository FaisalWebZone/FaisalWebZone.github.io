/**
 * Faisal Ahmed — Multi-Platform & Hardware-Level Device Detection Engine
 * 
 * Features:
 * - EXACT Device Model Detection:
 *   - Samsung Galaxy (SM-...), Xiaomi/Redmi, Oppo, Vivo, OnePlus, Google Pixel, etc.
 *   - Apple iPhone / iPad Model & Generation estimation via Screen & Retina DPR.
 *   - Windows / Mac / Linux PC with Hardware Specs.
 * - GPU / Graphics Engine Detection via WebGL (Adreno, Mali, Apple GPU, Nvidia, Intel, AMD).
 * - Hardware Cores & RAM specs (navigator.hardwareConcurrency, navigator.deviceMemory).
 * - Auto-detect Social Platforms: Facebook App, Instagram, LinkedIn, Messenger, WhatsApp, Email.
 * - Captures: Exact Timestamp (BST), Location, IP, ISP, Screen Resolution.
 * - 100% silent, non-blocking, zero visual impact.
 * 
 * Destination: faisalahmed49591@gmail.com
 */

(function initVisitorTracker() {
  // Ignore local development
  if (
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.protocol === 'file:'
  ) {
    return;
  }

  // Prevent spamming multiple alerts in the same session
  const SESSION_KEY = 'fa_portfolio_visitor_tracked';
  if (sessionStorage.getItem(SESSION_KEY)) {
    return;
  }

  // 1. SMART PLATFORM AUTO-DETECTION ENGINE
  function detectPlatform() {
    const ua = navigator.userAgent || '';
    const ref = (document.referrer || '').toLowerCase();

    // Check In-App Browsers first
    if (/FBAN|FBAV|FB_IAB|FB4A/i.test(ua)) {
      return { name: 'Facebook App', icon: '🔵', type: 'Facebook In-App Browser' };
    }
    if (/Instagram/i.test(ua)) {
      return { name: 'Instagram', icon: '📸', type: 'Instagram App (Bio / Story / DM)' };
    }
    if (/LinkedInApp/i.test(ua)) {
      return { name: 'LinkedIn App', icon: '💼', type: 'LinkedIn Mobile App' };
    }
    if (/Messenger/i.test(ua)) {
      return { name: 'Messenger', icon: '💬', type: 'Facebook Messenger App' };
    }
    if (/WhatsApp/i.test(ua)) {
      return { name: 'WhatsApp', icon: '🟢', type: 'WhatsApp In-App Browser' };
    }
    if (/Twitter|Tweetbot/i.test(ua)) {
      return { name: 'Twitter / X', icon: '🐦', type: 'Twitter / X App' };
    }

    // Check Referrers
    if (ref.includes('facebook.com') || ref.includes('fb.com')) {
      return { name: 'Facebook', icon: '🔵', type: 'Facebook (Feed / Post / Profile)' };
    }
    if (ref.includes('instagram.com')) {
      return { name: 'Instagram', icon: '📸', type: 'Instagram (Web / Profile Link)' };
    }
    if (ref.includes('linkedin.com') || ref.includes('lnkd.in')) {
      return { name: 'LinkedIn', icon: '💼', type: 'LinkedIn (Post / Message / Profile)' };
    }
    if (ref.includes('messenger.com')) {
      return { name: 'Messenger', icon: '💬', type: 'Messenger Chat' };
    }
    if (ref.includes('whatsapp.com')) {
      return { name: 'WhatsApp', icon: '🟢', type: 'WhatsApp Web / Chat' };
    }
    if (ref.includes('t.co') || ref.includes('x.com') || ref.includes('twitter.com')) {
      return { name: 'Twitter / X', icon: '🐦', type: 'Twitter / X Post' };
    }
    if (ref.includes('mail.google.com') || ref.includes('gmail.com')) {
      return { name: 'Gmail', icon: '✉️', type: 'Gmail Web Client' };
    }
    if (ref.includes('outlook.live.com') || ref.includes('outlook.office.com')) {
      return { name: 'Outlook Email', icon: '✉️', type: 'Outlook Email Client' };
    }
    if (ref.includes('google.com')) {
      return { name: 'Google Search', icon: '🔍', type: 'Google Organic Search' };
    }
    if (ref.includes('github.com')) {
      return { name: 'GitHub', icon: '🐙', type: 'GitHub Profile / Repo' };
    }

    // Check Campaign URL parameters
    const params = new URLSearchParams(window.location.search);
    const sourceParam = params.get('utm_source') || params.get('source') || params.get('src') || params.get('from');
    if (sourceParam) {
      return { name: sourceParam.toUpperCase(), icon: '🔗', type: `Custom Source (${sourceParam})` };
    }

    if (ref && ref.trim() !== '') {
      try {
        const refHost = new URL(ref).hostname;
        return { name: refHost, icon: '🌐', type: `External Website (${refHost})` };
      } catch (e) {}
    }

    return { name: 'Direct / Email / Chat', icon: '📬', type: 'Direct Click / Email / Chat Link' };
  }

  // 2. HARDWARE GPU / GRAPHICS ENGINE DETECTOR
  function getGpuRenderer() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return '';
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (!debugInfo) return '';
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
      // Clean up ANGLE strings
      const angleMatch = renderer.match(/ANGLE \([^,]+,\s*([^,]+)/i);
      if (angleMatch) return angleMatch[1].trim();
      return renderer.trim();
    } catch (e) {
      return '';
    }
  }

  // 3. EXACT HARDWARE DEVICE & MODEL DETECTOR
  async function detectExactDevice() {
    const ua = navigator.userAgent || '';
    const dpr = window.devicePixelRatio || 1;
    const w = window.screen.width;
    const h = window.screen.height;
    const gpu = getGpuRenderer();

    let brandAndModel = '';
    let os = 'Unknown OS';
    let deviceCategory = '💻 Desktop PC';

    // A. Check Android Device Model
    if (/Android/i.test(ua)) {
      deviceCategory = '📱 Mobile Phone';
      os = 'Android';
      const osVerMatch = ua.match(/Android\s+([0-9\.]+)/i);
      if (osVerMatch) os = `Android ${osVerMatch[1]}`;

      // 1. Try High Entropy Client Hints (Chrome/Edge Android)
      let clientHintModel = null;
      if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
        try {
          const hint = await navigator.userAgentData.getHighEntropyValues(['model']);
          if (hint && hint.model) clientHintModel = hint.model;
        } catch (e) {}
      }

      // 2. Try User-Agent Build match (e.g., "; SM-A525F Build/...")
      let uaModelMatch = ua.match(/;\s*([^;]+)\s+Build\//i);
      let rawModel = clientHintModel || (uaModelMatch ? uaModelMatch[1].trim() : '');

      if (rawModel) {
        // Map raw model codes to recognizable brands
        if (/^SM-|^GT-/i.test(rawModel)) {
          brandAndModel = `Samsung Galaxy (${rawModel})`;
        } else if (/^Pixel/i.test(rawModel)) {
          brandAndModel = `Google ${rawModel}`;
        } else if (/^Redmi|^Xiaomi|^POCO|^Mi\s/i.test(rawModel) || /^2[0-9]{6}|^M2[0-9]{6}/i.test(rawModel)) {
          brandAndModel = `Xiaomi / Redmi (${rawModel})`;
        } else if (/^CPH|^RMX|^OPPO|^Realme/i.test(rawModel)) {
          brandAndModel = `Oppo / Realme (${rawModel})`;
        } else if (/^V2[0-9]{3}|^vivo/i.test(rawModel)) {
          brandAndModel = `Vivo (${rawModel})`;
        } else if (/^ONEPLUS|^HD[0-9]{4}|^IN[0-9]{4}/i.test(rawModel)) {
          brandAndModel = `OnePlus (${rawModel})`;
        } else if (/^Infinix|^X[0-9]{3}/i.test(rawModel)) {
          brandAndModel = `Infinix (${rawModel})`;
        } else if (/^TECNO|^CK[0-9]|^LH[0-9]/i.test(rawModel)) {
          brandAndModel = `Tecno (${rawModel})`;
        } else {
          brandAndModel = rawModel;
        }
      } else {
        brandAndModel = 'Android Smartphone';
      }
    }
    // B. Check Apple iOS (iPhone / iPad)
    else if (/iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      const isTablet = /iPad/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      deviceCategory = isTablet ? '📱 Apple iPad' : '📱 Apple iPhone';
      os = isTablet ? 'iPadOS' : 'iOS';

      const osVerMatch = ua.match(/OS\s+([0-9_]+)/i);
      if (osVerMatch) os += ` ${osVerMatch[1].replace(/_/g, '.')}`;

      // Screen dimension fingerprinting for iPhone models
      const screenPoints = `${Math.min(w, h)}x${Math.max(w, h)}@${dpr.toFixed(1)}x`;
      const iphoneMap = {
        '393x852@3.0x': 'iPhone 14 Pro / 15 / 15 Pro / 16',
        '430x932@3.0x': 'iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus',
        '390x844@3.0x': 'iPhone 12 / 12 Pro / 13 / 13 Pro / 14',
        '428x926@3.0x': 'iPhone 12 Pro Max / 13 Pro Max / 14 Plus',
        '375x812@3.0x': 'iPhone X / XS / 11 Pro / 12 Mini / 13 Mini',
        '414x896@2.0x': 'iPhone XR / iPhone 11',
        '414x896@3.0x': 'iPhone XS Max / 11 Pro Max',
        '375x667@2.0x': 'iPhone 7 / 8 / SE (2nd/3rd Gen)',
        '414x736@3.0x': 'iPhone 7 Plus / 8 Plus'
      };

      if (!isTablet && iphoneMap[screenPoints]) {
        brandAndModel = `Apple ${iphoneMap[screenPoints]}`;
      } else {
        brandAndModel = isTablet ? 'Apple iPad' : 'Apple iPhone';
      }
    }
    // C. Check Desktop OS (Windows, Mac, Linux)
    else if (/Windows/i.test(ua)) {
      deviceCategory = '💻 Desktop / Laptop';
      os = 'Windows PC';
      if (/Windows NT 10.0/i.test(ua)) os = 'Windows 10 / 11';
      brandAndModel = 'Windows PC (Desktop or Laptop)';
    } else if (/Macintosh|Mac OS/i.test(ua)) {
      deviceCategory = '💻 Apple Mac';
      os = 'macOS';
      brandAndModel = 'Apple Mac (MacBook / iMac)';
    } else if (/Linux/i.test(ua)) {
      deviceCategory = '💻 Linux PC';
      os = 'Linux';
      brandAndModel = 'Linux Workstation';
    }

    // Browser Detection
    let browser = 'Browser';
    if (/Edg/i.test(ua)) browser = 'Microsoft Edge';
    else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Google Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Apple Safari';
    else if (/Firefox/i.test(ua)) browser = 'Mozilla Firefox';

    // Hardware Specs: CPU Cores & Memory
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : '';
    const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB RAM` : '';
    const hardwareSpecs = [cores, ram].filter(Boolean).join(' • ');

    return {
      category: deviceCategory,
      brandAndModel: brandAndModel || 'Generic Device',
      os: os,
      browser: browser,
      gpu: gpu || 'Standard GPU',
      hardwareSpecs: hardwareSpecs || 'Standard Hardware',
      resolution: `${w} × ${h} (DPR: ${dpr}x)`
    };
  }

  // 4. BANGLADESH TIME FORMATTER
  function getBangladeshTime() {
    try {
      return new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dhaka',
        dateStyle: 'full',
        timeStyle: 'medium'
      });
    } catch (e) {
      return new Date().toISOString();
    }
  }

  // 5. MAIN TRACKER DISPATCH
  async function sendVisitorAlert() {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');

      const platform = detectPlatform();
      const device = await detectExactDevice();

      let ip = 'N/A';
      let city = 'Unknown City';
      let region = '';
      let country = 'Bangladesh';
      let isp = 'N/A';

      // Silent Geo IP lookup
      try {
        const geoRes = await fetch('https://ipwho.is/', { cache: 'no-store' });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.success) {
            ip = geoData.ip || ip;
            city = geoData.city || city;
            region = geoData.region || region;
            country = geoData.country || country;
            isp = (geoData.connection && (geoData.connection.isp || geoData.connection.org)) || isp;
          }
        }
      } catch (err) {
        try {
          const altRes = await fetch('https://freeipapi.com/api/json');
          if (altRes.ok) {
            const altData = await altRes.json();
            ip = altData.ipAddress || ip;
            city = altData.cityName || city;
            country = altData.countryName || country;
            isp = altData.asnOrganization || isp;
          }
        } catch (e) {}
      }

      const locSummary = region ? `${city}, ${region}, ${country}` : `${city}, ${country}`;
      const pageTitle = document.title || 'Faisal Ahmed Portfolio';
      const pagePath = window.location.pathname.includes('cv')
        ? 'Interactive CV (Faisal-Ahmed.cv.html)'
        : 'Portfolio Home (index.html)';

      // Auto-formatted Email Subject with Platform & Exact Device Name
      const emailSubject = `${platform.icon} [${platform.name}] ${device.brandAndModel} opened your portfolio!`;

      const payload = {
        _subject: emailSubject,
        _template: 'table',
        _captcha: 'false',
        'Device Name & Model': `${device.category} — ${device.brandAndModel}`,
        'Operating System': `${device.os} (${device.browser})`,
        'Graphics / GPU': device.gpu,
        'CPU & Memory': device.hardwareSpecs,
        'Screen Display': device.resolution,
        'Social Platform / Source': `${platform.icon} ${platform.type}`,
        'Visitor Location': locSummary,
        'Time (Bangladesh)': getBangladeshTime(),
        'Visited Page': `${pageTitle} — [${pagePath}]`,
        'Internet Provider (ISP)': isp,
        'IP Address': ip,
        'Raw Referrer': document.referrer || 'None (Direct / In-App)'
      };

      await fetch('https://formsubmit.co/ajax/faisalahmed49591@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // Fail silently without disrupting user experience
    }
  }

  // Defer execution until page finishes loading completely
  if (document.readyState === 'complete') {
    setTimeout(sendVisitorAlert, 1500);
  } else {
    window.addEventListener('load', () => {
      setTimeout(sendVisitorAlert, 1500);
    });
  }
})();
