import {WINDOWS_UPDATE,TOGGLE_LAYER} from '../actions/actionsType';


export default (state ={VectorLayerIs:false,height: window.innerHeight,width:window.innerWidth},action) =>{
    switch (action.type) {
        case WINDOWS_UPDATE:
            return Object.assign({}, state, {
                height: window.innerHeight,
                width:window.innerWidth
                });
        case TOGGLE_LAYER:
            return Object.assign({}, state, {
                VectorLayerIs: !action.VectorLayerIs
            });
        default:
            return state
    }
}