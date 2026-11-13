/**
 * Faisal Ahmed — LinkedIn-Style Personalized Visitor Notification Engine
 * Sends a silent, non-blocking email notification to faisalahmed49591@gmail.com
 * when someone views the Portfolio or CV.
 * 
 * Features:
 * - LinkedIn-Style Identification: Reads ?viewer=Name (or ?v=, ?to=, ?for=, ?name=)
 *   e.g. https://faisalwebzone.github.io/?viewer=Zilan
 *   Email Subject: "🔔 Zilan viewed your profile / portfolio!"
 * - Allows testing different names without getting blocked by session storage.
 * - Throttles repeat visits from the same viewer in a single session.
 * - 100% silent and non-blocking (runs 1.5s after window load).
 * - Zero UI/CSS/DOM footprint.
 * - Captures: Exact Timestamp (BST), Location, IP, ISP, Device, OS, Browser, Source.
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

  // Parse URL parameters for personalized tracking (LinkedIn style)
  const urlParams = new URLSearchParams(window.location.search);
  const rawViewer =
    urlParams.get('viewer') ||
    urlParams.get('v') ||
    urlParams.get('to') ||
    urlParams.get('for') ||
    urlParams.get('name') ||
    urlParams.get('user') ||
    urlParams.get('target');

  let identifiedViewer = null;
  if (rawViewer && rawViewer.trim() !== '') {
    identifiedViewer = decodeURIComponent(rawViewer.trim()).replace(/[+_-]/g, ' ');
    // Save to session so if they navigate to CV or other tabs, identity persists
    sessionStorage.setItem('fa_identified_viewer', identifiedViewer);
  } else {
    // Check if previously identified in this session
    identifiedViewer = sessionStorage.getItem('fa_identified_viewer') || null;
  }

  const SESSION_KEY = 'fa_portfolio_visitor_tracked';
  const LAST_VIEWER_KEY = 'fa_last_tracked_viewer';
  const lastTrackedViewer = sessionStorage.getItem(LAST_VIEWER_KEY);

  // If already tracked in this session and it's the exact same viewer, skip to prevent spam
  if (sessionStorage.getItem(SESSION_KEY)) {
    if (!identifiedViewer || identifiedViewer === lastTrackedViewer) {
      return;
    }
  }

  // Helper: Device & OS detection
  function detectDevice() {
    const ua = navigator.userAgent || '';
    let os = 'Unknown OS';
    if (/Windows/i.test(ua)) os = 'Windows PC';
    else if (/Macintosh|Mac OS/i.test(ua)) os = 'Mac';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'Apple iOS';
    else if (/Android/i.test(ua)) os = 'Android Device';
    else if (/Linux/i.test(ua)) os = 'Linux';

    let browser = 'Unknown Browser';
    if (/Edg/i.test(ua)) browser = 'Microsoft Edge';
    else if (/Chrome/i.test(ua)) browser = 'Google Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Apple Safari';
    else if (/Firefox/i.test(ua)) browser = 'Mozilla Firefox';

    const isMobile = /Mobi|Android|iPhone/i.test(ua);
    return `${isMobile ? '📱 Mobile' : '💻 Desktop'} • ${os} (${browser})`;
  }

  // Helper: Format Bangladesh Standard Time (BST)
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

  // Track visitor after page has finished loading
  async function sendVisitorAlert() {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
      if (identifiedViewer) {
        sessionStorage.setItem(LAST_VIEWER_KEY, identifiedViewer);
      }

      let ip = 'N/A';
      let city = 'Unknown City';
      let region = '';
      let country = 'Unknown Country';
      let isp = 'N/A';

      // Fetch Geolocation silently (fallback chain)
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
        // Fallback to secondary geo API
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
      const referrer = document.referrer && document.referrer.trim() !== ''
        ? document.referrer
        : 'Direct Link / WhatsApp / Messenger';

      const pageTitle = document.title || 'Faisal Ahmed Portfolio';
      const pagePath = window.location.pathname.includes('cv')
        ? 'Interactive CV (Faisal-Ahmed.cv.html)'
        : 'Portfolio Home (index.html)';

      // LinkedIn-Style Subject Line
      const emailSubject = identifiedViewer
        ? `🔔 ${identifiedViewer} viewed your profile / portfolio!`
        : `🔔 [Portfolio View] ${city !== 'Unknown City' ? `${city}, ${country}` : 'New Visitor'} viewed your profile!`;

      const payload = {
        _subject: emailSubject,
        _template: 'table',
        _captcha: 'false',
        'Who Viewed Your Profile': identifiedViewer
          ? `👤 ${identifiedViewer} (LinkedIn-Style Personalized Link)`
          : '🌐 Organic / Anonymous Visitor',
        'Time (Bangladesh)': getBangladeshTime(),
        'Visited Page': `${pageTitle} — [${pagePath}]`,
        'Visitor Location': locSummary,
        'Traffic Source': referrer,
        'Device & OS': detectDevice(),
        'Screen Resolution': `${window.screen.width} × ${window.screen.height}`,
        'IP Address': ip,
        'Internet Provider (ISP)': isp,
        'Browser Language': navigator.language || 'N/A'
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

  // Defer execution until after all critical rendering is finished
  if (document.readyState === 'complete') {
    setTimeout(sendVisitorAlert, 1500);
  } else {
    window.addEventListener('load', () => {
      setTimeout(sendVisitorAlert, 1500);
    });
  }
})();
