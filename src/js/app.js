import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Calculator from './containers/Calculator';

const render = Component => {
	ReactDOM.render(
    <AppContainer>
    <Component/>
  </AppContainer>, document.getElementById('app'));
};
render(Calculator);
if (module.hot) {
	module.hot.accept('./containers/Calculator', () => {
		render(Calculator);
	});
}