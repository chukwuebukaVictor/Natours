//Create an account in https://account.mapbox.com/auth/signup/
const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2h1a3d1ZWJ1a2FveiIsImEiOiJjbGJtMTBucWIwMnl6M25ydWlpOGFldHkxIn0.54IyOL6h58G9nI2o4JnKsQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/chukwuebukaoz/clck7d9hm002215oez8i7fv3h',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 10,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  //Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom                            ',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //Add popup
  new mapboxgl.Popup({
    offSet: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
    .addTo(map);

  //Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
