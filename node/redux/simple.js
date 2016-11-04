'use strict';

const Redux = require('redux');

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

const store = Redux.createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: 'ADD',
  text: 'hello'
});