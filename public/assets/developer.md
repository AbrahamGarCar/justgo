
## Para cambiar mapbox
var mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
let mapa = document.getElementById('mapa');
mapa.style.position = 'relative';
mapa.style.width = '500px';
mapa.style.height = 'auto';


## para recargar pagina
window.location.reload();


## para pedir geolocalizacion en javascript
 console.log([position.coords.longitude ,position.coords.latitude ]);
     return new mapboxgl.LngLat(position.coords.longitude ,position.coords.latitude );
      
 return  [position.coords.longitude ,position.coords.latitude ];