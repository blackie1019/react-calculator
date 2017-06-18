import React, {Component} from 'react';

import Summary from '../components/Summary';
import History from '../components/History';
import cssSetting from '../constants/cssSetting.js';
import operationType from '../constants/operationType.js';

import math from 'mathjs';

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = calculatorInitState;
		this.state.historyStack = [];
		this.state.removeStack = [];
		this.clean = this.clean.bind(this);
		this.calculating = this.calculating.bind(this);
		this.redo = this.redo.bind(this);
		this.undo = this.undo.bind(this);
		this.updateDisplayValue = this.updateDisplayValue.bind(this);
	}
	
	clean(){
		var updateState = calculatorInitState;

		if(this.state.isAllClean){
			updateState.totalValue = 0;
			updateState.historyStack = [];
			updateState.removeStack = [];
		}
		
		updateState.isAllClean = true;

		this.setState(updateState);
	}

	calculating(type){
		
		var updateState = this.state;
		if(type === operationType.sum){
			if(updateState.operationType===null){
				return;
			}
			var formula = updateState.previousValue+updateState.operationType+updateState.inputValue;
			var tempResult = math.format(math.eval(formula),{precision: 10}); 
			updateState.totalValue = tempResult;

			// if(updateState.previousValue !== null){
				// var formula = updateState.previousValue+updateState.operationType+updateState.inputValue;
				// var tempResult = math.format(math.eval(formula),{precision: 10});
				// updateState.totalValue = updateState.totalValue === 0 ? 
				// 	tempResult:
				// 	math.format(math.eval(updateState.totalValue+updateState.operationType+tempResult),{precision: 10});

			// }else if(updateState.previousValue === null){
			// 	var formula = updateState.inputValue+updateState.operationType+updateState.totalValue;
			// 	updateState.totalValue = math.format(math.eval(formula),{precision: 10}); 
			// }
			updateState.displayValue = updateState.totalValue.toString();
			updateState.historyStack.push( this.inputNewHistoryItem(updateState.historyStack.length+1,this.inputStateValue({},updateState)));
			updateState.previousValue = this.state.totalValue;
			updateState.isLastIsSum = true;
		}else{
			updateState.operationType = type ;
			updateState.previousValue = this.state.totalValue === 0 ? this.state.inputValue : this.state.totalValue;
			updateState.inputValue = null;
			updateState.isLastIsSum = false;
		}

		this.setState(updateState);
	}

	undo(){
		if(this.state.historyStack.length>0){
			this.setState(this.historyUpdate(this.state,true));
		}	
	}

	redo(){
		if(this.state.removeStack.length>0){
			this.setState(this.historyUpdate(this.state,false));
		}
	}

	historyUpdate(currentState,isUndo){
		var updateState = currentState;
		var popItem = isUndo ? 
			updateState.historyStack.pop():
			updateState.removeStack.pop();
		var newSeq = isUndo ?
			updateState.removeStack.length+1:
			updateState.historyStack.length+1;

		if(isUndo){
			updateState.removeStack.push(this.inputNewHistoryItem(newSeq,popItem.state));
		}else{
			updateState.historyStack.push(this.inputNewHistoryItem(newSeq,popItem.state));
		}

		return this.inputStateValue(updateState,popItem.state);
	}

	inputStateValue(currentState,updateState){
		currentState.displayValue = updateState.displayValue;					
		currentState.totalValue = updateState.totalValue;
		currentState.inputValue = updateState.inputValue;
		currentState.previousValue = updateState.previousValue;
		currentState.operationType = updateState.operationType;
		currentState.isAllClean = updateState.isAllClean;

		return currentState;
	}

	inputNewHistoryItem(seq,state){
		return {
			seq : seq,
			state: state
		}
	}

	updateDisplayValue(value){

		if(value === operationType.point && this.state.displayValue.includes(operationType.point, value.length-1)){
			return;
		}

		var result = (this.state.inputValue === null && value !== operationType.point)||this.state.isLastIsSum?
			value:
			this.state.displayValue+value;

		this.setState({
			inputValue: parseFloat(result),
			displayValue : result,
			isAllClean : this.state.previousValue !== null ? false : true,
			isLastIsSum : false
		});
	}

	render() {
		return (
            <div id="calculator" className="row">
			<main id="page-wrap">
				<Summary displayValue={this.state.displayValue}/>
				{
					inputButtons.map((element)=>{
						if(element.cssSetting === cssSetting.calculatorBtn){
							return (
								<div key={element.value} className={element.layout}>
									<button className={element.cssSetting} onClick={this.updateDisplayValue.bind(null,element.value)}>{element.value}</button>
								</div>
							);
						}else{
							switch(element.value){
								case operationType.clean:
									return (
										<div key={element.value} className={element.layout}>
											<button className={element.cssSetting} onClick={this.clean} >{this.state.isAllClean?"AC":"C"}</button>
										</div>
									);
								case operationType.undo:
									return (
										<div key={element.value} className={element.layout}>
											<button className={element.cssSetting} onClick={this.undo}>{element.value}</button>
										</div>
									);
								case operationType.redo:
									return (
										<div key={element.value} className={element.layout}>
											<button className={element.cssSetting} onClick={this.redo}>{element.value}</button>
										</div>
									);
								default:
									return (
										<div key={element.value} className={element.layout}>
											<button className={element.value === this.state.operationType?cssSetting.calculatorFocusFunctionBtn:element.cssSetting} onClick={this.calculating.bind(null,element.value)}>{element.value}</button>
										</div>
									);
							}
						}
					})
				}
			</main>
			<History historyStack={this.state.historyStack} pageWrapId="page-wrap" />
			</div>
		);
	}
};

const calculatorInitState = {
	displayValue:"0",
	totalValue: 0,
	inputValue: null,
	previousValue:null,
	operationType:null,
	isAllClean:true,
	isLastIsSum:true	
};

const inputButtons = [
	{
		layout:"col s3", cssSetting: cssSetting.calculatorSubBtn, value: operationType.clean
	},	
	{
		layout:"col s3", cssSetting: cssSetting.calculatorSubBtn, value: operationType.undo
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorSubBtn, value: operationType.redo
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorFunctionBtn, value: operationType.divide
	},	
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"7"
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"8"
	},	
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"9"
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorFunctionBtn, value: operationType.multi
	},	
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"4"
	},
		{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"5"
	},	
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"6"
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorFunctionBtn, value: operationType.minus
	},	
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"1"
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"2"
	},	
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:"3"
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorFunctionBtn, value: operationType.add
	},	
	{
		layout:"col s6", cssSetting: cssSetting.calculatorBtn, value:"0"
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorBtn, value:operationType.point
	},
	{
		layout:"col s3", cssSetting: cssSetting.calculatorFunctionBtn, value:operationType.sum
	},
];

export default Calculator;