$(function(){
    let $timers;
    let $ban_width = $("#event_banners>li").width();
    
    $.fn.event_timer = function(){
        
        $timers = setTimeout(function(){
         $("#event_banners").stop().animate({
            "left": - $ban_width + "px"
        },700,function(){
            let $copy = $("#event_banners>li").eq(0).clone();
            $("#event_banners>li").eq(0).remove();
            $("#event_banners").css("left",0);
            $("#event_banners").append($copy);
        })  
        },5000)
        $timet = setTimeout($.fn.event_timer,5000);
    }
    $.fn.event_timer();
})