// var username = tool.getCookie('username')
// console.log(username);
var username = tool.getCookie('username')
if(username){
    $('.nav_r  ul li:first-child').html('√8。欢迎<a href="#">'+username+'</a>来到大型男性社交平台')
    $('.nav_r  ul li:last-child').html('<a href="#">退出</a>')
    $('.nav_r  ul li:last-child').click(function(){
        var conindex = layer.confirm('你个√8要退出去么',{
            btn:['是的不管你了','算了算了给你个机会']
        },function(){
            tool.removeCookie('username')
            $('.nav_r  ul li:first-child').html('<a href="login.html">登陆</a>')
            $('.nav_r  ul li:last-child').html('<a href="register.html">注册</a>')
            layer.close(conindex)
        },function(){
            layer.msg('你个吊毛你倒是退呀',{
                icon:1,
                time:1000
            })
        })
        return false;
    })

    





  
}
 





var arr = location.search.match(/id=(\d+)/)
    if(!arr){
        layer.msg('非法访问',{
            icon:2,
            time:2000
        },function(){
            location.href = "../1.html"
        })
    }
    // console.log(arr);
    var id = arr[1]
$.ajax({
        url:'../php/history.php',
        data:{
            username,
            goodsid:id,
        },
        method:"post" 
    })
    
    $.ajax({
        url:'../php/gethistory.php',
        data:{username},
        dataType:"json",
        success:res=>{
            var {data} = res;
            data = data.sort(function(a,b){
                return b.Id - a.Id
            }).slice(0,3)
            console.log(data);


   }
}) 



    var loadindex = layer.load(2,{
        shade:[1,'#fff']
    })

// 获取数据
$.ajax({
    url:"../php/detail.php",
    data:{id},
    dataType:"json",
    success:res=>{
        
        var {data} = res;
        var smallImg = data.img
        $('.small>img').attr('src',smallImg)
        $('.middle>img').attr('src',smallImg)
        $('.big>img').attr('src',smallImg)
        $('h2').html("商品名称"+data.name)
        $('.info p span').html("价格"+data.price)
      $('.jieshao').html(`${data.introduce}`)
        layer.close(loadindex)
        enlarge()
    }
})
function enlarge(){
  $('.middle').hover(function(){
    $('.enlarge .middle .shade').show()
    $('.enlarge .middle .big').show()
    $(this).mousemove(e=>{
        var x = e.pageX;
        var y = e.pageY;
        var l = x - $('.shade').width()/2
        var t = y - $('.shade').height()/2
        if(l<$('.enlarge').offset().left){
            l=$('.enlarge').offset().left
        }
        if(l>$('.enlarge').offset().left + $('.middle').width() - $('.shade').width()){
            l=$('.enlarge').offset().left + $('.middle').width() - $('.shade').width()
        }
        if(t<$('.enlarge').offset().top){
            t=$('.enlarge').offset().top
        }
        if(t>$('.enlarge').offset().top + $('.middle').height() - $('.shade').height()){
            t=$('.enlarge').offset().top + $('.middle').height() - $('.shade').height()
        }
        $('.enlarge .middle .shade').offset({
            left:l,
            top:t
        })
        var bigLeft = $('.shade').position().left / $('.middle').width() * $('.big>img').width()
        var bigTop = $('.shade').position().top / $('.middle').height() * $('.big>img').height()
        $('.big>img').css({
            left:-bigLeft + "px",
            top:-bigTop + "px"
        })
    })
},function(){
    $('.enlarge .middle .shade').hide()
    $('.enlarge .middle .big').hide()
})
}

// console.log($('.bottom_main .center p span'));

  $('.bottom_main .center p span').click(function(){
      // console.log( $(this).addClass('.av').siblings().removeClass('.av').parent().next().children().eq($(this).index()));
      // console.log(1);
      $(this).addClass('av').siblings().removeClass('av').parent().next().children().eq($(this).index()).addClass('av').siblings().removeClass('  av')
  })




  $('.add').click(function(){
    if(!username){
        layer.msg('请先登录',{
            icon:2,
            time:1500
        },function(){
            localStorage.setItem('url',location.href)
            location.href = "login.html"
        })
        return false;
    }
    var str = localStorage.getItem('cartData')
    if(str){
        var arr = JSON.parse(str)

        console.log(arr);
        var data = arr.find(item=>item.username === username && item.id === id)
        if(data){
            // 找到这个数据了
            data.number++
            localStorage.setItem('cartData',JSON.stringify(arr))
        }else{
            var obj = {
                id,
                number:1,
                username
            }
            arr.push(obj)
            localStorage.setItem('cartData',JSON.stringify(arr))
        }
    }else{
        // 购物车中没有数据
        var obj = {
            id,
            number:1,
            username
        }
        var arr = [];
        arr.push(obj)
        localStorage.setItem('cartData',JSON.stringify(arr))
    }
    
    layer.msg('购物车添加成功，请移步购物车结算',{
        icon:1,
        time:1500
    })
    
    return false;
})


