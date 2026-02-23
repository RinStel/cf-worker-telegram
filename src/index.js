const TELEGRAM_API = 'https://api.telegram.org';

export default {
  async fetch(request, env) {
    const { SECRET } = env;
    const url = new URL(request.url);

    // Anti-theft: if SECRET is set, the path must start with /<SECRET>/
    if (SECRET) {
      const parts = url.pathname.split('/'); // ['', secret, ...]
      if (parts.length < 3 || parts[1] !== SECRET) {
        return new Response('Forbidden', { status: 403 });
      }
      url.pathname = '/' + parts.slice(2).join('/');
    }

    const target = `${TELEGRAM_API}${url.pathname}${url.search}`;
    return fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
  },
};
