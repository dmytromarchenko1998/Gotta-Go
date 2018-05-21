import React from 'react';
import axios from 'axios';
import HoursDropDown from './HoursDropDown.jsx';
import MinsDropDown from './MinsDropDown.jsx';
import TimeOfDayDropDown from './TimeOfDayDropDown.jsx';

class AddNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      possibleTimeofDay:['AM', 'PM'],
      possibleDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    }
    this.resetForm = this.resetForm.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
  }

  AddLocation() {
    if (this.props.address) {
      axios({
        url: '/api/add',
        method: 'post',
        data: {
          location: {
           type: 'Point',
           coordinates: [this.props.curLon, this.props.curLat]
          },
          name:document.getElementById('InputName').value,
          OpenHours: document.getElementById("HoursOpen").value,
          ClosedHours: document.getElementById("HoursClosed").value,
          OpenMins: document.getElementById("MinsOpen").value,
          ClosedMins: document.getElementById("MinsClosed").value,
          address: document.getElementById("InputAddress").value,
          code: document.getElementById("InputCode").value,
          OpenTimeOfDay: document.getElementById("TimeOpen").value,
          ClosedTimeOfDat: document.getElementById("TimeClosed").value
        }
      })
      .then(this.resetForm)
    } else {
      alert('getting location data')
    }
  }

  resetForm(response) {
    document.getElementById("InputName").value = "";
    document.getElementById("InputCode").value = "";
    document.getElementById("InputAddress").value = "";
    this.props.findRestrooms();
    this.props.toggleAddNewModal();
  }

  useCurrentLocation() {
    document.getElementById("InputAddress").value = this.props.address;
  }

  toggleHours() {
    document.getElementsByClassName('Hours')[0].classList.toggle('hide');
    document.getElementById('toggleHours').classList.toggle('hide');
  }

  render() {
    return (
      <div className="hide modal">
        <div className="modalContainer">

          <div>
            <div className="inputNameContainer">
              <p>Name</p>
              <input id="InputName" type="text" />
            </div>
            <div className="InputAddressContainer">
              <p>Address</p>
              <input id="InputAddress" type="text" />
              <button onClick={this.useCurrentLocation} >Use Current Location</button>
            </div>
            <div>
              <button>Add Code</button>
            </div>
            <div className="inputCodeContainer">
              <p>Code</p>
              <input id="InputCode" type="text"/>
            </div>
          </div>

          <div>
            <button id="toggleHours" onClick={this.toggleHours}>Add Hours</button>
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
          <button onClick={this.AddLocation.bind(this)}>AddLocation</button>
        </div>
      </div>
    )
  }
}

module.exports = AddNew;