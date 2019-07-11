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
    // var pageNo = document.getElementsByClassName('pagesindex').innerHTML;
    console.log(document.getElementsByClassName('pagesindex').innerHTML);
    var pageNo = "2";
    var type = "10";
    //创建XMLHttpRequest对象
    var xmlhttp=new XMLHttpRequest();
    
    xmlhttp.open("GET","http://study.163.com/webDev/couresByCategory.htm?pageNo="+ pageNo +"&psize=20&type="+ type,true);
    xmlhttp.send();
    //注册回调函数
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById('tab-con').getElementsByTagName('ul').innerHTML = xmlhttp.responseText;
            console.log(xmlhttp.responseText);
        }else{
            alert("error:"+xmlhttp.status);
        }
    }

}
couresByCategory();