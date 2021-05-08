import { handleRequest } from './handler';

addEventListener('fetch', (event) => {
  try {
    const { request } = event;
    if (request.method !== 'POST') {
      throw { status: 405, message: 'method not allowed' };
    }

    event.respondWith(handleRequest(event.request));
  } catch (e) {
    const res = new Response(
      JSON.stringify({ status: e.status, message: e.message }),
      { status: e.status },
    );
    event.respondWith(res);
  }
});
