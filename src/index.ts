import { useState, useRef, useEffect } from "react";

// Define types for the Geolocation options and the state structure
interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

interface GeolocationOptions extends PositionOptions {}

// Default initial state
const defaultState: GeolocationState = {
  loading: true,
  accuracy: null,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: null,
  longitude: null,
  speed: null,
  timestamp: null,
  error: null,
};

export function useGeolocation(
  options: GeolocationOptions = {},
): GeolocationState {
  // Initialize state with default values
  const [state, setState] = useState<GeolocationState>(defaultState);

  // Store options in a ref to avoid re-initializing effect if options change
  const optionsRef = useRef(options);

  useEffect(() => {
    // Event handler for successful geolocation
    const onEvent = ({ coords, timestamp }: GeolocationPosition) => {
      setState({
        loading: false,
        timestamp,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
        error: null, // Reset error in case it was previously set
      });
    };

    // Event handler for geolocation errors
    const onEventError = (error: GeolocationPositionError) => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error,
      }));
    };

    // Request the current position once on mount
    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current,
    );

    // Watch position and update state on changes
    const watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      optionsRef.current,
    );

    // Cleanup: Clear the watch on unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}
