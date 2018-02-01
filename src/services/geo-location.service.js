import config from 'react-native-config';

export const GeoLocationService = {
    getLocation: (callback) => {
        let result = {
            city: {
                name: '',
                id: ''
            },
            country: {
                name: '',
                id: ''
            }
        };
        navigator.geolocation.getCurrentPosition(async (position) => {
            const coords = position ? position.coords : null;
            if (!coords) {
                callback(result);
                return;
            }
            const location = await GeoLocationService.getLocationByCoords(coords);
            result = GeoLocationService.parseGeoLocation(location);
            callback(result);
        }, (error) => {
            console.log(error);
            callback(result);
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    },
    getLocationByCoords: (coords) => {
        return fetch(`${config.GOOGLE_GEOCODE_API_URL}${coords.latitude},${coords.longitude}&key=${config.GOOGLE_API_KEY}`)
            .then(async (response) => response.json())
            .then((json) => {
                return json && json.status === 'OK' ? json.results || [] : [];
            })
            .catch((err) => {
                console.error(err);
                return [];
            });
    },
    parseGeoLocation: (locations) => {
        let result = {};
        const city = locations.find((location) => {
            return location.types.includes('locality');
        });
        result.city = {
            name: city && city.address_components[0] ? city.address_components[0].long_name || '' : '',
            id: city && city.place_id ? city.place_id : ''
        };

        const country = locations.find((location) => {
            return location.types.includes('country');
        });
        result.country = {
            name: country && country.address_components[0] ? country.address_components[0].long_name || '' : '',
            id: country && country.place_id ? country.place_id : ''
        };
        return result;
    }
};