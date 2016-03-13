<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset='UTF-8'>
	<style type="text/css">
	* {
		padding: 0;
		margin: 0;
	}
	body {
		padding: 50px 0;
	}
	.slider,.main {
		width: 100%;
		height: 400px;
		position: relative;
	}
	.main {
		overflow: hidden;
	}
	.main-i {

	}
	.main-i img {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.main .caption {
		position: absolute;
		right: 50%;
		top: 30%;
		z-index: 9;
	}
	.main-i .caption h2{
		text-align: right;
		font-size: 40px;
		line-height: 50px;
	}
	.main-i .caption h3 {
		font-size: 70px;
		line-height: 70px;
	}
	.slider .ctrl {
		height: 13px;
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		bottom: -13px;
		background-color: red;
	}
	.ctrl-i {
		display: inline-block;
		width: 150px;
		height: 100%;
		background-color: gray;
		box-shadow: 0 1px 1px rgba(0,0,0,0.3);
		position: relative;
		margin-left: 1px;
	}	
	.ctrl-i img {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 50px;
		z-index: 1;
		opacity: 0;
		transition:all 2s;
	}
	.ctrl-i:hover {
		background-color: #F0F0F0;
	}
	.ctrl-i:hover img {
		bottom: 13px;
		opacity: 1;
	}
	/* active 当前展现的状态 */
	.slider .ctrl .ctrl-i_active,.slider .ctrl .ctrl-i_active:hover {
		background-color: black;

	}
	.slider .ctrl .ctrl-i_active:hover img {
		opacity: 0;
	}
	/* 幻灯片切换的样式 */
	.slider .main .main-i {
		opacity: 0;
		position: absolute;
		right: 50%;
		top: 0;
	}
	.slider .main .main-i_active {
		right: 0;
		opacity: 1;
	}
	</style>
</head>
<body>
<div class="slider">
	<!-- 修改view转换为template -->
	<div class="main" id="template_main">
		<div class="main-i main-i_active" id="main_{{index}}">
			<div class="caption">
				<h2>{{h2}}}</h2>
				<h3>{{h3}}</h3>
			</div>
			<img src="images/{{index}}.jpg">
		</div>
	
	</div>
	<div class="ctrl" id="template_ctrl">
		<a href="javascript:switchs({{index}})" class="ctrl-i ctrl-i_active" id="ctrl_{{index}}" ><img src="images/{{index}}.jpg"/></a>
<!-- 		<a href="#" class="ctrl-i"><img src="images/{{index}}.jpg"/></a>
 -->
	</div>
</div>
</body>
<script type="text/javascript">
	//1.数据定义，实际生产环境中后台给出
	var data = [{
		img:1,h1:'pp',h2:'aa'
	},
	{
		img:2,h2:'oo',h2:'ii'
	},
	{
		img:3,h1:'pp',h2:'aa'
	},
	{
		img:4,h1:'pp',h2:'aa'
	},
	{
		img:5,h1:'pp',h2:'aa'
	},
	{
		img:6,h1:'pp',h2:'aa'
	},
	{
		img:7,h1:'pp',h2:'aa'
	},
	];
	//2.通用函数
	var g = function(id) {
		if (id.substr(0,1) === ".") {
			return document.getElementsByClassName(id.substr(1));
		}
		return document.getElementById(id);
	};
	//3.添加幻灯片
	function addSliders() {
		//3.1获取模板
		var tepmain = g("template_main").innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
		var tepctrl = g("template_ctrl").innerHTML.replace(/^\s*/,'').replace(/\s*$/,''); 
		//3.2 定义最终输出的HTML的变量
		var out_main = [];
		var out_ctrl = [];
		//3.3 遍历数据，构建最终输出的HTML;
		for (i in data) {
			var _html_main = tepmain.replace(/{{index}}/g,data[i].img).replace(/{{h2}}/g,data[i].h2).replace(/{{h3}}/g,data[i].h3);
			var _html_ctrl = tepctrl.replace(/{{index}}/g,data[i].img);
			out_main.push(_html_main);
			out_ctrl.push(_html_ctrl);
		}
		//3.4 把HTML添加到DOM
		g("template_main").innerHTML = out_main.join('');
		g("template_ctrl").innerHTML = out_ctrl.join('');
	}

		//5.幻灯片切换
		function switchs(n) {
			//5.1获得幻灯片
			var main = g('main_'+n);
			var ctrl = g('ctrl_'+n);
			// 获得所有的幻灯片
			var allmain = g('.main-i');
			var allctrl = g('.ctrl-i');

			//清除active样式
				for (var i=0;i<allctrl.length;i++) {
					allctrl[i].className=allctrl[i].className.replace('ctrl-i_active','');

					allmain[i].className=allmain[i].className.replace('main-i_active','');
			

			main.className+='main-i_active';
			ctrl.className+='ctrl-i_active';
		}
	}

	window.onload = function() {
		addSliders();
		switchs(1);
	};
</script>
</html>
