<?php
 header("content-type:text/html;charset=utf8");
 $username = $_POST['username'];
 $goodsid = $_POST['goodsid'];
 $conn = mysqli_connect('localhost','root','root','huawei');
 mysqli_query($conn,'set names utf8');
 $res = mysqli_query($conn,"select * from history where userrname='$username'and goodsid='$goodsid'");
 $row = mysqli_fetch_all($res,MYSQLI_ASSOC);
if($row){
    mysqli_query($conn,"delete from history where id=".$row['id']);
}
mysqli_query($conn,"insert history(username,goodsid) values('$username',$goodsid)");