var index=0;
var timer = null;
function move(){
index++;
if(index === $('.ul li').length){
    index=0
}
    $('.ul li').eq(index).addClass('active').siblings().removeClass('active').parent().next().children().eq(index).addClass('active').siblings().removeClass('active')

}

$('a.rightBtn').click(move)
$('a.leftBtn').click(function(){
index--
if(index<0){
    index=$('.ul li').length-1
}
$('.ul li').eq(index).addClass('active').siblings().removeClass('active').parent().next().children().eq(index).addClass('active').siblings().removeClass('active')
})

timer = setInterval(move,1000)
$('.carousel').hover(function(){
clearInterval(timer)
},function(){
timer = setInterval(move,1000)
})

$('ol li').click(function(){
index=$(this).index()

$('.ul li').eq(index).addClass('active').siblings().removeClass('active').parent().next().children().eq(index).addClass('active').siblings().removeClass('active')
})



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



















var loadindex = layer.load(2,{
    shade:[1,'#fff']
})
 
$.ajax({
    url:"../php/goods.php",
    dataType:'json',
    data:{pid:949},
    success:res=>{
        var {data}=res
        var str = '';
        data.forEach(item => {
            str +=`
            <div> <a href="../detail.html?id=${item.id} "> <img src="${item.img}" alt=""></a> <a href="../detail.html?id=${item.id}">
            <p>${item.name}</p> <br>
           </a></div>
            `
        });
        $('.f1').html(str)

    }
})

$.ajax({
    url:"../php/goods.php",
    dataType:'json',
    data:{pid:1440},
    success:res=>{
        var {data}=res
        var str = '';
        data.forEach(item => {
            str +=`
            <div> <a href="../detail.html?id=${item.id} "> <img src="${item.img}" alt=""></a> <a href="../detail.html?id=${item.id}">
            <p>${item.name}</p> <br>
           </a></div>
            `
        });
        $('.f2').html(str)

    }
})

$.ajax({
    url:"../php/goods.php",
    dataType:'json',
    data:{pid:1427},
    success:res=>{
        var {data}=res
        var str = '';
        data.forEach(item => {
            str +=`
            
            <div> <a href="../detail.html?id=${item.id} "> <img src="${item.img}" alt=""></a> <a href="../detail.html?id=${item.id}">
            <p>${item.name}</p> <br>
            </a></div>
            `
        });
        $('.f3').html(str)

    }
})

$.ajax({
    url:"../php/goods.php",
    dataType:'json',
    data:{pid:1426},
    success:res=>{
        var {data}=res
        var str = '';
        data.forEach(item => {
            str +=`
            <div> <a href="../detail.html?id=${item.id} "> <img src="${item.img}" alt=""></a> <a href="../detail.html?id=${item.id}">
            <p>${item.name}</p> <br>
            </a></div>
            `
        });
        $('.f4').html(str)
        layer.close(loadindex)  

    }
    
})





$('.floor  li').click(function(){
    var index = $(this).index()
    console.log(index);
    if(index == $('.floor li').length-1){
        $('html,body').animate({
            scrollTop:0
        })
        return;
    }
    var target = $('.show').eq(index).offset().top
    $('html,body').animate({
        scrollTop:target-50
    })
})