<?php
require_once dirname(__FILE__).'/../classes/application.php';

class su {
    private $username;
    
    public function __construct($args) {
        parent::__construct($args);
        
        if(count($args) > 0) {
            $this->$username = $args[0];
        }
    }
    
    public static function getAppType() {
        return 'canvas';
    }
    
    public function excute() {
        
    }
    
    public function man() {
        return 'Usage: su [username]';
    }
}