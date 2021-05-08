import base62 from './base62';
import bodyParser from './bodyParser';

declare global {
  const URL_SHORTENER: KVNamespace;
}

export async function handleRequest(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ status: 405, message: 'method not allowed' }),
      { status: 405 },
    );
  }

  const body = await bodyParser(req);
  if (!body?.url) {
    return new Response(
      JSON.stringify({ status: 400, message: 'invalid request body' }),
      { status: 400 },
    );
  }

  // generate id
  const buffer = new Uint32Array(10);
  const ids = [...crypto.getRandomValues(buffer)].map((v) => v.toString(16));

  let key: string | undefined;
  for (const id of ids) {
    const record = await URL_SHORTENER.get(id);
    if (record) continue;
    key = id;
    break;
  }

  if (typeof key === 'undefined') {
    return new Response(
      JSON.stringify({
        status: 500,
        message: 'the number of times to retry exceed',
      }),
      { status: 500 },
    );
  }

  const encoded = base62.encode(parseInt(key, 16));
  const shortenUrl = `${new URL(req.url).origin}/${encoded}`;
  const data = { id: key, url: body.url, shortenUrl };
  URL_SHORTENER.put(key, JSON.stringify(data));

  return new Response(JSON.stringify(data), {
    headers: new Headers({
      'Cache-Control': 's-maxage=60, stale-while-revalidate',
    }),
  });
}
