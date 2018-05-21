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
          code: document.getElementById("InputCode").value
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
    // console.log(this);
    this.props.findRestrooms()
    // alert(response.data);
  }

  useCurrentLocation() {
    document.getElementById("InputAddress").value = this.props.address;
  }

  render() {
    if (this.props.curLat && this.props.curLon && this.props.address) {
      return (
        <div>

          <form>
            <input id="InputName" type="text" />

            <input id="InputAddress" type="text" />

            <input id="InputCode" type="text"/>
          </form>

          <div>
            <button onClick={this.useCurrentLocation} >Use Current Location</button>
          </div>

          <div>

            <div>
              <p>Opening Hours</p>
            </div>

            <div>
              <HoursDropDown openOrClosed='HoursOpen'/>
              <MinsDropDown openOrClosed='MinsOpen'/>
              <TimeOfDayDropDown timeOfDay={this.state.possibleTimeofDay} />
            </div>

          </div>

          <div>

            <div>
              <p>Closing Hours</p>
            </div>

            <div>
              <HoursDropDown openOrClosed='HoursClosed'/>
              <MinsDropDown openOrClosed='MinsClosed'/>
              <TimeOfDayDropDown timeOfDay={this.state.possibleTimeofDay} />
            </div>

          </div>
          <button onClick={this.AddLocation.bind(this)}>AddLocation</button>
        </div>
      )
    }
    else {
      return (
      <div>
        <p>loading</p>
        <p>loading</p>
      </div>
      )
    }
  }
}

module.exports = AddNew;