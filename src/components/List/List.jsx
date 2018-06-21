import React, { Component } from "react";
import "./List.css";

class List extends Component {
 
    groupByDays = data => {
      return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);
      return list;
    }, {}));
  };

  getDayInfo = data => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

  getIcon = data => `http://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;
  
  getInfo = (data, min=[], max=[], humidity=[]) => {
    // eslint-disable-next-line
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

    return (
      <div className="weather-info">
        <div className="min-max"> 
          <p><strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}</p>
        </div>
        <div className="more-info">
          <p>{`Humidity: ${avgHumdity}%`}</p>
        </div>
      </div>
    );
  };

  render() {

    const { list } = this.props;
    const tiles = Object.values(this.groupByDays(list)); 
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <div className="row">
        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2" >
          {forecastTiles.map((item, i) => (
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12" key={i}>
              <div className={`tile-${i}`} key={i} ref={`div-${i}`}>
              </div>
              <div className="primary-info">
                <strong>{this.getDayInfo(item)}</strong>
                <img className="img-responsive" src={ this.getIcon(item)} alt="No" />
              </div>
                {this.getInfo(item)}
            </div>
           ))}
        </div>
      </div>
    );
  }
}

export default List;