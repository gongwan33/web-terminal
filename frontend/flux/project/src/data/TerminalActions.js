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

function cmdProcessingStatus(el, finished) {
	let cmdl = el.parentElement;
	let processInfo = cmdl.parentElement.getElementsByClassName('tm-process-info')[0];
	
	if(!finished) {
		cmdl.style.display = 'none';
		processInfo.style.display = "block";
		processInfo.innerHTML = "Processing...";
		processInfo.innerText = "Processing...";
	} else {
		cmdl.style.display = 'block';
		processInfo.style.display = "none";
	}
}

const Actions = {
  prompt: ">",
  theme: "homebrew",
  path: "/",
  historyCmd: [],
  histroyCmdCursor: 0,
  addLines(lines) {
      TerminalDispatcher.dispatch({
          type: TerminalActionTypes.TM_ADDLINE,
          lines: lines,
      });
  },
  addErrLine(str = '') {
	  Actions.addLines([
		  {content: str, style: {color: 'red'}},
	  ])
  },
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
	          Actions.prompt = data.prompt + ' ' + data.path + ' >';
	          Actions.theme = data.theme;
	          Actions.path = data.path;
	          
	          TerminalDispatcher.dispatch({
                  type: TerminalActionTypes.TM_ONLOAD,
                  prompt: Actions.prompt,
                  theme: Actions.theme,
              });
	          
	          Actions.addLines(data.lines);
		  }).catch(function(err) {
			  Actions.addErrLine('Response parsing error: ' + err);
		  });
	  });
  },
  
  TerminalOnKeyDown(ev) { 
	  ev.stopPropagation();
	  
	  scrollToBottom();
	  
	  if(ev.key == "Enter") {
		  if(ev.preventDefault) ev.preventDefault();
		  
		  Actions.addLines([
			  {content: Actions.prompt + '&nbsp;' + ev.target.value, style: {}}
		  ]);
		  
		  if(ev.target.value.length > 0) {
		      Actions.historyCmd.push(ev.target.value);
		  }
		  		  
		  let cmd = ev.target.value;
		  ev.target.value = "";
		  
		  //Drop too old cmds.
		  if(Actions.historyCmd.length > Config.CmdHistoryStack) {
			  Actions.historyCmd.shift();
		  }
		  
		  Actions.historyCmdCursor = Actions.historyCmd.length;
		  
		  if(cmd.length <= 0) {
			  return;
		  }
		  
		  cmdProcessingStatus(ev.target, false);
		  
		  let promise = fetch(Config.siteurl + '/backend/parse-cmd', {
			  method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({'cmd': cmd}),
			});
		  
		  (function(target) {
			  promise.then(function(response) {
				  if(typeof response.status != 'undefined' && response.status != 200) {
					  Actions.addErrLine('Response Error: ' + response.status);
				  } else if(typeof response.status != 'undefined' && response.status == 200){
					  response.json().then(function(data) {
						  //console.log(data);
						  if(typeof data.lines != 'undefined' && data.lines != null) {
							  Actions.addLines(data.lines);
						  } else {
							  Actions.addErrLine('No response lines.');
						  }
					  }).catch(function(err) {
						  Actions.addErrLine('Response parsing error: ' + err);
					  });
				  } else {
					  Actions.addErrLine('Unkown Error.');  
				  }
				  
				  cmdProcessingStatus(target, true);
			  });
			  
			  promise.catch(err => {
				  cmdProcessingStatus(target, true);  
			  });
		  })(ev.target);

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
	  let showText = ev.target.value.replace(' ', '&nbsp;');
	  inputShow.innerHTML = showText;
	  inputShow.innerText = showText;

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
	  let showText = ev.target.value.replace(' ', '&nbsp;');
	  inputShow.innerHTML = showText;
	  inputShow.innerText = showText;
	  
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
