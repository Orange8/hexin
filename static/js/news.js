$(function() {
	//行业动态数据加载
	var pageContainer = $('#pagination');
    var newsContainer = $('#newsContainer');
	function template(data){ //数据模板
        var dataHtml = '';

        $.each(data, function (index, item) {
            dataHtml += '<dl class="clear">'+
                		'<dt>'+
                    	'<span class="day">'+item.month+'.'+item.date+'</span>'+
                    	'<span class="year">'+item.year+'</span>'+
                		'</dt>'+
                		'<dd class="tran">'+
                    	'<div class="artical-title">'+
                        '<div>'+item.title+'</div>'+
                    	'</div>'+
                    	'<div class="artical-content" style="display: none;">';
            if(!item.img || item.img != '' || item.img != null){
                dataHtml += '<div><img src="'+item.img+'" alt="'+item.title+'" /></div>'
            }
            dataHtml += '<div>'+item.dec+'</div>'+
                    	'</div>'+
                		'</dd>'+
            			'</dl>'+
            			'<div class="more"><a class="tran" href="javascript:;">more</a></div>'+
            			'<div class="line"></div>'
        });

        return dataHtml;
    }
    $.ajax({ //请求分页数据总量
        type: "post",
        url: "http://rapapi.org/mockjsdata/15757/dataList",
        dataType: "json",
        timeout: 60 * 1000, //ajax请求的超时设置60s
        cache: false,
        beforeSend: function(){
            newsContainer.html('<i class="loading"></i>');
        },
        success: function(json) {
            createDemo(json.data);
            newsAction();
        },
        error: function(error) {
            alert('请求失败，请刷新页面后再试！')
        }
    })
    function createDemo(json) {//分页渲染
        var options = {
            dataSource: 'http://rapapi.org/mockjsdata/15757/dataList',
            locator: 'data.list',
            totalNumber: json.page.total,
            pageSize: json.page.pernum,
            alias: {
                pageSize: 'pageSize'
            },
            ajax: {
                type: 'post',
                beforeSend: function(){
                    newsContainer.html('<i class="loading"></i>');
                },
                success: function(){
                	newsAction();
                },
                error: function(error) {
		            alert('请求失败，请刷新页面后再试！')
		        }
            },
            callback: function (data, pagination) {
                var html = template(data);
                newsContainer.html(html);
            }
        };
        pageContainer.pagination(options);
        return pageContainer;
    }
	//行业动态展开更多
	function newsAction(){
		$('.newslist').on('click','.more',function(){
			var content = $(this).prev('dl').find('.artical-content');
			var more = $(this).find('a');
			if(content.children().length){
				if(more.hasClass('rotate')){
					more.removeClass('rotate');
				}else{
					more.addClass('rotate');
				}
				content.stop().toggle(400);
			};
		})
	}

});