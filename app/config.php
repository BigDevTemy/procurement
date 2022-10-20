<?php



function OpenCon()
 {
 $dbhost = "localhost";
 $dbuser = "root";
 $dbpass = "";
 $db = "procurement";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die('Errorno');
 return $conn;

 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }





?>