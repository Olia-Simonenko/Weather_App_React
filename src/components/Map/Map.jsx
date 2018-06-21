import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import "./Map.css";
 
class Map extends Component {
    
  static defaultProps = {
    center: {
      lat: 50.50,
      lng: 30.30
    },
      zoom: 2
  };
 
  render() {

    return (
      <div className="row">
        <div className="col-12"> 
          <div className="map center-block">
            { <GoogleMapReact 
                bootstrapURLKeys={{ key: "AIzaSyBmOoA0Vqa-KEmNenVg0Bb4SZA-Bbi7SoY" }}
                center={this.props.center}
                zoom = {this.props.zoom}/>
            }  
          </div> 
        </div>
      </div>
    );
  }
}
 
export default Map;