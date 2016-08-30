$(document).ready(function() {

    $('#submit').on('click', function() {
        $('#map').show()
        $('.showDirections').show()
        $('.hiddenCards').show()

        $('.showDirections').click(function() {
            $('#directions').show();
            $('.showDirections').hide();
            $('.hideDirections').show();
        })

        $('.hideDirections').click(function() {
          $('#directions').hide();
          $('.showDirections').show();
          $('.hideDirections').hide();
        })

        var startVal = $('#start').val()
        var endVal = $('#end').val()

        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: {
                    lat: 40.02,
                    lng: 105.27
                } // centralized on Boulder
            });

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
                travelMode: 'WALKING',
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
            miles = (total / 1609.344).toFixed(2);
            $('#distance').append(miles)

            gallons = (miles / 19.5).toFixed(2)
            $('#gallons').append(gallons)

            dollars = (gallons * 2.218).toFixed(2)
            $('#dollars').append('$' + dollars)

            emissions = (gallons * 8887).toFixed(2)
            $('#emissions').append(emissions)
        }
    })

    $('#refresh').on('click', function() {
        location.reload()
    })

})
