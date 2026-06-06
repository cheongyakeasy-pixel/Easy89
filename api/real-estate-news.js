const NAVER_REAL_ESTATE_NEWS_URL = 'https://news.naver.com/breakingnews/section/101/260';

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCharCode(Number.parseInt(decimal, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function matchFirst(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? '';
}

function parseNews(html) {
  return html
    .split('<li class="sa_item')
    .slice(1)
    .map((chunk, index) => {
      const itemHtml = chunk.split('</li>')[0] ?? chunk;
      const titleLink = itemHtml.match(/<a[^>]+class="sa_text_title[^"]*"[^>]*>/)?.[0] ?? '';
      const url = decodeHtml(matchFirst(titleLink, /href="([^"]+)"/));
      const title = stripTags(matchFirst(itemHtml, /<strong class="sa_text_strong">([\s\S]*?)<\/strong>/));
      const summary = stripTags(matchFirst(itemHtml, /<div class="sa_text_lede">([\s\S]*?)<\/div>/));
      const press = stripTags(matchFirst(itemHtml, /<div class="sa_text_press">([\s\S]*?)<\/div>/));
      const publishedAtText = stripTags(matchFirst(itemHtml, /<div class="sa_text_datetime[^"]*">\s*(?:<b>)?([\s\S]*?)(?:<\/b>)?\s*<\/div>/));
      const imageUrl = decodeHtml(matchFirst(itemHtml, /<img[^>]+data-src="([^"]+)"/)).replace(/&amp;/g, '&');

      if (!url || !title) {
        return null;
      }

      return {
        id: `${index + 1}-${url.split('/').slice(-2).join('-')}`,
        title,
        summary,
        press,
        publishedAtText,
        url,
        imageUrl,
      };
    })
    .filter(Boolean)
    .slice(0, 12);
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.status(405).json({ message: 'GET 요청만 지원합니다.' });
    return;
  }

  try {
    const naverResponse = await fetch(NAVER_REAL_ESTATE_NEWS_URL, {
      headers: {
        'accept-language': 'ko-KR,ko;q=0.9',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      },
    });

    if (!naverResponse.ok) {
      throw new Error(`Naver responded with ${naverResponse.status}`);
    }

    const html = await naverResponse.text();
    const items = parseNews(html);

    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    response.status(200).json({
      source: {
        name: '네이버 뉴스 경제/부동산',
        url: NAVER_REAL_ESTATE_NEWS_URL,
      },
      updatedAt: new Date().toISOString(),
      items,
    });
  } catch {
    response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    response.status(502).json({
      source: {
        name: '네이버 뉴스 경제/부동산',
        url: NAVER_REAL_ESTATE_NEWS_URL,
      },
      updatedAt: new Date().toISOString(),
      items: [],
      message: '부동산 뉴스를 불러오지 못했어요.',
    });
  }
}
