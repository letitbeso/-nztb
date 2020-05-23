// 当前播放的图片的序号
let ord = 0
// 定义定时器
let myTimer= null
let $img = $("#img-box>img")
let $li = $("#box ul>li")
let hrefs=["https://www.baidu.com",
            "http://www.1000phone.com",
            "https://www.baidu.com",
            "http://www.1000phone.com",
            "https://www.baidu.com"]

function autoPlay(){    
    myTimer = setInterval(function(){
        // 跳转到下一张图片上
        goImg(ord+1)
    },2000)
}

// 跳转到指定的图片上（transOrd就是要跳转的图片的序号）
function goImg(transOrd){
    // 数据的合法性处理
    // 健壮性
    if(transOrd==ord){  
        return //结束函数执行
    }

    // 逻辑
    // 数据处理
    // outOrd是淡出的图片序号，transOrd是要淡入的图片序号（即：跳转的图片序号）
    let outOrd = ord
    ord = transOrd

    // 边界处理
    if(ord>$img.length-1){
        ord=0
    }else if(ord<0){
        ord =$img.length-1
    }

    //外观：
    // 让一张图片淡出，一张图片淡入

    $img.eq(outOrd).animate({"left":-520},500)
    $img.eq(ord).css({"left":"520px"})
    $img.eq(ord).animate({"left":0},500)    
   // 3.2变豆豆
    $li.eq(outOrd).css({"background-color":"#fff"})
    $li.eq(ord).css({"background-color":"#ff0000"})
}

function stopPlay(){
    window.clearInterval(myTimer)
    myTimer = null
}

$(function(){
    //自动播放
    autoPlay()

    //点击豆豆跳转到对应的图片上
    $("#box>ul>li").click(function(){
        stopPlay()
        goImg($(this).index())
    })

    //鼠标放入停止
    $("#img-box").mouseover(function(){
        stopPlay()
    })

    //鼠标离开继续播放    
    $("#img-box").mouseout(function(){
        autoPlay()
    })

    //左右箭头
    let $span = $("#box>span")
    // 左箭头
    $span.eq(0).click(function(){
        stopPlay()
        goImg(ord-1)
    })
    // 右箭头
    $span.eq(1).click(function(){
        stopPlay()
        goImg(ord+1)
    })

    // 超链
    $("#img-box").click(function(){
        window.open(hrefs[ord])
    })

})