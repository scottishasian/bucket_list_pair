var GoogleMapsLoader =  require('google-maps');

const MapWrapper = function(container, coordinates, zoom, whenmaploaded) {
  GoogleMapsLoader.load(function(google){
    this.google = google; //google object.
    this.googleMap = new google.maps.Map(container, {
      center: coordinates,
      zoom: zoom
  });
  this.markers = []

  // whenmaploaded();
  // //if this line hits, the map is loaded.

  }.bind(this));
}

MapWrapper.prototype.addMarker = function(coords) {
  var marker = new this.google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
}

MapWrapper.prototype.myLocation = function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    this.googleMap.setCenter(location)
    this.addMarker(location, "Welcome to Jurassic Park");
  }.bind(this))
}

module.exports = MapWrapper;
