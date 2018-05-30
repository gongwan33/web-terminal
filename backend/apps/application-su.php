<?php
require_once dirname(__FILE__).'/../classes/application.php';

class su extends Application{
    private $username;
    private $args = [];
    
    public function __construct($args) {
        parent::__construct($args);
        
        array_map(function($ele) {
            $ele = trim($ele);
            if(empty($ele)) {
                unset($ele);
            }
        }, $args);
            
        $this->args = $args;
        
        if(count($args) > 0) {
            foreach($args as $idx => $arg) {
                if(substr($arg, 0, 1) != '-') {
                    $this->username = $args[0];
                    break;
                }
            }
        }
        
        $_SESSION['app-'.get_class($this)] = [];
    }
    
    public function endTaskSession() {
        unset($_SESSION['app-'.get_class($this)]);
    }
    
    public function setTaskSession($key, $val) {
        $_SESSION['app-'.get_class($this)][$key] = $val;
    }
    
    public static function getAppType() {
        return 'interact';
    }
    
    public function excute() {
        $output = new OutputGenerator();
        
        if(!empty($this->args) && in_array('-h', $this->args)) {
            $output->addLine($this->man());
            return $output->getOutput();
        }
        
        if(!empty($this->username)) {
            $output->addLine('Log in to account - '.$this->username);
            $output->addLine('Password:');
            $this->setTaskSession('login-start', $this->username);
            
            return $output->getOutput();
        }
        
        return $output->getOutput();
    }
    
    public static function man() {
        return 'Usage: su [username]';
    }
    
    public static function desc() {
        return 'Longin Application.';
    }
}