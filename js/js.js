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
function couresByCategory(){
    var pageNo = document.getElementById('pagesindex').innerHTML;
    var type = "10";
    //创建XMLHttpRequest对象
    var xmlhttp=new XMLHttpRequest();
    
    xmlhttp.open("GET","https://study.163.com/webDev/couresByCategory.htm?pageNo="+ pageNo +"&psize=20&type="+ type,true);
    xmlhttp.send();
    //注册回调函数
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState == 4){
            if((xmlhttp.status >= 200 && xmlhttp.status <300) || xmlhttp.status == 304){
                //转为json对象
                var CategoryData =JSON.parse(xmlhttp.responseText);
                //console.log(CategoryData);
                var list = CategoryData.list;
                //遍历输出
                var str = "";
                for ( i = 0; i < list.length; i++) {
                    //如果价格为0显示免费
                    var price =list[i].price;
                    if (price == 0) {
                        price ="免费";
                    }else{price ="￥"+price;}

                    str += '<li>'+
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
                document.getElementById('tab-conul').innerHTML = str;
            }else{
                alert("error:"+xmlhttp.status);
            }
        }   
    }

}
couresByCategory();