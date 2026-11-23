/* App shell only: never cache questionnaire responses, localStorage, or API requests. */
const CACHE_NAME = "lub-dee-mai-look-pwa-v1";
const BASE = new URL("./", self.registration.scope);
const ASSETS = ["./", "./index.html", "./psq.css", "./psq-scoring.js", "./psq-app.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"].map(path => new URL(path, BASE).href);
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("lub-dee-mai-look-pwa-") && key !== CACHE_NAME).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener("fetch", event => {
  const req=event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match(new URL("./index.html", BASE).href)));
    return;
  }
  if (!ASSETS.includes(req.url)) return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
