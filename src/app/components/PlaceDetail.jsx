import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Medium, Big, Small } from "./Placeholders.jsx";


class PlacesDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabActive: 0,
      imgActive: 0,
      detailFromLink: this.props.location.state ? this.props.location.state.placeDetail : null,
      url: this.props.match.params.placeUrl
    }
    this.id = this.state.detailFromLink ? this.state.detailFromLink.id : null
      // this.getPlaces = this.getPlaces.bind(this);
  }
  // getPlaceDetail() {
  //   var placeUrl = this.props.match.params.placeUrl
  //     return dispatch => {
  //         dispatch({
  //           type: "IS_LOADING",
  //           url: placeUrl
  //         });
  //         return axios({
  //         method: "GET",
  //         url: `api/places/${ placeUrl }/detail`,
  //         }).then(res => {
  //             dispatch({
  //                 type: "GET_PLACE_DETAIL",
  //                 data: res.data
  //             });
  //         });
  //     };
  // }  

  getSummary() {
        
        return axios({
          method: "GET",
          url: `api/places/${ this.state.url }`,
        }).then(res => {
            this.setState({
              detailFromLink: {
                'id' : res.data.id,
                'address': res.data.address,
                'city': res.data.city,
                'district': res.data.district,
                'province': res.data.province,
                'logo': res.data.logo,
                'name': res.data.name
              }
            },()=>{
              console.log(this.state.detailFromLink)
            })
        });
}  

  getDetails() {
      return dispatch => {
          dispatch({
            id: this.id ,
            type: "IS_LOADING_DETAILS",
          });
          return axios({
          method: "GET",
          url: `api/places/detail/${ this.state.url }`,
          }).then(res => {
              dispatch({
                  type: "GET_DETAILS",
                  data: res.data
              });
          });
      };
  }  

  getImages() {
    return dispatch => {
        dispatch({
          id: this.id ,
          type: "IS_LOADING_PLACE_IMAGES",
        });
        return axios({
        method: "GET",
        url: `api/places/place-images/${ this.state.url }`,
        }).then(res => {
            dispatch({
                type: "GET_PLACE_IMAGES",
                data: res.data
            });
        });
    };
  }  

  getNegativeReviews() {
    return dispatch => {
      dispatch({
        id: this.id ,
        type: "IS_LOADING_NEGATIVE_REVIEWS",
      });
      return axios({
      method: "GET",
      url: `api/places/negative-reviews/${ this.state.url }`,
      }).then(res => {
          dispatch({
              type: "GET_NEGATIVE_REVIEWS",
              data: res.data
          });
      });
    };
  }

  getPositiveReviews() {
    return dispatch => {
      dispatch({
        id: this.id ,
        type: "IS_LOADING_POSITIVE_REVIEWS",
      });
      return axios({
      method: "GET",
      url: `api/places/positive-reviews/${ this.state.url }`,
      }).then(res => {
          dispatch({
              type: "GET_POSITIVE_REVIEWS",
              data: res.data
          });
      });
    };
  }


  componentWillMount() {
    if(this.state.detailFromLink == null){
      this.getSummary();
    }
    console.log("place",this.state.detailFromLink)
    this.props.dispatch(this.getDetails());
    this.props.dispatch(this.getImages());
    this.props.dispatch(this.getNegativeReviews());
    this.props.dispatch(this.getPositiveReviews());

    
  }

  render() {
    var address = this.state.detailFromLink ? `${ this.state.detailFromLink.address }, ${ this.state.detailFromLink.district }, ${ this.state.detailFromLink.city }, ${ this.state.detailFromLink.province }`: null
    return (
      <div style={{width:'100%', height:'100%'}}>
        <div className="container-fluid">
          <div className="row">
              <div className="banner bg-primary" style={{backgroundImage: `url(${this.props.placeImages && this.props.placeImages[0] ? this.props.placeImages[0].img_url: null})`,height: '271px'}}>

              </div>
          </div>
        </div>
        {/* <div className="container card m-t-md">
          <div className="row">
            <div className="col-md-3">
              <div className="circle p-a-xs border-primary">
                <div className="circle w-h-80">
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <big className="text-bold">SMA GONZAGA</big>
            </div>
          </div>
        </div> */}
        <div className="container m-t-md">
          <div className="row">
            <div className="col-md-4">
              <div className="card p-a-s row m-a-0">
                <div className="col-xs-4">
                  <div className="circle p-a-xs border-primary">
                    <div className="circle w-h-80 circle-profile" style={{ display:'block', backgroundImage: `url("${this.state.detailFromLink ? this.state.detailFromLink.logo : null}")` }}>
                    </div>
                  </div>
                </div>
                <div className="col-xs-8">
                  {/* <big className="text-bold">{ this.props.placeDetail.name }</big> */}
                  {/* <medium>{ `${ this.props.placeDetail.address }, ${ this.props.placeDetail.district }, ${ this.props.placeDetail.city }, ${ this.props.placeDetail.province }` }</medium> */}
                  {/* <Medium text={this.props.placeDetail ? address : false}/> */}
                  <Big classname="text-bold" text={this.state.detailFromLink ? this.state.detailFromLink.name : null}/>
                  <Medium classname="m-t-s text-gray" text={address}/>
                  
                </div>
              </div>
              <div className="card m-t-md">
                <div className="row m-a-0 border-b-gray">
                  <div className="col-xs-12">
                    <p><i className="fa fa-globe m-r-md"></i><a>{this.props.placeDetail.website}</a></p>
                    <p><i className="fa fa-phone m-r-md"></i><a>{this.props.placeDetail.phone}</a></p>
                  </div>
                </div>
                <div className="row m-a-0">
                  <div className="col-xs-12">
                    <div className="social-media">
                      <a href={`${this.props.placeDetail.facebook}`} className="fa fa-facebook-official color-facebook"></a>
                      <a href={`${this.props.placeDetail.twitter}`} className="fa fa-twitter-square m-l-md color-twitter"></a>
                      <a href={`${this.props.placeDetail.other}`} className="fa fa-envelope-square m-l-md color-mail"></a>
                      <a href={`${this.props.placeDetail.instagram}`} className="fa fa-instagram m-l-md color-instagram"></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card m-t-md">
                {
                  this.props.placeImages != false ? 
                    <div className="img-carousel-container">
                      <div className="img-main loading-line" style={{backgroundImage: `url("${this.props.placeImages[this.state.imgActive].img_url}")`}}></div>
                        <div className="img-list">
                          {
                            this.props.placeImages.map((v,k)=> (
                              <div className="img-item" style={{backgroundImage: `url("${v.img_url}")`}} onClick={()=>{
                                this.setState({
                                  imgActive:k
                                })
                              }}></div>
                            ))
                          }
                        </div>
                    </div>
                    :
                  <div className="img-carousel-container">
                    <div className="img-main loading-line"></div>
                    <div className="img-list">
                      {
                        [0,1,2,3].map(()=> (
                          <div className="img-item loading-line"></div>
                        ))
                      }
                    </div>
                  </div>
                }    
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab">
                <div className="tabs">
                  <div className={`tab-item ${ this.state.tabActive == 0 ? 'active' : '' }`} onClick={ ()=> {
                    this.setState({
                      tabActive: 0
                    })
                  }}>Tentang</div>
                  <div className={`tab-item ${ this.state.tabActive == 1 ? 'active' : '' }`} onClick={ ()=> {
                    this.setState({
                      tabActive: 1
                    })
                  }}>Review</div>
                </div>
                <div className="tab-content">
                {
                  this.state.tabActive == 0 ?
                    <div>
                      <medium className="text-bold m-t-md">Fasilitas</medium>
                      <div className="row">
                        <div className="col-md-6">
                        {
                          this.props.placeDetail.facilities ? 
                            this.props.placeDetail.facilities.slice(0,(this.props.placeDetail.facilities.length/2)).map((v,k)=> {
                              return(
                                  <medium className="text-thin m-t-s p-l-s">{v}</medium> 
                              )
                            })
                          :
                          <div>
                            <div className="ph-medium loading-line" style={{ width:'60%' }}></div>
                            <div className="ph-medium loading-line" style={{ width:'55%' }}></div>
                            <div className="ph-medium loading-line" style={{ width:'35%' }}></div>
                          </div>
                        }
                        </div>
                        <div className="col-md-6">
                        {
                          this.props.placeDetail.facilities ? 
                          this.props.placeDetail.facilities.slice((this.props.placeDetail.facilities.length/2)+1, this.props.placeDetail.facilities.length).map((v,k)=> {
                            return(
                                <medium className="text-thin m-t-s p-l-s">{v}</medium> 
                            )
                          })
                          :
                          <div>
                            <div className="ph-medium loading-line" style={{ width:'60%' }}></div>
                            <div className="ph-medium loading-line" style={{ width:'55%' }}></div>
                            <div className="ph-medium loading-line" style={{ width:'35%' }}></div>
                          </div>
                        }
                        </div>
                      </div>
                      
                      <medium className="text-bold m-t-md">Ekstra Kurikuler</medium>
                      <Medium  classname="text-thin m-t-s p-l-s" text={this.props.placeDetail.extra_curricular}></Medium>
                      <medium className="text-bold m-t-md">Alumni</medium>
                      <Medium classname="m-t-s text-thin p-l-s" text={this.props.placeDetail.notable_alumni}/>
                    </div>
                  :
                    <div>
                      <medium className="text-bold m-t-md">Positive Reviews</medium>
                      {
                        this.props.positiveReviews ?
                        this.props.positiveReviews.map((v,k) => (
                          <medium className="m-t-s text-thin p-l-s text-italic">"{v.review}"</medium>
                          
                        ))
                        :
                        <div>
                          <div className="ph-medium loading-line" style={{ width:'70%' }}></div>
                          <div className="ph-medium loading-line" style={{ width:'55%' }}></div>
                        </div>
                      }
                    
                      <medium className="text-bold m-t-md">Negative Reviews</medium>
                      {
                        this.props.negativeReviews ?
                        this.props.negativeReviews.map((v,k) => (
                          <medium className="m-t-s text-thin p-l-s text-italic">"{v.review}"</medium>
                          
                        ))
                        :
                        <div>
                          <div className="ph-medium loading-line" style={{ width:'70%' }}></div>
                          <div className="ph-medium loading-line" style={{ width:'55%' }}></div>
                        </div>
                      }
                    </div>
                  

                }
                </div>
              </div>
            </div>
            

          </div>
          
        </div>

      </div>
    
    );
  }
}
function mapStateToProps(state) {
    return {
      facilities : state.facilities,
      placeDetail : state.placeDetail,
      placeImages : state.placeImages,
      notable_alumni : state.notable_alumni,
      negativeReviews : state.negativeReviews,
      positiveReviews : state.positiveReviews
      
      
    };
  }

  export default connect(mapStateToProps)(PlacesDetail)


