import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {showTipsIs} from '../actions/popUpTipsAction'
import {getBarGraph} from '../actions/barGraphAction'
import {windowsResizeStyle,heatMap} from '../actions/buttonAction'
import Front from '../components/front'
import Back from '../components/back'

class Animation extends Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
        this.onWindowResize = this.onWindowResize.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }

    /**
     * 窗口事件
     */
    onWindowResize() {
       this.props.dispatch.windowsResizeStyle();
    }
    render() {
        //居中设置
        let height,width;
        if(this.props.ButtonReducer.height>480){
            height = (this.props.ButtonReducer.height-480)/2;
        }
        else{
            height=0;
        }
        if(this.props.ButtonReducer.width>900){
            width = (this.props.ButtonReducer.width-900)/2;
        }
        else{
            width=0;
        }
        let style = {
            top:height,
            left:width
        }
        let object = {
            circleProperties:this.props.PopUpTipsReducer.circleProperties
        }
        return (
            <div className="flip-container" style={style}>
                <div className="flipper">
                    <div className="front">
                        <label style={{"position":"absolute","left":"40%"}}>2016省会城市月平均收入</label>
                        <Front dispatch={this.props.dispatch} bar={this.props.BarGraphReducer.d3_data}/>
                    </div>
                    <div className="back">
                        <Back action={this.props.actions} heatMapState={this.props.ButtonReducer.heatMapState} circle={object} />
                    </div>
                </div>
            </div>
        )
    }
}

/**
 *绑定state
 */
function mapStateToProps(state) {
    return state;
}
/**
 *绑定dispatch
 */
function mapDispatchToProps(dispatch){
 return {
        actions:bindActionCreators({showTipsIs,heatMap},dispatch),
        dispatch:bindActionCreators({getBarGraph,windowsResizeStyle},dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Animation);
