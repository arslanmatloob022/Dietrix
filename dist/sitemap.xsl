<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
<title>Dietrix Fit — XML Sitemap</title>
<meta charset="UTF-8"/>
<meta name="robots" content="noindex, follow"/>
<style>
  :root {
    --emerald-600: #059669;
    --emerald-800: #065f46;
    --teal-400: #2dd4bf;
    --ink-900: #0f172a;
    --ink-500: #64748b;
    --ink-300: #cbd5e1;
    --bg: #f8fafc;
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
    padding: 32px 24px 20px;
    max-width: 1080px;
    margin: 0 auto;
  }
  .brand-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }
  .brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: linear-gradient(135deg, var(--emerald-600), var(--teal-400));
  }
  h1 {
    font-size: 1.35rem;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .sub {
    color: var(--ink-500);
    font-size: 0.92rem;
    margin: 6px 0 0;
  }
  .count-pill {
    display: inline-block;
    margin-top: 14px;
    padding: 5px 12px;
    border-radius: 999px;
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: var(--emerald-800);
    font-size: 0.82rem;
    font-weight: 700;
  }
  main {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 24px 48px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background: var(--card);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 12px rgba(15, 23, 42, 0.04);
  }
  thead th {
    text-align: left;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-500);
    padding: 14px 18px;
    border-bottom: 1px solid var(--ink-300);
    background: #f1f5f9;
  }
  tbody td {
    padding: 13px 18px;
    border-bottom: 1px solid #edf2f7;
    font-size: 0.88rem;
    vertical-align: middle;
  }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover { background: #f8fffd; }
  td.loc a {
    color: var(--emerald-800);
    text-decoration: none;
    font-weight: 600;
    word-break: break-all;
  }
  td.loc a:hover { text-decoration: underline; }
  td.priority {
    font-variant-numeric: tabular-nums;
    color: var(--ink-500);
  }
  td.freq {
    color: var(--ink-500);
    text-transform: capitalize;
  }
  footer {
    max-width: 1080px;
    margin: 0 auto;
    padding: 8px 24px 40px;
    color: var(--ink-300);
    font-size: 0.78rem;
  }
  footer a { color: var(--ink-500); }
  @media (max-width: 640px) {
    td.freq, td.priority, th.freq, th.priority { display: none; }
  }
</style>
</head>
<body>
<header>
  <div class="brand-row">
    <div class="brand-mark"></div>
    <h1>Dietrix Fit — XML Sitemap</h1>
  </div>
  <p class="sub">Machine-readable index of every canonical page submitted to search engines.</p>
  <span class="count-pill"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs</span>
</header>
<main>
<table>
  <thead>
    <tr>
      <th>URL</th>
      <th class="freq">Last Modified</th>
      <th class="freq">Change Frequency</th>
      <th class="priority">Priority</th>
    </tr>
  </thead>
  <tbody>
    <xsl:for-each select="sitemap:urlset/sitemap:url">
      <xsl:sort select="sitemap:priority" order="descending"/>
      <tr>
        <td class="loc">
          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
        </td>
        <td class="freq"><xsl:value-of select="sitemap:lastmod"/></td>
        <td class="freq"><xsl:value-of select="sitemap:changefreq"/></td>
        <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
      </tr>
    </xsl:for-each>
  </tbody>
</table>
</main>
<footer>
  Generated automatically at build time. Search engines read the underlying XML directly — this styling is for human readability only. <a href="https://dietrix.fit/">dietrix.fit</a>
</footer>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
