import { handleRequest } from './handler';

addEventListener('fetch', async (event) => {
  const { request } = event;

  event.respondWith(handleRequest(request));
});
