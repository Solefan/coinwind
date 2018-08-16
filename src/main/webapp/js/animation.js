/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

$(document).ready(function () {

    var scoll = $(window).scrollTop();
    if (scoll <= 0) {
        $('.navbar').addClass('nav-opacity');
        $('.dropdown-menu').addClass('dropdown-opacity');
        $('.navbar-nav a').css({ "color": "#fff"});
    }

    $('.particles').particleground({
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa'
    });
    
    $('.intro').css({
        'margin-top': -($('.intro').height() / 2)
    });

    $('.nav a').each(function () {
        $(this).click(function () {
            var h = $(this).attr('href');
            var top = $(h).offset().top;
            var navTop = $('.navbar').height();
            event.preventDefault();
            $('html,body').animate({scrollTop: top-navTop+2}, 'slow', 'swing');
            var pic = $(h + ' .pic');
            if (pic.hasClass('right_pic')) {
                if (!pic.hasClass('left_slide_animation')) {
                    pic.addClass('left_slide_animation');
                }
            }
            if (pic.hasClass('left_pic')) {
                if (!pic.hasClass('right_slide_animation')) {
                    pic.addClass('right_slide_animation');
                }
            }
        });
    });

    $(window).scroll(function () {

        var scoll = $(window).scrollTop();
        var index = $('#index').height();
        if (scoll <= 0) {
            $('.navbar').addClass('nav-opacity');
            $('.dropdown-menu').addClass('dropdown-opacity');
            $('.navbar-nav a').css({ "color": "#fff"});
        } else {
            $('.navbar').removeClass('nav-opacity');
            $('.dropdown-menu').removeClass('dropdown-opacity');
            $('.navbar-nav a').css({ "color": "#463265"});
        }

        $('.bs-docs-header').each(function () {
            var height = $(window).height();
            var scoll = $(window).scrollTop();
            var a = $(this).offset().top;
            var b = $(this).height();
            if (scoll > (a - height) + b / 3 * 2) {
                var pic = $(this).find('.pic');
                if (pic.hasClass('right_pic')) {
                    if (!pic.hasClass('left_slide_animation')) {
                        pic.addClass('left_slide_animation');
                    }
                }
                if (pic.hasClass('left_pic')) {
                    if (!pic.hasClass('right_slide_animation')) {
                        pic.addClass('right_slide_animation');
                    }
                }
            }
        });
    });
});