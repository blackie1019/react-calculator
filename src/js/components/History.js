import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { nameOfAnimation as Menu } from 'react-burger-menu'

class History extends Component {

	constructor(props) {
		super(props);
		this.state = {
            historyStack:props.historyStack,
            pageWrapId:props.pageWrapId
        };
        this.convertOperatingLog = this.convertOperatingLog.bind(this);
	}

	componentWillReceiveProps(nextProps){
        this.setState({
            historyStack: nextProps.historyStack
        });
	}

    convertOperatingLog(elementState){
        return `Display : ${elementState.displayValue} = ${elementState.previousValue}${elementState.operationType}${elementState.inputValue}`;
    }

	render() {
                    // <nameOfAnimation pageWrapId={this.state.pageWrapId} >
		return (
            <nameOfAnimation>
                <div id="history-logs" className="row">
                    <div className="col s12">
                        <ul className="collection">
                            {
                                this.state.historyStack.map((element)=>{
                                    return (
                                        <li className="collection-item" key={element.seq}>{this.convertOperatingLog(element.state)}</li>
                                    );
                                })
                             }
                        </ul>
                    </div>
                </div>
            </nameOfAnimation>
		);
	}
}

History.propTypes ={
	historyStack:PropTypes.array.isRequired,
    pageWrapId:PropTypes.string.isRequired
}

export default History;