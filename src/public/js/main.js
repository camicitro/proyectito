const map = L.map('map-template').setView([-32.853699, -68.860344],10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.locate({enableHighAccuracy: true})
map.on('locationfound',e => {
    const coords = [e.latlng.lat,e.latlng.lng];
    const marker = L.marker(coords);
    marker.bindPopup('Tas aca Loro')
    map.addLayer(marker);
})
