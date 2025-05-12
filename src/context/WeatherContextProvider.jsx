import { createContext, useReducer } from 'react';
import WeatherReducer from './WeatherReducer';

export const WeatherContext = createContext();

const initialState = {
  error: '',
  current: {},
  forecast: {},
  location: {
    localtime: '',
  },
  address: '',
  initialCords: {},
  degreeType: 'C',
};

export default function WeatherContextProvider({ children }) {
  const [state, dispatch] = useReducer(WeatherReducer, initialState);

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '0f501a5950msh3407d17fc089bb6p10b0eajsn54b06a3b6fae',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  const BASE_URL = 'https://weatherapi-com.p.rapidapi.com/forecast.json';

  const fetchWeatherData = async (url, successType, errorType) => {
    try {
      const response = await fetch(url, API_OPTIONS);
      if (!response.ok) {
        const errorData = await response.json();
        dispatch({
          type: errorType,
          payload: errorData?.error?.message || 'Unknown error occurred.',
        });
        return; // Exit early if an error occurs
      }
      const data = await response.json();
      dispatch({ type: successType, payload: data });
      if (data.location) {
        const { name, region, country } = data.location;
        dispatch({ type: 'CHANGE_ADDRESS', payload: `${name}, ${region}, ${country}` });
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: errorType, payload: 'Network error occurred.' });
    }
  };

  const getWeather = async (location) => {
    const { latitude, longitude } = location || {};
    const url = location
      ? `${BASE_URL}?q=${latitude},${longitude}&days=3`
      : `${BASE_URL}?q=Rajkot&days=3`;
    dispatch({ type: 'SET_COORDS', payload: location });
    await fetchWeatherData(url, 'GET_WEATHER', 'SET_ERROR');
  };

  const searchWeather = (newAddress) => {
    if (typeof newAddress !== 'string') {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Invalid address format. Please enter a valid string.',
      });
      return;
    }
  
    const url = `${BASE_URL}?q=${newAddress}&days=3`;
    fetchWeatherData(url, 'SEARCH_WEATHER', 'SET_ERROR');
  };   
  
  const searchWeatherByLatLng = (lat, lng) => {
    const url = `${BASE_URL}?q=${lat},${lng}&days=3`;
    fetchWeatherData(url, 'SEARCH_WEATHER', 'SET_ERROR');
  };

  const refreshWeather = (address) => {
    const url = `${BASE_URL}?q=${address}&days=3`;
    fetchWeatherData(url, 'REFRESH_WEATHER', 'SET_ERROR');
  };

  const changeDegreeType = (degreeType) => {
    dispatch({ type: 'CHANGE_DEGREES', payload: degreeType });
  };

  return (
    <WeatherContext.Provider
      value={{
        current: state.current,
        forecast: state.forecast,
        location: state.location,
        address: state.address,
        error: state.error,
        degreeType: state.degreeType,
        getWeather,
        searchWeather,
        searchWeatherByLatLng,
        refreshWeather,
        changeDegreeType,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
