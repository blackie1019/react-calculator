import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Home from './containers/Home';
injectTapEventPlugin();
const render = Component => {
	ReactDOM.render(
    <AppContainer>
    <Component/>
  </AppContainer>, document.getElementById('app'));
};
render(Home);
if (module.hot) {
	module.hot.accept('./containers/Home', () => {
		render(Home);
	});
}