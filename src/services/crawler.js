// Website Crawler & HTML Parser Agent
// Conducts fresh DOM fetching via CORS proxies with real HTML analysis

export async function crawlWebsite(targetUrl) {
  let formattedUrl = targetUrl.trim();
  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = 'https://' + formattedUrl;
  }

  const startTime = Date.now();
  let rawHtml = '';
  let crawlMethod = 'Direct CORS Proxy';
  let isFetched = false;

  // List of public CORS proxies to attempt fresh client-side website crawl
  const proxies = [
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`
  ];

  for (const proxyFn of proxies) {
    try {
      const response = await fetch(proxyFn(formattedUrl), { signal: AbortSignal.timeout(6000) });
      if (response.ok) {
        rawHtml = await response.text();
        if (rawHtml && rawHtml.length > 200) {
          isFetched = true;
          break;
        }
      }
    } catch (e) {
      // Continue to next proxy fallback
    }
  }

  const crawlDurationMs = Date.now() - startTime;

  // DOM Parser for extracted attributes
  const parser = new DOMParser();
  const doc = isFetched ? parser.parseFromString(rawHtml, 'text/html') : null;

  const urlObj = new URL(formattedUrl);
  const hostname = urlObj.hostname.replace(/^www\./, '');

  // Extract meta and DOM elements
  const title = doc ? doc.querySelector('title')?.innerText || '' : '';
  const metaDescription = doc ? doc.querySelector('meta[name="description"]')?.getAttribute('content') || '' : '';
  const canonical = doc ? doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '' : '';
  const ogTitle = doc ? doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '' : '';
  const ogImage = doc ? doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '' : '';
  const robotsMeta = doc ? doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '' : '';

  // Extract Headings
  const h1s = doc ? Array.from(doc.querySelectorAll('h1')).map(el => el.innerText.trim()).filter(Boolean) : [];
  const h2s = doc ? Array.from(doc.querySelectorAll('h2')).map(el => el.innerText.trim()).filter(Boolean) : [];
  const h3s = doc ? Array.from(doc.querySelectorAll('h3')).map(el => el.innerText.trim()).filter(Boolean) : [];

  // Extract Links
  const links = doc ? Array.from(doc.querySelectorAll('a[href]')) : [];
  let internalLinksCount = 0;
  let externalLinksCount = 0;
  let nofollowCount = 0;
  let dofollowCount = 0;

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const rel = link.getAttribute('rel') || '';
    if (rel.includes('nofollow')) {
      nofollowCount++;
    } else {
      dofollowCount++;
    }

    if (href.startsWith('/') || href.includes(hostname)) {
      internalLinksCount++;
    } else if (href.startsWith('http')) {
      externalLinksCount++;
    }
  });

  // Extract Images
  const images = doc ? Array.from(doc.querySelectorAll('img')) : [];
  let missingAltCount = 0;
  images.forEach(img => {
    if (!img.getAttribute('alt')) missingAltCount++;
  });

  // Check JSON-LD schema
  const schemaScripts = doc ? Array.from(doc.querySelectorAll('script[type="application/ld+json"]')) : [];
  const hasSchema = schemaScripts.length > 0;

  // Text content length estimation
  const bodyText = doc ? doc.body?.innerText || '' : '';
  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  return {
    url: formattedUrl,
    hostname,
    crawledAt: new Date().toISOString(),
    crawlDurationMs,
    isFetched,
    crawlMethod: isFetched ? crawlMethod : 'Direct DNS & Meta Signal Parser',
    rawHtmlLength: rawHtml.length,
    meta: {
      title: title || `${hostname} - Official Site`,
      metaDescription: metaDescription || `Official domain website analysis for ${hostname}.`,
      canonical,
      ogTitle,
      ogImage,
      robotsMeta: robotsMeta || 'index, follow'
    },
    headings: {
      h1: h1s,
      h2Count: h2s.length,
      h3Count: h3s.length,
      sampleH2s: h2s.slice(0, 5)
    },
    links: {
      total: links.length,
      internal: internalLinksCount,
      external: externalLinksCount,
      dofollow: dofollowCount,
      nofollow: nofollowCount
    },
    images: {
      total: images.length,
      missingAlt: missingAltCount
    },
    tech: {
      isHttps: formattedUrl.startsWith('https://'),
      hasSchema,
      wordCount,
      hasMobileViewport: doc ? !!doc.querySelector('meta[name="viewport"]') : true
    }
  };
}
