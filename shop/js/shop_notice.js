$(function(){
    $.get("./admin/admin_notice.json?v="+nos,function(ndata){
        
    },'json')
    .done(function(ndata){
        $.fn.make_notice(ndata);
    })
    .fail(function(){
        console.log("json_error!");
    })

    $.fn.make_notice = function(ndata){
        // console.log(ndata);
        let $noticed = "";
        $(ndata).map(function($n,$d){
            $noticed = "<li link='"+$d["sidx"]+"' title='"+$d["subject"]+"' class='go_admin'>"+$d["subject"].substr(0,12)+"...</li>";
            $noticed2 = "<li title='"+$d["subject"]+"' class='go_admin'>"+$d["subject"]+"</li>";
            $("#notice_banner").append($noticed);
            $("#notice_list").append($noticed2);
        })
        
        let $ea = $("#notice_banner>li").length;
        let $hegt = $("#notice_banner>li").height(); 
        $("#notice_banner").height($hegt*$ea); //height 

        /* go notice_list */
        $("#notice_banner>li").click(function(){
            let $sidx = $(this).attr("link");
            location.href = "./shop_notice.html?sidx="+$sidx;
        })
        $("#notice_list>li").click(function(){
            location.href = "./shop_noticelist.html";
        })

        /* banner animate */
        let $n_timer;
        $.fn.notice = function(){
            $("#notice_banner").stop().animate({
                "top":-$hegt+"px"
            },500,function(){
                let $copy = $("#notice_banner>li").eq(0).clone();
                $("#notice_banner>li").eq(0).remove();
                $("#notice_banner").css("top",0);
                $("#notice_banner").append($copy);
            })
            $n_timer = setTimeout($.fn.notice,5000);
        };

        $n_timer = setTimeout($.fn.notice,5000);



        $("#notice_upBtn").bind({
            "click":function(){
                clearTimeout($n_timer);
                $("#notice_banner").stop().animate({
                    "top":-$hegt+"px"
                },500,function(){
                    let $copy = $("#notice_banner>li").eq(0).clone();
                    $("#notice_banner>li").eq(0).remove();
                    $("#notice_banner").css("top",0);
                    $("#notice_banner").append($copy);
                })
            },
            "mouseenter":function(){
                clearTimeout($n_timer);
            }
        })
        
        $("#notice_downBtn").bind({
            "click":function(){
                clearTimeout($n_timer);
                let $copy = $("#notice_banner>li").eq($ea-1).clone();
                $("#notice_banner>li").eq($ea-1).remove();
                $("#notice_banner").css("top",-$hegt+"px");
                $("#notice_banner").prepend($copy);
    
                $("#notice_banner").stop().animate({
                    "top":0
                },500)
            },
            "mouseenter":function(){
                clearTimeout($n_timer);
            }
        })
        $(".nav_info").mouseleave(function(){
            $n_timer = setTimeout($.fn.notice,5000);
        })
        
        

        
    }



});