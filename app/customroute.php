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
  $connection = new mysqli("localhost","root","BiL@18","procurement");
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

  $result = $connection->query("SELECT * FROM orders WHERE order_title ='".$data['order_title']."'") or die(mysqli_error($connection));
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Order title has to be Unique","status"=>false]);
    }
    else{
          $res = $connection->query("SELECT id FROM orders ORDER BY id desc LIMIT 1") or die(mysqli_error($connection));
          $year = date('y');
        
         
         if(mysqli_num_rows($res) > 0){
          $sid = mysqli_fetch_assoc($res);
          $autocreate = last_insert(strlen($sid['id']),$sid['id']+1);
          $order_ref = 'MCN-ENQ-'.$autocreate.'-'.$year;
      
         }
         else{
          $order_ref = 'MCN-ENQ-001-'.$year;
          
          
         }
        
         
          $query = "INSERT INTO orders(order_title,author,order_ref)VALUES('".$data['order_title']."','".$data['author']."','".$order_ref."')";
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

function last_insert($last,$id){

  switch ($last){
    case 1:
      return "00".$id;
      break;
    case 2:
      return "0".$id;
      break;
    case 3:
      return $id;
      break;
    default:
      return $id;
  }
  
}

$router->post('/addsupplier',function(array $params){
  
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM supplier WHERE supplier_name ='".$data['supplier_name']."'");
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Supplier name has to be Unique","status"=>false]);
    }
    else{
          
          $query = "INSERT INTO supplier (supplier_name,author,address,contact)VALUES('".$data['supplier_name']."','".$data['author']."','".$data['supplier_address']."','".$data['supplier_contact']."')";
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
          
          array_push($output,array ("supplername"=> $row['supplier_name'],"id"=>$row['id']));
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
          array_push($output,array ("ordertype"=> $row['order_title'],"id"=>$row['id'],"order_ref"=>$row['order_ref']));
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

$router->post('/upoadrequisition',function($request){

  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  $data = json_decode(file_get_contents('php://input'), true);

  $new_name;
  if(isset($_FILES['sample_image'])){
      $extension = pathinfo($_FILES['sample_image']['name'],PATHINFO_EXTENSION);
      $new_name = time().'.'.$extension;
      move_uploaded_file($_FILES['sample_image']['tmp_name'],'../quotation/'.$new_name);
      // echo json_encode($new_name);
  }
  else{
    echo json_encode(["data"=>"Upload Error","status"=>false]);
  }
  


  for($i=0;$i<count($_POST['quotation']);$i++){
  
      $query = "INSERT INTO requisition (order_id,supplier_id,username,description,quantity,price,total,unit,total_price,quotation_receipt)VALUES('".$_POST['ordertype']."','".$_POST['allsupplier']."','".$_POST['username']."','".$_POST['quotation'][$i][1]."','".$_POST['quotation'][$i][2]."','".$_POST['quotation'][$i][3]."','".$_POST['quotation'][$i][4]."','".$_POST['quotation'][$i][5]."','".$_POST['quotation'][$i][6]."','".$new_name."')";
      $result = $connection->query($query)or die(mysqli_error($connection));
      if($result){
      
        
      }
      else{
        echo json_encode(["data"=>"Internal Server Error","status"=>false]);
      }
  }
  $query = "INSERT INTO approval_process (order_id,supplier_id,level_1_approval,assigned_supplier)VALUES('".$_POST['ordertype']."','".$_POST['allsupplier']."','pending','unassigned')";
  $result = $connection->query($query)or die(mysqli_error($connection));

  echo json_encode(["data"=>"Requisition Successfully Uploaded","status"=>true]);
  
  $connection->close();

});

$router->get('/getpendingApproval',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `requisition` ON `orders`.`id` = `requisition`.`order_id` WHERE level_1_approval = 'pending' GROUP BY `approval_process`.order_id";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});


//alldataorder

$router->get('/allapproved',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` WHERE level_1_approval = 'approved' GROUP BY supplier_id";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});

$router->get('/alldataorder',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM orders";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});



$router->get('/alldatasupplier',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM supplier";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});


$router->post('/fetchapprovaldetails',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  $data = json_decode(file_get_contents('php://input'), true);

  $query = "SELECT * FROM requisition LEFT JOIN `orders` ON `requisition`.`order_id` = `orders`.`id` LEFT JOIN `supplier` ON `requisition`.`supplier_id` = `supplier`.`id`  WHERE `requisition`.`order_id` = '".$data['id']."' GROUP BY `requisition`.`supplier_id`";
  $result = $connection->query($query)or die(mysqli_error($connection));
  $data = [];
  if(mysqli_num_rows($result)){
    while($row = mysqli_fetch_assoc($result)){
      array_push($data,$row);
    }
    $json_data = array("data"=>$data,"status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>'Not Found',"status"=>false);
  }

  $connection->close();

});

$router->post('/approve',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  $query = "UPDATE  approval_process SET level_1_approval='approved',assigned_supplier ='".$data['supplierid']."' WHERE order_id='".$data['id']."' AND supplier_id='".$data['supplierid']."'";
  
  $result = $connection->query($query)or die(mysqli_error($connection));

  if($result){
    $query = "UPDATE  approval_process SET level_1_approval='rejected' WHERE order_id='".$data["id"]."' AND assigned_supplier='unassigned'";
    $resultx = $connection->query($query)or die(mysqli_error($connection));
    $json_data = array("data"=>"Approved","status"=>true);
    echo json_encode($json_data);
  }

    $connection->close();
});

$router->post('/delete_approval',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  $query = "UPDATE approval_process SET level_1_approval='pending',assigned_supplier ='unassigned' WHERE po_approval != 'approved' AND id='".$data['id']."' ";
  
  $result = $connection->query($query)or die(mysqli_error($connection));

  if($result){
    $query = "UPDATE  approval_process SET level_1_approval='pending',assigned_supplier ='unassigned' WHERE order_id='".$data["order_id"]."'";
    $resultx = $connection->query($query)or die(mysqli_error($connection));
    $json_data = array("data"=>"Approval Successfully Deleted","status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>"Deletion is Impossible..Job already in Shippment Phase","status"=>false);
    echo json_encode($json_data);
  }

});


$router->get('/getPO',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` LEFT JOIN `requisition` ON `approval_process`.`order_id` = `requisition`.`order_id` WHERE level_1_approval = 'approved' AND po_approval IS NULL GROUP BY `approval_process`.`supplier_id`";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});




$router->post('/adjustPO',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);
  $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`= `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` LEFT JOIN `requisition` ON `approval_process`.`order_id` = `requisition`.`order_id` WHERE level_1_approval = 'approved' AND `approval_process`.`order_id`='".$data['orderid']."' GROUP BY `approval_process`.`supplier_id`";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
   
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);

    $connection->close();
});

$router->post('/POapproval',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  $query = "UPDATE approval_process SET  po_approval = 'approved' WHERE  order_id='".$data['orderid']."' AND assigned_supplier ='".$data['assigned_supplier_id']."' ";
  
  $result = $connection->query($query)or die(mysqli_error($connection));

  if($result){
    $query = "UPDATE  requisition SET total_price ='".$data['totalprice']."' WHERE order_id='".$data["orderid"]."' AND supplier_id='".$data['assigned_supplier_id']."'";
    $resultx = $connection->query($query)or die(mysqli_error($connection));
    $json_data = array("data"=>"Approved","status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>"Deletion is Impossible..Job already in Shippment Phase","status"=>false);
    echo json_encode($json_data);
  }

});


$router->post('/delete_approval_po',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  $query = "UPDATE approval_process SET level_1_approval='pending',assigned_supplier ='unassigned' WHERE  order_id='".$data['orderid']."' AND assigned_supplier='".$data['assigned_supplier_id']."'";
  
  $result = $connection->query($query)or die(mysqli_error($connection));

  if($result){
    $query = "UPDATE  approval_process SET level_1_approval='pending',assigned_supplier ='unassigned' WHERE order_id='".$data["orderid"]."'";
    $resultx = $connection->query($query)or die(mysqli_error($connection));
    $json_data = array("data"=>"Approval Successfully Deleted","status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>"Deletion is Impossible..Job already in Shippment Phase","status"=>false);
    echo json_encode($json_data);
  }

});

$router->get('/getShippment',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` LEFT JOIN `requisition` ON `approval_process`.`order_id` = `requisition`.`order_id` WHERE level_1_approval = 'approved' AND po_approval='approved' GROUP BY `approval_process`.`supplier_id`";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});

$router->get('/deliveredShippment',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` LEFT JOIN `requisition` ON `approval_process`.`order_id` = `requisition`.`order_id` WHERE level_1_approval = 'approved' AND po_approval='approved' AND shipment_status='delivered' GROUP BY `approval_process`.`supplier_id`";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});

$router->get('/getShippment_in_processing',function(){
  $connection = new mysqli("localhost","root","BiL@18","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` LEFT JOIN `requisition` ON `approval_process`.`order_id` = `requisition`.`order_id` WHERE level_1_approval = 'approved' AND po_approval='approved' AND shipment_status='delivered' GROUP BY `approval_process`.`supplier_id`";
  $result = $connection->query($query)or die(mysqli_error($connection));
  // if(mysqli_num_rows($result) > 0){
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});


$router->addNotFoundHandler(function(){

  echo 'Not Found';
  
  // require_once __DIR__ .'../../template/404.html';
});

$router->run();

?>