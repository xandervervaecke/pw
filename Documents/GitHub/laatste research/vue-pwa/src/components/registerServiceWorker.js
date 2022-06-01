/* eslint-disable no-console */

import { register } from 'register-service-worker'



self.addEventListener('push', function(e) {
    var options = {
        body: 'This notification was generated from a push!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [{
                action: 'explore',
                title: 'Explore this new world',
                icon: 'images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: 'images/xmark.png'
            },
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Hello world!', options)
    );
});

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
        },
        registered() {
            console.log('Service worker has been registered.')
        },
        cached() {
            console.log('Content has been cached for offline use.')
        },
        updatefound() {
            console.log('New content is downloading.')
        },
        updated() {
            console.log('New content is available; please refresh.')
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        }
    })
}

// named cache in Cache Storage
const CACHE_NAME = 'devtools-tips-v3';

// list of requests whose responses will be pre-cached at install
const INITIAL_CACHED_RESOURCES = [
    '/',
    '/offline/',
    '/all/',
    '/browser/edge/',
    '/browser/safari/',
    '/browser/firefox/',
    '/browser/chrome/',
    '/assets/style.css',
    '/assets/filter-tip-list.js',
    '/assets/share.js',
    '/assets/logo.png',
    'https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css',
    '/assets/localforage-1.10.0.min.js',
    '/src/components/HelloWorld.vue',
    '/src/main.js',
    'https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon'
];
// install event handler (note async operation)
// opens named cache, pre-caches identified resources above
self.addEventListener('install', event => {
    console.log(`[Service Worker] Fetched resource ${event.request.url}`);
    event.waitUntil((async() => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(INITIAL_CACHED_RESOURCES);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async() => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(CACHE_NAME);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});