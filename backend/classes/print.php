<?php
function printBlock($str) {
    $str = htmlentities($str);
    $str = '<pre>'.$str.'</pre>';
    
    return $str;
}