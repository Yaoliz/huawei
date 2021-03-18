<?php
header("content-type:text/html;charset=utf8");
$id = $_GET['goodsid'];
$conn = mysqli_connect("localhost","root","root","huawei");
mysqli_query($conn,"set names utf8");
mysqli_query($conn,"update goods set hot_mumber=hot_mumber+1 where id=$id");
echo($id);