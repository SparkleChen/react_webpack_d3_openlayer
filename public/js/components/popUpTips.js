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
        //弹框位置样式
        let style = {
            left:this.props.properties.x + 25,
            top:this.props.properties.y - 80
        }
        return(
            <div>
                <div id="popUp" style={style}>
                    &nbsp;地点：{this.props.properties.title}<br/>
                    &nbsp;月均收入：{this.props.properties.income}
                </div>
            </div>
        );
    }
}