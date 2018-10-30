var staticCacheName = 'sp-static-v1';
self.addEventListener('install', async function(event){

    event.waitUntil(
      caches.open(staticCacheName).then(function(cache){
        return cache.addAll([
            '/',
            'project1/',
            'project2/',
            'project3/',
            'project4/',
            'project1/add2numbers.js',
            'images/isan2-small.jpg',
            'images/sanproj.png',
            'images/warkop.jpg',
            'images/resto_spanyol.png',
            'https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js',
            'https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
            'https://unpkg.com/leaflet@1.3.4/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.3.4/dist/leaflet.js',
            'project3/styles.css',
            'project4/',
            'project4/js/peta.js',
            'project4/data/peta.json'
        ]);
      })
    );
  });

  self.addEventListener('activate', function(event){
    event.waitUntil(
      caches.keys().then(function(cacheNames){
        return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('sp-') &&
                  cacheName != staticCacheName;
        }).map(function(cacheName){
          return cache.delete(cacheName)
        })
        );
      })
    );
  });

  self.addEventListener('fetch', function(event){
    var requestUrl = new URL(event.request.url);

    if(requestUrl.origin === location){
      if(requestUrl.pathname === '/project1'){
        event.respondWith(caches.match('/project1'));
        return;
      }else if(requestUrl.pathname === '/project2'){
        event.respondWith(caches.match('/project2'));
        return;
      }
      else if(requestUrl.pathname === '/project3'){
        event.respondWith(caches.match('/project3'));
        return;
      }
      else if(requestUrl.pathname === '/project4'){
        event.respondWith(caches.match('/project4'));
        return;
      }
    }
event.respondWith(
    caches.match(event.request).then(function(response){
        return response || fetch(event.request);
    })
);
});
  
  