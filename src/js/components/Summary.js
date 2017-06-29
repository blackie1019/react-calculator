import React, {Component} from 'react';
import PropTypes from 'prop-types';
import accounting from '../third-party/accounting.min.js'

function convertDisplay(input){
	let index = input.indexOf(".");
	let diff = input.length-index-1;

	if(index<=0 || (input === "0"||diff===0)){
		return input;
	}

	return accounting.formatNumber(input, diff>=1? diff:0);
}

class Summary extends Component {

	constructor(props) {
		super(props);
		this.state = {displayValue: props.displayValue};
	}

	componentWillReceiveProps(nextProps){
		this.setState({displayValue: nextProps.displayValue});
	}

	render() {
		return (
			<div className="col s12 card-panel grey darken-4">
				<span className="blue-grey-text text-lighten-5 sum-span">{convertDisplay(this.state.displayValue)}</span>
			</div>
		);
	}
}

Summary.propTypes ={
	displayValue:PropTypes.string.isRequired
}

export default Summary;