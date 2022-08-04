<?php

// $mysqli = new mysqli("localhost","root","BiL@18","procurement");

// // Check connection
// if ($mysqli -> connect_errno) {
//   echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
//   exit();
// }

function OpenCon()
 {
 $dbhost = "localhost";
 $dbuser = "root";
 $dbpass = "BiL@18";
 $db = "procurement";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die(mysqli_errno());
 return $conn;

 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }





?>