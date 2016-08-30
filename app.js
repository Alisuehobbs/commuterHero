$(document).ready(function() {

    $('#submit').on('click', function(event) {
        // event.preventDefault()
        console.log("Submit was clicked");

        var startVal = $('#start').val()
        var endVal = $('#end').val()
        console.log(startVal);
        console.log(endVal);

        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {
                    lat: -24.345,
                    lng: 134.46
                } // Australia.
            });
            $('#map').append(map.mapUrl)

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                draggable: true,
                map: map,
                panel: document.getElementById('directions')
            });

            directionsDisplay.addListener('directions_changed', function() {
                computeTotalDistance(directionsDisplay.getDirections());
            });

            displayRoute(startVal, endVal, directionsService,
                directionsDisplay);
        }
        initMap()

        function displayRoute(origin, destination, service, display) {
            service.route({
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING',
                avoidTolls: true
            }, function(response, status) {
                if (status === 'OK') {
                    display.setDirections(response);
                } else {
                    alert('Could not display directions due to: ' + status);
                }
            });
        }

        function computeTotalDistance(result) {
            var total = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
                total += myroute.legs[i].distance.value;
            }
            total = total / 1000;
            document.getElementById('total').innerHTML = total + ' km';
        }
        // computeTotalDistance()





        //PREVIOUS WORK

        // function calculateRoute(start, end) {
        //     var myOptions = {
        //         zoom: 10,
        //         center: new google.maps.LatLng(40.02, 105.27),
        //         mapTypeId: 'roadmap',
        //     };
        //     //draw the map
        //     var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
        //
        //     var directionsDisplay = new google.maps.DirectionsRenderer;
        //
        //     var directionsService = new google.maps.DirectionsService();
        //     var directionsRequest = {
        //         origin: start,
        //         destination: end,
        //         travelMode: 'DRIVING',
        //         unitSystem: google.maps.UnitSystem.IMPERIAL,
        //     };
        //     directionsService.route(
        //         directionsRequest,
        //         function(response, status) {
        //             if (status == google.maps.DirectionsStatus.OK) {
        //                 console.log('It was okay');
        //                 console.log('mapObject: ', mapObject);
        //                 directionsDisplay.setMap(mapObject)
        //                 var myMap = new google.maps.DirectionsRenderer({
        //                     map: mapObject,
        //                     directions: response
        //                 });
        //                 $('#map').append(mapObject.mapUrl)
        //             } else
        //                 $("#error").append("Unable to retrieve your route<br />");
        //         }
        //     );
        // }
        // calculateRoute(startVal, endVal)
    })
})
