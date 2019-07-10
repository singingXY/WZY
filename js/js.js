//关闭顶部消息
function closeTop(){
    document.getElementById('top_msg').style.display='none';
    setCookie("topmsg","yes");
}
//
function setCookie(cname,cvalue){
    document.cookie = cname + "=" + cvalue + ";path=/";
}

function onloadcookie(){
    if(document.cookie.indexOf("topmsg=")==-1) {
        document.getElementById('top_msg').style.display='block';
    }
}

onloadcookie();


//AJAX
function loadXMLDoc(url,cfunc){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=cfunc;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function couresByCategory()
{
    var pageNo = document.getElementsByClassName('pagesindex').innerHTML;
    var type = "10";
    if(document.getElementById('tab-nav'))
    loadXMLDoc("http://study.163.com/webDev/couresByCategory.htm?pageNo="+ pageNo +"&psize=20&type="+ type,function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById('tab-con').getElementsByTagName('ul').innerHTML = xmlhttp.responseText;
            
        }else{
            alert("发生错误"+xmlhttp.status);
        }
    })



}
