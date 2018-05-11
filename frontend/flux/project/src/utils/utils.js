function htmlspecialchars(str) {
	if(typeof str == 'undefined' || str == '') {
		return '';
	}
	
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;", // ' -> &apos; for XML only
        " ": "&nbsp;",
    };
    
    var res = str.replace(/[&<>"'\s]/g, function(m) { return map[m]; });
    return res;
}

function trimMeaningChars(str) {
	if(typeof str == 'undefined' || str == '') {
		return '';
	}
  
    var res = str.replace(/[\r\n\t]/g, '');
    return res;
}

function htmlspecialcharsDecode(str) {
    var map = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": "\"",
        "&#39;": "'",
        "&nbsp;": " ",
    };
    return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;)/g, function(m) { return map[m]; });
}

export {htmlspecialchars, trimMeaningChars, htmlspecialcharsDecode};