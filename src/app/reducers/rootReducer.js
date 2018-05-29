import {combineReducers} from 'redux'
import * as places from './placesReducer'
import * as auth from './authReducer'
import * as cms from './cmsReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    ...auth,
    ...places,
    ...cms,
    routing: routerReducer
});

export default rootReducer;