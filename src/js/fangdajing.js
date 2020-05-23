
function Mirror(oBox, obj) {//传入大图小图和相关属性
    // DOM相关的属性
    this.oBox = oBox
    
    // this.oImgBox = oImgBox;

    //放大后图片的属性。设置属性的默认值
    let defaultObj = {
        width: 80,
        height: 120,
        multiple: 3,
        color: "red",
        opacity: 0.3,
        left: 0, //镜子的位置
        top: 0,
        imgs: ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"]
    }


    // 相当于更新数据把要改的改下
    for (let key in obj) {
        defaultObj[key] = obj[key];
    }

    // 把defaultObj里的所有的属性赋给this
    for (let key in defaultObj) {
        this[key] = defaultObj[key];
    }
    // console.log(this.imgs)

    this.createDom();
    this.addEvent();
}

// 方法
// 创建dom的方法
Mirror.prototype.createDom = function () {
    let htmlStr = "";

    // 放大镜的html代码；
    htmlStr += `
        <div style="
                    position: absolute;
                    left: ${this.left}px;
                    top: ${this.top}px;
                    width: ${this.width}px;
                    height:${this.height}px;
                    background-color: ${this.color};
                    opacity: ${this.opacity};
                    display:none;
        ">
        </div>
    `;
    // 放大的效果
    let boxWidth = this.oBox.offsetWidth
    let boxHeight = this.oBox.offsetHeight
    htmlStr += `
        <div style="
                    position: absolute;
                    left: ${boxWidth + 20}px;
                    top: 0;
                    width: ${this.width * this.multiple}px;
                    height: ${this.height * this.multiple}px;
                    border: 1px solid pink;
                    background-image: url(${this.imgs[0]});
                    background-size: ${boxWidth * this.multiple}px ${boxHeight * this.multiple}px;
                    background-position: -${this.left * this.multiple}px -${this.top * this.multiple}px;
                    display:none;
        ">
        </div>        
    `
    //小图
    htmlStr += `
    <ul id="img-box" style="
        position: absolute;      
        width: 400px;
        height: 90px ;
        border:1px solid black;
        bottom: -90px;
    ">
    `
    for (let i = 0; i < this.imgs.length; i++) {
        htmlStr += `
        <li style="
           float: left;
           margin-left: 5px;
           width: 90px;
           height: 90px;
        ">
            <img src="${this.imgs[i]}" style="
            width: 100%;
            height: 100%;
            ">
        </li>
        `
    }

    htmlStr +=
        `
    </ul> 
    `
    // 把拼接好的html字符串放到盒子里
    this.oBox.innerHTML = htmlStr


}

// 给盒子绑定onmousemove事件
Mirror.prototype.addEvent = function () {
    //放大镜： 倒数第二个孩子
    let oMirrorBox = this.oBox.lastElementChild.previousElementSibling.previousElementSibling
    // 可视div：倒数第一个孩子
    let oShowBox = this.oBox.lastElementChild.previousElementSibling

    // 给大盒子增加事件
    this.oBox.onmouseenter = function () {
        oMirrorBox.style.display = "block"
        oShowBox.style.display = "block"
    }

    this.oBox.onmouseleave = function () {
        oMirrorBox.style.display = "none"
        oShowBox.style.display = "none"
    }

    // 放大效果       

    let boxOffsetLeft = this.oBox.offsetLeft//??????????
    let boxOffsetTop = this.oBox.offsetTop
    let boxWidth = this.oBox.offsetWidth
    let boxHeight = this.oBox.offsetHeight

    this.oBox.onmousemove = (event) => {
        let e = event || window.event;
        // 数据处理
        // 计算oMirrorBox应该出现的位置(基于父盒子oBox的left和top)
        // 鼠标距离页面的坐标的距离-大盒子距离页面的距离-放大镜的宽度的一半
        this.left = e.pageX - boxOffsetLeft - this.width / 2
        this.top = e.pageY - boxOffsetTop - this.height / 2

        // 2、处理边界
        if (this.left < 0) {
            this.left = 0
        } else if (this.left + this.width > boxWidth) {
            this.left = boxWidth - this.width
        }

        if (this.top < 0) {
            this.top = 0
        } else if (this.top + this.height > boxHeight) {
            this.top = boxHeight - this.height
        }

        // 外观
        // 移动放大镜
        oMirrorBox.style.left = this.left + "px"
        oMirrorBox.style.top = this.top + "px"

        // 2、改变show-box的背景图片的位置
        oShowBox.style.backgroundPosition = `-${this.left * this.multiple}px -${this.top * this.multiple}px`
    }

    // 给下面的图片列表增加事件
    let oLis = document.getElementById("img-box").children
    for (let i = 0; i < oLis.length; i++) {
        // 
        oLis[i].onmouseover = () => {
            // 改变img属性的值
            this.imgs[i] = oLis[i].firstElementChild.src
            // 大盒子背景图片
            this.oBox.style.backgroundImage = `url(${this.imgs[i]})`
            // 可视部分的背景图片
            oShowBox.style.backgroundImage = `url(${this.imgs[i]})`
        }
    }
}

