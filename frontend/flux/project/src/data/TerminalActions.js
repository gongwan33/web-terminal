/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import TerminalActionTypes from './TerminalActionTypes';
import TerminalDispatcher from './TerminalDispatcher';
import Config from '../Config';

function scrollToBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

const Actions = {
  prompt: ">",
  theme: "homebrew",
  historyCmd: [],
  histroyCmdCursor: 0,
  terminalOnload() {
	  let initInfoPromise = fetch(Config.siteurl + '/backend/init-info', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		});
	  
	  initInfoPromise.then(function (response){
		  if (response.status !== 200) {
		          console.log('Fetch error' + response.status);
		          return;
		      }

		      // Examine the text in the response
		      response.json().then(function(data) {
		          //console.log(data);
		          Actions.prompt = data.prompt;
		          Actions.theme = data.theme;
		          
		          TerminalDispatcher.dispatch({
                      type: TerminalActionTypes.TM_ONLOAD,
                      prompt: data.prompt,
                      theme: data.theme,
                  });
		          
		          TerminalDispatcher.dispatch({
                      type: TerminalActionTypes.TM_ADDLINE,
                      line: data.line,
                  });
		        
		      }); 
	  });
  },
  
  TerminalOnKeyDown(ev) { 
	  ev.stopPropagation();
	  
	  scrollToBottom();
	  
	  if(ev.key == "Enter") {
		  if(ev.preventDefault) ev.preventDefault();
		  
		  TerminalDispatcher.dispatch({
              type: TerminalActionTypes.TM_ADDLINE,
              line: Actions.prompt + '&nbsp;' + ev.target.value,
          });
		  
		  if(ev.target.value.length > 0) {
		      Actions.historyCmd.push(ev.target.value);
		  }
		  
		  ev.target.value = "";
		  
		  //Drop too old cmds.
		  if(Actions.historyCmd.length > Config.CmdHistoryStack) {
			  Actions.historyCmd.shift();
		  }
		  
		  Actions.historyCmdCursor = Actions.historyCmd.length;
		  
	  } else if(ev.key == "ArrowUp") {
		  if(ev.preventDefault) ev.preventDefault();
		  
		  if(Actions.historyCmd.length <= 0 ) {			  
			  return false;
		  }
		  ev.target.value = Actions.historyCmd[Actions.historyCmdCursor - 1];
		  if(Actions.historyCmdCursor > 1) {
		      Actions.historyCmdCursor -= 1; 
		  } 
		  
	  } else if(ev.key == "ArrowDown") {
		  if(ev.preventDefault) ev.preventDefault();

		  if(Actions.historyCmd.length <= 0 ) {			  
			  return false;
		  }
		  
		  if(Actions.historyCmdCursor < Actions.historyCmd.length) {
		      Actions.historyCmdCursor += 1; 
		      ev.target.value = Actions.historyCmd[Actions.historyCmdCursor - 1];
		  } else {
			  ev.target.value = "";
		  }

	  } 
		  
	  let inputShow = ev.target.parentElement.getElementsByClassName('tm-cmdl-input-show')[0];
	  inputShow.innerHTML = ev.target.value;
	  inputShow.innerText = ev.target.value;

  },
  
  TerminalOnKeyUp(ev) {
	  ev.stopPropagation();
	  
	  scrollToBottom();
	  
	  if(ev.key == 'Enter') {
		  if(ev.preventDefault) ev.preventDefault();
		  ev.target.value = "";
	  }
	  
	  let caretPosition = ev.target.selectionStart;
	  let inputShow = ev.target.parentElement.getElementsByClassName('tm-cmdl-input-show')[0];
	  inputShow.innerHTML = ev.target.value;
	  inputShow.innerText = ev.target.value;
	  
	  let caretSpan = document.createElement("span");
	  caretSpan.className = "tm-cmdl-input-caret";
	  
	  let inputShowText = inputShow.childNodes[0];
	  
	  if(typeof inputShowText != 'undefined') {
		  if(inputShowText.length < caretPosition) {
			  caretPosition = inputShowText.length;
		  }
	      inputShow.insertBefore(caretSpan, inputShowText.splitText(caretPosition));
	  } else {
		  inputShow.appendChild(caretSpan);
	  }

  },
  
};

export default Actions;
