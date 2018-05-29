import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Route, Link } from 'react-router-dom';
import classNames from 'classnames';


//COMPONENTS
import AllPlaces from './AllPlaces.jsx';
import AddPlace from './AddPlace.jsx';




class Dashboard extends Component {
  static isPrivate = true

  constructor(props) {
    super(props);
    this.handleChangeMenu.bind(this)

  }

  handleChangeMenu(menu) {
    this.props.dispatch({
      type: 'SWITCH_MENU',
      menu: menu
    })
  }
  
  render() {

    return (
      <div className="cms container-fluid">
        <div className="row no-padding" style={{height: '100%'}}>
          <div className="col-md-2" style={{height: '100%'}}>
            <div className="cms-sidebar">
              <big className="text-center m-t-md">CMS</big>
              <Link to="/cms/add-place">
                <button className="btn m-t-md"><i className="fa fa-plus"></i>&nbsp;&nbsp;Add Places</button>
              </Link>
              <ul className="m-t-md">
                <li className={ classNames({'active': this.props.menu == 0}) } onClick={()=>{
                  this.handleChangeMenu(0)
                }}><Link to="/cms/">All Places</Link></li>
                <li className={ classNames({'active': this.props.menu == 1}) } onClick={()=>{
                  this.handleChangeMenu(1)
                }}>All Schools</li>
              </ul>
            </div>
          </div>
          <div className="col-md-10" style={{height: '100%'}}>
            <div className="cms-content" >
              <Route exact path="/cms/" component={AllPlaces}/>
              <Route path="/cms/add-place" component={AddPlace}/>
              
            </div>
          </div>
        </div>

      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
      menu: state.whichMenu
    };
  }

  export default connect(mapStateToProps)(Dashboard)


