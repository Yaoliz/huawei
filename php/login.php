<?php
header("content-type:text/html;charset=utf8");
$username = $_POST['username'];
$password = $_POST['password'];
$con = mysqli_connect("localhost","root","root","huawei");
mysqli_query($con,"set names utf8");
$res = mysqli_query($con,"select * from user where username='$username'");
$row = mysqli_fetch_assoc($res);
if($row){
    if($row['password'] === $password){
        $arr = [
            "meta"=>[
                "status"=>1,
                "msg"=>"你TM是个天才"
            ],
            "data"=>null
        ];
    }else{
        $arr = [
            "meta"=>[
                "status"=>2,
                "msg"=>"密码和账号都能记错么"
            ],
            "data"=>null
        ];
    }
}else{
    // 用户名不存在
    $arr = [
        "meta"=>[
            "status"=>0,
            "msg"=>"滚去注册"
        ],
        "data"=>null
    ];
}
echo json_encode($arr);