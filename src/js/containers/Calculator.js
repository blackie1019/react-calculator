import React, {Component} from 'react';
import Summary from '../components/Summary';
import math from 'mathjs';

const cssSetting ={
	calculatorBtn : "waves-effect waves-light btn btn-large",
	calculatorSubBtn : "waves-effect waves-light btn btn-large teal darken-3",
	calculatorFunctionBtn : "waves-effect waves-light btn btn-large pink darken-1",
	calculatorFocusFunctionBtn : "waves-effect waves-light btn btn-large pink darken-3"
};

const operationType = {
	add : "+",
	minus : "-",
	multi : "*",
	divide : "/",
	sum : "=",
	point : ".",
	clean : "clean",
	undo: "←",
	redo: "→"
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

const calculatorInitState = {
	displayValue:"0",
	totalValue: 0,
	inputValue: null,
	previousValue:null,
	operationType:null,
	isAllClean:true	
};

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = calculatorInitState;
		this.clean = this.clean.bind(this);
		this.calculating = this.calculating.bind(this);
		this.updateDisplayValue = this.updateDisplayValue.bind(this);
	}
	
	clean(){
		var updateState = calculatorInitState;

		if(this.state.isAllClean){
			updateState.totalValue = 0;
		}
		updateState.isAllClean = true;

		this.setState(updateState);
	}

	calculating(type){
		
		var updateState = this.state;
		if(type === operationType.sum){
			if(updateState.previousValue!==null){
				var formula = updateState.previousValue+updateState.operationType+updateState.inputValue;
				console.log(formula);
				var tempResult = math.format(math.eval(formula),{precision: 10});
				updateState.totalValue = updateState.totalValue===0 ? 
					tempResult:
					math.format(math.eval(updateState.totalValue+updateState.operationType+tempResult),{precision: 10});
			}else if(updateState.previousValue ===null){
				var formula = updateState.inputValue+updateState.operationType+updateState.totalValue;
				console.log(formula);
				updateState.totalValue =math.format(math.eval(formula),{precision: 10}); 
			}
			updateState.previousValue = null;
			updateState.displayValue = updateState.totalValue.toString();
		}else{
			updateState.operationType = type ;
			updateState.previousValue = this.state.inputValue;
			updateState.inputValue = null;
		}

		this.setState(updateState);
	}

	updateDisplayValue(value){

		if(value===operationType.point && this.state.displayValue.includes(operationType.point, value.length-1)){
			return;
		}

		var result = this.state.inputValue===null&&value!==operationType.point?
			value:
			this.state.displayValue+value;

		this.setState({
			inputValue: parseFloat(result),
			displayValue : result,
			isAllClean : this.state.totalValue !=0 ? true : false
		});
	}

	render() {
		return (
            <div id="calculator" className="row">
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
										<button className={element.cssSetting} >{element.value}</button>
									</div>
								);
							case operationType.redo:
								return (
									<div key={element.value} className={element.layout}>
										<button className={element.cssSetting} >{element.value}</button>
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
		</div>
		);
	}
};

export default Calculator;