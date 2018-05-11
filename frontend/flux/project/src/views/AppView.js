/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

import React from 'react';
import classnames from 'classnames';
import TerminalActions from '../data/TerminalActions';

function AppView(props) {
  return (
    <div className="tm-wrapper">
      <Terminal {...props} />
    </div>
  );
}

class Terminal extends React.Component {
    render() {
        return (
        	<div>
        	    <StyleBlock {...this.props} />
        	    <Screen {...this.props} />
        	    <CmdLine {...this.props} />
        	    <div className="tm-process-info" style={{display: 'none'}}></div>
        	</div>
        )
                
    }
	
}

class StyleBlock extends React.Component {
	genThemeStyle(theme, prompt) {
		if (typeof prompt == 'undefined') {
		    prompt = '>';	
		}
		
		if (typeof theme == 'undefined'){
			theme = 'homebrew';
		}
		
		let styleStr = '';
	    switch(theme) {
	    	case 'homebrew':
	    		styleStr = `
			    	body, .tm-wrapper, .tm-cmdl-input, .tm-cmdl-input-show {
			    	    color: #09b400;
			    	    background-color: black;
			        }
			        
			        .tm-cmdl-input {
			            caret-color: black;
			        }
			        
			        .tm-cmdl-input-caret {
			            background-color: #09b400;
			        }
	    		`;
	    	break;
	    	
	    		
	    }
	    
	    styleStr += `
	        .tm-cmdl-input-show {
	            text-indent: ` + (prompt.length) + `ch;
	        }
	    `;
	    
	    return styleStr;
	}
	
	render() {
		return (
			<style>
			    {this.genThemeStyle(this.props.terminal.get('theme'), this.props.terminal.get('prompt'))}
			</style>
		);
	}
}

class Screen extends React.Component {
	render() {
		return (
			<div className="tm-scn">
			    {
			    	[...this.props.terminal.get('lines').values()].map( 
			    		term => (
			    			term.get('sublines').map(
			    			    (line, index) => (
			    				    <div className="tm-scn-row" key={term.id + '-' + index} dangerouslySetInnerHTML={{__html: line.content}} style={line.style}></div>
			    		        )
			    		    )
			    		)				    	    
			    	)
			    }
			</div>
		)
	}
}

class CmdLine extends React.Component {
	constructor(props) {
		super(props);
	}
	
	transFocus(ev) {
		let input = ev.target.parentElement.getElementsByClassName('tm-cmdl-input')[0];
		input.focus();
	}
	
	terminalInputOnMouseDown(ev) {
	    if(ev.preventDefault) ev.preventDefault();
	    if(ev.stopPropagation) ev.stopPropagation();
		  
	    return false;
	}
	 
	inputLooseFocus(ev) {
		let inputShow = ev.target.parentElement.getElementsByClassName('tm-cmdl-input-show')[0];
		let carets = inputShow.getElementsByClassName('tm-cmdl-input-caret');
		
		if(typeof carets != 'undefined' && carets.length > 0) {
			let caret = carets[0];
			caret.style.display = 'none';
		}
	}
	
	inputGetFocus(ev) {
		let inputShow = ev.target.parentElement.getElementsByClassName('tm-cmdl-input-show')[0];
		let carets = inputShow.getElementsByClassName('tm-cmdl-input-caret');
		
		if(typeof carets != 'undefined' && carets.length > 0) {
			let caret = carets[0];
			caret.style.display = 'inline';
		}
	}
	
	render() {
		return (
			<div className="tm-cmdl">
			    <span className="tm-cmdl-prompt">{ this.props.terminal.get('prompt')}</span>
			    <textarea className="tm-cmdl-input" onChange={this.props.onTextAreaChange} onKeyDown={this.props.onKeyDown} onFocus={this.inputGetFocus} onMouseDown={this.terminalInputOnMouseDown} onKeyUp={this.props.onKeyUp} onBlur={this.inputLooseFocus}></textarea>
			    <span className="tm-cmdl-input-show" dangerouslySetInnerHTML={{__html: this.props.terminal.get('textOnShow')}} onFocus={this.transFocus} onClick={this.transFocus}></span>
			</div>
		)
	}
}



export default AppView;
