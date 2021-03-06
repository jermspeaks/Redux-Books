import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import BookApp from './BookApp';
import * as reducers from '../reducers';
import thunk from 'redux-thunk';
import styles from './App.css';
import createLogger from 'redux-logger';

const logger = createLogger();

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
}

// Store:
// Use it like you would use createStore()
const finalCreateStore = compose(
  // Enables your middleware:
  applyMiddleware(logger, crashReporter, thunk),
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

// Reducers:
const reducer = combineReducers(reducers);
let store = finalCreateStore(reducer);

export default class App extends Component {
  render() {
    // Development Mode
    require('../utils/createDevToolsWindow')(store);

    return (
      <div>
        <Provider store={store}>
          <BookApp />
        </Provider>
      </div>
    );
  }
}
