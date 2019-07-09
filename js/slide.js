
function byid(id){
/*首先条件：检测Id类型和值都要等于字符串，如果是则执行代码1:document.getElementById(id)，否则执行代码2：id*/
return	typeof(id) === "string"?document.getElementById(id):id;//三元操作符
/*return 弹出这个条件*/
}

var index = 0,//定义一个全局变量，记录索引
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
			index++;//每隔3秒索引+1
			if(index >= len){//判断如果索引值大于等于数组长度，就强制让它返回索引为0的图片
				index = 0;
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
		index = this.id;
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
	pics[index].style.opacity='1'; 
	dots[index].className = "action";
};
slideImg();//调用slideImg()方法






//tab切换
var lis = document.getElementById("tab-nav").getElementsByTagName("li");
var divs = document.getElementById("tab-con").getElementsByTagName("div");
for(var i=0;i<lis.length;i++){
    lis[i].onclick = function(){
        for(var i=0;i<lis.length;i++) {
            if (this == lis[i]) {
                lis[i].classList.add("on");
                divs[i].classList.add("on");
            }
            else {
                lis[i].classList.remove("on");
                divs[i].classList.remove("on");
            }
        }
    }
}