import React,{Component} from "react";
import Form from "../Form/Form";
import Map from "../Map/Map";
import List from "../List/List";
import "./App.css";

const API_KEY = "c0d9b20cb7ad925c9b73db62056995e8";

class App extends Component {
  state = {
    list: {},
    city: '',
    lat:'',
    lng:'',
    error: '',
    hasError: false,
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
        this.setState({
        city:json.city.name,
        list:json.list,
        center:{lat:json.city.coord.lat,lng:json.city.coord.lon},
        hasError:false,
      });
    })
    .catch((error)=>{
      this.setState({
        error:error.statusText,
        hasError:true,
      });
    });
    e.target.elements.city.value='';
  };

  render(){
    return(
      <div className="container-fluid main">
        <div className="container">
          <div className="form-container">
            <Form getWeather={this.getWeather}/>
              { this.state.city !== "" && !this.state.hasError ?
                <div>
                  <Map center = {this.state.center} zoom = {11}/>
                    <h3 className="title text-center"><strong>Weather in {this.state.city}</strong></h3>
                  <List list={this.state.list}/>
                </div>
                : <div>< Map /><br/>
                    <p className="text-center"><strong>{this.state.error}</strong></p>
                  </div>
              }
          </div>
        </div>
      </div>  
    );
  }
};

export default App;