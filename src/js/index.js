


/* 添加猜你喜欢的图文渲染 */
function getCainixihuan() {
    $.get("./php/getGoodsList.php", "typeId=03", function (datas) {
        let htmlStr = ` <style>
        body a {
            color: #3C3C3C;
        }

        .item {
            float: left;
            padding: 20px 20px 0 20px;
            border: 1px solid transparent;
            color: #6c6c6c;
            width: 196px;
            height: 312px;
            overflow: hidden;
            position: relative;

            transition: border-color 0.3s;
            border-right-color: #f4f4f4;
            border-bottom-color: #f4f4f4;
        }

        .hotsale-item .img-wrapper {
            width: 197px;
            height: 197px;
            overflow: hidden;
        }

        /* .img-wrapper {
            background: #4f4f4f;
        } */

        .hotsale-item .img-wrapper img {
            display: block;
            width: 101%;
            height: 100%;
            -webkit-transition: opacity 0.2s;
            -moz-transition: opacity 0.2s;
            -o-transition: opacity 0.2s;
            transition: opacity 0.2s;
        }

        .img-wrapper img {
            opacity: .9;
            background: #fff;
        }

        .hotsale-item h4 {
            margin-top: 7px;
            line-height: 22px;
            height: 44px;
            font-size: 14px;
            color: #666;
            font-weight: normal;
            transition: color 0.3s;
            overflow: hidden;

        }

        .item .info {
            margin-top: 22px;
            height: 24px;
            line-height: 24px;
        }

        .item .price {
            float: left;
            color: #F40;
            font-size: 20px;
        }

        .item .price em {
            font-family: "Microsoft Yahei";
            display: inline-block;
            zoom: 1;
            letter-spacing: normal;
            word-spacing: normal;
            vertical-align: top;
            margin-right: 2px;
            font-size: 12px;
            vertical-align: inherit;
        }

        .item .sales {
            float: right;
            color: #9ca0aa;
            margin-top: 3px;
        }


        /* 隐藏 */
        .item-more {
            display: none;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 236px;
            height: 82px;
            background: #FF5000;
        }

        .item:hover {
            border: 1px solid #FF5000;
        }

        .item:hover img {
            opacity: 1;
        }

        .item:hover .item-more {
            display: block;

        }

        .item-more p {
            line-height: 22px;
            font-size: 12px;
            height: 22px;
            color: #fff;
            text-align: center;
        }

        .item-more .similar {
            margin: 0 auto;
            width: 120px;
            margin-top: 15px;
            line-height: 32px;
            height: 32px;
            font-size: 18px;
            font-weight: normal;
            border-bottom: 1px solid #FE964A;
        }

        .tb-ifont {
            font-family: iconfont !important;
            font-size: 14px;
            font-style: normal;
            display: inline-block;
            text-decoration: none;

        }

        .item-more .love {
            font-size: 16px;
            margin-right: 4px;
        }

        .tb-ifont {
            font-family: iconfont !important;
            font-size: 14px;
            font-style: normal;
            display: inline-block;
            text-decoration: none;

        }
    </style>`

        datas.forEach(goods => {
            htmlStr += `
        <div class="item">
            <a href="details.html?goodsId=${goods.goodsId}">
              <div class="img-wrapper">
                 <img src="${goods.goodsImg}">
              </div>
              <h4>${goods.goodsName}</h4>
            </a>
            <p class="info">
              <span class="marks hotsale-hide"></span>
              <span class="price"><em>¥</em>${goods.goodsPrice}</span>
              <span class="sales">销量:${goods.goodsCount}</span>
            </p>
            <a class="item-more" href="#">
              <p class="similar"><i class="tb-ifont love">❤</i>找相似</p>
              <p>发现更多相似的宝贝<span class="tb-ifont">›</span></p>
            </a>
        </div>
        `
        })
        $(".tbh-hotsale .list").html(htmlStr);
    },"json");
}
$(function () {
    getCainixihuan()
})


