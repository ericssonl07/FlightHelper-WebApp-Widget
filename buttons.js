// Description: This file contains the event listeners for the buttons in the HTML file (Back and Refresh).

// Event listeners for refresh
document.getElementById('refresh-button').addEventListener('click', function() {
    if (currentFlight) {
        map.flyTo({
            center: [currentFlight.live.longitude, currentFlight.live.latitude],
            zoom: 6,
            speed: 1.2,
            curve: 1.42,
            easing(t) {
                return t;
            }
        })
    } else {
        alert('No flight selected to refresh.');
    }
});

// Prevent WebGL context loss rendering
document.getElementById('map').addEventListener('webglcontextlost', function(event) {
    event.preventDefault();
    console.error('WebGL context lost. Attempting to restore...');
    setTimeout(() => {}, 1000);
    showFlightDetails(currentFlight);
}, false);

// Back from options to search
document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('flight-options').style.display = 'none';
    document.getElementById('search-section').style.display = 'block';
});

// Back from details to options
document.getElementById('back-details-button').addEventListener('click', function() {
    document.getElementById('flight-details').style.display = 'none';
    document.getElementById('flight-options').style.display = 'block';
});

// Clicking on the logo brings user home to search, clearing all fields
document.getElementById('header-container').addEventListener('click', function() {
    document.getElementById('flight-details').style.display = 'none';
    document.getElementById('flight-options').style.display = 'none';
    document.getElementById('search-section').style.display = 'block';
    document.getElementById('departure').value = '';
    document.getElementById('arrival').value = '';
    document.getElementById('flight-number').value = '';
});