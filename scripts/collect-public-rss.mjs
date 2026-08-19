import { createWorkerClient, classifyMention, loadWatchlist, matchEntities, normalizeUrl, upsertMentions } from './lib/mentions-worker.mjs';

const decodeXml = (value = '') => value
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

const tag = (xml, name) => decodeXml(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] || '');

function parseRss(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const item = match[1];
    const sourceMatch = item.match(/<source[^>]*>([\s\S]*?)<\/source>/i);
    return {
      title: tag(item, 'title'),
      sourceUrl: tag(item, 'link'),
      sourceName: decodeXml(sourceMatch?.[1] || 'Google News'),
      occurredAt: tag(item, 'pubDate') || null,
    };
  }).filter((item) => item.sourceUrl && item.title);
}

async function fetchGoogleNews(query) {
  const endpoint = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=es-419&gl=PE&ceid=PE:es-419`;
  const response = await fetch(endpoint, { headers: { 'User-Agent': 'BioHubVenture-monitor/1.0' } });
  if (!response.ok) throw new Error(`Google News RSS returned ${response.status}`);
  return parseRss(await response.text());
}

const watchlist = await loadWatchlist();
const client = createWorkerClient();
const results = await Promise.allSettled(watchlist.entities.map((entity) => fetchGoogleNews(`"${entity}" ${watchlist.newsQuerySuffix}`)));
const unique = new Map();

for (const result of results) {
  if (result.status !== 'fulfilled') {
    console.warn(result.reason.message);
    continue;
  }
  for (const item of result.value) {
    const sourceUrl = normalizeUrl(item.sourceUrl);
    const related = matchEntities(item.title, watchlist.entities);
    if (!related.length || unique.has(sourceUrl)) continue;
    unique.set(sourceUrl, {
      source_url: sourceUrl,
      canonical_url: sourceUrl,
      source_name: item.sourceName,
      platform: 'news',
      title: item.title,
      summary: item.title,
      mention_type: classifyMention({ title: item.title }),
      related_entities: related,
      occurred_at: item.occurredAt,
      collector: 'google-news-rss',
      raw_payload: item,
    });
  }
}

const report = await upsertMentions(client, [...unique.values()]);
console.log(JSON.stringify({ collector: 'google-news-rss', queries: watchlist.entities.length, candidates: unique.size, ...report }));
