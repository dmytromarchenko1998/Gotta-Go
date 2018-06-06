import React from 'react';
import ReactDOM from 'react-dom';
import NearbyRestroomsList from './components/NearbyRestroomsList.jsx';
import AddNew from './components/addNew.jsx';
import axios from 'axios';
import API_KEYS from '../API_KEYS.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { longitude: undefined, latitude: undefined, searchRad: 1 };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
    this.findRestrooms = this.findRestrooms.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.toggleAddNewModal = this.toggleAddNewModal.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getAddress() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${API_KEYS.maps}`)
      .then((response) => {
        this.setState({ address: response.data.results[0].formatted_address });
      });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      console.log('getting location');
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
      console.log('not getting location');
      alert('Geolocation is not supported by this browser.');
    }
  }

  findRestrooms() {
    axios.get(`/api/${this.state.latitude}/${this.state.longitude}/${this.state.searchRad}`)
      .then((response) => {
        this.setState({ nearbyRestrooms: response.data });
      });
  }

  geoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({ longitude, latitude });
    this.findRestrooms();
    this.getAddress();
  }

  geoError() {
    alert('Geocoder failed.');
  }

  toggleAddNewModal() {
    document.getElementsByClassName('modal')[0].classList.toggle('hide');
  }

  changeRadius() {
    const radius = document.getElementById('SearchRad').value;
    this.setState({ searchRad: radius }, this.findRestrooms);
  }

  render() {
    const radiusArr = [1, 5, 10, 15, 25, 50, 100];
    return (
      <div className="content">
        <AddNew toggleAddNewModal={this.toggleAddNewModal} findRestrooms={this.findRestrooms} address={this.state.address} curLon={this.state.longitude} curLat={this.state.latitude} />
        <div className="NearestBathroomsTitle">
          <p>Nearest Bathrooms</p>
        </div>
        <div onClick={this.toggleAddNewModal} className="AddLocationButton Main">
          <p >Add New Location</p>
        </div>
        <form>
          <select onChange={this.changeRadius} id="SearchRad">
            <option value="" selected disabled hidden>radius</option>
            {radiusArr.map(radius => <option value={radius}>{radius}</option>)}
          </select>
        </form>
        <NearbyRestroomsList curLon={this.state.longitude} curLat={this.state.latitude} restrooms={this.state.nearbyRestrooms} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
