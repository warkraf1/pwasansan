var staticCacheName = 'sp-static-v1';
self.addEventListener('install', function(event){

    event.waitUntil(
      caches.open(staticCacheName).then(function(cache){
        return cache.addAll([
            '/',
            'project1/index.html',
            'project1/add2numbers.js'
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
      if(requestUrl.pathname === '/'){
        event.respondWith(caches.match('/skeleton'));
        return;
      }
    }

    caches.match(event.request).then(function(response){
        return response || fetch(event.request);
    })

});
  
  