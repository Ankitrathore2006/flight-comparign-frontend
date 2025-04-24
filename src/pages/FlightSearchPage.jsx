import React, { useState, useEffect } from "react";
import { 
  FaChevronDown, 
  FaPlaneDeparture, 
  FaPlaneArrival, 
  FaCalendarAlt, 
  FaUser, 
  FaExchangeAlt, 
  FaSlidersH, 
  FaClock, 
  FaLeaf, 
  FaMapMarkedAlt,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaInfoCircle,
  FaMoneyBillWave,
  FaPlane,
  FaRoute,
  FaStopwatch,
  FaExclamationCircle,
  FaChartLine,
  // FaBaggage
} from "react-icons/fa";
import "../styles/flight-search.css";
import { searchFlights, getFlightDetails, getBookingOptions } from '../services/flightService';

const FlightSearchPage = () => {
  const [formData, setFormData] = useState({
    tripType: "1", // 1: Round trip, 2: One way, 3: Multi-city
    passengers: 1,
    cabinClass: "1", // 1: Economy, 2: Premium, 3: Business, 4: First
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    sortBy: "1", // 1: Top flights, 2: Price, 3: Departure time, 4: Arrival time, 5: Duration, 6: Emissions
    stops: "0", // 0: Any stops, 1: Nonstop, 2: 1 stop, 3: 2 stops
    maxPrice: "",
    outboundTimes: "",
    returnTimes: "",
    emissions: "",
    layoverDuration: "",
    excludeConns: "",
    maxDuration: "",
    deepSearch: false,
    showHidden: false,
    // Multi-city specific
    multiCityFlights: [],
    // Additional parameters
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
    bags: 0,
    excludeAirlines: "",
    includeAirlines: "",
    currency: "USD",
    hl: "en",
    gl: "us"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassengerPicker, setShowPassengerPicker] = useState(false);
  const [priceInsights, setPriceInsights] = useState(null);
  const [airports, setAirports] = useState([]);

  const cabinClasses = [
    { value: "1", label: "Economy" },
    { value: "2", label: "Business" },
    { value: "3", label: "First" }
  ];

  const sortOptions = [
    { value: "1", label: "Top Flights" },
    { value: "2", label: "Price" },
    { value: "3", label: "Duration" }
  ];

  const stopOptions = [
    { value: "0", label: "Any Stops" },
    { value: "1", label: "Non-stop" },
    { value: "2", label: "1 Stop" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.from) {
      newErrors.from = "Please enter departure location";
    }
    if (!formData.to) {
      newErrors.to = "Please enter arrival location";
    }
    if (!formData.departDate) {
      newErrors.departDate = "Please select departure date";
    }
    if (formData.tripType === "1" && !formData.returnDate) {
      newErrors.returnDate = "Please select return date";
    }
    if (formData.maxPrice && isNaN(formData.maxPrice)) {
      newErrors.maxPrice = "Please enter a valid price";
    }
    if (formData.maxDuration && isNaN(formData.maxDuration)) {
      newErrors.maxDuration = "Please enter a valid duration";
    }
    if (formData.layoverDuration && isNaN(formData.layoverDuration)) {
      newErrors.layoverDuration = "Please enter a valid layover duration";
    }
    if (formData.emissions && isNaN(formData.emissions)) {
      newErrors.emissions = "Please enter a valid emissions value";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSwapLocations = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleSelectFlight = async (flight) => {
    if (formData.tripType === "1" && flight.departure_token) {
      try {
        const returnFlights = await getFlightDetails(flight.departure_token);
        // Handle return flights
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatEmissions = (grams) => {
    const kg = grams / 1000;
    return `${kg.toFixed(1)} kg`;
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderFlightLeg = (leg, index) => (
    <div key={`leg-${index}`} className="flight-leg">
      <div className="leg-info">
        <span className="airport-name">{leg.departure_airport.name}</span>
        <span className="time">{formatTime(leg.departure_airport.time)}</span>
        <span className="airport-code">{leg.departure_airport.id}</span>
      </div>
      <div className="flight-route">
        <FaPlane className="plane-icon" />
        <span className="duration">{formatDuration(leg.duration)}</span>
      </div>
      <div className="leg-info">
        <span className="airport-name">{leg.arrival_airport.name}</span>
        <span className="time">{formatTime(leg.arrival_airport.time)}</span>
        <span className="airport-code">{leg.arrival_airport.id}</span>
      </div>
      <div className="leg-details">
        <div className="airline-info">
          <img src={leg.airline_logo} alt={leg.airline} className="airline-logo" />
          <span className="airline">{leg.airline}</span>
        </div>
        <div className="flight-info">
          <span className="flight-number">{leg.flight_number}</span>
          <span className="airplane">{leg.airplane}</span>
        </div>
        <div className="amenities">
          {leg.extensions?.map((amenity, idx) => (
            <span key={`amenity-${idx}`} className="amenity-badge">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLayover = (layover, index) => (
    <div key={`layover-${index}`} className="layover-info">
      <FaExchangeAlt className="layover-icon" />
      <div className="layover-details">
        <span className="layover-duration">{formatDuration(layover.duration)}</span>
        <span className="layover-airport">{layover.name}</span>
        <span className="airport-code">{layover.id}</span>
      </div>
      {layover.overnight && <span className="overnight-badge">Overnight</span>}
    </div>
  );

  const renderFlightCard = (flight, index) => (
    <div 
      key={`flight-${index}`}
      className="flight-card"
      onMouseEnter={() => handleFlightHover(flight)}
      onMouseLeave={() => {}}
    >
      <div className="flight-header">
        <div className="airline-info">
          <img src={flight.airline_logo} alt={flight.airline} className="airline-logo" />
          <span className="airline-name">{flight.airline}</span>
        </div>
        <div className="price-info">
          <span className="flight-price">{formatPrice(flight.price)}</span>
          <span className="price-per-person">per person</span>
        </div>
      </div>

      <div className="flight-details">
        {flight.flights.map((leg, idx) => (
          <React.Fragment key={`flight-leg-${idx}`}>
            {renderFlightLeg(leg, idx)}
            {idx < flight.layovers.length && renderLayover(flight.layovers[idx], idx)}
          </React.Fragment>
        ))}
      </div>

      <div className="flight-footer">
        <div className="flight-info">
          <div className="info-item">
            <FaClock className="icon" />
            <span className="label1">Total Duration</span>
            <span className="value">{formatDuration(flight.total_duration)}</span>
          </div>
          <div className="info-item">
            <FaLeaf className="icon" />
            <span className="label1">Carbon Emissions</span>
            <span className="value">{formatEmissions(flight.carbon_emissions.this_flight)}</span>
          </div>
          <div className="info-item">
            <FaChartLine className="icon" />
            <span className="label1">Emissions vs Typical</span>
            <span className={`value ${flight.carbon_emissions.difference_percent > 0 ? 'higher' : 'lower'}`}>
              {flight.carbon_emissions.difference_percent > 0 ? '+' : ''}{flight.carbon_emissions.difference_percent}%
            </span>
          </div>
        </div>
        {flight.extensions && (
          <div className="flight-extensions">
            {flight.extensions.map((extension, idx) => (
              <span key={`extension-${idx}`} className="extension-badge">
                {extension}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* <div className="flight-actions">
        <button 
          className="select-flight-btn"
          onClick={() => handleFlightSelect(flight)}
        >
          Select Flight
        </button>
        {flight.booking_token && (
          <a 
            href={`/booking/${flight.booking_token}`}
            className="book-now-btn"
          >
            Book Now
          </a>
        )}
      </div> */}
    </div>
  );

  const renderPriceInsights = (insights) => (
    <div className="price-insights">
      <h3>Price Insights</h3>
      <div className="insights-grid">
        <div className="insight-card">
          <FaMoneyBillWave className="insight-icon" />
          <div className="insight-content">
            <span className="insight-label">Lowest Price</span>
            <span className="insight-value">{formatPrice(insights.lowest_price)}</span>
          </div>
        </div>
        <div className="insight-card">
          <FaInfoCircle className="insight-icon" />
          <div className="insight-content">
            <span className="insight-label">Typical Price Range</span>
            <span className="insight-value">
              {formatPrice(insights.typical_price_range[0])} - {formatPrice(insights.typical_price_range[1])}
            </span>
          </div>
        </div>
        <div className="insight-card">
          <FaClock className="insight-icon" />
          <div className="insight-content">
            <span className="insight-label">Price Level</span>
            <span className="insight-value">{insights.price_level}</span>
          </div>
        </div>
      </div>
      {insights.price_history && (
        <div className="price-history">
          <h4>Price History</h4>
          <div className="price-chart">
            {/* Add price history chart here */}
          </div>
        </div>
      )}
    </div>
  );

  // Update getAirportImage function to use API data
  const getAirportImage = (airport) => {
    if (!airport) return null;
    
    // Try to get image from airport object
    if (airport.image) {
      return airport.image;
    }
    
    // Try to get image from airport name
    const airportName = airport.name?.toLowerCase();
    if (airportName) {
      // You can add specific airport image mappings here
      const airportImageMap = {
        'jfk': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
        'lax': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
        'lhr': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
        'cdg': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
        'paris': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
        'charles de gaulle': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
        // Add more mappings as needed
      };
      
      for (const [key, value] of Object.entries(airportImageMap)) {
        if (airportName.includes(key)) {
          return value;
        }
      }
    }
    
    // Return a default image if no specific image is found
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';
  };

  const renderAirportDetails = (airports) => (
    <div className="airport-details">
      <h3>Airport Details</h3>
      <div className="airports-grid">
        {airports.map((airportGroup, index) => (
          <div key={`airport-group-${index}`} className="airport-group">
            <div className="airport">
              <div className="airport-image-container">
                <img 
                  src={getAirportImage(airportGroup.departure[0].airport)} 
                  alt={`${airportGroup.departure[0].airport.name} Airport`}
                  loading="lazy"
                  onError={(e) => {
                    console.log('Error loading airport image:', e);
                    e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';
                  }}
                />
              </div>
              <div className="airport-info">
                <h4>{airportGroup.departure[0].airport.name}</h4>
                <p className="airport-code">{airportGroup.departure[0].airport.id}</p>
                <p className="location">{airportGroup.departure[0].city}, {airportGroup.departure[0].country}</p>
              </div>
            </div>
            <div className="airport">
              <div className="airport-image-container">
                <img 
                  src={getAirportImage(airportGroup.arrival[0].airport)} 
                  alt={`${airportGroup.arrival[0].airport.name} Airport`}
                  loading="lazy"
                  onError={(e) => {
                    console.log('Error loading airport image:', e);
                    e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';
                  }}
                />
              </div>
              <div className="airport-info">
                <h4>{airportGroup.arrival[0].airport.name}</h4>
                <p className="airport-code">{airportGroup.arrival[0].airport.id}</p>
                <p className="location">{airportGroup.arrival[0].city}, {airportGroup.arrival[0].country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const searchFlightsHandler = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setError(null);

    try {
      const formatDateForAPI = (date) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
      };

      const params = {
        departure_id: formData.from.toUpperCase(),
        arrival_id: formData.to.toUpperCase(),
        type: formData.tripType,
        outbound_date: formatDateForAPI(formData.departDate),
        return_date: formData.tripType === "1" ? formatDateForAPI(formData.returnDate) : '',
        adults: formData.passengers,
        travel_class: formData.cabinClass,
        sort_by: formData.sortBy,
        stops: formData.stops,
        currency: formData.currency,
        hl: formData.hl,
        gl: formData.gl,
        deep_search: formData.deepSearch,
        show_hidden: formData.showHidden,
        ...(formData.maxPrice && { max_price: formData.maxPrice }),
        ...(formData.outboundTimes && { outbound_times: formData.outboundTimes }),
        ...(formData.returnTimes && { return_times: formData.returnTimes }),
        ...(formData.emissions && { emissions: formData.emissions }),
        ...(formData.layoverDuration && { layover_duration: formData.layoverDuration }),
        ...(formData.excludeConns && { exclude_conns: formData.excludeConns }),
        ...(formData.maxDuration && { max_duration: formData.maxDuration }),
        ...(formData.children > 0 && { children: formData.children }),
        ...(formData.infantsInSeat > 0 && { infants_in_seat: formData.infantsInSeat }),
        ...(formData.infantsOnLap > 0 && { infants_on_lap: formData.infantsOnLap }),
        ...(formData.bags > 0 && { bags: formData.bags }),
        ...(formData.excludeAirlines && { exclude_airlines: formData.excludeAirlines }),
        ...(formData.includeAirlines && { include_airlines: formData.includeAirlines }),
        ...(formData.tripType === "3" && formData.multiCityFlights.length > 0 && {
          multi_city_json: JSON.stringify(formData.multiCityFlights)
        })
      };

      const results = await searchFlights(params);
      
      if (results.error) {
        throw new Error(results.error);
      }

      setFlights([...(results.best_flights || []), ...(results.other_flights || [])]);
      setPriceInsights(results.price_insights);
      setAirports(results.airports);

    } catch (err) {
      setError(err.message || 'An error occurred while searching for flights. Please try again.');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleFlightHover = (flight) => {
    // Removed console.log
  };

  const handlePriceInsightClick = (insight) => {
    // Removed console.log
  };

  return (
    <div className="flight-search-container">
      {/* Search Header */}
      <div className="search-header">
        <h1>Find Your Perfect Flight</h1>
        <p>Search and compare flights from hundreds of airlines</p>
      </div>

      {/* Main Search Form */}
      <div className="search-form">
        {/* Trip Type and Passengers */}
        <div className="form-row">
          <div className="form-group">
            <label>
              <FaPlane className="icon" />
              Trip Type
            </label>
            <select 
              name="tripType"
              value={formData.tripType}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="1">Round Trip</option>
              <option value="2">One Way</option>
              <option value="3">Multi-city</option>
            </select>
          </div>

          {/* <div className="form-group">
            <label>
              <FaUser className="icon" />
              Passengers
            </label>
            <div className="passenger-selector">
              <button 
                onClick={() => setFormData(prev => ({
                  ...prev,
                  passengers: Math.max(1, prev.passengers - 1)
                }))}
                disabled={formData.passengers <= 1}
              >
                -
              </button>
              <span>{formData.passengers}</span>
              <button 
                onClick={() => setFormData(prev => ({
                  ...prev,
                  passengers: Math.min(9, prev.passengers + 1)
                }))}
                disabled={formData.passengers >= 9}
              >
                +
              </button>
            </div>
          </div> */}

          <div className="form-group">
            <label>
              <FaPlane className="icon" />
              Cabin Class
            </label>
            <select 
              name="cabinClass"
              value={formData.cabinClass}
              onChange={handleInputChange}
              className="form-select"
            >
              {cabinClasses.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Locations */}
        <div className="form-row">
          <div className="form-group location-group">
            <label>
              <FaPlaneDeparture className="icon" />
              From
            </label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              placeholder="City or Airport"
              className={`form-input ${errors.from ? 'error' : ''}`}
            />
            {errors.from && (
              <span className="error-message">
                <FaExclamationCircle className="icon" />
                {errors.from}
              </span>
            )}
          </div>

          <button className="swap-button" onClick={handleSwapLocations}>
            <FaExchangeAlt className="icon" />
          </button>

          <div className="form-group location-group">
            <label>
              <FaPlaneArrival className="icon" />
              To
            </label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="City or Airport"
              className={`form-input ${errors.to ? 'error' : ''}`}
            />
            {errors.to && (
              <span className="error-message">
                <FaExclamationCircle className="icon" />
                {errors.to}
              </span>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="form-row">
          <div className="form-group">
            <label>
              <FaCalendarAlt className="icon" />
              Departure Date
            </label>
            <input
              type="date"
              name="departDate"
              value={formData.departDate}
              onChange={handleInputChange}
              className={`form-input ${errors.departDate ? 'error' : ''}`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.departDate && (
              <span className="error-message">
                <FaExclamationCircle className="icon" />
                {errors.departDate}
              </span>
            )}
          </div>

          {formData.tripType === "1" && (
            <div className="form-group">
              <label>
                <FaCalendarAlt className="icon" />
                Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                className={`form-input ${errors.returnDate ? 'error' : ''}`}
                min={formData.departDate}
              />
              {errors.returnDate && (
                <span className="error-message">
                  <FaExclamationCircle className="icon" />
                  {errors.returnDate}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        <div className="advanced-filters">
          <div className="form-row">
            <div className="form-group">
              <label>
                <FaSortAmountDown className="icon" />
                Sort By
              </label>
              <select 
                name="sortBy"
                value={formData.sortBy}
                onChange={handleInputChange}
                className="form-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <FaRoute className="icon" />
                Stops
              </label>
              <select 
                name="stops"
                value={formData.stops}
                onChange={handleInputChange}
                className="form-select"
              >
                {stopOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <FaMoneyBillWave className="icon" />
                Max Price ($)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                onChange={handleInputChange}
                placeholder="Enter max price"
                className={`form-input ${errors.maxPrice ? 'error' : ''}`}
                min="0"
              />
              {errors.maxPrice && (
                <span className="error-message">
                  <FaExclamationCircle className="icon" />
                  {errors.maxPrice}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FaClock className="icon" />
                Max Duration (hours)
              </label>
              <input
                type="number"
                name="maxDuration"
                value={formData.maxDuration}
                onChange={handleInputChange}
                placeholder="Enter max duration"
                className={`form-input ${errors.maxDuration ? 'error' : ''}`}
                min="0"
              />
              {errors.maxDuration && (
                <span className="error-message">
                  <FaExclamationCircle className="icon" />
                  {errors.maxDuration}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaStopwatch className="icon" />
                Max Layover (hours)
              </label>
              <input
                type="number"
                name="layoverDuration"
                value={formData.layoverDuration}
                onChange={handleInputChange}
                placeholder="Enter max layover"
                className={`form-input ${errors.layoverDuration ? 'error' : ''}`}
                min="0"
              />
              {errors.layoverDuration && (
                <span className="error-message">
                  <FaExclamationCircle className="icon" />
                  {errors.layoverDuration}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                <FaLeaf className="icon" />
                Max CO₂ (kg)
              </label>
              <input
                type="number"
                name="emissions"
                value={formData.emissions}
                onChange={handleInputChange}
                placeholder="Enter max emissions"
                className={`form-input ${errors.emissions ? 'error' : ''}`}
                min="0"
              />
              {errors.emissions && (
                <span className="error-message">
                  <FaExclamationCircle className="icon" />
                  {errors.emissions}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button 
          style={{display: "flex", gap: "1rem" , width: "14rem" , padding: "1rem 2rem"}}
          className="btn" 
          onClick={searchFlightsHandler}
          disabled={isSubmitting}
        >
          <FaSearch className="icon" />
          {isSubmitting ? "Searching..." : "Search Flights"}
        </button>
      </div>

      {/* Results Section */}
      <div className="results-section">
        {loading ? (
          <div className="loading1">
            <div className="spinner1"></div>
            <p>Searching for flights...</p>
          </div>
        ) : error ? (
          <div className="error">
            <FaExclamationCircle className="icon" />
            <p>{error}</p>
          </div>
        ) : (
          <>
            {priceInsights && renderPriceInsights(priceInsights)}
            
            <div className="flight-results">
              <h3>Flight Results</h3>
              {flights.length > 0 ? (
                <div className="flights-grid">
                  {flights.map(renderFlightCard)}
                </div>
              ) : (
                <div className="no-results">
                  <FaInfoCircle className="icon" />
                  <p>No flights found. Try adjusting your search criteria.</p>
                </div>
              )}
            </div>

            {airports && airports.length > 0 && renderAirportDetails(airports)}
          </>
        )}
      </div>

      {/* Filters Row */}
      {/* <div className="filters-row">
        {[
          "Stops",
          "Airlines",
          "Bags",
          "Price",
          "Times",
          "Emissions",
          "Connecting airports",
          "Duration",
        ].map((filter) => (
          <button 
            key={filter} 
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaSlidersH className="icon" />
            {filter}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default FlightSearchPage; 