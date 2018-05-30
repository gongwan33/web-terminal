<?php

class Application {
    public function __construct($args) {
        
    }
    
    public static function getAppType() {
        return 'normal';       
    }
    
    public function feedback() {
        return null;
    }
    
    public static function man() {
        return 'No specified instructions.';
    }
    
    public static function desc() {
        return 'This application has no description.';   
    }
}