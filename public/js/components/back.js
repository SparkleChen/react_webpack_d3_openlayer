import React from 'react'
import Button from './button'
import PopUpTips from './popUpTips'

require('ol/ol.css')
import ol_Map from 'ol/map'
import ol_layer_Tile from 'ol/layer/tile'
import ol_HeatMap from 'ol/layer/heatmap'
import ol_OSM from 'ol/source/osm'
import ol_SourceVector from 'ol/source/vector'
import ol_LayerVector from 'ol/layer/vector'
import ol_View from 'ol/view'
import ol_Interaction_Select from 'ol/interaction/select'
import ol_Proj from 'ol/proj/projection'
import ol_Style from 'ol/style/style'
import ol_Circle from 'ol/style/circle'
import ol_Fill from 'ol/style/fill'
import ol_Stroke from 'ol/style/stroke'
import ol_Control from 'ol/control'
import ol_GeoJSON from 'ol/format/geojson'
import ol_Events from 'ol/events/condition'

export default class Back extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
        this.state = {
            heatMap:null,
            map:null,
            circle:{}
        };
        //绑定this
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
            this.state.circle.income = e.selected[0].getProperties().income;
            this.state.circle.isShow = true;
            //热力图显示时不加载弹出框
            this.props.heatMapState?"": this.props.action.showTipsIs(this.state.circle);

        }else{
            this.state.circle.isShow = false;
            this.props.heatMapState?"":this.props.action.showTipsIs(this.state.circle);
        }
    }

    styleFunction(feature){
        const image = new ol_Circle({
            radius: feature.getProperties().income/3000 * 5 ,
            fill: new ol_Fill({
                color: 'rgba(220, 53, 69, 0.7)'
            }),
            stroke: new ol_Stroke({color: 'red', width: 0.1})
        });
        const styles = {
            'Point': new ol_Style({
                image: image
            })
        };
        //返回点类型要素
        return styles[feature.getGeometry().getType()];
    }

    componentDidMount() {
        //数据源
        let vectorSource = new ol_SourceVector({
            format: new ol_GeoJSON(),
            loader: function (extent, resolution, projection) {
                const proj = projection.getCode();
                const url = '../../json/income.json';
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
            blur: parseInt(20, 10),
            radius: parseInt(15, 10)
        });
        //设置热图要素weight
        vectorHeatMap.getSource().on('addfeature', function(event) {
            event.feature.getGeometry().set('weight', event.feature.getProperties().income/9942);
        });
        //鼠标交互
        let selectPointerMove = new ol_Interaction_Select({
            condition: ol_Events.pointerMove,
            style: new ol_Style({
                image: new ol_Circle({
                    radius: 20,
                    fill: new ol_Fill({
                        color: 'rgba(0, 123, 255, 0.7)'
                    }),
                    stroke: new ol_Stroke({color: 'white', width: 2})
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
                source:new ol_OSM()
            }),
                vectorLayer
            ],
            target: 'map',
            controls: ol_Control.defaults({
                attributionOptions: {
                    collapsible: false
                } }),
            view: new ol_View({
                center: [107.7539,30.1904],
                projection: new ol_Proj({
                    code: 'EPSG:4326',
                    units: 'degrees'
                }),zoom: 5 })
        });
        //图层添加交互
        map.addInteraction(selectPointerMove);
        this.state.heatMap = vectorHeatMap;
        this.state.map = map;
    }
    render() {
        let {map, heatMap} = this.state;
        this.state.map ? (this.props.heatMapState ? map.addLayer(heatMap) : map.removeLayer(heatMap)) : "";
        let properties = this.props.circle.circleProperties?{ ...this.props.circle.circleProperties }:"";
        return (
            <div id="map" className="map">
                {<Button dispatch={this.props.action} heatMapState={this.props.heatMapState}/>}
                {(this.props.circle.circleProperties && this.props.circle.circleProperties.isShow)&&<PopUpTips properties={properties}/>}
            </div>
        );
    }
}