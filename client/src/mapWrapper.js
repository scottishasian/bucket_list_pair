var GoogleMapsLoader =  require('google-maps');

const MapWrapper = function(container, coordinates, zoom, whenmaploaded) {
  GoogleMapsLoader.load(function(google){
    this.googleMap = new google.maps.Map(container, {
      center: coordinates,
      zoom: zoom
  });
  this.markers = []

  whenmaploaded();
  //if this line hits, the map is loaded.

}.bind(this));
}

module.exports = MapWrapper;
