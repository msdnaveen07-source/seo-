// AI Growth Strategy, Content Skyscraper & Cold Outreach Generator

export function generateContentOpportunities(domain, industry, targetKeywords = '') {
  const mainKw = targetKeywords.split(',')[0]?.trim() || industry || 'Growth';
  const brand = domain.split('.')[0].toUpperCase();

  return [
    {
      id: 'content-1',
      category: 'Data Study / Original Research',
      title: `The 2026 ${mainKw} Benchmark Report: Analyzing 5,000+ Industry Leaders`,
      targetAudience: 'Journalists, Industry Bloggers, Marketing Directors',
      linkBaitHook: 'Exclusive survey data, actionable graphs, & downloadable CSV dataset.',
      suggestedFormat: 'Interactive Infographic + PDF Downloadable Whitepaper',
      estimatedBacklinkPotential: 'High (35-60 natural editorial links)',
      priority: 'CRITICAL',
      status: 'PLANNED'
    },
    {
      id: 'content-2',
      category: 'Free Interactive Tool / Asset',
      title: `Free ${mainKw} Audit & ROI Calculator`,
      targetAudience: 'Business Owners, Agencies, Consultants',
      linkBaitHook: 'Instant downloadable performance report with zero sign-up friction.',
      suggestedFormat: 'Embeddable React Widget + Web Application',
      estimatedBacklinkPotential: 'Very High (50-100 resource page links)',
      priority: 'CRITICAL',
      status: 'PLANNED'
    },
    {
      id: 'content-3',
      category: 'Ultimate Guide / Pillar Content',
      title: `The Definitive Guide to ${mainKw} Strategy for 2026 & Beyond`,
      targetAudience: 'Practitioners, In-house Teams, Search Engines',
      linkBaitHook: '10,000+ word comprehensive pillar asset covering every edge-case.',
      suggestedFormat: 'Structured Longform Article with Video & Table of Contents',
      estimatedBacklinkPotential: 'High (25-45 contextual links)',
      priority: 'HIGH',
      status: 'PLANNED'
    },
    {
      id: 'content-4',
      category: 'Case Study / Proven Blueprint',
      title: `How We Grew Organic Search Traffic by 340% in 90 Days (Step-by-Step)`,
      targetAudience: 'Growth Hackers, CMOs, Agency Founders',
      linkBaitHook: 'Raw unedited analytics screenshots, template downloads, and process breakdowns.',
      suggestedFormat: 'Detailed Breakdown Article + Slide Deck',
      estimatedBacklinkPotential: 'Medium (15-30 backlinks)',
      priority: 'HIGH',
      status: 'PLANNED'
    },
    {
      id: 'content-5',
      category: 'Industry Comparison & Alternatives Page',
      title: `${brand} vs Top 5 ${industry} Platforms: Direct 2026 Feature Breakdown`,
      targetAudience: 'High-intent Buyers & Comparison Bloggers',
      linkBaitHook: 'Objective feature matrix with pricing transparency and real speed benchmarks.',
      suggestedFormat: 'Dynamic Filterable Comparison Table',
      estimatedBacklinkPotential: 'Medium (10-25 high-intent links)',
      priority: 'MEDIUM',
      status: 'PLANNED'
    }
  ];
}

export function generate306090ActionPlan(crawlData, backlinkData, userInput = {}) {
  const { hostname } = crawlData;
  const { metrics, linkOpportunities } = backlinkData;

  return {
    phase30Days: {
      title: 'Phase 1: Technical SEO Foundation & Low-Hanging Link Fixes (Days 1–30)',
      focus: 'Eliminate technical crawl blocks and claim existing unlinked brand mentions.',
      goals: ['Fix meta tags & H1 hierarchy', 'Claim 5 unlinked brand mentions', 'Publish 1 Free Interactive Tool'],
      tasks: [
        { id: 't1', name: 'Optimize Title Tags & Meta Descriptions across homepage and core landing pages', impact: 'HIGH', owner: 'SEO Specialist' },
        { id: 't2', name: 'Implement JSON-LD Organization Schema for rich SERP snippets', impact: 'HIGH', owner: 'Web Developer' },
        { id: 't3', name: `Execute Outreach for top 5 unlinked brand mentions on domains like ${linkOpportunities[0]?.referringDomain || 'TechRadar'}`, impact: 'CRITICAL', owner: 'Outreach Lead' },
        { id: 't4', name: 'Submit site to top tier verified software/business directories (G2, Capterra, ProductHunt)', impact: 'MEDIUM', owner: 'Growth Specialist' }
      ]
    },
    phase60Days: {
      title: 'Phase 2: Skyscraper Content & Competitor Gap Acquisition (Days 31–60)',
      focus: 'Publish high-authority link bait assets and target competitor referring domain gaps.',
      goals: ['Publish 2026 Benchmark Data Study', 'Acquire 15 Dofollow Backlinks from Competitor Gap Domains'],
      tasks: [
        { id: 't5', name: 'Produce and launch 2026 Original Data Benchmark Study with custom charts', impact: 'CRITICAL', owner: 'Content Lead' },
        { id: 't6', name: `Launch targeted email campaign targeting Forbes & HubSpot competitor link gap list`, impact: 'HIGH', owner: 'Outreach Lead' },
        { id: 't7', name: 'Pitch guest expert columns to top 3 industry publications (DR 70+)', impact: 'HIGH', owner: 'PR Specialist' }
      ]
    },
    phase90Days: {
      title: 'Phase 3: Scale Strategic PR & Domain Authority Velocity (Days 61–90)',
      focus: 'Maintain continuous link acquisition velocity and automate backlink health monitoring.',
      goals: ['Boost Estimated Domain Authority by +8 to +15 Points', 'Establish Recurring Monthly Link Velocity'],
      tasks: [
        { id: 't8', name: 'Syndicate content study findings to tech journalists & podcasters', impact: 'HIGH', owner: 'PR Specialist' },
        { id: 't9', name: 'Set up continuous Backlink Monitor automated health check alerts', impact: 'MEDIUM', owner: 'SEO Specialist' },
        { id: 't10', name: 'Audit anchor text distribution to ensure natural branded vs keyword proportions', impact: 'MEDIUM', owner: 'SEO Lead' }
      ]
    }
  };
}

function formatTitleCase(str) {
  if (!str) return 'Industry Growth';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function generatePersonalizedOutreachEmail(opportunity, domain, angleType = 'resource', targetKeywords = '', industry = '') {
  const targetDomain = opportunity.referringDomain || 'Publication';
  const targetName = opportunity.outreachEmail ? opportunity.outreachEmail.split('@')[0] : 'Editor';

  const brandName = domain.split('.')[0].toUpperCase();
  const rawKeyword = targetKeywords || opportunity.suggestedAnchor || industry || 'Professional Services';
  const primaryKeyword = formatTitleCase(rawKeyword.split(',')[0].trim());

  if (angleType === 'broken') {
    return {
      subject: `Broken link found on ${targetDomain} regarding ${primaryKeyword}`,
      body: `Hi ${targetName},

I was reading your comprehensive article on ${opportunity.sourceUrl} while researching ${primaryKeyword}.

I noticed that one of the cited links in your guide points to a 404 broken page.

We recently published an updated 2026 resource on ${domain} specifically focused on ${primaryKeyword}:
${opportunity.targetUrl}

Key Highlights of our resource:
- ${opportunity.suggestedContentAngle || `Step-by-step ${primaryKeyword} execution framework`}
- Updated 2026 data points and zero paywall

Would you be open to swapping the broken link with our updated guide?

Best regards,
Growth Team @ ${domain}`
    };
  }

  if (angleType === 'unlinked') {
    return {
      subject: `Quick question regarding ${brandName} (${primaryKeyword}) mention on ${targetDomain}`,
      body: `Hi ${targetName},

First off, great work on ${targetDomain}! I was reading your piece here:
${opportunity.sourceUrl}

I noticed you referenced ${brandName} in the context of ${primaryKeyword}. Thank you so much for the mention!

Would you be open to converting that mention into a live hyperlink to ${opportunity.targetUrl} so your readers can easily access our ${primaryKeyword} resources?

Appreciate your time and consideration!

Best regards,
Growth Team @ ${domain}`
    };
  }

  // Default Skyscraper / Resource Pitch
  return {
    subject: `Resource suggestion for ${targetDomain}: ${primaryKeyword} Guide by ${brandName}`,
    body: `Hi ${targetName},

I was reviewing your curated resources on ${opportunity.sourceUrl} — excellent list for anyone researching ${primaryKeyword}.

We recently released a comprehensive resource hub at ${domain} dedicated to ${primaryKeyword}:
${opportunity.targetUrl}

Why it will benefit your readers on ${targetDomain}:
- ${opportunity.suggestedContentAngle || `Complete 2026 benchmark guide for ${primaryKeyword}`}
- Includes actionable checklists, data points, and transparent pricing/insights
- 100% free with no sign-up barriers

Would you consider adding our ${primaryKeyword} guide to your resource page?

Best regards,
Growth Team @ ${domain}`
  };
}

export function generateKeywordNewsletter(domain, targetKeywords = '', industry = '') {
  const brandName = domain.split('.')[0].toUpperCase();
  const rawKeyword = targetKeywords || industry || 'Industry Growth';
  const primaryKeyword = formatTitleCase(rawKeyword.split(',')[0].trim());

  return {
    headline: `2026 ${primaryKeyword} Playbook: Essential Insights from ${brandName}`,
    previewText: `Discover the latest trends, benchmarks, and actionable strategies for ${primaryKeyword} in 2026.`,
    fullBody: `Subject: 🚀 The 2026 ${primaryKeyword} Growth Digest by ${brandName}

Welcome to this week's edition of the ${primaryKeyword} Industry Digest!

In this issue, we break down critical updates and actionable strategies tailored for ${domain}:

1. Key Trend: How ${primaryKeyword} is evolving in 2026
Recent data shows that businesses optimizing for ${primaryKeyword} see up to 3.4x higher domain visibility when pairing high-authority citations with expert longform content.

2. Featured Resource from ${brandName}:
We've published our complete, updated guide on ${primaryKeyword} — featuring diagnostic checklists, industry benchmarks, and proven execution steps:
👉 https://${domain}

3. Quick Action Item for this week:
Audit your top 3 pages for ${primaryKeyword}, optimize title tags, and ensure your schema markup is up to date.

Read the full report & claim your free resources:
https://${domain}

---
Sent by ${brandName} Media Syndication Network`
  };
}
