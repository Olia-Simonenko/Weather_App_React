import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';

 
class Map extends Component {
    
  static defaultProps = {
    center: {
      lat: 50.50,
      lng: 30.30
    },
      zoom: 2
  };
 
  render() {
      console.log(this.props.center);
    return (
      
      <div className="map">
       {
           <GoogleMapReact 
           bootstrapURLKeys={{ key: "AIzaSyBmOoA0Vqa-KEmNenVg0Bb4SZA-Bbi7SoY" }}
           center={this.props.center}
           zoom = {this.props.zoom}
           />
        }  
      </div> 
    );
  }
}
 
export default Map;