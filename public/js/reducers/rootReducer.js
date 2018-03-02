import { combineReducers } from 'redux';

import ButtonReducer from './buttonReducer';
import BarGraphReducer from './barGraphReducer';
import PopUpTipsReducer from './popUpTipsReducer';

/**
 * 合成reduce
 * @type {Reducer<any>}
 */
const rootReducer = combineReducers({
       ButtonReducer,
       BarGraphReducer,
       PopUpTipsReducer
})

export default rootReducer