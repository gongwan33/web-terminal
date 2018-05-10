<?php
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = 'localhost';
$config['db']['user']   = 'user';
$config['db']['pass']   = 'password';
$config['db']['dbname'] = 'exampleapp';

$config['prompt'] = 'JoyBin';
$config['header'] = printBlock('
-----------------------------------------------------------------------
     ____.             __________.__             
    |    | ____ ___.__.\______   \__| ____       
    |    |/  _ <   |  | |    |  _/  |/    \      
/\__|    (  <_> )___  | |    |   \  |   |  \      
\________|\____// ____| |______  /__|___|  /      
                \/             \/        \/   

Welcome to JoyBin Terminal!
Please use the command \'help\' to see the available commands. 

»¦ICP±¸16049910ºÅ-1
Powered By React.
-----------------------------------------------------------------------
');


$config['theme'] = 'homebrew';

$config['log'] = new Logger('TerminalLogger');
$config['log']->pushHandler(new RotatingFileHandler(dirname(__FILE__).'/log.txt', 1, Logger::DEBUG));
