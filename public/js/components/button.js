import React from 'react'
import {toggleLayer} from '../actions/buttonAction'

export default class Button extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.dispatch(toggleLayer(this.props.states));
    }
    componentDidMount(){

    }
    render(){
        return(
            <button type = 'button' className="btn btn-outline-info" id="toggleButton" onClick={this.handleClick}></button>
        );
    }
}