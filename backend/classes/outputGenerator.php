<?php
class OutputGenerator {
    private $output = [];
    public function addLine($content, $style = []) {
        $this->output[] = [
            'content' => htmlentities($content),
            'style' => $style,
        ];
    }
    
    public function addLines($contents) {
        foreach ($contents as $content) {
            array_push($this->output, $content);
        }
    }
    
    public function getOutput() {
        return $this->output;
    }
}