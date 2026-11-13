/**
 * Faisal Ahmed — Multi-Platform Auto-Detect Visitor Notification Engine
 * Automatically detects whether the visitor opened the link from:
 * - Facebook App / Web
 * - Instagram App / Bio / Story / DM
 * - LinkedIn App / Web
 * - Messenger App / Web
 * - WhatsApp
 * - Twitter / X
 * - Email Client (Gmail, Outlook)
 * - Direct Link
 * 
 * NO manual link tampering required! Just share your normal link anywhere.
 * Sends instant email alert to faisalahmed49591@gmail.com
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
    const url = window.location.href.toLowerCase();

    // Check In-App Browsers first (User Agent has exact signatures)
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

    // Check Document Referrer
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

    // Check URL parameters for explicit campaign / source tags
    const params = new URLSearchParams(window.location.search);
    const sourceParam = params.get('utm_source') || params.get('source') || params.get('src') || params.get('from');
    if (sourceParam) {
      return { name: sourceParam.toUpperCase(), icon: '🔗', type: `Custom Campaign (${sourceParam})` };
    }

    if (ref && ref.trim() !== '') {
      try {
        const refHost = new URL(ref).hostname;
        return { name: refHost, icon: '🌐', type: `External Website (${refHost})` };
      } catch (e) {}
    }

    return { name: 'Direct / Email / Chat', icon: '📬', type: 'Direct Click / Email / Chat Link' };
  }

  // 2. DEVICE & OS DETECTOR
  function detectDevice() {
    const ua = navigator.userAgent || '';
    let os = 'Unknown OS';
    if (/Windows/i.test(ua)) os = 'Windows PC';
    else if (/Macintosh|Mac OS/i.test(ua)) os = 'Mac';
    else if (/iPhone/i.test(ua)) os = 'iPhone';
    else if (/iPad/i.test(ua)) os = 'iPad';
    else if (/Android/i.test(ua)) os = 'Android Phone';
    else if (/Linux/i.test(ua)) os = 'Linux';

    let browser = 'Browser';
    if (/Edg/i.test(ua)) browser = 'Edge';
    else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
    return `${isMobile ? '📱 Mobile' : '💻 Desktop'} — ${os} (${browser})`;
  }

  // 3. BANGLADESH TIME FORMATTER
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

  // 4. MAIN TRACKER EXECUTION
  async function sendVisitorAlert() {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');

      const platform = detectPlatform();
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

      // Auto-formatted Email Subject with exact Platform Icon & Name
      const emailSubject = `${platform.icon} [${platform.name} Alert] Someone opened your portfolio from ${platform.name}!`;

      const payload = {
        _subject: emailSubject,
        _template: 'table',
        _captcha: 'false',
        'Social Platform / Source': `${platform.icon} ${platform.type}`,
        'Visitor Location': locSummary,
        'Time (Bangladesh)': getBangladeshTime(),
        'Visited Page': `${pageTitle} — [${pagePath}]`,
        'Device & OS': detectDevice(),
        'Raw Referrer': document.referrer || 'None (Direct / In-App)',
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

  // Defer execution until page finishes loading completely
  if (document.readyState === 'complete') {
    setTimeout(sendVisitorAlert, 1500);
  } else {
    window.addEventListener('load', () => {
      setTimeout(sendVisitorAlert, 1500);
    });
  }
})();
