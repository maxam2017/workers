import recoveryHandler from './recoveryHandler';
import shortenHanlder from './shortenHanlder';
import Router from 'router';

declare global {
  const URL_SHORTENER: KVNamespace;
}

const router = Router();

router.post('/shorten', shortenHanlder);
router.post('/recovery', recoveryHandler);
router.all('*', async () => new Response('', { status: 404 }));

addEventListener('fetch', async (event) => {
  event.respondWith(router.handle(event.request));
});
