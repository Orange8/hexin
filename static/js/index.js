$(function() {
	var a, b, c, d, e;
	$(".lazy").lazyload({
		effect: "fadeIn",
		threshold: 200
	});

	//返回顶部
	$(".back2top").click(function() {
		return $("body,html").animate({
			scrollTop: 0
		}, 500), !1
	});

	//banner轮播
	$(".slideBox").slide({
		mainCell:".bd ul",
		titCell: ".hd ul", //程序分页dom节点
		autoPlay:false,
		autoPage:true, //	程序自动分页
		effect: "fold",
		interTime: 5000, //自动运行间隔
	  delayTime: 700, //切换效果运行时间
		mouseOverStop: true
	});

	//案例详情hover
	function showBox(){
		$(".case li").hover(function() {
			$(this).find(".case-text").fadeIn();
		}, function() {
			$(this).find(".case-text").stop().fadeOut();
		});
	}
	showBox();

	//首页加载更多
	$('#J_viewmore').click(function(event){
		var dateTime = new Date().getTime();
		$.ajax({
			type: "POST",
			url: "http://rap.taobao.org/mockjsdata/15757/caselist?"+ dateTime,
			data: {page: 2},
			dataType: "json",
			success: function(data){
				var html = '';
				$.each(data.list, function(index, el){
					html += '<li>'
                	+ '<a href="' + el.href + '" target="_blank">'
                  +'<img class="lazy tran" data-original="' + el.img + '" alt="' + el.title + '" />'
                  +'<div class="case-text" style="display: none;">'
                  +'<div class="black-bg">'
                	+'<p class="title">' + el.title + '</p>'
                  +'<p class="subtitle">' + el.subtitle + '</p>'
                  +'<span class="line"></span>'
                  +'<span class="text">' + el.desc + '</span>'
                  +'<span class="time">' + el.time + '</span>'
                  +'</div>'
                  +'</div>'
                	+'</a>'
            			+'</li>'
				});
				$('#J_case ul').append(html);
				$('#J_viewmore').hide();
				showBox();
			  	$(".lazy").lazyload({
					effect: "fadeIn",
					threshold: 200
				});
				//页面向下滚动一像素，触发懒加载加载图片
				var t = $(window).scrollTop();
    			$('body,html').animate({'scrollTop':t+1},100)
    		},
    		error: function(error) {
	            alert('请求失败，请刷新页面后再试！')
	        }
	  });
	})

	//计算首页轮播容器高度
	a = 1920 / 568,
	b = $(document).width(),
	c = b / a,
	d = b + "px" + " " + c + "px",
	e = c - 90 + "px";

	$(".slideBox .bd ul").css({
		height: c
	});

	$(".slideBox .bd").css({
		height: c
	});

	$(".slideBox .bd li").css({
		height: c
	});

	$(".slideBox .hd").css({
		top: e
	})

});

//改变浏览器窗口调整轮播高度
$(window).resize(function() {
	var a = 1920 / 568,
			b = $(document).width(),
			c = b / a,
			d = b + "px" + " " + c + "px",
			e = c - 90 + "px";

	$(".slideBox .bd ul").css({
		height: c
	});

	$(".slideBox .bd").css({
		height: c
	});

	$(".slideBox .bd li").css({
		height: c
	});

	$(".slideBox .hd").css({
		top: e
	})

});