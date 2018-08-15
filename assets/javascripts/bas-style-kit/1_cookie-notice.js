/* ========================================================================
 * BAS Style Kit: cookie-notice.js
 * https://style-kit.web.bas.ac.uk/interactivity/cookie-notice/
 *
 * Note: This plugin does not conform to a Bootstrap Plugin
 * Note: This plugin only supports a single cookie notice
 * ======================================================================== */


jQuery(function($){

  var BSKCookieNoticeDomain = window.location.hostname;
  var BSKCookieNoticeSelector = '[data-bsk-role="cookie-notice"]';
  var BSKCookieNoticeCookieName = 'bsk_cookie_notice_seen';
  var BSKCookieNoticeCookieExpiryDays = 30;
  var BSKCookieNoticeCookieAcknowledgedValue = 'yes';

  // Check if acknowledgement cookie has already been set

  BSKCookieNoticeCookieValue = Cookies.get(BSKCookieNoticeCookieName);
  if (typeof BSKCookieNoticeCookieValue !== 'undefined') {
    if (BSKCookieNoticeCookieValue == BSKCookieNoticeCookieAcknowledgedValue) {

      // Suppress cookie message
      jQuery(BSKCookieNoticeSelector).remove();
    }
  }

  // React to acknowledging the cookie banner by hooking into the Bootstrap JavaScript API

  jQuery(BSKCookieNoticeSelector).on('close.bs.alert', function () {

    // Set a cookie to persist hiding the cookie banner for the next 30 days
    Cookies.set(
      BSKCookieNoticeCookieName,                  // cookie name
      BSKCookieNoticeCookieAcknowledgedValue,     // cookie value
      {
        domain: BSKCookieNoticeDomain,            // The domain is set to distinguish subdomains
        expires: BSKCookieNoticeCookieExpiryDays  // expiry in days
      }
    );
  })
});

