// This file contains dummy data and functions for simulating API calls.
// AviationStack API operates on a freemium model limiting requests at 100 per day for free users.

// Dummy fetch function simulating API call with a 1 second network delay
function dummyFetchFlights(depIata, arrIata) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredFlights = dummyData.data.filter(flight => 
                flight.departure.iata === depIata && flight.arrival.iata === arrIata
            );
            resolve({ data: filteredFlights });
        }, 1000);
    });
}

// Modify the form submission handler to use the dummy fetch function
document.getElementById('flight-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const searchSection = document.getElementById('search-section');
    const flightOptions = document.getElementById('flight-options');

    const departureAirport = getAirport(departure, 'airport');
    const arrivalAirport = getAirport(arrival, 'airport');

    if (!departureAirport || !arrivalAirport) {
        alert("Please select valid departure and arrival airports.");
        return;
    }

    const departureIata = departureAirport.iata;
    const arrivalIata = arrivalAirport.iata;

    dummyFetchFlights(departureIata, arrivalIata)
    .then(data => {
        const flightData = data.data || [];
        if (flightData.length > 0) {
            searchSection.style.display = 'none';
            flightOptions.style.display = 'block';
            currentFlights = flightData;
            displayFlightOptions(flightData);
        } else {
            alert("No flights found for the selected airports.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while fetching flight data.");
    });
});

// Dummy data for testing the application
// Flights from HKG to YVR on 2023-10-15, 2023-10-16, 2023-10-17.
const dummyData = {
    "data": [
        {
            "flight_date": "2023-10-15",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-15T08:00:00Z",
                "estimated": "2023-10-15T08:05:00Z",
                "actual": "2023-10-15T08:10:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-15T11:00:00Z",
                "estimated": "2023-10-15T11:10:00Z",
                "actual": "2023-10-15T11:15:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-15T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        },
        {
            "flight_date": "2023-10-16",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-16T08:00:00Z",
                "estimated": "2023-10-16T08:05:00Z",
                "actual": "2023-10-16T08:10:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-16T11:00:00Z",
                "estimated": "2023-10-16T11:10:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-16T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        },
        {
            "flight_date": "2023-10-17",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-17T08:00:00Z",
                "estimated": "2023-10-17T08:05:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-17T11:00:00Z",
                "estimated": "2023-10-17T11:10:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-17T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        },
        {
            "flight_date": "2023-10-17",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-17T08:00:00Z",
                "estimated": "2023-10-17T08:05:00Z",
                "actual": "2023-10-17T08:10:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-17T11:00:00Z",
                "estimated": "2023-10-17T11:10:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-17T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        },
        {
            "flight_date": "2023-10-17",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-17T08:00:00Z",
                "estimated": "2023-10-17T08:05:00Z",
                "actual": "2023-10-17T08:10:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-17T11:00:00Z",
                "estimated": "2023-10-17T11:10:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-17T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        },
        {
            "flight_date": "2023-10-17",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-17T08:00:00Z",
                "estimated": "2023-10-17T08:05:00Z",
                "actual": "2023-10-17T08:10:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-17T11:00:00Z",
                "estimated": "2023-10-17T11:10:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-17T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        },
        {
            "flight_date": "2023-10-17",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-17T08:00:00Z",
                "estimated": "2023-10-17T08:05:00Z",
                "actual": "2023-10-17T08:10:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-17T11:00:00Z",
                "estimated": "2023-10-17T11:10:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-17T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        },
        {
            "flight_date": "2023-10-17",
            "flight_status": "active",
            "departure": {
                "airport": "Hong Kong International Airport",
                "iata": "HKG",
                "icao": "VHHH",
                "terminal": "1",
                "gate": "21",
                "delay": 5,
                "scheduled": "2023-10-17T08:00:00Z",
                "estimated": "2023-10-17T08:05:00Z",
                "actual": "2023-10-17T08:10:00Z",
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "arrival": {
                "airport": "Vancouver International Airport",
                "iata": "YVR",
                "icao": "CYVR",
                "terminal": "3",
                "gate": "12",
                "baggage": "3",
                "delay": 10,
                "scheduled": "2023-10-17T11:00:00Z",
                "estimated": "2023-10-17T11:10:00Z",
                "actual": null,
                "estimated_runway": "2",
                "actual_runway": "2",
            },
            "airline": {
                "name": "Cathay Pacific",
                "iata": "CX",
                "icao": "CPA"
            },
            "flight": {
                "number": "888",
                "iata": "CX888",
                "icao": "CPA888"
            },
            "aircraft": {
                "registration": "B77W",
                "iata": "B-KQI",
                "icao": "780"
            },
            "live": {
                "updated": "2023-10-17T08:10:00Z",
                "latitude": 49.2827,
                "longitude": -123.1207,
                "altitude": 3505,
                "direction": 0,
                "speed_horizontal": 0,
                "speed_vertical": 0,
                "is_ground": true
            }
        }
    ]
};