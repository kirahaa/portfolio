$(function(){
    $("#main_menu>li").mouseenter(function(){
        $("#drop_menu").stop().slideDown();
    })
    $("#main_menu>li").mouseleave(function(){
        $("#drop_menu").stop().slideUp();
    })
    $("#drop_menu").mouseenter(function(){
        $(this).stop().slideDown();
    })
    $("#drop_menu").mouseleave(function(){
        $(this).stop().slideUp();
    })
})

