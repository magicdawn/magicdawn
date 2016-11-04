'use strict';

const Redux = require('redux');
const assert = require('assert');

class ReduxApp {
  constructor(reducer) {
    this.store = Redux.createStore(reducer);
    this.middlewares = [];
  }

  use(fn) {
    assert(fn);
    this.middlewares.push(fn);
  }

  dispatch(action) {
    let index = -1;
    const handle = i => {
      assert(i > index, 'next can not be called more than once');
      const fn = this.middlewares[i] || this.store.dispatch;
      index = i;
      return fn(action, store, function next() {
        return handle(i + 1);
      });
    };
    handle(0);
  }

  getState() {
    return this.store.getState();
  }

  subscribe(...args) {
    return this.store.subscribe(...args);
  }
}

const initialState = {
  todos: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return Object.assign({}, {
        todos: state.todos.concat([
          action.text
        ])
      });
    default:
      return state;
  }
};

const store = new ReduxApp(reducer);
store.use((action, store, next) => {
  console.log('dispatching type = %s', action.type);
  next();
  console.log('next state: %j', store.getState());
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: 'ADD',
  text: 'hello'
});