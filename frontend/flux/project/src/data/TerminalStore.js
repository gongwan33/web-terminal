/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Terminal from './TerminalState';
import TerminalActionTypes from './TerminalActionTypes';
import TerminalDispatcher from './TerminalDispatcher';

let _id = 0

class TerminalStore extends ReduceStore {
  constructor() {
      super(TerminalDispatcher);
  }

  getInitialState() {
	  let state = Immutable.Map({
		  'lines': Immutable.OrderedMap(),
	  });
      return state;
  }
  
  static getLineId() {
	  _id += 1;
	  return _id - 1;
  }

  reduce(state, action) {
    switch (action.type) {
      case TerminalActionTypes.TM_ONLOAD:
    	  if(typeof action.theme == 'undefined') {
    		  action.theme = 'homebrew';
    	  }
    	  
    	  if(typeof action.prompt == 'undefined') {
    		  action.prompt = '>';
    	  }
    	  
    	  state = state.set('theme', action.theme);
    	  state = state.set('prompt', action.prompt);
          
          return state;

      case TerminalActionTypes.TM_ADDLINE:
    	  state = state.setIn(['lines', TerminalStore.getLineId()],  new Terminal({
        	  id: TerminalStore.getLineId(),
        	  line: action.line,
          }));
    	  return state;
      default:
        return state;
    }
  }
}

export default new TerminalStore();
