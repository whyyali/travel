import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config.json';

export const useFetchAllCountries = () => {
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllCountries = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/countries`);
                if (response.ok) {
                    const data = await response.json();
                    setCountries(data.countries);
                    setIsLoading(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllCountries();
    }, []);

    return { countries, isLoading };
};

export const useFetchRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/places`);
                if (response.ok) {
                    const data = await response.json();
                    setRecommendations(data.places);
                    setIsLoading(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return { recommendations, isLoading };
};

export const useFetchPlaces = (id) => {
    const [places, setPlaces] = useState([]);
    const [popularPlaces, setPopularPlaces] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/countries/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPlaces(data);
                    setPopularPlaces(data.popular)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return { places, popularPlaces };
};

export const useFetchHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllHotels = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/hotels`);
                if (response.ok) {
                    const data = await response.json();
                    setHotels(data.hotels);
                    setIsLoading(false);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllHotels();
    }, []);

    return { hotels, isLoading };
}

export const useFetchHotelById = (id) => {
    const [hotel, setHotel] = useState([]);
    const [hotelAvailabilityStart, setHotelAvailabilityStart] = useState("");
    const [hotelAvailabilityEnd, setHotelAvailabilityEnd] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/hotels/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setHotel(data);
                    setHotelAvailabilityStart(formatDate(data.availability.start))
                    setHotelAvailabilityEnd(formatDate(data.availability.end))
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();


        const formatDate = (dateString) => {
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "June", "July",
                "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const date = new Date(dateString);
            const year = date.getFullYear();
            const monthIndex = date.getMonth();
            const month = months[monthIndex];
            const day = String(date.getDate()).padStart(2, '0');

            return `${month} ${day}`;
        };


    }, [id]);

    return { hotel, hotelAvailabilityStart, hotelAvailabilityEnd };
};