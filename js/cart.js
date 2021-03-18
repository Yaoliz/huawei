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
}else{
  layer.msg('爬去登陆再来',{
      icon:2,
      time:1500
  },function(){
      localStorage.setItem('url',location.href)
      location.href = "../login.html"
  })
}


var cccindex = layer.load(2,{
  shade:[1,'#fff']
})

var str = localStorage.getItem('cartData')
// 判断是否有数据
if(str){
    
    var arr = JSON.parse(str)
    // 筛选出属于当前用户的数据
    arr = arr.filter(item=>item.username === username)
    // 判断是否筛选出当前用户的数据
    if(arr.length){
        // 显示数据
        console.log(arr);
        // 将购物车数据中的所有商品id组合一起发送到php去获取数据
        var ids = arr.map(item=>item.id).join(',')
        $.ajax({
            url:"../php/cart.php",
            data:{ids},
            dataType:"json",
            success(res){
                var {data} = res;
                console.log(data);
                var str = '';
                for(var i=0;i<data.length;i++){
                    // data[i].id
                    var number = arr.find(item=>item.id === data[i].id).number
                    str += `
                        <tr>
                            <td><input type="checkbox" name="selectOne"></td>
                            <td><img src="${data[i].img}" width="50" height="50"></td>
                            <td>${data[i].name}</td>
                            <td class="price">单价：￥<span>${data[i].price}</span></td>
                            <td class="number" data-stock="${data[i].stock}">
                                <button class="reduce">-</button>
                                <input type="number"  class= "shu" name="number" value="${number}">
                                <button class="add">+</button>
                            </td>
                            <td class="subtotal">小计：￥<span>${data[i].price * number}</span>元</td>
                            <td data-id="${data[i].id}"><button class="remove">删除</button></td>
                        </tr>
                    `
                }
                $('.cart table tbody').html(str)
                selectAll()
                selectOne()
                addAndReduce()
                subtotal()
                total()
                removeCart()
                layer.close(cccindex)
            }
          
        })  
    }else{
        layer.close(loadindex)
        empty()
    }
}else{
    layer.close(loadindex)
    empty()
}
// 显示空空如也
function empty(){
    $('.cart').html(`
        <div class="jumbotron">
            <h1>车就算了 购物车怎么能空的 !</h1>
            <p>不如去采购些许 感受购物快感</p>
            <p><a class="" href="../1.html" role="button">去首页</a></p>
        </div>
    `)
}
// 移出购物车
function removeCart(){
    $('.remove').click(function(){
        var that = this
        layer.confirm('你TMD要狠心删除吗？',{
            btn:['删了','不删了']
        },function(){
            // 节点移出
            $(that).parent().parent().remove()
            // 移出本地存储
            var arr = JSON.parse(localStorage.getItem('cartData'))
            var id = $(that).parent().attr('data-id')
            var index = arr.findIndex(item=>item.id == id && item.username === username)
            arr.splice(index,1)
            localStorage.setItem('cartData',JSON.stringify(arr))
            layer.msg('老夫卷了不理你了',{
                icon:1,
                time:1500
            })
            // 判断购物车数据是否为空
            arr = JSON.parse(localStorage.getItem('cartData'))
            var data = arr.filter(item=>item.username === username)
            if(!data.length){
                empty()
            }
        },function(){
            layer.msg('赶紧删了我别留着 看你碍眼',{
                icon:1,
                time:1500
            })
        })
    })
}
// 计算总数量和总价
function total(){
    // 所有选中的
    var totalnum = 0
    var totalprice = 0
    $('[name="selectOne"]:checked').each((index,item)=>{
        totalnum += $(item).parent().siblings('.number').children('[name="number"]').val() - 0
        totalprice += $(item).parent().siblings('.subtotal').children('span').text() - 0
    })
    $('.totalnum').text(totalnum)
    $('.totalprice').text(totalprice)
}
// 计算小计
function subtotal(){
    $('tbody .price').each((index,item)=>{
        var price = $(item).children('span').text() - 0;
        var number = $(item).next().children('[name="number"]').val() - 0;
        var sub = price * number;
        $(item).siblings('.subtotal').children('span').text(sub)
    })
}
// 数量加减功能
function addAndReduce(){
    $('.reduce').click(function(){
        var number = $(this).next().val()-0;
        number--;
        if(number<=1){
            number=1
        }
        $(this).next().val(number)
        var data = JSON.parse(localStorage.getItem('cartData'))
        var id = $(this).parent().siblings().last().attr('data-id')
        var currentData = data.find(item=>item.username === username && item.id == id)
        currentData.number = number;
        localStorage.setItem('cartData',JSON.stringify(data))
        subtotal()
        total()
    })

    $('.add').click(function(){
        var number = $(this).prev().val()-0;
        number++;
        if(number>=$(this).parent().attr('data-stock')){
            number = $(this).parent().attr('data-stock')-0
        }
        $(this).prev().val(number)
        var data = JSON.parse(localStorage.getItem('cartData'))
        var id = $(this).parent().siblings().last().attr('data-id')
        var currentData = data.find(item=>item.username === username && item.id == id)
        currentData.number = number;
        localStorage.setItem('cartData',JSON.stringify(data))
        subtotal()
        total()
    })
}
// 单选功能函数
function selectOne(){
    $('[name="selectOne"]').click(function(){
        // 判断是否所有单选都选中了
        // 将元素集合伪数组转为数组
        var arr = Array.prototype.slice.call($('[name="selectOne"]'))
        // 调用every方法
        var bool = arr.every(item=>item.checked)
        $('[name="selectAll"]').prop('checked',bool)
        total()
    })
}
// 全选功能函数
function selectAll(){
    $('[name="selectAll"]').click(function(){
        $('[name="selectOne"]').prop('checked',$(this).prop('checked'))
        $('[name="selectAll"]').prop('checked',$(this).prop('checked'))
        total()
    })
}