$(function(){
	getItemList();
});
var curPage = 0,pageSize = 12;

function getItemList(){
	var param = "SITEM_ID=" + $("#ITEM_ID").val() + "&page="+ (curPage+1) +"&rows=" + pageSize;
	$.ajax({
		url : baseUrl + "/pub/newsListData",
		type : "POST",
		dataType : "json",
		data : param,
		error : function(XMLHttpRequest, textStatus, errorThrown) {// 当请求失败时调用的函数
			// 调用本次AJAX请求时传递的options参数
			// alert('操作提示\n操作失败原因:' + textStatus + "\n" + errorThrown);
			alert(textStatus + "\n " + errorThrown);
		},
		success : function(data, textStatus) {// 当请求成功时调用的函数
			try {
				// this指向Ajax相关回调函数的上下文context
					if(data.code>=0){
						appendItemList(data);
					}else{
						alert(data.msg);
					}
			} catch (e) {
				alert(e.message);
			} finally {
			}
		}
	});
}

function appendItemList(data){
	var htmlStr = [];
	var totalCount = data.itemListCount?data.itemListCount:0;
	if(totalCount >0){
		for(var i=0,len=data.itemList.length;i<len;i++){
			var item = data.itemList[i];
			htmlStr.push('<div class="fl pics" style="margin-right:16px;">');
			htmlStr.push('<div class="pic">');
			htmlStr.push('<div class="img">');
			htmlStr.push('<a href="' + baseUrl +"/pub/news/"+ item.ID + '" title="' + item.TITLE + '">');
			htmlStr.push('<img src="' + item.FMTPURL + '" width="300" height="200" border="0">');
			htmlStr.push('</a>');
			htmlStr.push('</div>');
			htmlStr.push('</div>');
			htmlStr.push('<div class="link"> <a href="' + baseUrl +"/pub/news/"+ item.ID + '" title="' + item.TITLE + '">' + item.TITLE + '</a> </div>');
			htmlStr.push('</div>');
		}
		htmlStr.join('<div class="clear"></div>');
		$(".piclist").html(htmlStr.join(""));
	}else{
		$(".piclist").html("暂无消息");
	}
	
	
	//分页信息
	$(".page").pagination(totalCount,    //分布总数量，必须参数
      {
			callback: gotopage,  //PageCallback() 为翻页调用次函数。
             prev_text: "<上一页",
             next_text: "下一页 >",
             items_per_page:pageSize,
             num_edge_entries: 2,       //两侧首尾分页条目数
             num_display_entries: 10,    //连续分页主体部分分页条目数
             current_page: curPage   //当前页索引
	});
}

function gotopage(page){
	curPage = page;
	getItemList();
}
