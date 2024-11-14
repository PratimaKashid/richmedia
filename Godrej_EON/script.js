async function fetchNearbyShops(latitude, longitude) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const request = {
        location: new google.maps.LatLng(latitude, longitude),
        radius: '5000', // Adjust radius as needed
        type: ['store'],
        keyword: ['washing machine']
    };

    return new Promise((resolve, reject) => {
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
}

function displayShops(shops) {
    const shopsElement = document.getElementById('shops');
    shopsElement.innerHTML = '';

    shops.forEach(shop => {
        const shopItem = document.createElement('div');
        shopItem.textContent = shop.name + ' - ' + shop.vicinity;
        shopsElement.appendChild(shopItem);
    });
}

async function mumbaiLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
            const shops = await fetchNearbyShops(latitude, longitude);
            displayShops(shops);
        } catch (error) {
            console.error(error);
        }
    });
}

async function delhiLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
            const shops = await fetchNearbyShops(latitude, longitude);
            displayShops(shops);
        } catch (error) {
            console.error(error);
        }
    });
}

function locationDetection() {
    console.log("start.....");
    tapDiv.style.display = "none";

    async function fetchLocationDetails(latitude, longitude) {
        const apiKey = '323f3d91e8884693b2648bd5bfb34a68';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log("result:", result);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    function updateLocationDisplay(state) {
        const locationElement = document.getElementById('location');
        if (state && typeof state === 'string') {
            if (state.toLowerCase() === "maharashtra") {
                locationElement.textContent = "Your location is Maharashtra.";

                setTimeout(() => {
                    mumbaiLocation();
                    showPlacesInMumbai.style.display = "block";
                }, 700);

            } else if (state.toLowerCase() === "delhi") {
                locationElement.textContent = "Your location is Delhi.";

                setTimeout(() => {
                    delhiLocation();
                    showPlacesInDelhi.style.display = "block";
                }, 700);
            } else {
                locationElement.textContent = `Your location is ${state}.`;
            }
        } else {
            locationElement.textContent = "Unable to determine your state.";
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locationData = await fetchLocationDetails(latitude, longitude);

            if (locationData && locationData.results.length > 0) {
                const components = locationData.results[0].components;
                const state = components.state;
                updateLocationDisplay(state);
            } else {
                document.getElementById('location').textContent = "Unable to determine your state.";
            }
        }, () => {
            document.getElementById('location').textContent = "Unable to retrieve your location.";
        });
    } else {
        document.getElementById('location').textContent = "Geolocation is not supported by this browser.";
    }

    setTimeout(() => {
        screenOneText.style.opacity = 0;
        screenOneText.style.transition = "all .5s ease-in-out";
    }, 500);
}

// Event listeners for the buttons
showPlacesInMumbai.addEventListener('click', mumbaiLocation);
showPlacesInDelhi.addEventListener('click', delhiLocation);