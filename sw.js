// Service worker : permet d'ouvrir l'appli même sans réseau (gymnase sans 4G).
const CACHE = "stats-basket-v1";
const SHELL = ["./", "./index.html", "./config.js", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-maskable.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Fichiers de l'appli : réseau d'abord (pour avoir les mises à jour), cache si hors-ligne
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html"))));
    return;
  }
  // Librairie Firebase (gstatic) : cache d'abord
  if (url.hostname === "www.gstatic.com") {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
  }
  // Le reste (base Firestore) passe sans être touché
});
