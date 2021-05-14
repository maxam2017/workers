import recoveryHandler from './recoveryHandler';
import shortenHanlder from './shortenHanlder';

declare global {
  const URL_SHORTENER: KVNamespace;
}

addEventListener('fetch', async (event) => {
  const { request } = event;
  const pathname = new URL(request.url).pathname.split('/')[1];

  switch (pathname) {
    case 'shorten':
      event.respondWith(shortenHanlder(request));
      break;
    case 'recovery':
      event.respondWith(recoveryHandler(request));
      break;
    default:
      event.respondWith(new Response('', { status: 404 }));
  }
});
