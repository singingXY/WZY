

//关闭顶部消息
function closeTop(){
    document.getElementById('top_msg').style.display='none';
    setCookie("topmsg","yes");
}
//写入cookie
function setCookie(cname,cvalue){
    document.cookie = cname + "=" + cvalue + ";path=/";
}
//判断是否添加过cookie
function onloadcookie(){
    if(document.cookie.indexOf("topmsg=")==-1) {
        document.getElementById('top_msg').style.display='block';
    }
}

onloadcookie();



//AJAX
var pageNo = document.getElementById('pagesindex').innerHTML;

var type=10;
function couresByCategory(type,pageNo){
    
    //创建XMLHttpRequest对象
    var xmlhttp=new XMLHttpRequest();
    
    xmlhttp.open("GET","https://study.163.com/webDev/couresByCategory.htm?pageNo="+ pageNo +"&psize=20&type="+ type,true);
    xmlhttp.send();
    //注册回调函数
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4){
            if((xmlhttp.status >= 200 && xmlhttp.status <300) || xmlhttp.status == 304){
                loadCourse(xmlhttp.responseText);
            }else{
                alert("error:"+xmlhttp.status);
            }
        }   
    }
    

}
couresByCategory(type,pageNo);


function loadCourse(data){
    //转为json对象
    var CategoryData =JSON.parse(data);
    //console.log(CategoryData);
    var list = CategoryData.list;
    
    //遍历输出
    var CourseHtml = "";
    for ( i = 0; i < list.length; i++) {
        //如果价格为0显示免费
        var price =list[i].price;
        if (price == 0) {
            price ="免费";
        }else{price ="￥"+price;}

        CourseHtml += '<li>'+
        '<img class="listpic" src="'+list[i].bigPhotoUrl+'" alt="">'+
        '<h5>'+list[i].name+'</h5>'+
        '<p class="liname">'+list[i].provider+'</p>'+
        '<p class="licount"><span>'+list[i].learnerCount+'</span></p>'+
        '<p class="liprice">'+price+'</p>'+
        '<div class="details">'+
        '<img class="listpic" src="'+list[i].bigPhotoUrl+'" alt="">'+
        '<div class="fl">'+
        '<h5>'+list[i].name+'</h5>'+
        '<p class="licount">'+list[i].learnerCount+'人在学</p>'+
        '<p class="liname">发布者：'+list[i].provider+'</p>'+
        '<p class="liname">分类： '+list[i].categoryName+'</p>'+
        '</div>'+
        '<p class="introduce">'+list[i].description+'</p>'+
        '</div>'+
        '</li>';
    }
    document.getElementById('tab-conul').innerHTML = CourseHtml;

    //分页
    var pagesHtml='';
    var count = 1;
    console.log(CategoryData.pagination.pageIndex,CategoryData.totalPage,CategoryData.pagination.totlePageCount);
    for ( i = 0; i < CategoryData.totalPage; i++) {

        pagesHtml+='<li';
        if(i == CategoryData.pagination.pageIndex-1){
            pagesHtml+=' id="pagesindex"';
        }
        pagesHtml+='>'+count+'</li>';
        count++;

    }
    document.getElementById('pagesUl').innerHTML = pagesHtml;
}



//tab切换 课程列表
var lis =document.getElementById("tab-nav").getElementsByTagName("li");
for(var i=0;i<lis.length;i++){
    lis[i].onclick = function(){
        for(var i=0;i<lis.length;i++) {
            if (this == lis[i]) {
                lis[i].classList.add("on");
                if(i==0){type=10;couresByCategory(type,pageNo);}
                if(i==1){type=20;couresByCategory(type,pageNo);}
            }
            else {
                lis[i].classList.remove("on");
            }
        }
    }
}

//分页
var pages = document.getElementById('pages');

pages.getElementsByClassName('prev')[0].onclick =function(){
    if(pageNo>1){
        pageNo = pageNo-1;
        couresByCategory(type,pageNo);
    }
}
pages.getElementsByClassName('next')[0].onclick =function(){
    pageNo = pageNo+1;
    couresByCategory(type,pageNo);
}

var pagesli =pages.getElementsByTagName('li');
for(var i=0;i<pagesli.length;i++){
    pagesli[i].onclick = function(){
        
        console.log(this+"222222");
        pageNo = this.innerHTML;
        console.log(this.innerHTML);
        couresByCategory(type,pageNo);
    }
}

//右侧热门
function hotcoures(){
    //创建XMLHttpRequest对象
    var xmlhttp=new XMLHttpRequest();
    
    xmlhttp.open("GET","https://study.163.com/webDev/hotcouresByCategory.htm",true);
    xmlhttp.send();
    //注册回调函数
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4){
            if((xmlhttp.status >= 200 && xmlhttp.status <300) || xmlhttp.status == 304){
                //转为json对象
                var hotData =JSON.parse(xmlhttp.responseText);
                //console.log(hotData);
                //遍历输出
                var hotHtml = "";
                for ( i = 0; i < hotData.length; i++) {
                    hotHtml += '<li>'+
                    '<img class="hotpic" src="'+hotData[i].smallPhotoUrl+'" alt="">'+
                    '<p class="litit">'+hotData[i].name+'</pc>'+
                    '<p class="licount">'+hotData[i].learnerCount+'</p>'+
                    '</li>';
                }
                document.getElementById('hotcoures').innerHTML = hotHtml;

                //滚动
                var hotcouresUl = document.getElementById('hotcoures');
                hotcouresUl.innerHTML+=hotcouresUl.innerHTML;
                function hotMove(){
                    if (hotcouresUl.scrollTop>=(hotcouresUl.scrollHeight/2)) {
                        //当滚动的距离大于等于ul的高度时，把它的位置归到初始化
                        hotcouresUl.scrollTop=0;
                    }else{
                        hotcouresUl.scrollTop+=70;
                    }
                }
                setInterval(hotMove,5000);
            }else{
                alert("error:"+xmlhttp.status);
            }
        }   
    }
}
hotcoures();

//视频弹窗
var mask = document.getElementById('mask');
var videoWin = document.getElementById('videoWin');
var videoClose = document.getElementById('videoClose');
document.getElementById('videoImg').onclick = function(){
    mask.style.display ="block";
    videoWin.style.display ="block";
}
videoClose.onclick = closeVideo;
mask.onclick = closeVideo;
function closeVideo(){
    videoWin.style.display ="none";
    mask.style.display ="none";
}




//轮播图
function byid(id){
    /*检测Id类型和值都要等于字符串，如果是则执行代码1:document.getElementById(id)，否则执行代码2：id*/
    return	typeof(id) === "string"?document.getElementById(id):id;
    }
    
    var bindex = 0,//定义一个全局变量，记录索引
       timer = null,//定时器
       pics = byid("pics").getElementsByTagName("div"),//取id为banner下的div 得到数组
       dots = byid("dots").getElementsByTagName("span"),
       len = pics.length;//定义len得到数组pics的长度
    /*接下来将所有操作定义在函数slideImg里*/
    function slideImg(){
        var banner = byid("banner");
        //鼠标滑过时清除定时器，离开继续
        banner.onmouseover = function(){//鼠标划过时触发
            //如果timer为真时 清除定时器；
            if(timer) clearInterval(timer);//clearInterval：清除定时器；
        }
        banner.onmouseout = function(){//鼠标离开时触发
            timer = setInterval(function(){//每隔3秒调用一次里面的脚本
                bindex++;//每隔3秒索引+1
                if(bindex >= len){//判断如果索引值大于等于数组长度，就强制让它返回索引为0的图片
                    bindex = 0;
                }
                //切换图片
                charImg();
            },5000);//间歇调用
        }
        //调用onmouseout方法，自动在banner上触发鼠标离开的事件。
        banner.onmouseout();//进行自动轮播，无需触碰
        
        //遍历所有点击，且绑定点击事件，点击圆点切换图片
        for(var d = 0; d<len ; d++){
            /*给所有span添加一个id的属性，值为d，作为当前span的索引*/
            dots[d].id = d;
            dots[d].onclick = function(){//function()函数能够改变作用域
                //改变Index为当前span的Id值
            bindex = this.id;
            this.className = "active";//this 指向对象 相当于span
            //调用charImg，实现图片的切换
            charImg();
            }
        }
    }
    
    //切换图片
    function charImg(){
        //遍历banner下的所有的div,将其隐藏
        for(var i = 0;i<len;i++){
        //遍历所有banner下的div以及dots下的span,并把每个div都隐藏，并将span类清除。
            pics[i].style.opacity = "0";
            dots[i].className = "";
        }
        //根据index索引找到当前div和span，将其显示出来并设为当前。
        pics[bindex].style.opacity='1'; 
        dots[bindex].className = "action";
    };
    slideImg();