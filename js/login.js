var remusername = tool.getCookie('remusername')
$('.login_bot').click(function(){
  // 用户名密码不能为空空
  if($('input[name="username"]').val() === ''){
      layer.msg('填个名字可以吗',{
          icon:2,
          time:1500
      })
      return false;
  }
  if($('input[name="password"]').val() === ''){
      layer.msg('密码密码你密码呢',{
          icon:2,
          time:1500
      })
      return false;
  }
  // 加载层
  var loadindex = layer.load(2, {
      shade: [1,'#fff'] //0.1透明度的白色背景
    })
    // 禁用按钮
  // $(this).prop('disabled',true)
  $.post('../php/login.php',{
      username:$('input[name="username"]').val(),
      password:$('input[name="password"]').val()
  },res=>{
      var {meta:{status,msg},data} = res;
      layer.close(loadindex)
      if(status===1){
          layer.msg(msg,{
              icon:1,
              time:1500
          },function(){
              // 添加cookie 
              tool.setCookie('username',$('input[name="username"]').val(),7200)
                  // 存cookie
              tool.setCookie('remusername',$('input[name="username"]').val(),3600*24*7)


              var url = localStorage.getItem('url')
              if(url){
                  // 清空本地存储中的url 
                  location.href = url
                  localStorage.removeItem('url')
                 
              }else{
                 location.href = "../1.html"
              }

             
              
          })
      }else{
          layer.msg(msg,{
              icon:2,
              time:1500
          })
          $(this).prop('disabled',false)
          return false;
      }
  },'json')
  return false;
})