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
    headers.forEach((header, index) => {
        const th = document.createElement('th');
        if (sortCounters[index] === 1) {
            th.textContent = `${header} ▲`;
        } else if (sortCounters[index] === 2) {
            th.textContent = `${header} ▼`;
        } else {
            th.textContent = header;
        }
        th.addEventListener('click', () => {
            sortTable(index);
            console.log('sortTable', index);
        });
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

let sortCounters = Array.from({ length: 6 }, () => 0);

function sortTable(columnIndex) {
    const header = document.querySelectorAll('#flight-table th')[columnIndex];
    sortCounters[columnIndex] = (sortCounters[columnIndex] + 1) % 3;
    sortCounters = sortCounters.map((counter, index) => index === columnIndex ? counter : 0);

    document.querySelectorAll('#flight-table th').forEach(th => th.classList.remove('asc', 'desc'));

    let ascending ;

    if (sortCounters[columnIndex] === 1) {
        header.classList.add('asc');
        header.classList.remove('desc');
        ascending = true;
    } else if (sortCounters[columnIndex] === 2) {
        header.classList.add('desc');
        header.classList.remove('asc');
        ascending = false;
    } else {
        header.classList.remove('asc', 'desc');
        ascending = true;
    }

    currentFlights.sort((a, b) => {
        let aValue = getColumnValue(a, columnIndex);
        let bValue = getColumnValue(b, columnIndex);

        if (aValue < bValue) return ascending ? -1 : 1;
        if (aValue > bValue) return ascending ? 1 : -1;
        return 0;
    });

    displayFlightOptions(currentFlights);
}

function getColumnValue(flight, index) {
    switch (index) {
        case 0: return `${flight.airline.name}`;
        case 1: return `${flight.flight.iata}`;
        case 2: return `${flight.departure.airport}`;
        case 3: return `${flight.arrival.airport}`;
        case 4: return new Date(flight.departure.scheduled);
        case 5: return new Date(flight.arrival.scheduled);
        default: return '';
    }
}