import type { RouterRequest } from 'router/dist/router';
import base62 from './base62';
import bodyParser from './bodyParser';

export default async function shortenHanlder(
  req: RouterRequest,
): Promise<Response> {
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
  let retry = 10;
  let key: string | undefined;
  const buffer = new Uint32Array(2);
  while (retry > 0) {
    retry -= 1;
    const id = parseInt(crypto.getRandomValues(buffer).join('')).toString(16);
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
  // const shortenUrl = `${new URL(req.url).origin}/${encoded}`;
  const data = { id: key, url: body.url, hash: encoded };
  await URL_SHORTENER.put(key, body.url);

  return new Response(JSON.stringify(data), {
    headers: new Headers({
      'Cache-Control': 's-maxage=60, stale-while-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    }),
  });
}
