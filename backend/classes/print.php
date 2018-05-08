<?php
function printBlock($str) {    
    $str = mb_convert_encoding ($str, "UTF-8", "GB2312");
    $str = htmlentities($str);
   
    $str = '<pre>'.$str.'</pre>';
    
    return $str;
}