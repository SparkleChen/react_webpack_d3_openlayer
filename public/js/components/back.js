import React from 'react'
import Button from './button'
import PopUpTips from './popUpTips'

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
import ol_Events from 'ol/events/condition'
import ol_Loadingstrategy from 'ol/loadingstrategy'
import {showTipsIs} from "../actions/popUpTipsAction";

export default class Back extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
        this.state = {
            vectorHeatMap:null,
            map:null,
            circle:{}
        };
        this.mouseMoveEvt = this.mouseMoveEvt.bind(this);
    }
    mouseMoveEvt(e){
        //获取圆形要素
            if(e.selected.length>0){
                //鼠标位置
                this.state.circle.x = e.mapBrowserEvent.originalEvent.layerX;
                this.state.circle.y = e.mapBrowserEvent.originalEvent.layerY;
                //获取要素属性
                this.state.circle.title = e.selected[0].getProperties().name;
                this.state.circle.isShow = true;
                this.props.action.showTipsIs(this.state.circle)
            }else{
                this.state.circle.isShow = false;
                this.props.action.showTipsIs(this.state.circle);
            }
    }

    styleFunction(feature){
        const image = new ol_Circle({
            radius: 10,
            fill: new ol_Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            }),
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
        //数据源
        let vectorSource = new ol_SourceVector({
            format: new ol_GeoJSON(),
            loader: function (extent, resolution, projection) {
                const proj = projection.getCode();
                const url = '../../json/china.json';
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                let onError = function () {
                    vectorSource.removeLoadedExtent(extent);
                }
                xhr.onerror = onError;
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        vectorSource.addFeatures(
                            vectorSource.getFormat().readFeatures(xhr.responseText));
                    } else {
                        onError();
                    }
                }
                xhr.send();
            }
        });
        //要素图层
        let vectorLayer = new ol_LayerVector({
            source: vectorSource,
            style: this.styleFunction
        });
        //热图图层
        let vectorHeatMap= new ol_HeatMap({
            source:vectorSource ,
            blur: parseInt(1, 10),
            radius: parseInt(2, 10)
        });
        //添加热图要素
        vectorHeatMap.getSource().on('addfeature', function(event) {
          /*  console.log(event)
            console.log(event.feature.getProperties())*/
            event.feature.getGeometry().set('weight', 3);
        });
        //鼠标交互
        let selectPointerMove = new ol_Interaction_Select({
            condition: ol_Events.pointerMove,
            style: new ol_Style({
                image: new ol_Circle({
                    radius: 30,
                    fill: new ol_Fill({
                        color: 'rgba(0, 0, 255, 0.1)'
                    }),
                    stroke: new ol_Stroke({color: 'red', width: 1})
                })
            })
        });
        const me = this;
        //选中vector要素事件
        selectPointerMove.on('select', function(e) {
            me.mouseMoveEvt(e);
        });
        //底图
        let map = new ol_Map({
            layers: [new ol_layer_Tile({
                source: new ol_Stamen({
                    layer: 'toner'
                })
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
                center: [88.7695, 31.6846],
                projection: new ol_Proj({
                    code: 'EPSG:4326',
                    units: 'degrees'
                }),
                zoom: 6
            })
        });
        //图层添加交互
        map.addInteraction(selectPointerMove);
        this.state.vectorHeatMap = vectorHeatMap;
        this.state.map = map;
    }
    render() {
        let {map,vectorHeatMap} = this.state;
        if(this.props.states){
            if(this.state.map){
                map.addLayer(vectorHeatMap);
            }
        }else{
            if(this.state.map){
                map.removeLayer(vectorHeatMap);
            }
        }
        return (
            <div id="map" className="map">
                <Button dispatch={this.props.action.toggleLayer} states={this.props.states}/>
                {(this.props.circle.circleProperties && this.props.circle.circleProperties.isShow)?<PopUpTips x={this.props.circle.circleProperties.x} y={this.props.circle.circleProperties.y} title={this.props.circle.circleProperties.title}/>:""}
            </div>
        );
    }
}