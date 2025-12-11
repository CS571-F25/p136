import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using Open-Meteo API (no API key needed)
    // Coordinates for Shelter Island Heights, NY
    const lat = 41.08;
    const lon = -72.36;
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/New_York&forecast_days=7`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Weather fetch error:", err);
        setLoading(false);
      });
  }, []);

  const getWeatherDescription = (code) => {
    if (code === 0) return "Clear";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rainy";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Showers";
    return "Stormy";
  };

  const getWeatherEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌦️";
    return "⛈️";
  };

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[(date.getDay() + 1) % 7];
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-3">
        <Card className="text-center p-3">
          <Card.Body>Loading weather...</Card.Body>
        </Card>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="container mt-3">
      <Card className="shadow-sm">
        <Card.Body>
          {/* Current Weather */}
          <div className="text-center mb-3">
            <h5 className="mb-2">Golf Club Weather, Shelter Island Forecast</h5>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <span className="fs-1">{getWeatherEmoji(weather.current.weather_code)}</span>
              <div>
                <div className="fs-2 fw-bold">{Math.round(weather.current.temperature_2m)}°F</div>
                <div className="text-muted small">{getWeatherDescription(weather.current.weather_code)}</div>
              </div>
              <div className="text-muted small">
                Wind: {Math.round(weather.current.wind_speed_10m)} mph
              </div>
            </div>
          </div>

          {/* 7-Day Forecast - Horizontal */}
          <div className="border-top pt-3">
            <h6 className="text-center mb-3">7-Day Forecast</h6>
            <div className="d-flex justify-content-between gap-2" style={{ overflowX: "auto" }}>
              {weather.daily.time.map((date, index) => (
                <div 
                  key={date} 
                  className="text-center p-2 border rounded bg-light flex-shrink-0"
                  style={{ minWidth: "80px" }}
                >
                  <div className="fw-semibold small mb-1">
                    {index === 0 ? "Today" : getDayName(date)}
                  </div>
                  <div className="fs-3 my-1">
                    {getWeatherEmoji(weather.daily.weather_code[index])}
                  </div>
                  <div className="fw-semibold">
                    <span className="text-danger small">{Math.round(weather.daily.temperature_2m_max[index])}°</span>
                  </div>
                  <div className="fw-semibold">
                    <span className="text-primary small">{Math.round(weather.daily.temperature_2m_min[index])}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}