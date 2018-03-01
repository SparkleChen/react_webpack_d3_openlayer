import React from 'react'

export default class PopUpTips extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
    }
    componentDidMount(){

    }
    render(){
        let style = {
            left:this.props.x,
            top:this.props.y
        }
        return(
            <div id="popUp" style={style}>
                {this.props.title}
            </div>
        );
    }
}