/* Wasaga Beach Stairlift — ad tracking (Meta Pixel + Google Ads tag).
   Paste this site's IDs below; leave an ID empty ("") and that platform
   stays off. Nothing else on the page changes. */
(function () {
  "use strict";

  var META_PIXEL_ID = "2848621725499019";
  var GOOGLE_ADS_ID = "";       /* Google Ads tag id, e.g. "AW-123456789" */
  var GOOGLE_LABEL_LEAD = "";   /* conversion label for the booking form */
  var GOOGLE_LABEL_CALL = "";   /* conversion label for phone-number clicks */

  /* ----- Meta Pixel base code ----- */
  if (META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  /* ----- Google tag (gtag.js) ----- */
  if (GOOGLE_ADS_ID) {
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
  }

  function metaTrack(eventName) {
    if (META_PIXEL_ID && window.fbq) window.fbq('track', eventName);
  }
  function googleConversion(label) {
    if (GOOGLE_ADS_ID && label && window.gtag) {
      window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_ID + '/' + label });
    }
  }

  /* Phone-number clicks (nav, hero, CTA band, mobile call bar) */
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!link) return;
    metaTrack('Contact');
    googleConversion(GOOGLE_LABEL_CALL);
  });

  /* Booking form: script.js swaps in a .form-done message only after
     Formspree confirms the send, so a lead is counted only on success. */
  var form = document.querySelector('form.form');
  if (form && 'MutationObserver' in window) {
    var mo = new MutationObserver(function () {
      if (form.querySelector('.form-done')) {
        mo.disconnect();
        metaTrack('Lead');
        googleConversion(GOOGLE_LABEL_LEAD);
      }
    });
    mo.observe(form, { childList: true });
  }
})();
