//
//
// SJ Bootstrap CMS JavaScript Library v 0.0.1
// Boostrap v 3.1.1
// jQuery v 1.11.1
//
// Copyright 2014 J.Soon Personal
// Released under the MIT license
//
// Update Date: 2014-08-05
//
//

if ( window.SJ === undefined ) {
    window.SJ = {};
};
SJ.CMS = {
    //
    // 初始化
    //
    init: function() {
        this.subNavEffects(); // add affix & nicescroll
        this.freshDisabled(); // fresh disabled
    },
    //
    // 禁止 F5 和 Ctrl+R 刷新
    //
    freshDisabled: function() {
        $( document ).bind( 'keydown keyup', function( e ) {
            if ( e.which === 116 ) { // F5
                alert( '禁止快捷键刷新页面' );
                return false;
            }
            if ( e.which === 82 && e.ctrlKey ) { // Ctrl + R
                alert( '禁止快捷键刷新页面' );
                return false;
            }
        } );
    },
    //
    // 生成随机数
    //
    randomNum: function( scope ) {
        var scope = scope || 100000; // 默认随机数范围 0 到 100,000
        return Math.floor( Math.random() * scope );
    },
    //
    // 调用全局 tips 提示模态框
    // 如果要设置 delay，则必须指定 callback 回调函数
    //
    globalTips: function( title, msg, callback ) {
        var id = 'sjGlobalTips' + this.randomNum();
        // 模态框 html 代码片段
        var $modal = $( '<div id="' + id + '" class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">' + title + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>' + msg + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' );
        var delay = arguments[ 3 ] ? arguments[ 3 ] : 3000; // 设置模态框消失的时间
        $modal.appendTo( 'body' );
        $( '#' + id ).modal( {
            show: false
        } ).on( 'shown.bs.modal', function( e ) {
            $( '#' + id + ' .modal-title' ).text( title );
            $( '#' + id + ' .modal-body > p' ).text( msg );
            var t = setTimeout( function() {
                $( '#' + id ).modal( 'hide' );
            }, delay );
        } ).modal( 'show' );
        // 隐藏后删除 modal 节点
        $( '#' + id ).on( 'hidden.bs.modal', function( e ) {
            callback();
            $( this ).remove();
        } );
    },
    //
    // 调用全局 confirm 提示模态框
    //
    globalConfirm: function( level, title, msg, callback ) {
        var id = 'sjGlobalConfirm' + this.randomNum();
        var $modal = $( '<div id="' + id + '" class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">' + title + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>' + msg + '</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default no">取消</button>' +
            '<button type="button" class="btn yes">确定</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' ); // 模态框 html 代码片段
        var ifConfirm; // 是否确认
        var lv; // 提示框等级
        var btn; // 确认按钮颜色
        $modal.appendTo( 'body' ).modal( {
            backdrop: 'static',
            show: true
        } );
        // 设定 confirm 提示框等级
        switch ( level ) {
            case 0:
                lv = '';
                btn = 'btn-primary';
                break; // 白色页头，蓝色按钮
            case 1:
                lv = 'primary';
                btn = 'btn-primary';
                break; // 蓝色页头，蓝色按钮
            case 2:
                lv = 'success';
                btn = 'btn-success';
                break; // 绿色页头，绿色按钮
            case 3:
                lv = 'info';
                btn = 'btn-info';
                break; // 浅蓝色页头，浅蓝色按钮
            case 4:
                lv = 'warning';
                btn = 'btn-warning';
                break; // 橘色页头，橘色按钮
            case 5:
                lv = 'danger';
                btn = 'btn-danger';
                break; // 红色页头，红色按钮
        }
        $( '#' + id + ' .modal-content' ).addClass( lv );
        $( '#' + id + ' button[class*="yes"]' ).addClass( btn );
        $( '#' + id + ' button[class*="no"]' ).on( 'click', function() {
            ifConfirm = false;
            callback( '#' + id, ifConfirm );
        } );
        $( '#' + id + ' button[class*="yes"]' ).on( 'click', function() {
            ifConfirm = true;
            callback( '#' + id, ifConfirm );
        } );
        // 隐藏后删除 modal 节点
        $( '#' + id ).on( 'hidden.bs.modal', function( e ) {
            $( this ).remove();
        } );
    },
    //
    // 二级导航栏添加 affix，nicescroll 效果
    //
    subNavEffects: function() {
        // affix
        var pt = $( '#sjAside' ).css( 'padding-top' );
        $( window ).scroll( function() {
            var y = $( this ).scrollTop();
            if ( y > 110 ) {
                $( '#sjAside' ).clearQueue().animate( {
                    'padding-top': '15px'
                }, 200 );
            } else {
                $( '#sjAside' ).clearQueue().animate( {
                    'padding-top': pt
                }, 200 );
            }
        } );
        // nicescroll
        $( "#sjAside" ).niceScroll( {
            railpadding: {
                right: 12,
            },
            cursorcolor: '#556386',
            cursorwidth: '8px',
            cursorborder: '0px'
        } );
    }
};
// 初始化 SJ.CMS
SJ.CMS.init();

//
// jquery ajax loading
//
$( document ).ajaxStart( function() {
    // add loading mask
    var sjLoading = $( '<div id="sjLoading"><span>数据加载中，请稍后 ...</span></div>' );
    $( 'body' ).append( sjLoading );
    var txtHeight = $( '#sjLoading > span' ).outerHeight();
    var top = $( window ).height() / 2 - txtHeight / 2; // 这里必须事先确定图片高度
    $( '#sjLoading > span' ).css( 'margin-top', top );
    $( '#sjLoading' ).show();
    // console.log('ajaxStart');
} ).ajaxStop( function() {
    $( '#sjLoading' ).delay( 500 ).fadeOut( function() {
        $( this ).remove();
    } );
    // console.log('ajaxStop');
} );

//
// 顶部一级导航栏
//
$( '#sjPriNav' ).on( 'click', '> a', function( e ) {
    var url = $( this ).attr( 'data-url' );
    // if (url) {
    //     $.ajax({
    //         url: url,
    //         dataType: 'html'
    //     }).done(function (data, textStatus, jqXHR) {

    //     }).fail(function (jqXHR, textStatus, errorThrown) {
    //         console.log(errorThrown);
    //     });
    // } else {
    //     console.log('no url');
    // }
    $( this ).addClass( 'active' ).siblings( 'a' ).removeClass( 'active' );
} );

//
// 左侧二级导航栏
//
$( '#sjSubNav' ).on( 'click', 'a', function( e ) {
    var $subNav = $( '#sjSubNav' );
    var $ul = $( '#sjSubNav > ul' );
    var has3rdNav = $( this ).next( 'ul' ).length;
    var url = $( this ).attr( 'data-url' );
    var that = this;
    if ( $( that ).hasClass( 'sj-2nd-nav-item' ) && url ) { // 是二级导航且有 url (必须确保之后没有三级导航)
        $.ajax( {
            url: url,
            dataType: 'html'
        } ).done( function( data, textStatus, jqXHR ) {
            $( '#sjContentPane' ).html( data );
            $subNav.children( 'a' ).removeClass( 'active' );
            $( that ).addClass( 'active' );
        } );
    } else if ( $( that ).hasClass( 'sj-2nd-nav-item' ) && !url ) { // 是二级导航且没有 url (必须确保之后有三级导航)
        $( that ).next( 'ul' ).show().siblings( 'ul' ).hide();
        $subNav.children( 'a' ).removeClass( 'active' );
        $( that ).addClass( 'active' );
        e.preventDefault();
    } else if ( $( that ).hasClass( 'sj-3rd-nav-item' ) && url ) { // 是三级导航且有 url
        $.ajax( {
            url: url,
            dataType: 'html'
        } ).done( function( data, textStatus, jqXHR ) {
            $( '#sjContentPane' ).html( data );
            $ul.find( 'a' ).removeClass( 'active' );
            $( that ).addClass( 'active' );
        } );
    } else if ( $( that ).hasClass( 'sj-3rd-nav-item' ) && !url ) { // 是三级导航且没有 url
        alert( 'no url' );
        e.preventDefault();
    }
    // Check for scrollbars resize (when content or position have changed), if yes, do resize()
    $( "#sjAside" ).getNiceScroll().resize();
} );