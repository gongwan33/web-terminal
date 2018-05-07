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
-----------------------------------------------------------------------
');

$config['theme'] = 'homebrew';

$app = new \Slim\App(['settings' => $config]);

$app->post('/init-info', function (Request $request, Response $response, array $args) {
    $header = $this->settings['header'];
    $prompt = $this->settings['prompt'];
    $theme = $this->settings['theme'];
    
    $data = [
        'line' => $header,
        'prompt' => $prompt,
        'theme' => $theme,
    ];
    
    $newResp = $response->withJson($data);
    
    return $newResp;
});


$app->run();
    