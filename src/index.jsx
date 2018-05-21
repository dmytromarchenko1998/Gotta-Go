import React from 'react';
import ReactDOM from 'react-dom';
import NearbyRestroomsList from './components/NearbyRestroomsList.jsx';
import AddNew from './components/addNew.jsx';
import axios from 'axios';
import API_KEYS from '../API_KEYS.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {longitude:undefined, latitude:undefined, searchRad:5};
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
    this.findRestrooms = this.findRestrooms.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getPlaceName = this.getPlaceName.bind(this);
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  findRestrooms() {
    axios.get(`/api/${this.state.latitude}/${this.state.longitude}/${this.state.searchRad}`)
    .then(response => {
      this.setState({nearbyRestrooms:response.data})
    })
  }

  getAddress() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${API_KEYS.maps}`)
    .then(response => {
      this.setState({address:response.data.results[0].formatted_address})
    })
  }

  getPlaceName() {
    axios.get(`https://maps.googleapis.com/maps/api/place/json?&key=${API_KEYS.places}`)
    .then(response => {
      console.log(response.data)
      // this.setState({address:response.data.results[0].formatted_address})
    })
    .catch(err => {
      console.log(err)
    })
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      console.log('getting location')
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
      console.log('not getting location')
      alert("Geolocation is not supported by this browser.");
    }
  }

  geoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({longitude:longitude, latitude:latitude})
    this.findRestrooms();
    this.getAddress();
    this.getPlaceName();
  }

  geoError() {
    alert("Geocoder failed.");
  } 

  render() {
    return (
      <div>
        <AddNew findRestrooms={this.findRestrooms} address={this.state.address} curLon={this.state.longitude} curLat={this.state.latitude}/>
        <NearbyRestroomsList restrooms={this.state.nearbyRestrooms} />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));