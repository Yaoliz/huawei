<?php
header("content-type:text/html;charset=utf8");
$ids = $_GET['ids'];
$conn = mysqli_connect("localhost","root","root","huawei");
mysqli_query($conn,"set names utf8");
$res = mysqli_query($conn,"select * from goods where id in($ids)");
$arr = [];
while($row = mysqli_fetch_assoc($res)){
    $arr[] = $row;
}
echo json_encode([
    "meta"=>[
        "stauts"=>0,
        "msg"=>"数据获取成功"
    ],
    "data"=>$arr
]);