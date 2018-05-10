<?php

class Application {
    public function __construct($args) {
        
    }
    
    public static function getAppType() {
        return 'normal';       
    }
    
    public function man() {
        return 'No specified instructions.';
    }
}