(() => {
  const keywords = /episode|series|program|content|play|streaks|metadata|v1|v2|api/i;
  const log = (tag, url, data) => {
    try {
      const txt = JSON.stringify(data).slice(0, 1200);
      console.log(`[TVer-${tag}]`, url);
      console.log(txt);
    } catch {}
  };
  // fetch
  const origFetch = window.fetch;
  window.fetch = async (...a) => {
    const res = await origFetch(...a);
    const url = a[0]?.toString?.() || '';
    const ct = res.headers.get('content-type') || '';
    if (keywords.test(url) && /json/i.test(ct)) {
      try { log('fetch', url, await res.clone().json()); } catch {}
    }
    return res;
  };
  // XHR
  const origOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, url, ...rest) {
    this.addEventListener('load', function () {
      const ct = this.getResponseHeader('content-type') || '';
      if (keywords.test(url) && /json/i.test(ct)) {
        try { log('xhr', url, JSON.parse(this.responseText)); } catch {}
      }
    });
    return origOpen.call(this, m, url, ...rest);
  };
  console.log('[TVer-hook] injected');
})();
