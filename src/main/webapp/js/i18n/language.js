/**
 * cookie操作
 * @type {{set: cookie.set, get: cookie.get, delete: cookie.delete}}
 */
var cookie = {
    set: function (key, val, time) {//设置cookie方法
        var date = new Date(); //获取当前时间
        var expiresDays = time;  //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
    },
    get: function (key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    delete: function (key) { //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
    }
}

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function () {
    if (navigator.appName == "Netscape") {
        var navLanguage = navigator.language;
        return navLanguage;
    }
    return false;
}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";

/*
 设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'zh-TW', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */
var execI18n = function () {
    /*
     获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    }
    ;
    var sourceName = optionEle.attr('content');
    sourceName = sourceName.split('-');
    /*
     首先获取用户浏览器设备之前选择过的语言类型
     */
    if (cookie.get("userLanguage")) {
        i18nLanguage = cookie.get("userLanguage");
    } else {
        // 获取浏览器语言
        var navLanguage = getNavLanguage();
        if (navLanguage) {
            // 判断是否在网站支持语言数组里
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                // 存到缓存中
                cookie.set("userLanguage", navLanguage, 30);
            }
        } else {
            navLanguage = i18nLanguage;
            cookie.set("userLanguage", navLanguage, 30);
        }
    }
    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        console.log("请引入i18n js 文件")
        return false;
    }
    ;

    /*
     这里需要进行i18n的翻译
     */
    jQuery.i18n.properties({
        name: sourceName, //资源文件名称
        path: 'i18n/' + i18nLanguage + '/', //资源文件路径
        mode: 'map', //用Map的方式使用资源文件中的值
        language: i18nLanguage,
        callback: function () {//加载成功后设置显示内容
            var insertEle = $(".i18n");
            console.log(".i18n 写入中...");
            insertEle.each(function () {
                // 根据i18n元素的 name 获取内容写入
                $(this).html($.i18n.prop($(this).attr('name')));
            });
            console.log("写入完毕");

            console.log(".i18n-input 写入中...");
            var insertInputEle = $(".i18n-input");
            insertInputEle.each(function () {
                var selectAttr = $(this).attr('selectattr');
                if (!selectAttr) {
                    selectAttr = "value";
                }
                $(this).attr(selectAttr, $.i18n.prop($(this).attr('selectname')));
            });
            console.log("写入完毕");
        }
    });

}

/*页面执行加载执行*/
$(function () {
    /*执行I18n翻译*/
    execI18n();

    $(".dropdown-menu a").each(function() {
        var lang = $(this).attr('value');
        if (lang == i18nLanguage) {
            $('#language').html($(this).html());
            $('#language').attr("value", $(this).attr('value'));
        }
    });

    $(".dropdown-menu a").click(function() {
        var lang = $(this).attr('value');
        var ori = $('#language').attr('value');
        if (ori != lang) {
            cookie.set("userLanguage", lang, 30);
            setTimeout("location.reload();", 100);
        }
    });

});