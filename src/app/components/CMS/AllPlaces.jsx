import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

class AllPlaces extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data : []
    }
    this.getPlaces.bind(this)
    this.deletePlace.bind(this)
    
  }

  getPlaces() {
      axios({
        method: "GET",
        url: `/api/cms/places/all-places`,
        headers: {
          "x-access-token": cookie().getCookie('papantulis'),
        }
      }).then(res => {
        this.setState({
          data : res.data
        })
      });
  }  

  deletePlace(id) {
    axios({
      method: "POST",
      url: `/api/cms/places/delete-place`,
      headers: {
        "x-access-token": cookie().getCookie('papantulis'),
      },
      data: {
        id: id
      }
    }).then(res => {
      if(res.data.status == "success") {
        this.getPlaces()
        
      }
    });
}  
  
  componentWillMount() {
    this.getPlaces()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row m-t-md">
          <div className="col-md-12">
            <big>All Places</big>
          </div>
        </div>
        <div className="row m-t-md">
          {
            this.state.data.map((v,k)=> (
              <div className="col-md-4">
                <div className="p-a-s">
                  <div className="card card-item">
                    <medium className="text-bold">{v.name}</medium>
                    <div className="btn-group">
                      <button className="btn-small btn-primary fa fa-edit"></button>
                      <button className="btn-small btn-red fa fa-trash" onClick={()=> {
                        this.deletePlace(v.place_id)
                      }}></button>
                    </div>
                    
                  </div>
                </div>
              </div>
           ))
          }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
    };
  }

export default connect(mapStateToProps)(AllPlaces)


