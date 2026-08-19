import { execFileSync } from 'node:child_process';
import { createWorkerClient, classifyMention, loadWatchlist, matchEntities, normalizeUrl, upsertMentions } from './lib/mentions-worker.mjs';

function parseJson(output) {
  const firstBracket = Math.min(...['{', '['].map((token) => {
    const index = output.indexOf(token);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  }));
  if (firstBracket === Number.MAX_SAFE_INTEGER) throw new Error('Agent Reach search did not return JSON.');
  return JSON.parse(output.slice(firstBracket));
}

function extractResults(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.result?.results)) return payload.result.results;
  return [];
}

const watchlist = await loadWatchlist();
const client = createWorkerClient();
const candidates = new Map();

for (const entity of watchlist.entities) {
  const query = `"${entity}" ${watchlist.newsQuerySuffix}`;
  const output = execFileSync('mcporter', ['call', 'exa.web_search_exa', `query=${query}`, `numResults=${watchlist.maxResultsPerQuery}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  for (const result of extractResults(parseJson(output))) {
    const url = result.url || result.link;
    if (!url) continue;
    const sourceUrl = normalizeUrl(url);
    const title = result.title || '';
    const summary = result.text || result.snippet || result.summary || '';
    const related = matchEntities(`${title} ${summary}`, watchlist.entities);
    if (!related.length || candidates.has(sourceUrl)) continue;
    candidates.set(sourceUrl, {
      source_url: sourceUrl,
      canonical_url: sourceUrl,
      source_name: result.author || new URL(sourceUrl).hostname,
      platform: 'web',
      author_name: result.author || null,
      title,
      summary,
      mention_type: classifyMention({ title, summary }),
      related_entities: related,
      occurred_at: result.publishedDate || result.published_date || null,
      collector: 'agent-reach-exa',
      raw_payload: result,
    });
  }
}

const report = await upsertMentions(client, [...candidates.values()]);
console.log(JSON.stringify({ collector: 'agent-reach-exa', queries: watchlist.entities.length, candidates: candidates.size, ...report }));
