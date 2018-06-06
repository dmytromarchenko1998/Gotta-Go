import React from 'react';
import axios from 'axios';
import HoursDropDown from './HoursDropDown.jsx';
import MinsDropDown from './MinsDropDown.jsx';
import TimeOfDayDropDown from './TimeOfDayDropDown.jsx';
import API_KEYS from '../../API_KEYS.js';

class AddNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      possibleTimeofDay:['AM', 'PM'],
      possibleDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      hours: "Add Hours",
      code: "Add Code",
      lon: undefined,
      lat: undefined
    }
    this.resetForm = this.resetForm.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
    this.toggleHours = this.toggleHours.bind(this);
    this.toggleAddNewModal = this.props.toggleAddNewModal.bind(this);
    this.toggleCode = this.toggleCode.bind(this);
    this.addToDB = this.addToDB.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  AddLocation() {
    this.getCoordinates();
  }

  getCoordinates() {
    let address = document.getElementById("InputAddress").value.split(' ');
    address = address.join('+');
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},&key=${API_KEYS.maps}`)
    .then(response => {
      let location = response.data.results[0].geometry.location;
      this.setState({lat:location.lat, lon:location.lng, address:response.data.results[0].formatted_address}, this.addToDB)
    })
  }

  addToDB() {
    if (this.state.lat !== undefined) {
      axios({
        url: '/api/add',
        method: 'post',
        data: {
          location: {
           type: 'Point',
           coordinates: [this.state.lon, this.state.lat]
          },
          name:document.getElementById('InputName').value,
          OpenHours: document.getElementById("HoursOpen").value,
          ClosedHours: document.getElementById("HoursClosed").value,
          OpenMins: document.getElementById("MinsOpen").value,
          ClosedMins: document.getElementById("MinsClosed").value,
          address: this.state.address,
          code: document.getElementById("InputCode").value,
          OpenTimeOfDay: document.getElementById("TimeOpen").value,
          ClosedTimeOfDay: document.getElementById("TimeClosed").value
        }
      })
      .then(this.resetForm)
    } else {
      console.log(this.state.lon);
    }
  }

  resetForm(response) {
    document.getElementById("InputName").value = "";
    document.getElementById("InputCode").value = "";
    document.getElementById("InputAddress").value = "";
    this.props.findRestrooms();
    this.toggleAddNewModal();
  }

  useCurrentLocation() {
    document.getElementById("InputAddress").value = this.props.address;
  }

  toggleHours() {
    document.getElementsByClassName('Hours')[0].classList.toggle('hide');
    if (this.state.hours === 'Hide Hours') {
      this.setState({hours:"Add Hours"})
    } else {
      this.setState({hours:"Hide Hours"});
    }
  }

  toggleCode() {
    document.getElementsByClassName('inputCodeContainer')[0].classList.toggle('hide');
    if (this.state.code === 'Hide Code') {
      this.setState({code:"Add Code"})
    } else {
      this.setState({code:"Hide Code"});
    }
  }

  render() {
    return (
      <div className="hide modal">
        <div className="modalContainer">

          <span className="closeModal">
            <div onClick={this.resetForm} className="closeModalContainer">
              <p className="closeModalButton">&#10005;</p>
            </div>
          </span>
          <div className="mainInputs">
            <div>
              <div className="inputNameContainer">
                <p>Name</p>
                <input id="InputName" type="text" />
              </div>
              <div className="InputAddressContainer">
                <div className="InputAddressName">
                  <p>Address</p>
                  <input id="InputAddress" type="text" />
                </div>
              </div>
              <div className="toggleButtons">
                <div className="UseCurrentLocationButton">
                  <p onClick={this.useCurrentLocation} >Use Current Location</p>
                </div>
                <div className="toggleCode Button" onClick={this.toggleCode}>
                  <p >{this.state.code}</p>
                </div>
                <div className="toggleHours Button" onClick={this.toggleHours}>
                  <p id="toggleHours" >{this.state.hours}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="toggleable">
            <div className="placeHolder">
              <div className="hide inputCodeContainer">
                <p>Code</p>
                <input id="InputCode" type="text"/>
              </div>
            </div>

            <div className="hide Hours">

              <div>

                <div>
                  <p>Opening Hours</p>
                </div>

                <div>
                  <HoursDropDown openOrClosed='HoursOpen'/>
                  <MinsDropDown openOrClosed='MinsOpen'/>
                  <TimeOfDayDropDown openOrClosed="TimeOpen" timeOfDay={this.state.possibleTimeofDay} />
                </div>

              </div>

              <div>

                <div>
                  <p>Closing Hours</p>
                </div>

                <div>
                  <HoursDropDown openOrClosed='HoursClosed'/>
                  <MinsDropDown openOrClosed='MinsClosed'/>
                  <TimeOfDayDropDown openOrClosed="TimeClosed" timeOfDay={this.state.possibleTimeofDay} />
                </div>

              </div>
            </div>
          </div>
          <div onClick={this.AddLocation.bind(this)} className="AddLocationButton">
            <p >AddLocation</p>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = AddNew;