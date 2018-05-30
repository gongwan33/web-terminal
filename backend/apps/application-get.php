<?php
require_once dirname(__FILE__).'/../classes/application.php';
require_once dirname(__FILE__).'/../classes/outputGenerator.php';

class get extends Application{
    private $args = [];
    private $feedback = null;
    private $fileId = null;
    
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
                    $this->fileId = $args[0];
                    break;
                }
            }
        }
    }
    
    public static function getAppType() {
        return 'normal';
    }

    public function excute() {
        $output = new OutputGenerator();
        
        if(!empty($this->args) && in_array('-h', $this->args)) {
            $output->addLines($this->man());    
            return $output->getOutput();
        }
        
        if(!empty($this->fileId)) {
            $this->fileId = $this->fileId;
            $path = '/downloads/'.$this->fileId;
            $this->feedback = [
                'cmd' => 'download',
                'data' => $path,
            ];
            
            $output->addLine('Getting file - '.$this->fileId);
        }
        
        return $output->getOutput();
    }
    
    public function feedback() {
        return $this->feedback;
    }
    
    public static function man() {
        return [
            [
                'content' => 'get is an application which can get the specific file from the server.',
                'style' => [],
            ],
            [
                'content' => 'Usage: get [file_id]',
                'style' => [],
            ],
        ];
    }
    
    public static function desc() {
        return 'Get the specific file from the server';
    }
}