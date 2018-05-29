import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'


class ChooseAddPlace extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="row m-t-md">
        <div className="col-md-3">
          <Link to="add-place/school">
            <div className="card clickable">
              <big className="fa fa-university text-center"></big>
              <medium className="text-center m-t-s">School</medium>
            </div>
          </Link>
        </div>
      </div>   
        
    );
  }
}
function mapStateToProps(state) {
    return {
    };
  }

export default connect(mapStateToProps)(ChooseAddPlace)


