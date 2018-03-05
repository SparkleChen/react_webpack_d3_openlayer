import {POPUP_TIPS} from '../actions/actionsType';

export default (state ={},action) =>{
    switch (action.type) {
        case POPUP_TIPS:
            return {...state,
                circleProperties: action.circleProperties
            };
        default:
            return state
    }
}