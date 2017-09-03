import React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'regenerator-runtime/runtime';

import Root from './Root';

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);

const render = Component => ReactDOM.render(
    <AppContainer>
        <Component/>
    </AppContainer>,
    document.getElementById('root')
);

render(Root);

if (module.hot) {
    module.hot.accept('./Root', () => {
        render(Root);
    })
}