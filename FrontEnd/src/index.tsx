import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Store } from 'models/Store';

const store = Store.create({});

(window as any ).store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();