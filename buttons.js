// Description: This file contains the event listeners for the buttons in the HTML file (Back and Refresh).

// Event listeners for refresh
document.getElementById('refresh-button').addEventListener('click', function() {
    if (currentFlight) {
        showFlightDetails(currentFlight);
    } else {
        alert('No flight selected to refresh.');
    }
});

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