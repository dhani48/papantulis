import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Route } from 'react-router-dom'


import AddSchool from './AddSchool.jsx';
import ChooseAddPlace from './ChooseAddPlace.jsx';



class AddPlace extends Component {

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
      <div className="container-fluid add-place">
        <div className="row m-t-md">
            <div className="col-md-12">
              <big>Add Place</big>
            </div>
        </div>
        
        <Route path="/cms/add-place/school" component={AddSchool}/>
        <Route exact path="/cms/add-place/" component={ChooseAddPlace}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
    };
  }

export default connect(mapStateToProps)(AddPlace)


