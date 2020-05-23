//获取购物车数据
function getShoppingCar(cb){
    $.get("./php/getShoppingCart.php",{"vipName":"付鹏飞"},function(datas){
        let htmlStr=""
        datas.forEach(goods => {
            htmlStr+=`
            <div class="car_box">
            <div class="car_box_h">
                <div class="car_box_h_c">
    
                    <input type="checkbox">
    
                    &nbsp;&nbsp;店铺:
                    <a href="">店铺名</a>
                    <!-- 旺旺头像 -->
                    <span>
                        <a href="">
                            <img src="./img/wangwang.png" alt="">
                        </a>
                    </span>
    
                </div>
            </div>
            <div class="car_box_con clear_fix">
                <div class="car_box_con_box">
                    <ul>
                        <li>
                            <div class="tb_inner">
                                <input type="checkbox">
                            </div>
                        </li>
                        <li>
                            <div class="tb_inner">
                                <div class="tb_inner_l">
                                    <a href="">
                                        <img src=" ${goods.goodsImg}" alt="">
                                    </a>
                                </div>
                                <div class="tb_inner_r">
                                    <div class="item-basic-info">
                                        <a href="#" target="_blank" class="item-title ">
                                        ${goods.goodsName}
                                        </a>
                                    </div>
                                    <div class="item-other-info">
    
                                        <div class="promo-logos"> </div> <!-- 占空 -->
                                        
                                        <!-- con -->
                                        <div class="item-icon-list clearfix">
                                            <div class="item-icons">
                                                <span class="item-icon item-icon-0" title="支持信用卡支付">
                                                    <img src="./img/car_img01.png" alt="">
                                                </span>
                                                <a href="#" target="_blank" class="item-icon item-icon-1 ">
                                                    <img src="./img/car_img02.png" alt="">
                                                </a>
                                                <a href="#" target="_blank" class="item-icon item-icon-2 ">
                                                    <img src="./img/car_img03.png" alt="">
                                                </a>
                                            </div>
                                            <div style="display: none;">${goods.goodsId}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-props "></div>
                        </li>
                        <li>
                            <div class="td-inner">
                                <div>
                                    <div class="price-content">
                                        <div class="price-line">
                                            <em class=" price-now">
                                                ￥${goods.goodsPrice}
                                            </em>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                        </li>
                        <li>
                            <div class="td-inner">
                                <div class="amount-wrapper">
                                    <div class="item-amount ">
                                        <a href="#" class=" minus">
                                            -
                                        </a>
                                        <input type="text" value="${goods.goodsCount}" class=" text-amount">
                                        <a href="#" class=" plus">
                                            +
                                        </a>
                                    </div>
                                    <div class="amount-msg ">
    
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="td-inner">
                                <em tabindex="0" class=" number   number_zong">
                                    ￥${goods.goodsPrice*goods.goodsCount}
                                </em>
                            </div>
                        </li>
                        <li>
                            <div class="td-inner">
                                <a  class="btn-fav J_Fav J_MakePoint"  href="#">移入收藏夹</a>
                                <br>
                                <a href="javascript:;"class="J_Del J_MakePoint">删除</a>
                             
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
    
        </div>
            `
            /* 添加到 J_OrderList中*/
        $("#J_OrderList").html(htmlStr)
        cb()

        });

    },"json")
}


//修改购物车中商品数量
function updateCount(goodaId,goodsCount){
    $.get("./php/updateGoodsCount.php",{
        "vipName":"付鹏飞",
         "goodsId":goodaId,
         "goodsCount":goodsCount
    },function(data){
        if(data=="0"){
            alert("修改数量失败")
        }
    })

}

$(function(){
    getShoppingCar(addEvent)
})

//事件绑定
function addEvent(){
    //  减
    $(".minus").click(function(){
        
        let count=parseFloat($(this).next().val())
        count--
        if(count<=0){
            count=0
        }

        let goodsId = $(this).parent().next().html()
        updateCount(goodsId,count)
        //前
        $(this).next().val(count)
        upDataNumber(count,$(this))
        return false
    })
    // 加
    $(".plus").click(function(){
        let count=parseFloat($(this).prev().val())
        count++

        //获取id
        let goodsId = $(this).parent().next().html()
        //后端修改
        updateCount(goodsId,count)


        
        //前端修改
        $(this).prev().val(count)
        upDataNumber(count,$(this))
        return false
    })

    //单项金额number
    function upDataNumber(coun,ele){
        let str=ele.parent().parent().parent().parent().prev().children().children().children().children().children().html()
        let a =str.replace(/\D+/g,"")*coun
        ele.parent().parent().parent().parent().next().children().children().html(a)
    }


}