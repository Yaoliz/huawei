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




var arr = location.search.match(/cat=(\d+)/)
if(!arr){
    // 显示所有分类数据
    var cat = 'all'
}else{
    // 指定分类的数据
    var cat = arr[1]
}
var loadindex = layer.load(2,{
    shade:[1,'#fff']
})
getData(cat)

function getData(cat){
    $.ajax({
        data:{cat},
        url:'../php/list.php',
        dataType:'json',
        success:res=>{
            var {data} = res;
            if(data.length){
                // 给数据做分页显示
                // var pageSize =18
                // $(window).resize(function(){   
                    // console.log($(window).width());
                    // console.log(1);        //当浏览器大小变化时
                          //浏览器时下窗口可视区域高度
                          if( $(window).width()>960&&$(window).width()<1500){
                            var  pageSize = 20;
                        }else{
                            var pageSize = 18;
                        }
            //    });
              
                new Page('page',{},{
                    total:data.length,pageSize
                },function(currentPage){
                 
                    var arr = data.slice((currentPage-1)*pageSize,currentPage*pageSize) 
                    // console.log(data);
                     str = '';
                     arr.forEach(item=>{
                        str += `
                            <div class="l1">
                                <div class="l2">
                                    <img src="${item.img}">
                                    <div class="caption">
                                    <h3>${item.name}</h3>
                                    <p>￥${item.price}</p>
                                    <p><a href="detail.html?id=${item.id}" role="button">立即购买</a></p>
                                    </div>
                                </div>
                            </div>
                        `
                    })
                    $('.more').html(str)
                    layer.close(loadindex)
                })

                
            }else{
                layer.close(loadindex)
                $('.goods').html(`
                <div class="jumbotron">
                    <h1>当前分类下暂无商品!</h1>
                    <p>请移步首页重新查看分类</p>
                    <p><a href="../1.html">去首页</a></p>
                </div>
                `)
            }
        }
    })



    
}
