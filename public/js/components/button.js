import React from 'react'

export default class Button extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
        //绑定this
        this.heatMapHandleClick = this.heatMapHandleClick.bind(this);
    }

    /**
     * 切换热图图层
     */
    heatMapHandleClick() {
        this.props.dispatch.heatMap(this.props.heatMapState);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="toggleDiv">
                <button type="button" className="btn btn-outline-secondary" onClick={this.heatMapHandleClick}>热图</button>
            </div>
        );
    }
}