<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
<title>Dietrix Fit — XML Sitemap</title>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex, follow"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<style>
  :root {
    --emerald-600: #059669;
    --emerald-700: #047857;
    --emerald-800: #065f46;
    --teal-400: #2dd4bf;
    --ink-900: #0f172a;
    --ink-500: #64748b;
    --ink-400: #94a3b8;
    --ink-200: #e2e8f0;
    --bg: #f6f9f8;
    --card: #ffffff;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--ink-900);
  }
  header {
    padding: 40px 24px 24px;
    max-width: 1120px;
    margin: 0 auto;
  }
  .brand-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }
  .brand-mark {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
  }
  .brand-name {
    font-size: 1.02rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--ink-900);
  }
  .brand-name em {
    font-style: normal;
    color: var(--emerald-700);
  }
  h1 {
    font-size: 1.6rem;
    margin: 0 0 8px;
    letter-spacing: -0.015em;
  }
  .sub {
    color: var(--ink-500);
    font-size: 0.96rem;
    margin: 0;
    max-width: 640px;
    line-height: 1.5;
  }
  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 13px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
  }
  .pill--count {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: var(--emerald-800);
  }
  .pill--host {
    background: var(--card);
    border: 1px solid var(--ink-200);
    color: var(--ink-500);
  }
  main {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px 56px;
  }
  .table-card {
    background: var(--card);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 28px rgba(15, 23, 42, 0.05);
    border: 1px solid var(--ink-200);
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead th {
    text-align: left;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--ink-500);
    padding: 15px 20px;
    border-bottom: 1px solid var(--ink-200);
    background: #fafbfb;
  }
  tbody td {
    padding: 14px 20px;
    border-bottom: 1px solid #eef1f2;
    font-size: 0.88rem;
    vertical-align: middle;
    white-space: nowrap;
  }
  td.loc { white-space: normal; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover { background: #f7fdfb; }
  td.loc a {
    color: var(--ink-900);
    text-decoration: none;
    font-weight: 600;
    word-break: break-all;
  }
  td.loc a:hover { color: var(--emerald-700); text-decoration: underline; }
  td.date { color: var(--ink-500); font-variant-numeric: tabular-nums; }
  td.freq { color: var(--ink-500); text-transform: capitalize; }
  .priority-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .priority-track {
    width: 56px;
    height: 6px;
    border-radius: 999px;
    background: var(--ink-200);
    overflow: hidden;
  }
  .priority-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--emerald-600), var(--teal-400));
  }
  .priority-value {
    font-variant-numeric: tabular-nums;
    color: var(--ink-500);
    font-size: 0.82rem;
    min-width: 28px;
  }
  footer {
    max-width: 1120px;
    margin: 0 auto;
    padding: 8px 24px 40px;
    color: var(--ink-400);
    font-size: 0.8rem;
    line-height: 1.6;
  }
  footer a { color: var(--ink-500); font-weight: 600; text-decoration: none; }
  footer a:hover { text-decoration: underline; }
  @media (max-width: 680px) {
    th.freq, td.freq, th.date, td.date { display: none; }
  }
</style>
</head>
<body>
<header>
  <div class="brand-row">
    <svg class="brand-mark" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sitemapBrandGradient" x1="8" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop stop-color="#059669"/>
          <stop offset="1" stop-color="#0d9488"/>
        </linearGradient>
        <mask id="sitemapBrandLeaf">
          <rect width="64" height="64" fill="white"/>
          <path d="M27.2 39.5c3.6-5.4 7.7-9.8 13-13.6" stroke="black" stroke-width="2.4" stroke-linecap="round"/>
        </mask>
      </defs>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 6h20c18.8 0 32 10.7 32 26S46.8 58 28 58H8V6Zm14 12v28h6c10.3 0 18-5.8 18-14s-7.7-14-18-14h-6Z" fill="url(#sitemapBrandGradient)"/>
      <path d="M25.2 39.8c1.1-10.2 7.6-16.6 18.1-17.8-.9 10.5-7.5 16.9-18.1 17.8Z" fill="url(#sitemapBrandGradient)" mask="url(#sitemapBrandLeaf)"/>
    </svg>
    <span class="brand-name">Dietrix <em>Fit</em></span>
  </div>
  <h1>XML Sitemap</h1>
  <p class="sub">Machine-readable index of every canonical page submitted to search engines. Sorted by crawl priority.</p>
  <div class="meta-row">
    <span class="pill pill--count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</span>
    <span class="pill pill--host">dietrixfit.com</span>
  </div>
</header>
<main>
<div class="table-card">
<table>
  <thead>
    <tr>
      <th>URL</th>
      <th class="date">Last Modified</th>
      <th class="freq">Change Frequency</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <xsl:for-each select="sitemap:urlset/sitemap:url">
      <xsl:sort select="sitemap:priority" order="descending"/>
      <tr>
        <td class="loc">
          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
        </td>
        <td class="date"><xsl:value-of select="sitemap:lastmod"/></td>
        <td class="freq"><xsl:value-of select="sitemap:changefreq"/></td>
        <td>
          <div class="priority-cell">
            <div class="priority-track">
              <div class="priority-fill">
                <xsl:attribute name="style">width: <xsl:value-of select="sitemap:priority * 100"/>%</xsl:attribute>
              </div>
            </div>
            <span class="priority-value"><xsl:value-of select="sitemap:priority"/></span>
          </div>
        </td>
      </tr>
    </xsl:for-each>
  </tbody>
</table>
</div>
</main>
<footer>
  Generated automatically at build time from the site's route list — search engines read the underlying XML directly, this styling is for human readability only.<br/>
  <a href="https://dietrixfit.com/">dietrixfit.com</a>
</footer>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
