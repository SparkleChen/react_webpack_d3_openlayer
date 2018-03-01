import { combineReducers } from 'redux';

import ButtonReducer from './buttonReducer';
import BarGraphReducer from './barGraphReducer';
import PopUpTipsReducer from './popUpTipsReducer';

const rootReducer = combineReducers({
       ButtonReducer,
       BarGraphReducer,
       PopUpTipsReducer
})

export default rootReducer