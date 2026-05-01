import fs from 'fs';

const API_KEY = 'OCrLxR6Uad9FBIM5OAgxND5laEmPvh6j7e31ErxXBQnygQrw';
const BEGIN_DATE = '20250319';
const END_DATE = '20250928';

async function fetchAllHeadlines() {
  let page = 0;
  let allArticles = [];
  let totalHits = null;

  console.log('Fetching NYT headlines...');

  do {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Russia&begin_date=${BEGIN_DATE}&end_date=${END_DATE}&page=${page}&api-key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (totalHits === null) {
      totalHits = data.response.metadata.hits;
      console.log(`Total matching articles: ${totalHits}`);
    }

    allArticles = [...allArticles, ...data.response.docs];
    console.log(`Fetched page ${page} — ${allArticles.length}/${totalHits} articles`);

    page++;

    // NYT allows 5 requests/second — wait 250ms to stay safe
    await new Promise(resolve => setTimeout(resolve, 10000));

  } while (allArticles.length < totalHits && page < 214); // 2131 hits / 10 per page = 214 pages

  // Filter to only articles where "Russia" is in the headline, then group by date
  const russiaDates = {};

  allArticles.forEach(article => {
    const headline = article.headline.main;
    if (!headline.toLowerCase().includes('russia')) return;

    const date = article.pub_date.split('T')[0];
    if (!russiaDates[date]) russiaDates[date] = [];
    russiaDates[date].push(headline);
  });

  const output = Object.keys(russiaDates)
    .sort()
    .map(date => ({
      game_date: `${date}T00:00:00.000`,
      russia_in_headline: true,
      headline_count: russiaDates[date].length,
      headlines: russiaDates[date]
    }));

  fs.writeFileSync('./russia_headlines.json', JSON.stringify(output, null, 2));
  console.log(`Done! ${output.length} days written to russia_headlines.json`);
}

fetchAllHeadlines().catch(console.error);