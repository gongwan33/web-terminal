<?php
class ApplicationManager {
    private $applications;
    private static $instance = null;
    private function __construct() {
        $this->applications = [];
    }
    
    public static function getApplicationManager() {
        if(is_null(self::$instance)) {
            self::$instance = new ApplicationManager();
        }
        
        return self::$instance;
    }
    
    public function registApplication($name, $class) {
        $this->applications[$name] = [
            'class' => $class,
            'type' => $class::getAppType(),
        ];
    }
    
    public function autoLoadApps() {
        $path = dirname(__FILE__).'/../apps/application-*.php';
        $files = glob($path);
 
        foreach($files as $file) {
            if(__FILE__ != $file) {
                require($file);
                
                $rawName = preg_replace('/\.php$/', '', basename($file));
                $consists = explode('-', $rawName);
                if(count($consists) != 2) {
                    continue;
                }
                $appClassName = $consists[1];
                
                $this->registApplication($appClassName, $appClassName);
            }
        }
    }
    
    public function getAppList() {
        return $this->applications;
    }
}