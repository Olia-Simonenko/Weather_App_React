import React,{Component} from "react";
import Form from "./components/Form/Form";
import Map from "./components/Map/Map";
import List from "./components/List/List";

const API_KEY = "c0d9b20cb7ad925c9b73db62056995e8";

class App extends Component {
  state = {
    list: {},
    // temperature: '',
    city: '',
    // description: '',
    lat:'',
    lng:'',
      // icon:'',
    error: ''
  }
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`) 
    .then((response)=>{
      if(!response.ok){
        throw response}
     return response.json()})
    .then((json)=>{
        console.log(json);
        this.setState({
        //temperature:json.list[0].main.temp,
        city:json.city.name,
        list:json.list,
        // description:json.weather[0].description,
        // icon:`http://openweathermap.org/img/w/${json.weather[0].icon}.png`,
        center:{lat:json.city.coord.lat,lng:json.city.coord.lon},
      });
    
    })
    .catch((error)=>{
      this.setState({error:error.statusText});
    
    });
  };
  render(){
    return(
      <div className="container main">
        <div className="row">
          <div className="form-container">
            <Form getWeather={this.getWeather}/>
              { this.state.city!==""?
                <div><Map 
                    center = {this.state.center}
                    zoom = {11}
                />
                <List list={this.state.list}/></div>
                : < Map />
              }
              
            {/* <Weather 
             // temperature={this.state.temperature}
              city={this.state.city}
              // description={this.state.description}
              // icon={this.state.icon}
              error={this.state.error}
            />
              */}
            
          </div>
        </div>
      </div>
    );
  }
};

export default App;