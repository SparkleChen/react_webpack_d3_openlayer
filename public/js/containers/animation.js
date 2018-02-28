import React, {Component} from 'react'
import {connect} from 'react-redux'
import Front from '../components/front'
import Back from '../components/back'

import {windowsResizeStyle} from '../actions/buttonAction'

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

    onWindowResize(e) {
        this.props.dispatch(windowsResizeStyle());
    }

    render() {
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
        return (
            <div className="flip-container" style={style}>
                <div className="flipper">
                    <div className="front">
                        <Front dispatch={this.props.dispatch} bar={this.props.BarGraphReducer.d3_data}/>
                    </div>
                    <div className="back">
                        <Back dispatch={this.props.dispatch} states={this.props.ButtonReducer.VectorLayerIs} />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Animation);
