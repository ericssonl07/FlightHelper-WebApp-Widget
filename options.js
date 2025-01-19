// Description: Functions for displaying flight options.

function displayFlightOptions(flights) {
    const flightList = document.getElementById('flight-list');
    flightList.innerHTML = '';

    if (flights.length === 0) {
        flightList.innerHTML = '<p>No flights available.</p>';
        return;
    }

    const table = document.createElement('table');
    table.id = 'flight-table';

    const headers = ['Airline', 'Flight Number', 'Departure Airport', 'Arrival Airport', 'Scheduled Departure', 'Scheduled Arrival'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    flights.forEach(flight => {
        const row = document.createElement('tr');
        row.addEventListener('click', () => showFlightDetails(flight));
        row.innerHTML = `
            <td>${flight.airline.name}</td>
            <td>${flight.flight.iata}</td>
            <td>${flight.departure.airport} (${flight.departure.iata})</td>
            <td>${flight.arrival.airport} (${flight.arrival.iata})</td>
            <td>${new Date(flight.departure.scheduled).toLocaleString()}</td>
            <td>${new Date(flight.arrival.scheduled).toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    flightList.appendChild(table);
}