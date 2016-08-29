$(document).ready(function() {
    console.log('I am working');

    $('#submit').on('click', function(event) {
      // event.preventDefault()
            console.log("Submit was clicked");

            var startVal = $('#start').val()
            var endVal = $('#end').val()
            console.log(startVal);
            console.log(endVal);

            function calculateRoute(start, end) {
                var myOptions = {
                    zoom: 10,
                    center: new google.maps.LatLng(40.02, 105.27),
                    mapTypeId: google.maps.MapTypeId.ROADS,
                };
                //draw the map
                var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

                var directionsDisplay = new google.maps.DirectionsRenderer;

                var directionsService = new google.maps.DirectionsService();
                var directionsRequest = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL
                };
                directionsService.route(
                    directionsRequest,
                    function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                          console.log('It was okay');
                          console.log('mapObject: ',mapObject);
                          directionsDisplay.setMap(mapObject)
                            var myMap = new google.maps.DirectionsRenderer({
                                map: mapObject,
                                directions: response
                            });
                            $('#map').append(mapObject.mapUrl)
                        } else
                            $("#error").append("Unable to retrieve your route<br />");
                    }
                );
            }
            calculateRoute(startVal,endVal)
        })

})
