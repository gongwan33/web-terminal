/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import TerminalActions from '../data/TerminalActions';
import TerminalStore from '../data/TerminalStore';

function getStores() {
    return [
      TerminalStore,
    ];
}

function getState() {
    return {
      terminal: TerminalStore.getState(),
      onKeyDown: TerminalActions.TerminalOnKeyDown,
      onKeyUp: TerminalActions.TerminalOnKeyUp,
      onTextAreaChange: TerminalActions.TerminalOnTextAreaChange,
    };
}

export default Container.createFunctional(AppView, getStores, getState);
