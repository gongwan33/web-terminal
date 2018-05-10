<?php
require_once dirname(__FILE__).'/../classes/application.php';
require_once dirname(__FILE__).'/../classes/outputGenerator.php';

class help extends Application{
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
    }
    
    public static function getAppType() {
        return 'normal';
    }

    public function excute() {
        $output = new OutputGenerator();
        
        if(!empty($this->args) && in_array('-h', $this->args)) {
            $output->addLine($this->man());    
            return $output->getOutput();
        }
        
        $appManager = ApplicationManager::getApplicationManager();
        $apps = $appManager->getAppList();
        
        if(empty($apps)) {
            return '';
        }
            
        foreach ($apps as $name => $app) {
            $class = $app['class'];
            $desc = $class::desc();
            $output->addLine($name.' - '.$desc);    
        };
     
        return $output->getOutput();
    }
    
    public static function man() {
        return 'help is an application which can list all the available commands.';
    }
    
    public static function desc() {
        return 'List all the available applications.';
    }
}