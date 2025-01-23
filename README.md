# Weather App

This is a simple weather application that fetches weather data from the OpenWeatherMap API and displays it in a user-friendly interface. The app allows users to search for weather information by city name and toggle between Celsius and Fahrenheit temperature units.

## Features

- Search for weather information by city name
- Display current weather conditions, including temperature, description, wind speed, and humidity
- Display a 5-day weather forecast
- Toggle between Celsius and Fahrenheit temperature units
- Animated weather effects (snowflakes and raindrops)

## Technologies Used

- HTML
- CSS
- JavaScript
- jQuery
- Moment.js
- Font Awesome
- OpenWeatherMap API

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/codingseas/weatherapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weatherapp
   ```

3. Open [index.html](./index.html) in your preferred web browser.

## Usage

1. Enter the name of a city in the search bar.
2. Click the search button or press Enter to fetch the weather data.
3. The current weather conditions and 5-day forecast will be displayed.
4. Use the toggle buttons to switch between Celsius and Fahrenheit temperature units.

## API Key

This project uses the OpenWeatherMap API. You will need to obtain an API key from OpenWeatherMap and replace the placeholder API key in the `scripts.js` file with your own.

```javascript
const apiKey = "your-api-key-here";
```

## License

MIT License (Non-Commercial Use Only)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The Software is provided for non-commercial use only. Commercial use of the
Software is strictly prohibited.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API.
- [Font Awesome](https://fontawesome.com/) for the icons.
- [Moment.js](https://momentjs.com/) for date and time manipulation.

## Contact

If you have any questions or suggestions, feel free to reach out to me at [codingseas@gmail.com].

## Scripts

For more details on how the scripts work, refer to the [scripts.js](./scripts.js) file.
