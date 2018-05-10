<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once 'vendor/autoload.php';
require_once 'classes/print.php';
require_once 'configuration.php';
require_once 'classes/applicationManager.php';

$app = new \Slim\App(['settings' => $config]);

$appManager = ApplicationManager::getApplicationManager();
$appManager->autoLoadApps();

$app->post('/init-info', function (Request $request, Response $response, array $args) {
    $header = $this->settings['header'];
    $prompt = $this->settings['prompt'];
    $theme = $this->settings['theme'];
    $path = "/";
    
    $logger = $this->settings['log'];
    
    $logger->debug('Get init info.');
    
    $data = [
        'lines' => [
            ['content' => $header, 'style' => ['color' => 'yellow']],
            ['content' => 'This web terminal system is an open source project maintanced by JoyBin. Please refer to <a target="_blank" href="https://github.com/gongwan33/web-terminal">https://github.com/gongwan33/web-terminal</a> for more details.', 'style' => ['color' => 'blue']],
            ['content' => '&nbsp;', 'style' => []],
        ],
        'prompt' => $prompt,
        'theme' => $theme,
        'path' => $path,
    ];
    
    $newResp = $response->withJson($data);
    
    return $newResp;
});

$app->post('/parse-cmd', function (Request $request, Response $response) {
    $logger = $this->settings['log'];
    $data = $request->getParsedBody();
    
    if(!is_array($data) || !array_key_exists('cmd', $data)) {
        return $response->withJson(['lines' => [['content' => 'Empty Commands.', 'style' => []]]]);
    }
    
    $cmd = filter_var($data['cmd'], FILTER_SANITIZE_STRING);
    $logger->debug('Parse cmd '.$cmd);
    
    $respArry = [
        'lines' => [
            ['content' => $cmd, 'style' => []],
        ]
    ];
    
    $newResp = $response->withJson($respArry);
    
    return $newResp;
});

$app->run();
    