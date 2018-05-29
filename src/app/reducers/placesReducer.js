export const places = (state = [], action) => {
  switch (action.type) {
    case 'GET_PLACES':
      return action.places
    default:
      return state
  }
}


export const placeDetail = (state = [], action) => {
  switch (action.type) {
    case 'IS_LOADING_DETAILS':
      return state && action.id == state.id && action.id? state.id : false
    case 'GET_DETAILS':
      return action.data
    default:
      return state
  }
}

export const negativeReviews = (state = [], action) => {
  switch (action.type) {
    case 'IS_LOADING_NEGATIVE_REVIEWS':
      return state && action.id == state.id && action.id && action.id? state.id : false
    case 'GET_NEGATIVE_REVIEWS':
      return action.data
    default:
      return state
  }
}

export const placeSummary = (state = [], action) => {
  switch (action.type) {
    case 'IS_LOADING_PLACE_SUMMARY':
      return state && action.id == state.id && action.id? state.id : false
    case 'GET_PLACE_SUMMARY':
      return action.data
    default:
      return state
  }
}

export const positiveReviews = (state = [], action) => {
  switch (action.type) {
    case 'IS_LOADING_POSITIVE_REVIEWS':
      return state && action.id == state.id && action.id? state.id : false
    case 'GET_POSITIVE_REVIEWS':
      return action.data
    default:
      return state
  }
}
 
export const placeImages = (state = [], action) => {
  switch (action.type) {
    case 'IS_LOADING_PLACE_IMAGES':
      return state && action.id == state.id && action.id? state.id : false
    case 'GET_PLACE_IMAGES':
      return action.data
    default:
      return state
  }
} 