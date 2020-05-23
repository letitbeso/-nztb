
/* ******************详细信息********************************************8 */
function getDetails() {
    let goodsId = location.search.split("=")[1]
    /* 详细信息头 */
    $.get("./php/getGoodsInfo.php",{

        "goodsId":goodsId,

    },function(data){
        let htmlStr=` <h3 class="tb-main-title">  ${data.goodsName} </h3> `
        $(".tb-title").html(htmlStr);
        let htmlStr2=`${data.goodsPrice}`
        $(".tb-rmb-num").html(htmlStr2);


        let htmlStr3=`
                    <img id="largePic" src="${data.goodsImg}" alt="" />

                    <div class="zoom_pup" id="move"></div>
                    <!-- 放大 -->
                    <div id="detailPic" class="big_pic">
                        <img alt="" src="${data.goodsImg}" />
                    </div>
        `
        $("#largePicDiv").html(htmlStr3);


        let htmlStr4=`
                                <img src="${data.goodsImg}" alt="" />
                                <img src="${data.goodsImg}" alt="" />
        `
        $(".allImg").html(htmlStr4);



    },"json")

}

 /* 添加到购物车 */
 function addShoppingCar(){
    let goodsId = location.search.split("=")[1]
     $.post("./php/addShoppingCart.php",{
        "vipName":"付鹏飞",//暂时固定
        "goodsId":goodsId,
        "goodsCount":$("#J_IptAmount").val()
     },(data)=>{
         if(data=="0"){
             alert("添失败")
         }
         else{
             alert("添加成功")
         }
     })
     
 }
 
$(function () {
    getDetails()
    /* 加入购物车按钮 */
    $(".tb-btn-add").click(function(){
        addShoppingCar()
        return false
     })
    //  减
    $(".tb-reduce").click(function(){
        let count=parseFloat($("#J_IptAmount").val())
        count--
        if(count<=0){
            count=0
        }
        $("#J_IptAmount").val(count)
        return false
    })
    // 加
    $(".tb-increase").click(function(){
        let count=parseFloat($("#J_IptAmount").val())
        count++
        $("#J_IptAmount").val(count)
        return false
    })
    /* 跳到购物车 */
    $(".shopping_Car").click(function(){
        location.href="shopping_cart.html"
    })
})

