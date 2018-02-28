import React from 'react'
import Button from './button'

require('ol/ol.css')
import ol_Map from 'ol/map'
import ol_layer_Tile from 'ol/layer/tile'
import ol_HeatMap from 'ol/layer/heatmap'
import ol_Group from 'ol/layer/group'
import ol_Stamen from 'ol/source/stamen'
import ol_SourceVector from 'ol/source/vector'
import ol_LayerVector from 'ol/layer/vector'
import ol_TileJSON from 'ol/source/tilejson'
import ol_OSM from 'ol/source/osm'
import ol_View from 'ol/view'
import ol_KML from 'ol/format/kml'
import ol_Interaction_Select from 'ol/interaction/select'
import ol_Interaction from 'ol/interaction'
import ol_Cluster from 'ol/source/cluster'
import ol_Proj from 'ol/proj/projection'
import ol_Feature from 'ol/feature'
import ol_GeoPoint from 'ol/geom/point'
import ol_GeoCircl from 'ol/geom/circle'
import ol_Style from 'ol/style/style'
import ol_Circle from 'ol/style/circle'
import ol_Text from 'ol/style/text'
import ol_Fill from 'ol/style/fill'
import ol_Stroke from 'ol/style/stroke'
import ol_RegularShape from 'ol/style/regularshape'
import ol_VectorTile from 'ol/vectortile'
import ol_Control from 'ol/control'
import ol_GeoJSON from 'ol/format/geojson'
import ol_Loadingstrategy from 'ol/loadingstrategy'

export default class Back extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
    }

    styleFunction(feature){
        const image = new ol_Circle({
            radius: 5,
            fill: null,
            stroke: new ol_Stroke({color: 'red', width: 1})
        });
        const styles = {
            'Point': new ol_Style({
                image: image
            })
        };
        return styles[feature.getGeometry().getType()];
    }

    componentDidMount() {
        let vectorSource = new ol_SourceVector({
            format: new ol_GeoJSON(),
            loader:function(extent) {
                const url = '../../json/data.json';
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                let onError = function() {
                    vectorSource.removeLoadedExtent(extent);
                }
                xhr.onerror = onError;
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        vectorSource.addFeatures(
                            vectorSource.getFormat().readFeatures(xhr.responseText));
                    } else {
                        onError();
                    }
                }
                xhr.send();
            },
            strategy: ol_Loadingstrategy.bbox
        });
        let vectorLayer = new ol_LayerVector({
            source: vectorSource,
            style: this.styleFunction
        });

        let vectorHeatMap= new ol_HeatMap({
            source:vectorSource ,
            blur: parseInt(1, 10),
            radius: parseInt(2, 10)
        });
        vectorHeatMap.getSource().on('addfeature', function(event) {
            event.feature.getGeometry().set('weight', 3);
        });

       let map = new ol_Map({
            layers: [
                new ol_layer_Tile({
                    source: new ol_OSM()
                }),
                vectorLayer
            ],
            target: 'map',
            controls: ol_Control.defaults({
                attributionOptions: {
                    collapsible: false
                }
            }),
            view: new ol_View({
                center: [0, 0],
                zoom: 2
            })
        });
        map.addLayer(vectorHeatMap);
    }
    render() {

        return (
            <div id="map" className="map">
                <Button dispatch={this.props.dispatch} states={this.props.states}/>
            </div>
        );
    }
}