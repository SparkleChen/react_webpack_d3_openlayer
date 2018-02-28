import { combineReducers } from 'redux';

import ButtonReducer from './buttonReducer';
import BarGraphReducer from './barGraphReducer';

const rootReducer = combineReducers({
       ButtonReducer,
       BarGraphReducer
})

export default rootReducer