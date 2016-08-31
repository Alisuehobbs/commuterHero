$(document).ready(function() {

  // modals
  $('.modal-trigger').leanModal();

    // submit
    $('#submit').on('click', function() {
      //clear directions
      $('#directions').children().remove()

      var startVal = $('#start').val()
      var endVal = $('#end').val()
      var days = $('#days').val()

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
            miles = ((total / 1609.344) * 2).toFixed(2);
            $('#distance').text(miles)

            gallons = ((miles / 19.5) * days).toFixed(2)
            $('#gallons').text(gallons)

            dollars = ((gallons * 2.218) * days).toFixed(2)
            $('#dollars').text('$' + dollars)

            emissions = ((gallons * 8887) * days).toFixed(2)
            $('#emissions').text(emissions)


        }
    })

})
