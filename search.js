// Description: This file contains the JavaScript code for the search functionality.

// Returns the airport object based on the value and the key
function getAirport(value, by = 'airport') {
    return airports.find(airport => airport[by] === value);
}

// Event listener for the form submission
document.getElementById('flight-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const searchSection = document.getElementById('search-section');
    const flightOptions = document.getElementById('flight-options');
    const flightNumber = document.getElementById('flight-number').value;

    const departureAirport = getAirport(departure, 'airport');
    const arrivalAirport = getAirport(arrival, 'airport');

    if (flightNumber) {
        fetch(`https://api.aviationstack.com/v1/flights?access_key=${aviationStackKey}&flight_iata=${flightNumber}`)
            .then(response => response.json())
            .then(data => {
                const flightData = data.data || [];
                if (flightData.length > 0) {
                    searchSection.style.display = 'none';
                    flightOptions.style.display = 'block';
                    displayFlightOptions(flightData);
                } else {
                    alert("No flights found for the entered flight number.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while fetching flight data.");
            });
        return;
    }

    if (!departureAirport || !arrivalAirport) {
        alert("Please select valid departure and arrival airports OR enter a valid flight number.");
        return;
    }

    const departureIata = departureAirport.iata;
    const arrivalIata = arrivalAirport.iata;

    fetch(`https://api.aviationstack.com/v1/flights?access_key=${aviationStackKey}&dep_iata=${departureIata}&arr_iata=${arrivalIata}`)
        .then(response => response.json())
        .then(data => {
            const flightData = data.data || [];
            if (flightData.length > 0) {
                searchSection.style.display = 'none';
                flightOptions.style.display = 'block';
                displayFlightOptions(flightData);
            } else {
                alert("No flights found for the selected airports.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while fetching flight data.");
        });

        event.preventDefault();
    
        if (!departureAirport || !arrivalAirport) {
            alert("Please select valid departure and arrival airports OR enter a flight number.");
            return;
        }
});

// Function to calculate Levenshtein distance
function levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Function to filter and rank airport suggestions
function filterAirports(input, suggestionsContainer) {
    suggestionsContainer.innerHTML = '';
    const exactMatches = airports.filter(airport =>
        airport.airport.toLowerCase().includes(input.toLowerCase()) ||
        airport.iata.toLowerCase().includes(input.toLowerCase()) ||
        airport.location.toLowerCase().includes(input.toLowerCase()) ||
        airport.icao.toLowerCase().includes(input.toLowerCase())
    );

    if (exactMatches.length > 0) {
        exactMatches.forEach(airport => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerText = `${airport.airport} (${airport.iata})`;
            suggestionItem.addEventListener('click', () => {
                document.getElementById(suggestionsContainer.id.replace('-suggestions', '')).value = airport.airport;
                suggestionsContainer.innerHTML = '';
            });
            suggestionsContainer.appendChild(suggestionItem);
        });
    }

    const levenshteinMatches = airports
        .filter(airport => !exactMatches.includes(airport))
        .map(airport => ({
            airport,
            distance: levenshteinDistance(input, airport.airport)
        }))
        .sort((a, b) => a.distance - b.distance)

    levenshteinMatches.forEach(({ airport }) => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerText = `${airport.airport} (${airport.iata})`;
        suggestionItem.addEventListener('click', () => {
            document.getElementById(suggestionsContainer.id.replace('-suggestions', '')).value = airport.airport;
            suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.style.display = suggestionsContainer.children.length ? 'block' : 'none';
}

// Event listener for departure field
document.getElementById('departure').addEventListener('input', function() {
    filterAirports(this.value, document.getElementById('departure-suggestions'));
});

// Event listener for arrival field
document.getElementById('arrival').addEventListener('input', function() {
    filterAirports(this.value, document.getElementById('arrival-suggestions'));
});

// Select elements
const departureInput = document.getElementById('departure');
const arrivalInput = document.getElementById('arrival');
const departureSuggestions = document.getElementById('departure-suggestions');
const arrivalSuggestions = document.getElementById('arrival-suggestions');

// Utility function to check if click is inside any of the elements
function isClickInside(event, elements) {
    return elements.some(el => el.contains(event.target));
}

// Function to hide suggestions
function hideSuggestions(element) {
    element.style.display = 'none';
}

// Event listener for clicks outside the inputs and suggestions
document.addEventListener('click', function(event) {
    if (!isClickInside(event, [departureInput, departureSuggestions])) {
        hideSuggestions(departureSuggestions);
    }
    if (!isClickInside(event, [arrivalInput, arrivalSuggestions])) {
        hideSuggestions(arrivalSuggestions);
    }
});