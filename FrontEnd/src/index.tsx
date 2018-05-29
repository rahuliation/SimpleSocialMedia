import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Store } from 'models/Store';
import * as io from 'socket.io-client';
import { Apis } from 'Apis';

export const socket = io(Apis.BASE_URL, {
  transports: ['websocket']
});

socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});

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