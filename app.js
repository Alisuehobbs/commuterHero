$(document).ready(function() {
  // modals
  $('.modal-trigger').leanModal();

  // form select
  $('select').material_select();

  // submit
  $('#submit').on('click', function() {
    // clear directions
    $('#directions').children().remove();

    const startVal = $('#start').val();
    const endVal = $('#end').val();
    const days = $('#days').val();
    const typeOfTranspo = $('#typeOfTranspo').val();

    // errors
    const errors = [];

    if (startVal === '') {
      errors.push('Please enter a valid home address.');
    }
    if (endVal === '') {
      errors.push('Please enter a vaild work or school address.');
    }
    if (days < 1 || days > 30) {
      errors.push('Please select a number of days between 1 and 30.');
    }
    if (typeOfTranspo === '') {
      errors.push('Please select one type of transportation.');
    }

    if (errors.length !== 0) {
      alert(errors);
    }
    else {
      $('#map').show();
      $('#showDirections').show();
      $('.hiddenCards').show();
      $('#hideDirections').hide();

      $('#showDirections').click(function() {
        $('#directions').show();
        $('#showDirections').hide();
        $('#hideDirections').show();
      });

      $('#hideDirections').click(function() {
        $('#directions').hide();
        $('#showDirections').show();
        $('#hideDirections').hide();
      });

        // stats info
      $('#statsInfo').text(`If you travel by ${typeOfTranspo} for ${days} days this month, you will save:`);

      function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {
            lat: 40.02,
            zoom: 10,
            lng: 105.27
          } // centralized on Boulder
        });

        const directionsService = new google.maps.DirectionsService;
        const directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map,
          panel: document.getElementById('directions')
        });

        directionsDisplay.addListener('directions_changed', function() {
          computeTotalDistance(directionsDisplay.getDirections());
        });

        displayRoute(startVal, endVal, directionsService, directionsDisplay);
      }
      initMap();
      function displayRoute(origin, destination, service, display) {
        service.route({
          destination: destination,
          origin: origin,
          travelMode: typeOfTranspo
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
          }
          else {
            alert('Could not display directions due to: ' + status);
          }
        });
      }

      function computeTotalDistance(result) {
        let total = 0;
        const myroute = result.routes[0];

        for (let i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }

        const miles = ((total / 1609.344) * 2).toFixed(2);

        $('#distance').text(miles);

        function statCalculation(typeOfTranspo) {
          if (typeOfTranspo === 'TRANSIT') {
            const busGallons = ((miles / 3.26) / 35);

            const gallons = (((miles / 21.6) - busGallons) * days).toFixed(2);

            $('#gallons').text(gallons);

            const dollars = (gallons * 2.218).toFixed(2);

            $('#dollars').text('$' + dollars);

            const emissions = (gallons * 8887).toLocaleString('en');

            $('#emissions').text(emissions);
          }
          else {
            const gallons = ((miles / 21.6) * days).toFixed(2);

            $('#gallons').text(gallons);

            const dollars = (gallons * 2.218).toFixed(2);

            $('#dollars').text('$' + dollars);

            const emissions = (gallons * 8887).toLocaleString('en');

            $('#emissions').text(emissions);
          }
        }
        statCalculation(typeOfTranspo);

          // map and directions
      }
    }

    // scroll to stats
    window.scroll(0, 650);
  });
});
