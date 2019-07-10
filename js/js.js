//关闭顶部消息
function closeTop(){
    document.getElementById('top_msg').style.display='none';
    setCookie("topmsg","yes");
}

function setCookie(cname,cvalue){
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function onloadcookie(){
    if(document.cookie.indexOf("topmsg=")==-1) {
        document.getElementById('top_msg').style.display='block';
    }
}

onloadcookie();