<?php
header("content-type:text/html;charset=utf8");
//表明允许跨域访问
header('Access-Control-Allow-Origin:*');//*号代表所有
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); //支持的http 动作
header('Access-Control-Allow-Headers:x-requested-with,content-type');  //响应头 请按照自己需求添加

$username = $_POST['username'];
$password = $_POST['password'];
// $email = $_POST['email']
// $tel = $_POST['tel']
$con = mysqli_connect("localhost","root","root","huawei");
mysqli_query($con,"set names utf8");
// 查询是否重复了
$res = mysqli_query($con,"select*from user where username = '$username'" );
$row = mysqli_fetch_assoc($res);
if($row){
  $arr = [
    "meta"=>[
      "status"=>2,
      "msg"=>"用户名被占用"
    ],
    "data"=>null,

  ];
}else{
  $res = mysqli_query($con,"insert user(username,password) values('$username','$password')");
  if($res){
    $arr=[
      "meta"=>[
        "status"=>0,
        "msg"=>"c注册成功",
    ],
    "data"=>null];
  }
else{
  $arr=[
    "meta"=>[
      "status"=>1,
      "msg"=>"c注册s出错了",
  ],
  "data"=>null];
  }
}
  echo json_encode($arr);