import {BAR_GRAPH} from '../actions/actionsType';

export default (state ={},action) =>{
    switch (action.type) {
        case BAR_GRAPH:
            return Object.assign({}, state, {
               d3_data:action.d3_data
            });
        default:
            return state
    }
}