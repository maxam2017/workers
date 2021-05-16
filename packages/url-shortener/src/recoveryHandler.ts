import type { RouterRequest } from 'router/dist/router';
import base62 from './base62';
import bodyParser from './bodyParser';

export default async function recoveryHandler(req: RouterRequest) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ status: 405, message: 'method not allowed' }),
      { status: 405 },
    );
  }

  const body = await bodyParser(req);
  if (!body?.hash) {
    return new Response(
      JSON.stringify({ status: 400, message: 'invalid request body' }),
      { status: 400 },
    );
  }

  const key = base62.decode(body.hash).toString(16);
  console.log(key);
  const record = await URL_SHORTENER.get(key);

  if (!record) {
    return new Response(
      JSON.stringify({ status: 500, message: '[kv] record not found' }),
      { status: 500 },
    );
  }

  return new Response(
    JSON.stringify({
      id: key,
      url: record,
      // shortenUrl: `${new URL(req.url).origin}/${body.hash}`,
    }),
    {
      headers: new Headers({
        'Cache-Control': 's-maxage=60, stale-while-revalidate',
      }),
    },
  );
}
