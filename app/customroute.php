<?php
session_start();
require_once __DIR__ ."/../vendor/autoload.php";
include 'config.php';
use \App\Router;


$router = new Router();

$connection = new mysqli("localhost","root","BiL@18","procurement");
if ($connection -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}


$router->get('/',function(){
  echo 'Welcome To Prolifier';
});

$router->get('/about',function(){
  $data = array("data"=>"Array","status"=>true,"mysqli"=>$connection);
 echo json_encode($data);
});

$router->post('/login',function(array $params){
 // 
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM `users` LEFT JOIN `role` ON `users`.`role_id` = `role`.`id` WHERE username='".$data['username']."' AND password ='".$data['password']."'");
  if($result){
    //var_dump($result->fetch_assoc());
    $_SESSION['user'] = $result->fetch_assoc();
    if(mysqli_num_rows($result) > 0){
      
      echo json_encode(["data"=> "User Authenticated","status"=>true]);
    }
    else{
      echo json_encode(["data"=>"User Authentication Failed","status"=>false]);
    }
    
  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }
  // mysqli_free_result($result);
  // $connection->close();
});

$router->post('/create',function(array $params){
 
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM users WHERE username='".$data['username']."'");
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Username Already Taken","status"=>false]);
    }
    else{
          
          $query = "INSERT INTO users (firstname,lastname,username,password,role_id)VALUES('".$data['fname']."','".$data['lname']."','".$data['username']."','".$data['password']."','".$data['role']."')";
          $result = $connection->query($query)or die(mysqli_error($connection));
          if($result){
          
            echo json_encode(["data"=>"User Created Successfully","status"=>true]);
          }
          else{
            echo json_encode(["data"=>"Internal Server Error","status"=>false]);
          }
    }

  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }


  $connection->close();
});


$router->post('/createorder',function(array $params){
 
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  $result = $connection->query("SELECT * FROM orders WHERE order_title ='okay'") or die(mysqli_error($connection));
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Order title has to be Unique","status"=>false]);
    }
    else{
          
          $query = "INSERT INTO orders(order_title,author)VALUES('".$data['order_title']."','".$data['author']."')";
          $result = $connection->query($query)or die(mysqli_error($connection));
          if($result){
          
            echo json_encode(["data"=>"Order Successfully Created","status"=>true]);
          }
          else{
            echo json_encode(["data"=>"Internal Server Error A","status"=>false]);
          }
    }

  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }


  $connection->close();
});

$router->post('/addsupplier',function(array $params){
  
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM supplier WHERE supplier_name ='".$data['supplier_name']."'");
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Supplier name has to be Unique","status"=>false]);
    }
    else{
          
          $query = "INSERT INTO supplier (supplier_name,author)VALUES('".$data['supplier_name']."','".$data['author']."')";
          $result = $connection->query($query)or die(mysqli_error($connection));
          if($result){
          
            echo json_encode(["data"=>"Supplier Successfully Created","status"=>true]);
          }
          else{
            echo json_encode(["data"=>"Internal Server Error","status"=>false]);
          }
    }

  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }


  $connection->close();
});

$router->get('/getAllSupplier',function(){

  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM supplier");
  $output = [];
  if($result){
    if(mysqli_num_rows($result) > 0){
        while($row= mysqli_fetch_assoc($result)){
          array_push($output,$row['supplier_name']);
        }

        echo json_encode(["data"=>$output,"status"=>true]); 
    }
    else{
      echo json_encode(["data"=>"No Supplier","status"=>false]); 
        
    }

  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }


  $connection->close();

});

$router->get('/getAllorder',function(){

  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM orders");
  $output = [];
  if($result){
    if(mysqli_num_rows($result) > 0){
        while($row= mysqli_fetch_assoc($result)){
          array_push($output,$row['order_title']);
        }

        echo json_encode(["data"=>$output,"status"=>true]); 
    }
    else{
      echo json_encode(["data"=>"No Order","status"=>false]); 
        
    }

  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }


  $connection->close();

});

$router->post('/upoadrequisition',function($params){
  ini_set('max_execution_time', 30000);
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = parse_str(file_get_contents('php://input'), $params);
  echo json_encode($data);
  $connection->close();

});

$router->addNotFoundHandler(function(){

  echo 'Not Found';
  
  // require_once __DIR__ .'../../template/404.html';
});

$router->run();

?>