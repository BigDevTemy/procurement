<?php
session_start();
require_once __DIR__ ."/../vendor/autoload.php";
include 'config.php';
use \App\Router;


$router = new Router();

$connection = new mysqli("localhost","root","","procurement");
if ($connection -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}


$router->get('/',function(){
  echo 'Welcome To Prolifier';
});

$router->get('about',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = array("data"=>"Array","status"=>true,"mysqli"=>$connection);
 echo json_encode($data);
});

$router->post('login',function(array $params){
 // 
  $connection = new mysqli("localhost","root","","procurement");
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

$router->post('create',function(array $params){
 
  $connection = new mysqli("localhost","root","","procurement");
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

$router->get('project_number',function(array $params){
  $connection = new mysqli("localhost","root","","procurement"); 
  $res = $connection->query("SELECT id FROM requisition_new ORDER BY id desc LIMIT 1") or die(mysqli_error($connection));
  $year = date('y');
 
 if(mysqli_num_rows($res) > 0){
  $sid = mysqli_fetch_assoc($res);
  $autocreate = last_insert(strlen($sid['id']),$sid['id']+1);
  $order_ref = 'MC-ENQ-'.$autocreate.'-'.$year;
  echo json_encode(["data"=>$order_ref,"status"=>true]);
 }
 else{
  $order_ref = 'MC-ENQ-001-'.$year;
  echo json_encode(["data"=>$order_ref,"status"=>true]);
  
 }
});


$router->post('createorder',function(array $params){
 
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  //$result = $connection->query("SELECT * FROM orders WHERE order_title ='".$data['order_title']."'") or die(mysqli_error($connection));
 
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
        
         
          $query = "INSERT INTO orders(order_title,author,order_ref,project_id)VALUES('".$data['order_title']."','".$data['author']."','".$order_ref."','".$data['project']."')";
          $result = $connection->query($query)or die(mysqli_error($connection));
          if($result){
          
            echo json_encode(["data"=>"Order Successfully Created","status"=>true]);
          }
          else{
            echo json_encode(["data"=>"Internal Server Error A","status"=>false]);
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

$router->post('addsupplier',function(array $params){
  
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM supplier WHERE supplier_name ='".$data['supplier_name']."'");
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Supplier already exist","status"=>false]);
    }
    else{
          
          $query = "INSERT INTO supplier (supplier_name,author,address,contact,email)VALUES('".$data['supplier_name']."','".$data['author']."','".$data['supplier_address']."','".$data['supplier_contact']."','".$data['supplier_email']."')";
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



$router->post('addagent',function(array $params){
  
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM agent WHERE agent_name ='".$data['agent_name']."'");
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Agent name has to be Unique","status"=>false]);
    }
    else{
          
          $query = "INSERT INTO agent (agent_name,created_by,agent_address,agent_contact,agent_email)VALUES('".$data['agent_name']."','".$data['author']."','".$data['agent_address']."','".$data['agent_contact']."','".$data['agent_email']."')";
          $result = $connection->query($query)or die(mysqli_error($connection));
          if($result){
          
            echo json_encode(["data"=>"Agent Successfully Created","status"=>true]);
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

$router->post('addproject',function(array $params){
  
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM project WHERE project_name ='".$data['project_name']."'");
  if($result){
    if(mysqli_num_rows($result) > 0){
      echo json_encode(["data"=>"Project name has to be Unique","status"=>false]);
    }
    else{
          
          $query = "INSERT INTO project (project_name,user)VALUES('".$data['project_name']."','".$data['author']."')";
          $result = $connection->query($query)or die(mysqli_error($connection));
          if($result){
          
            echo json_encode(["data"=>"Project Successfully Created","status"=>true]);
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


$router->get('getAllSupplier',function(){

  $connection = new mysqli("localhost","root","","procurement");
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


$router->get('getAllProject',function(){

  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM project");
  $output = [];
  if($result){
    if(mysqli_num_rows($result) > 0){
        while($row= mysqli_fetch_assoc($result)){
          
          array_push($output,array ("project_name"=> $row['project_name'],"id"=>$row['id'],"created_at"=> $row['created_at']));
        }

        echo json_encode(["data"=>$output,"status"=>true]); 
    }
    else{
      echo json_encode(["data"=>"No Project","status"=>false]); 
        
    }

  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }


  $connection->close();

});



$router->get('getOrders',function(){

  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM orders");
  $output = [];
  if($result){
    if(mysqli_num_rows($result) > 0){
        while($row= mysqli_fetch_assoc($result)){
          
          array_push($output,array ("order_title"=> $row['order_title'],"id"=>$row['id']));
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


// $router->get('getAllProject',function(){

//   $connection = new mysqli("localhost","root","","procurement");
//   $data = json_decode(file_get_contents('php://input'), true);
//   $result = $connection->query("SELECT * FROM project");
//   $output = [];
//   if($result){
//     $totalData = mysqli_num_rows($result);
//     $totalFilter=$totalData;
//     $data = [];
//     while($row = mysqli_fetch_assoc($result)){
   
//       $data[] = $row;
//     }
//     $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter));
//     echo json_encode($json_data);

   

//   }
//   else{
//     echo json_encode(["data"=>"Internal Server Error","status"=>false]);
//   }


//   $connection->close();

// });


$router->get('getAllorder',function(){

  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT `orders`.`id` AS myID ,order_title,order_ref,project_name FROM orders LEFT JOIN project ON `orders`.`project_id` = `project`.`id`");
  $output = [];
  if($result){
    if(mysqli_num_rows($result) > 0){
        while($row= mysqli_fetch_assoc($result)){
          array_push($output,array ("ordertype"=> $row['order_title'],"id"=>$row['myID'],"order_ref"=>$row['order_ref'],"project_name"=>$row['project_name']));
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

$router->post('upoadrequisition',function($request){

  $connection = new mysqli("localhost","root","","procurement");
  
  $data = json_decode(file_get_contents('php://input'), true);

  

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
    $x = explode(',',$_POST['quotation'][$i]);
   
      $query = "INSERT INTO requisition (order_id,supplier_id,username,description,quantity,price,total,quotation_receipt,serial_quotation_number,file_ref,project_name,dateofcreation,dateofsending,currency,note,discount,received,ref_number)VALUES('".$_POST['ordertype']."','".$_POST['allsupplier']."','".$_POST['username']."','".$x[1]."','".$x[2]."','".$x[3]."','".$x[4]."','".$new_name."','".$_POST['serial_number']."','".$_POST['fileref']."','".$_POST['projectname']."','".$_POST['dateofcreation']."','".$_POST['dateofsending']."','".$_POST['currency']."','".$_POST['note']."','".$_POST['discount']."','".$_POST['received']."','".$_POST['fileref']."')";
      $result = $connection->query($query)or die(mysqli_error($connection));
      if($result){
      
        
      }
      else{
        echo json_encode(["data"=>"Internal Server Error","status"=>false]);
      }
  }
  $query = "INSERT INTO approval_process (order_id,supplier_id,level_1_approval,assigned_supplier,created_at)VALUES('".$_POST['ordertype']."','".$_POST['allsupplier']."','pending','unassigned','".$_POST['dateofcreation']."')";
  $result = $connection->query($query)or die(mysqli_error($connection));

  echo json_encode(["data"=>"Requisition Successfully Uploaded","status"=>true]);
  
  $connection->close();

});



$router->post('upoadquotation_new',function($request){

  $connection = new mysqli("localhost","root","","procurement");
  
  $data = json_decode(file_get_contents('php://input'), true);

  $join_name = "";

 
  // echo json_encode(["data"=>count($_FILES['quotation']['name']),"status"=>false]);
  // die();

 

  $new_name="";
 
  
  if(isset($_FILES['filequotation'])){
    $decode = json_decode($_POST['quotation']);
    for($i=0;$i<count($_FILES['filequotation']['name']);$i++){
      
        //echo json_encode(["supplierid"=>$decode[$i]->supplier,"filename"=>$_FILES['filequotation']['name'][$i],"status"=>false]);
        $extension = pathinfo($_FILES['filequotation']['name'][$i],PATHINFO_EXTENSION);
        $new_name = $_FILES['filequotation']['name'][$i].time().'.'.$extension;
        move_uploaded_file($_FILES['filequotation']['tmp_name'][$i],'../quotation/'.$new_name);
        if($decode[$i]->received){
          $received_value = 1;
        }
        else{
            $received_value = -1;
        }
        
        $query = "INSERT INTO requisition_new (order_description,allsuppliers,username,quotation_receipt,serial_quotation_number,file_ref,project_id,dateofcreation,dateofsending,ref_number,supplier_id,received,order_ref)VALUES('".$_POST['ordertype']."','".$_POST['allsupplier']."','".$_POST['username']."','".$new_name."','".$_POST['serial_number']."','".$_POST['fileref']."','".$_POST['projectname']."','".$_POST['dateofcreation']."','".$_POST['dateofsending']."','".$_POST['fileref']."','".$decode[$i]->supplier."','".$received_value."','".$_POST['order_ref']."')";
        $result = $connection->query($query)or die(mysqli_error($connection));
        if($result){
          
        }
        else{
          echo json_encode(["data"=>"Internal Server Error","status"=>false]);
        }
    }
    echo json_encode(["data"=>'Requisition Successfully Uploaded',"status"=>true]);
  }
  else{
    echo json_encode(["data"=>'File Input not Set',"status"=>false]);
  }


  $connection->close();

});

$router->get('getpendingApproval',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT   `approval_process`.*, `orders`.*, COUNT(supplier_id) AS allsuppliers FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id`  WHERE level_1_approval = 'pending' GROUP BY `approval_process`.order_id";
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
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});

$router->get('allrequisition',function(){
  $connection = new mysqli("localhost","root","","procurement");

  $query="SELECT `requisition_new`.*,`supplier`.`supplier_name`,`project`.`project_name` FROM requisition_new  LEFT JOIN supplier ON `requisition_new`.`supplier_id` = `supplier`.`id` LEFT JOIN `project` ON `requisition_new`.`project_id` = `project`.`id` ORDER BY created_at desc";
  $result = $connection->query($query)or die(mysqli_error($connection));
  
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


//alldataorder

$router->get('allapproved',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
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
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});

$router->get('alldataorder',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
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



$router->get('alldatasupplier',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
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


$router->get('alldataAgent',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM agent";
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

$router->post('fetchapprovaldetails',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  $data = json_decode(file_get_contents('php://input'), true);
  $json_data = array("data"=>$data,"status"=>false);
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

$router->post('approve',function(){
  $connection = new mysqli("localhost","root","","procurement");
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

$router->post('delete_approval',function(){
  $connection = new mysqli("localhost","root","","procurement");
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


$router->get('getPO',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
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
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});




$router->post('adjustPO',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);
  $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`= `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` LEFT JOIN `requisition` ON `approval_process`.`order_id` = `requisition`.`order_id` WHERE level_1_approval = 'approved' AND `approval_process`.`order_id`='".$data['orderid']."' GROUP BY `requisition`.`supplier_id`";
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

$router->post('POapproval',function(){
  $connection = new mysqli("localhost","root","","procurement");
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


$router->post('delete_approval_po',function(){
  $connection = new mysqli("localhost","root","","procurement");
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

$router->get('getShippment',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` WHERE level_1_approval = 'approved' AND po_approval='approved' AND `shippment_status`='pending with the supplier'";
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


$router->get('getShippmentDispatched',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` WHERE level_1_approval = 'approved' AND po_approval='approved' AND `approval_process`.`shippment_status`='dispatched' GROUP BY `approval_process`.`supplier_id`";
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

$router->get('getShippmentPackage',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` WHERE level_1_approval = 'approved' AND po_approval='approved' AND `approval_process`.`shippment_status`='package received by agent' GROUP BY `approval_process`.`supplier_id`";
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


$router->get('getShippmentShipped',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id`  WHERE level_1_approval = 'approved' AND po_approval='approved' AND `approval_process`.`shippment_status`='shipped by agent' GROUP BY `approval_process`.`supplier_id`";
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

$router->get('getShippmentDelivery',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`assigned_supplier`=`supplier`.`id` LEFT JOIN `requisition` ON `approval_process`.`order_id` = `requisition`.`order_id` WHERE level_1_approval = 'approved' AND po_approval='approved' AND `approval_process`.`shippment_status`='delivered' GROUP BY `approval_process`.`supplier_id`";
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

$router->get('deliveredShippment',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
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

$router->get('getShippment_in_processing',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
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

$router->post('getdata',function(){

  $connection = new mysqli("localhost","root","","procurement");
    
  $data = json_decode(file_get_contents('php://input'), true);
  
  $query = "SELECT * FROM ".$data['tableName']." WHERE id=".$data['id']."";

  $result = $connection->query($query)or die(mysqli_error($connection));

  if(mysqli_num_rows($result) > 0){
    $row = mysqli_fetch_assoc($result);
    $json_data = array("data"=>$row,"status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>$data,"status"=>false);
  }

  
  $connection->close();

});

$router->post('editdata',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  if($data['affectedColumn'] == 'order_title'){
    $query = "UPDATE  ".$data['tableName']." SET ".$data['affectedColumn']." = '".$data['updatedata']."' WHERE id='".$data['id']."'";
  }
  else if($data['affectedColumn'] == 'project_name'){

    $query = "UPDATE  ".$data['tableName']." SET ".$data['affectedColumn']." = '".$data['updatedata']."' WHERE id='".$data['id']."'";
  }
  else if($data['affectedColumn'] == 'agent_name'){

    $query = "UPDATE  ".$data['tableName']." SET ".$data['affectedColumn']." = '".$data['updatedata']."', agent_email='".$data['email']."',agent_contact='".$data['contact']."',agent_address='".$data['address']."' WHERE id='".$data['id']."'";
  }
  else{
    $query = "UPDATE  ".$data['tableName']." SET ".$data['affectedColumn']." = '".$data['updatedata']."', email='".$data['email']."',contact='".$data['contact']."',address='".$data['address']."' WHERE id='".$data['id']."'";
  }
  
  
  $result = $connection->query($query)or die(mysqli_error($connection));

  if($result){
    
    $json_data = array("data"=>"Update was Successful","status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>"Update Failed","status"=>false);
    echo json_encode($json_data);
  } 

    $connection->close();
});

//deletedatarequisition
$router->post('deletedata',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  $query = "DELETE FROM ".$data['tableName']." WHERE ".$data['affectedColumn']." ='".$data["id"]."'";
  
  $result = $connection->query($query)or die(mysqli_error($connection));

  if($result){
    
    $json_data = array("data"=>"Deletion was Successful","status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>"Update Failed","status"=>false);
    echo json_encode($json_data);
  } 

    $connection->close();
});


$router->post('deletedatarequisition',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $check = "SELECT * FROM approval_process WHERE order_id='".$data['id']."' AND supplier_id='".$data['id']."' AND level_1_approval='approved'";
  $result_check = $connection->query($check)or die(mysqli_error($connection));
  if(mysqli_num_rows($result_check) > 0){
      $json_data = array("data"=>"Sorry..the Quotation has Already Been Approved","status"=>false);
      echo json_encode($json_data);
  }
  else{

  }
  $query = "DELETE FROM requisition_new WHERE id ='".$data["id"]."'";
  
  $result = $connection->query($query)or die(mysqli_error($connection));
 
  if($result){
    
    $json_data = array("data"=>"Deletion was Successful","status"=>true);
    echo json_encode($json_data);

    
  }
  else{
    $json_data = array("data"=>"Update Failed","status"=>false);
    echo json_encode($json_data);
  } 

    $connection->close();
});

$router->get('getPOapproved',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  // $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `requisition` ON `orders`.`id` = `requisition`.`order_id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id`=`supplier`.`id` WHERE po_approval = 'approved' GROUP BY `approval_process`.order_id";
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
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
  // }
  // else{
  //   echo json_encode(array("data"=>'NO PENDING APPROVAL',"status"=>true));
  // }
  $connection->close();

});

$router->post('printPO',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  $data = json_decode(file_get_contents('php://input'), true);

  $query="SELECT * FROM approval_process LEFT JOIN orders ON `approval_process`.`order_id`=  `orders`.`id` LEFT JOIN `requisition` ON `orders`.`id` = `requisition`.`order_id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id`=`supplier`.`id` WHERE po_approval = 'approved' AND `approval_process`.`id` = '".$data['id']."'";
  $result = $connection->query($query)or die(mysqli_error($connection));
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
  
    $connection->close();

});


$router->post('deletePOapproval',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  //$check = "SELECT * FROM approval_process WHERE order_id='".$data['order_id']."' AND supplier_id='".$data['order_id']."' AND level_1_approval='approved'";
  //$result_check = $connection->query($check)or die(mysqli_error($connection));
  
  $query = "UPDATE approval_process SET po_approval= NULL, shippment_status=NULL WHERE order_id ='".$data["order_id"]."' AND supplier_id ='".$data["supplier_id"]."'";
  $result = $connection->query($query)or die(mysqli_error($connection));
 
  if($result){
    $query = "DELETE FROM shippment WHERE approve_id ='".$data["approved_id"]."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
    $json_data = array("data"=>"Deletion was Successful","status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>"Update Failed","status"=>false);
    echo json_encode($json_data);
  } 

    $connection->close();
});


$router->post('getsupplierquotation',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  //$check = "SELECT * FROM approval_process WHERE order_id='".$data['order_id']."' AND supplier_id='".$data['order_id']."' AND level_1_approval='approved'";
  //$result_check = $connection->query($check)or die(mysqli_error($connection));

  $query = "SELECT * FROM requisition  LEFT JOIN `supplier` ON `requisition`.`supplier_id` = `supplier`.`id` LEFT JOIN `orders` ON `requisition`.`order_id` = `orders`.`id` WHERE  order_id ='".$data["orderid"]."' AND supplier_id ='".$data["supplierid"]."'";
  
  $result = $connection->query($query)or die(mysqli_error($connection));
 
  if($result){
  
    $datax = [];
    while($row = mysqli_fetch_assoc($result)){
      // $subarray=[];
      // $subarray[]=$row['id'];
      // $subarray[]=$row['order_title'];
      // $subarray[]=$row['level_1_approval'];
      // $subarray[]=$row['created_at'];
      $datax[] = $row;
    }
    $json_data = array("data"=>$datax,"status"=>true);
    echo json_encode($json_data);
  }
  else{
    $json_data = array("data"=>"Fetchh Failed","status"=>false);
    echo json_encode($json_data);
    
  } 

    $connection->close();
});



$router->post('uploadShippment',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $new_name="";
  $shipdocs_url="";
  $soncap_url="";
  $paar_url="";
  $countfiles = count($_FILES['shipdocs']['name']);
  $countfilessoncap = count($_FILES['soncap']['name']);
  $countfilessonpaar = count($_FILES['paar']['name']);

  // echo json_encode(["data"=>$_POST['loadinfor']]);
  // die;
  if(isset($_FILES['shipdocs'])){
    
    for($i=0;$i<$countfiles;$i++){
      
      //$extension = pathinfo($_FILES['shipdocs']['name'],PATHINFO_EXTENSION);
      //$new_name = time().'.'.$extension;
      $upload = time().$_FILES['shipdocs']['name'][$i];
      move_uploaded_file($_FILES['shipdocs']['tmp_name'][$i],'../shippment/'.$upload);
      $shipdocs_url.= $upload.'_';
    }
    //echo json_encode(["data"=>count($_FILES['shipdocs']['name']),"status"=>true,"uplaod"=>$shipdocs_url]);
  }
  if(isset($_FILES['soncap'])){
    
    for($i=0;$i<$countfilessoncap;$i++){
      
      //$extension = pathinfo($_FILES['shipdocs']['name'],PATHINFO_EXTENSION);
      //$new_name = time().'.'.$extension;
      $upload = time().$_FILES['soncap']['name'][$i];
      move_uploaded_file($_FILES['soncap']['tmp_name'][$i],'../shippment/'.$upload);
      $soncap_url.= $upload.'_';
    }
   // echo json_encode(["data"=>count($_FILES['soncap']['name']),"status"=>true,"uplaod"=>$soncap_url]);
  }

  if(isset($_FILES['paar'])){
    
    for($i=0;$i<$countfilessonpaar;$i++){
      
      //$extension = pathinfo($_FILES['shipdocs']['name'],PATHINFO_EXTENSION);
      //$new_name = time().'.'.$extension;
      $upload = time().$_FILES['paar']['name'][$i];
      move_uploaded_file($_FILES['paar']['tmp_name'][$i],'../shippment/'.$upload);
      $paar_url.= $upload.'_';
    }

    //echo json_encode(["data"=>count($_FILES['paar']['name']),"status"=>true,"uplaod"=>$paar_url]);
  }

  // for($i=0;$i<count($_POST['newQuotation']);$i++){
 
  // }
  $query = "INSERT INTO shippment (approve_id,date,mode_shippment,payment_mode,abroad_forwarder,address_abroad_forwarder,cleared,agent_name_ngn,date_agent_ngn,shippment_docs,soncap,paar,status)VALUES('".$_POST['loadinfor'][2]."','".$_POST['date']."','".$_POST['mode_of_shippment']."','".$_POST['paymentmode']."','".$_POST['abroadforwarder']."','".$_POST['abroadforwarder_addr']."','".$_POST['cleared']."','".$_POST['agentname']."','".$_POST['agentname_date']."','".$shipdocs_url."','".$soncap_url."','".$paar_url."','pending with the supplier')";
  
  $result = $connection->query($query)or die(mysqli_error($connection));
  if($result){

   for($x=0;$x<count($_POST['xquotation']);$x++){
    $query = "UPDATE requisition SET quantity = '".$_POST['xquotation'][$x][1]."', price='".$_POST['xquotation'][$x][2]."', total='".$_POST['xquotation'][$x][3]."' WHERE description ='".$_POST['xquotation'][$x][0]."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
    if(!$result){
      echo json_encode(["data"=>'Internal Server Error',"status"=>false]);
    }
  }
    $query = "UPDATE approval_process SET po_approval = 'approved', shippment_status='pending with the supplier' WHERE order_id ='".$_POST['loadinfor'][0]."' AND supplier_id ='".$_POST['loadinfor'][1]."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
    if($result){
      echo json_encode(["data"=>"Shippment Created Successfully","status"=>true]);
    }
    else{
      echo json_encode(["data"=>"Shippment Creation Failed","status"=>false]);
    }
    
  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }

  $connection->close();
});

$router->post('uploadShippmentUpdate',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $new_name="";
  $upload_url="";

  
  
  if(isset($_FILES['dispatched'])){
    $countfiles = count($_FILES['dispatched']['name']);
    for($i=0;$i<$countfiles;$i++){
      
    
      $upload = time().$_FILES['dispatched']['name'][$i];
      move_uploaded_file($_FILES['dispatched']['tmp_name'][$i],'../shippment/'.$upload);
      $upload_url.= $upload.'_';
    }
    //echo json_encode(["data"=>count($_FILES['shipdocs']['name']),"status"=>true,"uplaod"=>$shipdocs_url]);
  }
  if(isset($_FILES['package'])){
    $countfiles = count($_FILES['package']['name']);
    for($i=0;$i<$countfiles;$i++){
      
    
      $upload = time().$_FILES['package']['name'][$i];
      move_uploaded_file($_FILES['package']['tmp_name'][$i],'../shippment/'.$upload);
      $upload_url.= $upload.'_';
    }
    //echo json_encode(["data"=>count($_FILES['shipdocs']['name']),"status"=>true,"uplaod"=>$shipdocs_url]);
  }
  if(isset($_FILES['shipped'])){
    $countfiles = count($_FILES['shipped']['name']);
    for($i=0;$i<$countfiles;$i++){
      
    
      $upload = time().$_FILES['shipped']['name'][$i];
      move_uploaded_file($_FILES['shipped']['tmp_name'][$i],'../shippment/'.$upload);
      $upload_url.= $upload.'_';
    }
    //echo json_encode(["data"=>count($_FILES['shipdocs']['name']),"status"=>true,"uplaod"=>$shipdocs_url]);
  }
  if(isset($_FILES['delivered'])){
    $countfiles = count($_FILES['delivered']['name']);
    for($i=0;$i<$countfiles;$i++){
      
    
      $upload = time().$_FILES['delivered']['name'][$i];
      move_uploaded_file($_FILES['delivered']['tmp_name'][$i],'../shippment/'.$upload);
      $upload_url.= $upload.'_';
    }
    //echo json_encode(["data"=>count($_FILES['shipdocs']['name']),"status"=>true,"uplaod"=>$shipdocs_url]);
  }

  $query= "UPDATE shippment SET status= '".$_POST['status']."' WHERE approve_id='".$_POST['approve_id']."'";
  $result = $connection->query($query)or die(mysqli_error($connection));

  $query= "UPDATE approval_process SET shippment_status= '".$_POST['status']."' WHERE id='".$_POST['approve_id']."'";
  $result = $connection->query($query)or die(mysqli_error($connection));

  if($_POST['status'] == "dispatched"){
    $query = "SELECT * FROM shippment WHERE approve_id='".$_POST['approve_id']."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
    if(mysqli_num_rows($result) > 0){
      $row = mysqli_fetch_assoc($result);
      $dispatched_docs = $row['dispatched_docs'];
      if($row['dispatched_docs'] !=""){
        $newupload_url = $upload_url.$dispatched_docs;
      }
      else{
        $newupload_url = $upload_url;
      }
      
      $query= "UPDATE shippment SET dispatched_docs= '".$newupload_url."' WHERE approve_id='".$_POST['approve_id']."'";
      $result = $connection->query($query)or die(mysqli_error($connection));

      echo json_encode(["data"=>"Update was Successful","status"=>true,"check"=>$upload_url]);
  
     }
     else{
      echo json_encode(["data"=>"Update Failed","status"=>false]);
     }
  }
  else if($_POST['status'] == "package received by agent"){
    $query = "SELECT * FROM shippment WHERE approve_id='".$_POST['approve_id']."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
    if(mysqli_num_rows($result) > 0){
      $row = mysqli_fetch_assoc($result);
      $dispatched_docs = $row['package_docs'];
      if($row['package_docs'] !=""){
        $newupload_url = $upload_url.$dispatched_docs;
      }
      else{
        $newupload_url = $upload_url;
      }
      
      $query= "UPDATE shippment SET package_docs= '".$newupload_url."' WHERE approve_id='".$_POST['approve_id']."'";
      $result = $connection->query($query)or die(mysqli_error($connection));

      echo json_encode(["data"=>"Update was Successful","status"=>true,"check"=>$upload_url]);
  
     }
     else{
      echo json_encode(["data"=>"Update Failed","status"=>false]);
     }

  }
  else if($_POST['status'] == "shipped by agent"){
    $query = "SELECT * FROM shippment WHERE approve_id='".$_POST['approve_id']."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
    if(mysqli_num_rows($result) > 0){
      $row = mysqli_fetch_assoc($result);
      $dispatched_docs = $row['shipped_docs'];
      if($row['shipped_docs'] !=""){
        $newupload_url = $upload_url.$dispatched_docs;
      }
      else{
        $newupload_url = $upload_url;
      }
      
      $query= "UPDATE shippment SET shipped_docs= '".$newupload_url."' WHERE approve_id='".$_POST['approve_id']."'";
      $result = $connection->query($query)or die(mysqli_error($connection));

      echo json_encode(["data"=>"Update was Successful","status"=>true,"check"=>$upload_url]);
  
     }
     else{
      echo json_encode(["data"=>"Update Failed","status"=>false]);
     }


  }
  else if($_POST['status'] == "delivered"){
    $query = "SELECT * FROM shippment WHERE approve_id='".$_POST['approve_id']."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
    if(mysqli_num_rows($result) > 0){
      $row = mysqli_fetch_assoc($result);
      $dispatched_docs = $row['delivery_docs'];
      if($row['delivery_docs'] !=""){
        $newupload_url = $upload_url.$dispatched_docs;
      }
      else{
        $newupload_url = $upload_url;
      }
      
      $query= "UPDATE shippment SET delivery_docs= '".$newupload_url."' WHERE approve_id='".$_POST['approve_id']."'";
      $result = $connection->query($query)or die(mysqli_error($connection));

      echo json_encode(["data"=>"Update was Successful","status"=>true,"check"=>$upload_url]);
  
     }
     else{
      echo json_encode(["data"=>"Update Failed","status"=>false]);
     }
  }

  $connection->close();

});

$router->get('reportShippment',function(){
  $connection = new mysqli("localhost","root","","procurement");
  

  $query="SELECT * FROM shippment LEFT JOIN approval_process ON `approval_process`.`id`=  `shippment`.`approve_id` LEFT JOIN `orders` ON `orders`.`id` = `approval_process`.`order_id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id`";
  $result = $connection->query($query)or die(mysqli_error($connection));
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
  
  $connection->close();


});

$router->post('getquotation',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  $data = json_decode(file_get_contents('php://input'), true);
  $query="SELECT `requisition_new`.`id` AS id,`supplier`.`supplier_name`,`requisition_new`.`file_ref`,`requisition_new`.`ref_number`,`requisition_new`.`created_at`,`supplier`.`id` AS supplierID, supplier_name,contact,address,order_description,project_name,order_ref FROM requisition_new  LEFT JOIN `supplier` ON `requisition_new`.`supplier_id` = `supplier`.`id`LEFT JOIN `project` ON `requisition_new`.`project_id` =  `project`.`id` WHERE  `requisition_new`.`id` = '".$data['id']."'";
  $result = $connection->query($query)or die(mysqli_error($connection));
    // $totalData = mysqli_num_rows($result);
    // $totalFilter=$totalData;
    // $data = [];
    // while($row = mysqli_fetch_assoc($result)){
    //   $data[] = $row;
    // }
    if(mysqli_num_rows($result)){
      while($row = mysqli_fetch_assoc($result)){
        $getData[] = $row;
      }
      $json_data = array("data"=>$getData,"status"=>true);
      echo json_encode($json_data);
    }
    
  
  $connection->close();


});

$router->post('filterApproval',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  
  $data = json_decode(file_get_contents('php://input'), true);

  
  
  $conditionedQuery = "WHERE ";
  $count =0;
  if($data['orderid']!="" && $data['orderid'] !="All Orders"){
    $conditionedQuery .= " order_id = '".$data['orderid']."' AND";
    $count += 1;
  }
  if($data['supplierid']!="" && $data['supplierid'] !="All Suppliers"){
    $conditionedQuery .= " supplier_id = '".$data['supplierid']."' AND";
    $count += 1;
  }
  if($data['status']!="" && $data['status'] !="Status"){
    $conditionedQuery .= " level_1_approval = '".$data['status']."' AND";
    $count += 1;
  }

  if($data['from_date'] && $data['to_date']){
    $conditionedQuery.=" `approval_process`.`created_at` BETWEEN '".$data['from_date']."' AND '".$data['to_date']."'";
    $count += 1;
  }

  // echo json_encode($conditionedQuery);
  if($count > 0){
    $query = "SELECT * FROM approval_process  LEFT JOIN `orders` ON `approval_process`.`order_id` = `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id` ".$conditionedQuery."";
  }
  else{
    $query = "SELECT * FROM approval_process  LEFT JOIN `orders` ON `approval_process`.`order_id` = `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id`";
  }
  
  $result = $connection->query($query)or die(mysqli_error($connection));
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
});


$router->post('filterQuotation',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  
  $data = json_decode(file_get_contents('php://input'), true);

  
  $conditionedQuery = "WHERE `requisition_new`.`created_at` IS NOT NULL AND";
  $count = 0;
  if($data['received']){
    $conditionedQuery.=" `requisition_new`.`received` ='".$data['received']."' AND";
    $count += 1;
  }
  if($data['from_date'] && $data['to_date']){
    $conditionedQuery.=" `requisition_new`.`dateofcreation` BETWEEN '".$data['from_date']."' AND '".$data['to_date']."'";
    $count += 1;
  }

  // echo json_encode($conditionedQuery);
  if($count > 0){
    //$query = "SELECT * FROM requisition_new  LEFT JOIN `orders` ON `approval_process`.`order_id` = `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id` LEFt JOIN `requisition` ON `requisition`.`supplier_id` = `approval_process`.`assigned_supplier` ".$conditionedQuery." GROUP BY `requisition`.`supplier_id`";
    $query="SELECT `requisition_new`.*,`supplier`.`supplier_name`,`project`.`project_name` FROM requisition_new  LEFT JOIN supplier ON `requisition_new`.`supplier_id` = `supplier`.`id` LEFT JOIN `project` ON `requisition_new`.`project_id` = `project`.`id` ".$conditionedQuery." ORDER BY `requisition_new`.`created_at` desc";
  }
  else{
    $query="SELECT `requisition_new`.*,`supplier`.`supplier_name`,`project`.`project_name` FROM requisition_new  LEFT JOIN supplier ON `requisition_new`.`supplier_id` = `supplier`.`id` LEFT JOIN `project` ON `requisition_new`.`project_id` = `project`.`id` ORDER BY created_at desc";
  }
  
  $result = $connection->query($query)or die(mysqli_error($connection));
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
});

$router->post('filterPO',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  
  $data = json_decode(file_get_contents('php://input'), true);

  
  
  $conditionedQuery = "WHERE po_approval IS NOT NULL AND";
  $count =0;
  if($data['orderid']!="" && $data['orderid'] !="All Orders"){
    $conditionedQuery .= " order_id = '".$data['orderid']."' AND";
    $count += 1;
  }
  if($data['supplierid']!="" && $data['supplierid'] !="All Suppliers"){
    $conditionedQuery .= " `approval_process`.`supplier_id` = '".$data['supplierid']."' AND";
    $count += 1;
  }
  if($data['status']!="" && $data['status'] !="Status"){
    $conditionedQuery .= " level_1_approval = '".$data['status']."' AND";
    $count += 1;
  }

  if($data['from_date'] && $data['to_date']){
    $conditionedQuery.=" `approval_process`.`created_at` BETWEEN '".$data['from_date']."' AND '".$data['to_date']."'";
    $count += 1;
  }

  // echo json_encode($conditionedQuery);
  if($count > 0){
    $query = "SELECT * FROM approval_process  LEFT JOIN `orders` ON `approval_process`.`order_id` = `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id` LEFt JOIN `requisition` ON `requisition`.`supplier_id` = `approval_process`.`assigned_supplier` ".$conditionedQuery." GROUP BY `requisition`.`supplier_id`";
  }
  else{
    $query = "SELECT * FROM approval_process  LEFT JOIN `orders` ON `approval_process`.`order_id` = `orders`.`id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id` LEFt JOIN `requisition` ON `requisition`.`supplier_id` = `approval_process`.`assigned_supplier` WHERE po_approval IS NOT NULL GROUP BY `requisition`.`supplier_id`";
  }
  
  $result = $connection->query($query)or die(mysqli_error($connection));
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
});





$router->post('filterShippment',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  
  $data = json_decode(file_get_contents('php://input'), true);

  
  
  $conditionedQuery = "WHERE ";
  $count =0;
  if($data['orderid']!="" && $data['orderid'] !="All Orders"){
    $conditionedQuery .= " order_id = '".$data['orderid']."' AND";
    $count += 1;
  }
  if($data['supplierid']!="" && $data['supplierid'] !="All Suppliers"){
    $conditionedQuery .= " supplier_id = '".$data['supplierid']."' AND";
    $count += 1;
  }
  if($data['status']!="" && $data['status'] !="Status"){
    $conditionedQuery .= " status = '".$data['status']."' AND";
    $count += 1;
  }
  if($data['mode']!="" && $data['mode'] !="Mode of Shippment"){
    $conditionedQuery .= " mode_shippment = '".$data['mode']."' AND";
    $count += 1;
  }

  if($data['from_date'] && $data['to_date']){
    $conditionedQuery.=" `shippment`.`created_at` BETWEEN '".$data['from_date']."' AND '".$data['to_date']."'";
    $count += 1;
  }

  // echo json_encode($conditionedQuery);
  if($count > 0){
    $query = "SELECT * FROM shippment  LEFT JOIN `approval_process` ON `approval_process`.`id` = `shippment`.`approve_id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id` LEFT JOIN `orders` ON `orders`.`id` = `approval_process`.`order_id` ".$conditionedQuery."";
  }
  else{
    $query = "SELECT * FROM shippment  LEFT JOIN `approval_process` ON `approval_process`.`id` = `shippment`.`approve_id` LEFT JOIN `supplier` ON `approval_process`.`supplier_id` = `supplier`.`id` LEFT JOIN `orders` ON `orders`.`id` = `approval_process`.`order_id`";
  }
  
  $result = $connection->query($query)or die(mysqli_error($connection));
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
});


$router->post('filterRequisition',function(){
  $connection = new mysqli("localhost","root","","procurement");
  
  
  $data = json_decode(file_get_contents('php://input'), true);

  
  
  $conditionedQuery = "WHERE ";
  $count =0;
  if($data['orderid']!="" && $data['orderid'] !="All Orders"){
    $conditionedQuery .= " order_id = '".$data['orderid']."' AND";
    $count += 1;
  }
  if($data['supplierid']!="" && $data['supplierid'] !="All Suppliers"){
    $conditionedQuery .= " supplier_id = '".$data['supplierid']."' AND";
    $count += 1;
  }

  if($data['project_name']!="" && $data['project_name'] !="Project Name"){
    $conditionedQuery .= " project_name = '".$data['project_name']."' AND";
    $count += 1;
  }
  if($data['description']!="" && $data['description'] != "Description"){
    $conditionedQuery .= " description = '".$data['description']."' AND";
    $count += 1;
  }
  if($data['ref_no']!="" && $data['ref_no'] != "Reference No"){
    $conditionedQuery .= " 	file_ref = '".$data['ref_no']."' AND";
    $count += 1;
  }
  if($data['serial_number']!="" && $data['serial_number'] != "Serial Number"){
    $conditionedQuery .= " serial_quotation_number = '".$data['serial_number']."' AND";
    $count += 1;
  }

  if($data['from_date'] && $data['to_date']){
    $conditionedQuery.=" `requisition`.`dateofcreation` BETWEEN '".$data['from_date']."' AND '".$data['to_date']."'";
    $count += 1;
  }

  // echo json_encode($conditionedQuery);
  if($count > 0){
    $query = "SELECT * FROM requisition  LEFT JOIN `supplier` ON `requisition`.`supplier_id` = `supplier`.`id` LEFT JOIN `orders` ON `orders`.`id` = `requisition`.`order_id` ".$conditionedQuery." GROUP BY `requisition`.`supplier_id`";
  }
  else{
    $query = "SELECT * FROM requisition  LEFT JOIN `supplier` ON `requisition`.`supplier_id` = `supplier`.`id` LEFT JOIN `orders` ON `orders`.`id` = `requisition`.`order_id`";
  }
  
  $result = $connection->query($query)or die(mysqli_error($connection));
    $totalData = mysqli_num_rows($result);
    $totalFilter=$totalData;
    $data = [];
    while($row = mysqli_fetch_assoc($result)){
      $data[] = $row;
    }
    $json_data = array("data"=>$data,"recordsTotal"=>intval($totalData),"recordsFiltered"=>intval($totalFilter),"status"=>true);
    echo json_encode($json_data);
});


$router->get('fetchallproject',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  
  $query = "SELECT * FROM project";
  $result = $connection->query($query)or die(mysqli_error($connection));
    $output=[];
    while($row= mysqli_fetch_assoc($result)){
          
      array_push($output,array ("project_name"=> $row['project_name'],"id"=>$row['id']));
    }

    echo json_encode(["data"=>$output,"status"=>true]);
    
    //echo json_encode($json_data);
  

    $connection->close();
});

$router->post('save_edit_requisition',function(){
  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);

  $query = "UPDATE requisition_new SET created_at='".$data['date']."', file_ref='".$data['fileref']."', order_description='".$data['ordertitle']."', supplier_id='".$data['supplier']."', ref_number='".$data['refnumber']."' WHERE id='".$data['rowid']."'";
    $result = $connection->query($query)or die(mysqli_error($connection));
  if($result){
    echo json_encode(["data"=>'Update was Successful',"status"=>true]);
  }
  else{
    echo json_encode(["data"=>'Update Failed',"status"=>false]);
  }
  
  
});


$router->get('/getAgent',function(){

  $connection = new mysqli("localhost","root","","procurement");
  $data = json_decode(file_get_contents('php://input'), true);
  $result = $connection->query("SELECT * FROM agent");
  $output = [];
  if($result){
    if(mysqli_num_rows($result) > 0){
        while($row= mysqli_fetch_assoc($result)){
          
          array_push($output,array ("agent_name"=> $row['agent_name'],"id"=>$row['id']));
        }

        echo json_encode(["data"=>$output,"status"=>true]); 
    }
    else{
      echo json_encode(["data"=>"No Agent","status"=>false]); 
        
    }

  }
  else{
    echo json_encode(["data"=>"Internal Server Error","status"=>false]);
  }


  $connection->close();

});


$router->addNotFoundHandler(function(){

  echo 'Not Found';
  
  // require_once __DIR__ .'../../template/404.html';
});

$router->run();

?>