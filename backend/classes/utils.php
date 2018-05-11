<?php
function genReturnInfo($response, $content, $type) {
    $style = ['color' => 'red'];
    switch($type) {
        case 'error':
            $style['color'] = 'red';
            break;
        case 'warn':
            $style['color'] = 'orange';
            break;
        case 'info':
            unset($style['color']);
            break;
    }
    
    return  $response->withJson([
        'lines' => [
            [
                'content' => htmlentities($content), 
                'style' => $style,             
            ]
        ]
        
    ]);
}