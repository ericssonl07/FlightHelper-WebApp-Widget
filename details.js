// Description: This file contains the JavaScript code for the flight details page.

let currentFlight;
let map;
let marker;
let popup;

function parseTime(time) {
    // Format: YYYY-MM-DDTHH:MM:SSZ
    const year = Number(time.substring(0, 4));
    const month = Number(time.substring(5, 7)) - 1;
    const day = Number(time.substring(8, 10));
    const hours = Number(time.substring(11, 13));
    const minutes = Number(time.substring(14, 16));
    const seconds = Number(time.substring(17, 19));
    return new Date(year, month, day, hours, minutes, seconds);
}

function numberToMonth(number) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[number];
}

function numberToOrdinal(number) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = number % 10;
    return (`${number}${(lastDigit < 4) ? suffixes[lastDigit] : suffixes[0]}`);
}

function getFormattedDate(date) {
    const month = numberToMonth(date.getMonth());
    const day = numberToOrdinal(date.getDate());
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month} ${day}, ${year} at ${hours}:${(minutes < 10) ? `0${minutes}` : minutes}${(hours < 12) ? ' AM' : ' PM'}`;
}

function getDelay(scheduled, actual) {
    const scheduledTime = parseTime(scheduled);
    const actualTime = parseTime(actual);
    return (actualTime - scheduledTime); // In milliseconds
}

function msecToTime(msec) {
    const hours = Math.floor(msec / 3600000);
    const minutes = Math.floor((msec % 3600000) / 60000);
    if (hours === 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    if (hours > 24) {
        return `${Math.floor(hours / 24)} ${days === 1 ? 'day' : 'days'}, ${hours % 24} ${hours === 1 ? 'hour' : 'hours'}, ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}, ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
}

function loadPreflightStatus(flight) {
    let status;
    status = `<strong>Status: Pre-flight</strong>. `;
    const now = new Date();
    const timeToDeparture = getDelay(now.toISOString(), flight.departure.scheduled);
    if (timeToDeparture < 1800000) { // 30 minutes prior to departure
        status += `<strong>Boarding</strong>.<br>`;
    } else {
        status += `<strong>${msecToTime(timeToDeparture)} until departure</strong>.<br>`;
    }
    status += `<strong>Scheduled departure: </strong> ${getFormattedDate(new Date(flight.departure.scheduled))}<br>`;
    if (flight.departure.terminal) {
        status += `<strong>Terminal</strong>: ${flight.departure.terminal}<br>`;
    }
    if (flight.departure.gate) {
        status += `<strong>Gate</strong>: ${flight.departure.gate}<br>`;
    }
    status += `A warm reminder to please arrive at the airport 2 hours before departure for domestic flights and 3 hours before departure for international flights.<br>`;
    status += `Please check the flight information display screens at the airport for the most up-to-date information. You can also try refreshing FlightHelper for updated information.<br>`;
    return status;
}

function loadInflightStatus(flight) {
    let status;
    status = `<strong>Status: In-flight</strong><br>`;
    status += `<strong>Departed:</strong> ${getFormattedDate(new Date(flight.departure.actual))}`;
    const delay = getDelay(flight.departure.scheduled, flight.departure.actual);
    status += (delay > 0) ? ` (${msecToTime(delay)} late)` : '';
    status += (flight.departure.gate) ? ` from gate ${flight.departure.gate}.<br>` : '.<br>';
    if (flight.arrival.scheduled) {
        status += `<strong>Scheduled Arrival</strong>: ${getFormattedDate(new Date(flight.arrival.scheduled))}<br>`;
    }
    status += `<strong>Actual Arrival</strong>: Pending<br>`;
    if (flight.arrival.terminal) {
        status += `<strong>Arrival Terminal</strong>: ${flight.arrival.terminal}<br>`;
    }
    if (flight.arrival.gate) {
        status += `<strong>Arrival Gate</strong>: ${flight.arrival.gate}<br>`;
    }
    if (flight.arrival.baggage) {
        status += `<strong>Baggage Claim</strong>: ${flight.arrival.baggage}<br>`;
    }
    return status;
}

function loadLandedStatus(flight) {
    let status;
    status = `<strong>Status: Landed</strong><br>`;
    status += `<strong>Arrived:</strong> ${getFormattedDate(new Date(flight.arrival.actual))}`;
    const delay = getDelay(flight.arrival.scheduled, flight.arrival.actual);
    status += (delay > 0) ? ` (${msecToTime(delay)} late)` : '';
    status += (flight.arrival.gate) ? ` at gate ${flight.arrival.gate}.<br>` : '.<br>';
    if (flight.arrival.terminal) {
        status += `<strong>Arrival Terminal</strong>: ${flight.arrival.terminal}<br>`;
    }
    if (flight.arrival.baggage) {
        status += `<strong>Baggage claim</strong>: ${flight.arrival.baggage}`;
    }
    return status;
}

// Function to display flight details
function showFlightDetails(flight) {
    currentFlight = flight;

    const flightDetails = document.getElementById('flight-details');
    const flightOptions = document.getElementById('flight-options');

    flightDetails.style.display = 'block';
    flightOptions.style.display = 'none';

    const flightInfo = document.getElementById('flight-info');
    let status;
    if (flight.departure.scheduled && !flight.departure.actual) {
        // Preflight
        status = loadPreflightStatus(flight);
    } else if (flight.departure.actual && !flight.arrival.actual) {
        // Inflight
        status = loadInflightStatus(flight);
    } else if (flight.arrival.actual) {
        // Landed
        status = loadLandedStatus(flight);
    } else {
        status = `<strong>Flight Status</strong>: ${flight.flight_status}`;
    }
    flightInfo.innerHTML = '';
    flightInfo.innerHTML = `
        <strong>${flight.airline.name}</strong> flight ${flight.flight.iata}<br>
        ${status}<br>
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