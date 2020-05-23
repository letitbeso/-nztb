    //切换图片
    $(".allImg img").mouseover(function() {
        $(".allImg img").removeClass("current");
        $(this).addClass("current");
        var src = $(this).attr("src");
    
        $("#largePic").attr("src", src.replace("_x", "_w"));
        $("#detailPic img").attr("src", src.replace("_x", "_b"));
     
      });
       
      //放大镜效果
      $("#largePicDiv").bind("mousemove",
        function(e) {
          var ev = e || event;
          var mouseX = ev.pageX;
          var mouseY = ev.pageY;
          var picLeft = $("#largePic").offset().left;
          var picTop = $("#largePic").offset().top;
          var picWidth = $("#largePic").width();
          var picHeight = $("#largePic").height();
          var xLength = mouseX - picLeft;
          var yLength = mouseY - picTop;
          var qWidth = picWidth / 4;
          var lastQWidth = picWidth - picWidth / 4;
          var qHeight = picHeight / 4;
          var lastQHeight = picHeight - picHeight / 4;
          if (xLength < qWidth) {
            $("#move").css("left","0px");
          } else {
            if (xLength > lastQWidth) {
              $("#move").css("left", (lastQWidth - qWidth) + "px");
            } else {
              $("#move").css("left", (xLength - qWidth) + "px");
            }
          }
          if (yLength < qHeight) {
            $("#move").css("top", "0px");
          } else {
            if (yLength > lastQHeight) {
              $("#move").css("top", (lastQHeight - qHeight) + "px");
            } else {
              $("#move").css("top", (yLength - qHeight) + "px");
            }
          }
          $("#detailPic > img").css("left", parseInt($("#move").css("left")) * (-800 / picWidth) + "px").css("top", parseInt($("#move").css("top")) * (-800 / picWidth) + "px").css("position", "absolute");
        });