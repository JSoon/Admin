/////////////////////////////////////////////////
// 页面脚本 - 引入 html templates
/////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 加载顶部一级导航栏
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$.ajax({
    url: 'nav.html',
    dataType: 'html'
}).done(function (data, textStatus, jqXHR) {
    $('#sjPriNav').html(data);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 加载侧边二级导航栏
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$.ajax({
    url: 'aside.html',
    dataType: 'html'
}).done(function (data, textStatus, jqXHR) {
    $('#sjSubNav').html(data);
});

