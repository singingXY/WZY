微专业大作业  
预览页面：
https://singingxy.github.io/WZY/


## 1 功能点

### 1.1 关闭顶部通知条

点击顶部通知条中的“X 不再提醒”后，刷新页面不再出现此通知条（使用本地cookie实现）。点击项的hover效果见视觉稿

### 1.2 关注“网易教育产品部”/登录

- 点击关注按钮：首先判断登录的cookie是否已设置（loginSuc）
- 如果未设置登录cookie，则弹出登录框，使用给定的用户名和密码（需要表单验证）调用服务器Ajax登录，成功后设置登录cookie
- 登录成功后，调用关注API，并设置关注成功的cookie（followSuc）
- 登录后“关注”按钮变成不可点的“已关注”状态。按钮的hover效果见视觉稿

### 1.3 顶部右侧导航及内容区各产品的“了解更多”

 点击导航中的“网易公开课”，“网易云课堂”，“中国大学MOOC”，新窗口打开对目的页面，对应的跳转链接如下，点击项的hover效果见视觉稿。点击“了解更多>”的跳转链接及打开方式相同。  
 网易公开课：http://open.163.com/  
 网易云课堂：http://study.163.com/  
 中国大学MOOC：http://www.icourse163.org/  
 
### 1.4 轮播图

   三张轮播图轮播效果：实现每5s切换图片，图片循环播放；鼠标悬停某张图片，则暂停切换；切换效果使用入场图片500ms淡入的方式。点击后新开窗口打开目的页面，对应的跳转链接如下，  
   banner1：http://open.163.com/  
   banner2：http://study.163.com/  
   banner3：http://www.icourse163.org/  
   
### 1.5 左侧内容区tab切换

 点击“产品设计”或“编程语言”tab，实现下方课程内容的更换。tab项的hover及选中效果见视觉稿，tab项对应的课程卡片数据见本文档的数据接口列表
 
### 1.6 查看课程详情

 鼠标悬停“产品设计”或“编程语言”tab下的任意课程卡片，出现浮层显示该课程的课程详情；鼠标离开课程详情浮层，则浮层关闭。课程卡片即详情浮层的效果见视觉稿，课程卡片及详情数据见本文档的数据接口列表
 
### 1.7 右侧“机构介绍”中的视频介绍

 点击“机构介绍”中的整块图片区域，调用浮层播放介绍视频。图片的hover效果见视觉稿，浮层中调用的播放器（不做浏览器兼容,可用html5）及视频内容接口见本文档的数据接口列表
 
### 1.8 右侧“热门推荐”

 实现每次进入或刷新本页面，“热门推荐”模块中，接口返回20门课程数据，默认展示前10门课程，隔5秒更新一门课程，实现滚动更新热门课程的效果。课程数据接口见本文档的数据接口列表
 
### 1.9 页面布局动态适应

 根据浏览器窗口宽度，适应两种视觉布局尺寸。窗口宽度<1205时，使用小屏视觉布局；窗口宽度>=1205时，使用大屏视觉布局。布局示意图见视觉效果


## 2 前后端交互接口说明

### 2.1 获取课程列表

| |	|  
|-|-|  
|请求地址格式|	http://study.163.com/webDev/couresByCategory.htm|  
|请求方式|	get类型|  
|请求参数|	pageNo ; psize ; type ;|  
|请求参数说明|	当前页码 ; 每页返回数据个数 ; 筛选类型（10：产品设计；20：编程语言） ;|  
|返回	|课程列表数据（JSON格式字符串，需要转成对象才能在程序中使用）|  
|返回数据说明|	需要显示的字段如下：<br>{<br>&emsp;&emsp;“totalCount”: 80,//返回的数据总数<br>&emsp;&emsp;“totalPage”: 8,//返回的数据总页数<br>&emsp;&emsp;“pagination”: {<br>&emsp;&emsp;&emsp;“pageIndex” : 1, //当前页码<br>&emsp;&emsp;&emsp;“pageSize” : 10, //每页的数据个数<br>&emsp;&emsp;&emsp;“totlePageCount”: //总页数<br>&emsp;&emsp;},<br>&emsp;&emsp;“list” : [{"id":"967019",//课程ID<br>&emsp;&emsp;"name":"和秋叶一起学职场技能",//课程名称<br>&emsp;&emsp;"bigPhotoUrl":"http://img1.ph.126.net/eg62.png",//课程大图<br>&emsp;&emsp;" middlePhotoUrl ":"http://img1.ph.126.net/eg62.png",//课程中图<br>&emsp;&emsp;"smallPhotoUrl":" http://img1.ph.126.net/eg62.png ",//课程小图<br>&emsp;&emsp;" provider ":"秋叶",//机构发布者<br>&emsp;&emsp;" learnerCount ":"23",//在学人数<br>&emsp;&emsp;" price ":"128",//课程价格，0为免费<br>&emsp;&emsp;"categoryName ":"办公技能",//课程分类<br>&emsp;&emsp;"description ":"适用人群：最适合即将实习、求职、就职的大学生，入职一、二三年的新人。别以为那些职场老人都知道！"//课程描述<br>&emsp;}]<br>}<br>|  

### 2.2 右侧“最热排行”

| |	| 
|-|-|  
|请求地址格式|	http://study.163.com/webDev/hotcouresByCategory.htm|
|请求方式|	get类型|
|请求参数|	无|
|请求参数说明|	无|
|返回|	课程列表数据（JSON格式字符串，需要转成数组才能在程序中使用）|
|返回数据说明|	需要显示的字段如下：<br>&emsp;[{<br>&emsp;&emsp;"id":"967019",//课程ID<br>&emsp;&emsp;"name":"和秋叶一起学职场技能",//课程名称<br>&emsp;&emsp;"bigPhotoUrl":"http://img1.ph.126.net/eg62.png",//课程大图<br>&emsp;&emsp;"middlePhotoUrl ":"http://img1.ph.126.net/eg62.png",//课程中图<br>&emsp;&emsp;"smallPhotoUrl":" http://img1.ph.126.net/eg62.png ",//课程小图<br>&emsp;&emsp;"provider ":"秋叶",//机构发布者<br>&emsp;&emsp;"learnerCount ":"23",//在学人数<br>&emsp;&emsp;"price ":"128",//课程价格，0为免费<br>&emsp;&emsp;"categoryName ":"办公技能",//课程分类<br>&emsp;&emsp;"description ":"适用人群：最适合即将实习、求职、就职的大学生，入职一、二三年的新人。别以为那些职场老人都知道！"//课程描述<br>&emsp;}] |

### 2.3 导航关注

| |	| 
|-|-|
|请求地址格式|	http://study.163.com/webDev/attention.htm|
|请求方式|	get类型|
|请求参数|	无|
|请求参数说明|	无|
|返回|	1|
|返回数据说明|	正确返回1后设置关注cookie（followSuc）|

### 2.4 用户登录

| |	| 
|-|-|
|请求地址格式|	http://study.163.com/webDev/login.htm|
|请求方式|	get类型|
|请求参数|	userName;<br>password;|
|请求参数说明|	固定用户帐号：studyOnline ;<br>固定用户密码：study.163.com ;<br>使用Md5加密该用户数据 ;|
|返回|	整型|
|返回数据说明	|1  //匹配用户名密码成功<br>0  //匹配用户名密码失败|

### 2.5 右侧“机构介绍”视频

| |	| 
|-|-|
|请求地址|	http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4| 

## 3 大作业要求

### 3.1 效果要求

正确还原视觉效果，正确测量大小宽高距离位置等数值，文字边框背景等颜色能正确取色。

### 3.2 功能要求

按照效果图和上面的功能点完成所有功能（可以不考虑跨域问题）。

### 3.3 兼容性要求

页面兼容IE8+、FF、Chrome，允许圆角、阴影只在高版本浏览器中实现。

### 3.4 HTML要求

完善的头部信息，代码缩进，正确使用语义化标签及实体，考虑SEO需要，正确嵌套标签，正确使用标签属性，规范的注释格式。

### 3.5 CSS要求

CSS文件内部规范化分类，命名和格式规范化，注释清晰，合理优化代码。

### 3.6 JS要求

1. 本作业要求不使用任何的JS框架
2. JS代码要求有统一的命名规范
3. JS代码要求整洁、紧凑、可读性好 
4. JS代码要求注释完整

### 3.7 其他要求

代码简洁性、通用性、扩展性、可读性、可维护性。
