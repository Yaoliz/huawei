<?php
header("content-type:text/html;charset=utf8");
$username = $_GET['username'];
$conn = mysqli_connect("localhost","root","root","huawei");
mysqli_query($conn,"set names utf8");
$res = mysqli_query($conn,"select * from history where username='$username'");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
echo json_encode([
    "meta"=>[
        "status"=>0,
        "msg"=>"数据获取成功"
    ],
    "data"=>$arr
]);