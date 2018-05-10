<?php
require_once dirname(__FILE__).'/../classes/application.php';

class help extends Application{
    public function __construct($args) {
        parent::__construct($args);
    }
    
    public static function getAppType() {
        return 'normal';
    }

    public function excute() {
        $appManager = ApplicationManager::getApplicationManager();
        $apps = $appManager->getAppList();
        
        if(empty($apps)) {
            return '';
        }
        
        $appNames = array_keys($apps);
        $strRes = implode('\t', $appNames);
        
        return printBlock(strRes);
    }
    
    public function man() {
        return 'help is an application which can list all the available commands.';
    }
}