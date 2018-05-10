<?php
class OutputGenerator {
    private $output = [];
    public function addLine($content, $style = []) {
        $this->output[] = [
            'content' => $content,
            'style' => $style,
        ];
    }
    
    public function getOutput() {
        return $this->output;
    }
}