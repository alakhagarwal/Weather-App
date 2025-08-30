# Weather Forecast Application

A modern, responsive weather application that provides current weather conditions and extended forecasts for any city worldwide.

## Features

- **Current Weather Display**: Real-time weather conditions including temperature, humidity, wind speed, precipitation, and "feels like" temperature
- **15-Hour Forecast**: Detailed hourly forecast for the next 15 hours
- **15-Day Extended Forecast**: Daily weather predictions with high/low temperatures
- **Dual Temperature Units**: Toggle between Celsius (°C) and Fahrenheit (°F)
- **Animated Weather Icons**: Dynamic GIF icons for different weather conditions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Comprehensive error management for API issues and invalid inputs

## Weather Conditions Supported

The app displays animated icons for various weather conditions:
- Clear day/night
- Partly cloudy day/night
- Cloudy
- Rain
- Snow
- Fog
- Windy conditions

## API Integration

This application uses the **Visual Crossing Weather API** to fetch weather data.

### API Features Used:
- Current weather conditions
- Hourly forecasts
- Daily forecasts up to 15 days
- Multiple unit systems (metric/imperial)

## Setup Instructions

1. **Clone or Download** the project files
2. **API Key Setup**: 
   - The code includes an API key for Visual Crossing Weather API
   - For production use, replace with your own API key from [Visual Crossing](https://www.visualcrossing.com/)
3. **Asset Files**: Ensure all weather condition GIF files are present in the `assets/` directory
4. **Web Server**: Serve the files through a web server (required for API calls)

## Usage

1. **Initial Search**: Enter a city name in the main search form
2. **Temperature Unit**: Select between Celsius and Fahrenheit using radio buttons
3. **View Results**: 
   - Current weather conditions display immediately
   - Scroll to see hourly forecast (next 15 hours)
   - View extended 14-day forecast
4. **New Search**: Use the header search form to look up weather for different cities

## Code Structure

### Main Functions

- `fetchWeatherData(cityName, temperature)`: Handles API requests and error management
- `DisplayWeatherData(weatherData)`: Renders all weather information to the DOM
- `displayNext15Hours()`: Specifically handles hourly forecast display
- `formatDate()`: Formats dates for display

### Error Handling

The application includes robust error handling for:
- Network connectivity issues
- Invalid city names (400 error)
- API authentication problems (401 error)
- Rate limiting (429 error)
- City not found (404 error)
- General server errors

### Temperature Unit Conversion

- **Metric**: Celsius (°C), km/h for wind speed, mm for precipitation
- **Imperial**: Fahrenheit (°F), mph for wind speed, inches for precipitation

## Dependencies

- **Visual Crossing Weather API**: For weather data
- **No external libraries**: Pure vanilla JavaScript implementation

## Customization

### Modifying Forecast Length
- Change the loop limit in `displayNext15Hours()` to show more/fewer hours
- Modify the day forecast loop (currently 1-14) for different day ranges

## Performance Considerations

- Weather icons are loaded on-demand
- API calls are made only when needed
- Minimal DOM manipulation for smooth performance
- Loading indicator provides user feedback during API calls

## Troubleshooting

### Common Issues

1. **No weather data displayed**: Check internet connection and API key validity
2. **City not found**: Verify city name spelling and try alternate spellings
3. **Icons not loading**: Ensure all GIF files are present in the assets folder
4. **API errors**: Check console for specific error codes and messages

### Debug Mode

Enable browser developer tools to view:
- API response data in console
- Network requests
- Any JavaScript errors

### Made by Alakh

