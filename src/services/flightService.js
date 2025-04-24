const API_KEY = '9ec67de85c48094c65e529cc9caefbe8c735d9d253ee795c48473563c3b68c70';

// Using a more reliable CORS proxy
const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';

export const searchFlights = async (params) => {
  try {
    const searchParams = new URLSearchParams({
      engine: 'google_flights',
      api_key: API_KEY,
      ...params
    });

    const url = `https://serpapi.com/search?${searchParams}`;
    const response = await fetch(`${CORS_PROXY}${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      } catch (e) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

export const getFlightDetails = async (departureToken) => {
  try {
    const searchParams = new URLSearchParams({
      engine: 'google_flights',
      api_key: API_KEY,
      departure_token: departureToken
    });

    const url = `https://serpapi.com/search?${searchParams}`;
    const response = await fetch(`${CORS_PROXY}${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      } catch (e) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting flight details:', error);
    throw error;
  }
};

export const getBookingOptions = async (bookingToken) => {
  try {
    const searchParams = new URLSearchParams({
      engine: 'google_flights',
      api_key: API_KEY,
      booking_token: bookingToken
    });

    const url = `https://serpapi.com/search?${searchParams}`;
    const response = await fetch(`${CORS_PROXY}${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      } catch (e) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting booking options:', error);
    throw error;
  }
}; 