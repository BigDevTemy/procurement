<?php

declare (strict_types=1);

namespace App;

class Router{

    private array $handlers;
    private const METHOD_POST = "POST";
    private const METHOD_GET = "GET";
    private $notFoundHandler;

    public function get(string $path,$handler):void
    {
        $this->addHandler(self::METHOD_GET, $path,$handler);
    }
    public function post(string $path,$handler){
        
        $this->addHandler(self::METHOD_POST, $path,$handler);
    }
    public function addHandler(string $method, string $path, $handler){
            $this->handlers[$method . $path] = [
                'path'=>$path,
                'method'=>$method,
                'handler'=>$handler
            ];
    }

    public function addNotFoundHandler($handler):void{
        $this->notFoundHandler = $handler;
    }
    public function run(){
        $parts = explode('/', $_SERVER['REQUEST_URI']);
        $requestUri = parse_url('/'.$parts[4]);
        $requestPath = $requestUri['path'];
        $method = $_SERVER['REQUEST_METHOD'];
       
        
    
        $callback = null;
        foreach($this->handlers as $handler){
                if($handler['path'] === $requestPath && $method === $handler['method']){
                    $callback = $handler['handler'];
                }
        }

        if(!$callback){
            if(!empty($this->notFoundHandler)){
                $callback = $this->notFoundHandler;
            }
        }

        call_user_func($callback,[
            array_merge($_GET,$_POST)
        ]);
    }
}

?>