/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import AppContainer from './containers/AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';
import TerminalActions from './data/TerminalActions';

let reactTargetId = 'terminal';

ReactDOM.render(<AppContainer />, document.getElementById(reactTargetId));

TerminalActions.terminalOnload();

//Focus Lock
function lockFocusToInput(ev) {
	let input = document.getElementById(reactTargetId).getElementsByClassName('tm-cmdl-input')[0];
	input.focus();
}

window.onload = lockFocusToInput;
document.onkeydown = lockFocusToInput;