// Description: This file contains the JavaScript code for the flight details page.

let currentFlight;
let map;
let marker;
let popup;

// Function to display flight details
function showFlightDetails(flight) {
    currentFlight = flight;

    const flightDetails = document.getElementById('flight-details');
    const flightOptions = document.getElementById('flight-options');

    flightDetails.style.display = 'block';
    flightOptions.style.display = 'none';

    const flightInfo = document.getElementById('flight-info');
    flightInfo.innerHTML = '';
    flightInfo.innerHTML = `
        <strong>Airline:</strong> ${flight.airline.name}<br>
        <strong>Flight Number:</strong> ${flight.flight.iata}<br>
        <strong>Status:</strong> ${flight.flight_status}<br>
        <strong>Departure:</strong> ${flight.departure.airport} (${flight.departure.iata})<br>
        <strong>Arrival:</strong> ${flight.arrival.airport} (${flight.arrival.iata})<br>
        <strong>Scheduled Departure:</strong> ${new Date(flight.departure.scheduled).toLocaleString()}<br>
        <strong>Actual Departure:</strong> ${flight.departure.actual ? new Date(flight.departure.actual).toLocaleString() : 'Pending'}<br>
        <strong>Scheduled Arrival:</strong> ${new Date(flight.arrival.scheduled).toLocaleString()}<br>
        <strong>Actual Arrival:</strong> ${flight.arrival.actual ? new Date(flight.arrival.actual).toLocaleString() : 'Pending'}
    `;

    updateLiveTracking(flight);
}

// Function to update the live map
function updateLiveTracking(flight) {
    const mapDiv = document.getElementById('map');
    if (flight.live && flight.live.latitude && flight.live.longitude) {
        if (!map) {
            map = L.map(mapDiv).setView([flight.live.latitude, flight.live.longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
        } else {
            map.setView([flight.live.latitude, flight.live.longitude], 13);
        }

        if (marker) {
            marker.setLatLng([flight.live.latitude, flight.live.longitude]);
            if (!marker.popup) {
                marker.bindPopup(`Flight Location: ${flight.live.latitude}, ${flight.live.longitude}`).openPopup();
            }
        } else {
            marker = L.marker([flight.live.latitude, flight.live.longitude]).addTo(map)
                .bindPopup(`Flight Location: ${flight.live.latitude}, ${flight.live.longitude}`)
                .openPopup();
        }
    } else {
        mapDiv.innerHTML = 'Live tracking data not available.';
        console.warn('Live tracking data not available:', flight.live);
    }
}