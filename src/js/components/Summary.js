import React, {Component} from 'react';
import PropTypes from 'prop-types';
import accounting from '../third-party/accounting.min.js'

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
				<span className="blue-grey-text text-lighten-5 sum-span">{accounting.formatNumber(this.state.displayValue)}</span>
			</div>
		);
	}
}

Summary.propTypes ={
	displayValue:PropTypes.string.isRequired
}

export default Summary;