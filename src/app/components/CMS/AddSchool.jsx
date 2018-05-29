import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

class AddSchool extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    axios({
      method: "POST",
      url: `/api/cms/places/add-place`,
      headers: {
        "x-access-token": cookie().getCookie('papantulis'),
      },
      data: data
    })
  }

  render() {
    return (
  
        <form onSubmit={this.handleSubmit}>
          <div className="row card m-t-md">
            <div className="col-md-6">
              <div className="input-container">
                <medium>Place Name</medium>
                <input type="text" className="m-t-s full-width" id="name" name="name"/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-container">
                <medium>Phone Number</medium>
                <input type="number" className="m-t-s full-width" id="phone" name="phone"/>
              </div>
            </div>
            <div className="col-md-2">
              <div className="input-container">
                <medium>Level</medium>
                <select type="text" className="m-t-s full-width" id="level" name="level">
                    <option value="0">playgroup</option>
                    <option value="1">TK</option>
                    <option value="2">SD</option>
                    <option value="3">SMP</option>
                    <option value="4">SMA</option>
                    <option value="5">S1</option>
                    <option value="6">S2</option>
                    
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Logo Link</medium>
                <input type="text" className="m-t-s full-width" id="logo" name="logo"/>
              </div>
            </div>
            <div className="col-md-12">
              <medium className="text-bold input-group">CONTACT</medium>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Facebook</medium>
                <input type="text" className="m-t-s full-width" id="facebook" name="facebook"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Twitter</medium>
                <input type="text" className="m-t-s full-width" id="twitter" name="twitter"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Instagram</medium>
                <input type="text" className="m-t-s full-width" id="instagram" name="instagram"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Website</medium>
                <input type="text" className="m-t-s full-width" id="website" name="website"/>
              </div>
            </div>
            <div className="col-md-12">
              <medium className="text-bold input-group">PLACE ADDRESS</medium>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Address</medium>
                <input type="text" className="m-t-s full-width" id="address" name="address"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>District</medium>
                <input type="text" className="m-t-s full-width" id="district" name="district"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>City</medium>
                <input type="text" className="m-t-s full-width" id="city" name="city"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Province</medium>
                <input type="text" className="m-t-s full-width" id="province" name="province"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Facilities</medium>
                
                <textarea type="text" className="m-t-s" id="facilities" name="facilities"/>
                <small>Divide each item with an ","</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Extra Curricular</medium>
                
                <textarea type="text" className="m-t-s" id="extra_curricular" name="extra_curricular"/>
                <small>Divide each item with an ","</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container">
                <medium>Curriculum</medium>
                
                <textarea type="text" className="m-t-s" id="curriculum" name="curriculum"/>
                <small>Divide each item with an ","</small>
              </div>
            </div> 
            <div className="col-md-6">
              <div className="input-container">
                <medium>Notable Alumni</medium>
                
                <textarea type="text" className="m-t-s" id="notable_alumni" name="notable_alumni"/>
                <small>Divide each item with an ","</small>
              </div>
            </div> 
            <div className="col-md-12 m-t-md">
              <button className="btn btn-secondary block-center" type="submit">ADD PLACE</button>
            </div>

          </div>   
        
        </form>
    );
  }
}
function mapStateToProps(state) {
    return {
    };
  }

export default connect(mapStateToProps)(AddSchool)


