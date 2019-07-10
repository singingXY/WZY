//关闭顶部消息
function closeTop(){
    document.getElementById('top_msg').style.display='none';
    setCookie("topmsg","yes");
    console.log("2"+ document.cookie );
    console.log(document.cookie.indexOf("topmsg="));
}

function setCookie(cname,cvalue){
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function onloadcookie(){
    console.log(document.cookie.indexOf("topmsg="));
    if(document.cookie.indexOf("topmsg=")==-1) {
        document.getElementById('top_msg').style.display='block';
    }
}

onloadcookie();