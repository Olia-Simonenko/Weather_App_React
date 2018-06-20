import React, { Component } from "react";

class List extends Component {
 
  // Filters the data by date and returns an Object containing a list of 5-day forecast.
    groupByDays = data => {
      return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);
      return list;
    }, {}));
  };

  // Returns week of the day
  getDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

  // Fetches the icon using the icon code available in the forecast data.
  getIcon = data =>
      `http://openweathermap.org/img/w/${data[1].weather[0].icon}.png`;
    

  getInfo = (data, min=[], max=[], humidity=[]) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // Gets the day's average humdity
    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
        </div>
        <div className="more-info">
          {`Avg. Humidity: ${avgHumdity}%`}
        </div>
      </div>
    );
  };

  render() {

    const { list } = this.props;
    const tiles = Object.values(this.groupByDays(list));
    
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;
    console.log(forecastTiles);
    return (
      <div className="forecast-tiles">
        {forecastTiles.map((item, i) => (
          <div
            className={`forecast-tile tile-${i}`}
            key={i}
            ref={`div-${i}`}>
            <div className="primary-info">
              <div className="icon">
                <img src={ this.getIcon(item)} alt="No" />
                {this.getDayInfo(item)}
              </div>
              {this.getInfo(item)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default List;