<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'classes/print.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = 'localhost';
$config['db']['user']   = 'user';
$config['db']['pass']   = 'password';
$config['db']['dbname'] = 'exampleapp';

$config['prompt'] = 'JoyBin>';
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
-----------------------------------------------------------------------
');


$config['theme'] = 'homebrew';

$app = new \Slim\App(['settings' => $config]);

$app->post('/init-info', function (Request $request, Response $response, array $args) {
    $header = $this->settings['header'];
    $prompt = $this->settings['prompt'];
    $theme = $this->settings['theme'];
    
    $data = [
        'lines' => [
            ['content' => $header, 'style' => ['color' => 'red', 'fontSize' => '1.2em']],
            ['content' => 'Powered By React', 'style' => ['color' => 'blue']],
            ['content' => '&nbsp;', 'style' => []],
        ],
        'prompt' => $prompt,
        'theme' => $theme,
    ];
    
    $newResp = $response->withJson($data);
    
    return $newResp;
});

$app->run();
    