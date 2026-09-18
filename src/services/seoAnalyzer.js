// Technical SEO Audit Engine

export function analyzeTechnicalSEO(crawlData) {
  const issues = [];
  const passed = [];

  const { meta, headings, links, images, tech, url, hostname } = crawlData;

  // 1. SSL / HTTPS Check
  if (tech.isHttps) {
    passed.push({
      id: 'ssl',
      title: 'HTTPS Secure Connection',
      desc: 'Website is served over secure HTTPS encryption.'
    });
  } else {
    issues.push({
      id: 'ssl',
      severity: 'CRITICAL',
      title: 'Missing HTTPS Security',
      desc: 'The domain is loading over HTTP instead of HTTPS, severely impacting user trust and search rankings.',
      recommendation: 'Enforce SSL certificate and 301 redirect all HTTP traffic to HTTPS.'
    });
  }

  // 2. Title Tag Check
  if (!meta.title) {
    issues.push({
      id: 'title-missing',
      severity: 'HIGH',
      title: 'Missing <title> Tag',
      desc: 'No meta title tag was found on the homepage.',
      recommendation: 'Add a descriptive title tag containing primary brand and target keywords (50-60 characters).'
    });
  } else if (meta.title.length < 30) {
    issues.push({
      id: 'title-short',
      severity: 'MEDIUM',
      title: 'Title Tag Too Short',
      desc: `Title tag is only ${meta.title.length} characters long: "${meta.title}".`,
      recommendation: 'Expand title tag to 50-60 characters to maximize CTR in SERPs.'
    });
  } else if (meta.title.length > 60) {
    issues.push({
      id: 'title-long',
      severity: 'LOW',
      title: 'Title Tag Exceeds Recommended Length',
      desc: `Title tag is ${meta.title.length} characters and may be truncated in search results.`,
      recommendation: 'Trim title tag down under 60 characters.'
    });
  } else {
    passed.push({
      id: 'title-opt',
      title: 'Optimal Title Tag Length',
      desc: `Title tag is perfectly optimized (${meta.title.length} chars).`
    });
  }

  // 3. Meta Description Check
  if (!meta.metaDescription) {
    issues.push({
      id: 'meta-desc-missing',
      severity: 'HIGH',
      title: 'Missing Meta Description',
      desc: 'No meta description tag found.',
      recommendation: 'Write a compelling meta description (140-160 characters) with target keyword call-to-actions.'
    });
  } else if (meta.metaDescription.length < 70) {
    issues.push({
      id: 'meta-desc-short',
      severity: 'MEDIUM',
      title: 'Meta Description Too Short',
      desc: `Meta description is only ${meta.metaDescription.length} characters long.`,
      recommendation: 'Expand meta description to 140-160 characters.'
    });
  } else {
    passed.push({
      id: 'meta-desc-opt',
      title: 'Meta Description Configured',
      desc: `Meta description present (${meta.metaDescription.length} chars).`
    });
  }

  // 4. Heading H1 Hierarchy
  if (headings.h1.length === 0) {
    issues.push({
      id: 'h1-missing',
      severity: 'HIGH',
      title: 'Missing H1 Heading',
      desc: 'No H1 tag detected on the page.',
      recommendation: 'Add exactly one clear, keyword-targeted H1 heading tag at the top of the page.'
    });
  } else if (headings.h1.length > 1) {
    issues.push({
      id: 'h1-multiple',
      severity: 'MEDIUM',
      title: 'Multiple H1 Headings Detected',
      desc: `Found ${headings.h1.length} H1 tags. Having multiple H1s can confuse search engine topic modeling.`,
      recommendation: 'Consolidate down to 1 primary H1 tag and use H2/H3 for subheadings.'
    });
  } else {
    passed.push({
      id: 'h1-opt',
      title: 'Clean H1 Heading Structure',
      desc: `Single H1 tag detected: "${headings.h1[0]}".`
    });
  }

  // 5. Image Alt Tags
  if (images.missingAlt > 0) {
    issues.push({
      id: 'img-alt',
      severity: images.missingAlt > 5 ? 'HIGH' : 'LOW',
      title: `Missing Alt Text on ${images.missingAlt} Image(s)`,
      desc: `${images.missingAlt} out of ${images.total} images are missing alternative text attributes for accessibility and image SEO.`,
      recommendation: 'Add descriptive alt text containing contextual keywords to all images.'
    });
  } else if (images.total > 0) {
    passed.push({
      id: 'img-alt-pass',
      title: 'Image Alt Text Compliance',
      desc: 'All images contain descriptive alt text.'
    });
  }

  // 6. Schema Structured Data
  if (tech.hasSchema) {
    passed.push({
      id: 'schema-pass',
      title: 'Structured Data Schema Detected',
      desc: 'JSON-LD schema markup was successfully identified.'
    });
  } else {
    issues.push({
      id: 'schema-missing',
      severity: 'MEDIUM',
      title: 'Missing JSON-LD Schema Markup',
      desc: 'No structured data (Organization, WebSite, Article, Product) found on the page.',
      recommendation: 'Implement JSON-LD Schema (e.g. Organization / WebPage) to qualify for rich snippets in Google.'
    });
  }

  // 7. Mobile Viewport
  if (tech.hasMobileViewport) {
    passed.push({
      id: 'mobile-pass',
      title: 'Mobile Viewport Tag Present',
      desc: 'Page includes responsive meta viewport configuration.'
    });
  } else {
    issues.push({
      id: 'mobile-fail',
      severity: 'HIGH',
      title: 'Missing Mobile Viewport Tag',
      desc: 'Viewport tag missing, rendering page non-responsive on mobile devices.',
      recommendation: 'Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.'
    });
  }

  // Calculate Overall Technical SEO Score out of 100
  let score = 100;
  issues.forEach(i => {
    if (i.severity === 'CRITICAL') score -= 25;
    if (i.severity === 'HIGH') score -= 15;
    if (i.severity === 'MEDIUM') score -= 8;
    if (i.severity === 'LOW') score -= 4;
  });
  score = Math.max(15, Math.min(100, score));

  return {
    score,
    totalChecked: issues.length + passed.length,
    issues,
    passed
  };
}
