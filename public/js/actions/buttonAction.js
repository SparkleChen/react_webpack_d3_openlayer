import {TOGGLE_LAYER,WINDOWS_UPDATE} from './actionsType';

export const toggleLayer = bool => ({
    type: TOGGLE_LAYER,
    VectorLayerIs: bool
});
export const windowsResizeStyle = () => ({
    type: WINDOWS_UPDATE
});
