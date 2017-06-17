import React, {Component} from 'react';

const cssSetting ={
	calculatorBtn : "waves-effect waves-light btn btn-large",
}

class App extends Component {
	render() {
		return (
            <div id="calculator" className="row">
			<div className="col s12 card-panel grey darken-4">
				<span className="blue-grey-text text-lighten-5 sum-span">0</span>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>C</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>←</a>
			</div>
			{/*<div className="col s3">
				<a className={cssSetting.calculatorBtn}>Redo</a>
			</div>*/}
			<div className="col s3 offset-s3">
				<a className={cssSetting.calculatorBtn}>÷</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>7</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>8</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>9</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>*</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>4</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>5</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>6</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>-</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>1</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>2</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>3</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>+</a>
			</div>
			<div className="col s6">
				<a className={cssSetting.calculatorBtn}>0</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>.</a>
			</div>
			<div className="col s3">
				<a className={cssSetting.calculatorBtn}>=</a>
			</div>
		</div>
		);
	}
}
export default App;