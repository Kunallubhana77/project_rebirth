const CACHE_NAME = 'project-rebirth-v1';
const VIDEOS_TO_CACHE = [
  'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000614/first_mxaena.mp4',
  'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000584/day_jwprlf.mp4',
  'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000566/sec_ojc3cq.mp4',
  'https://res.cloudinary.com/dljrnb9ef/video/upload/v1778000612/3_nqhg8i.mp4'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching videos...');
      return cache.addAll(VIDEOS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (VIDEOS_TO_CACHE.includes(request.url)) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
