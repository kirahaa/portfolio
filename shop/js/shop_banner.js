$(function(){
    let $effect = eff;
    // F: fade , R: rolling

    console.log($effect);
    $.get("./admin/admin_banner.json",function(data){
        if($effect=="F"){
            $(".effect1").css("display","block");
            $.fn.create_fade_banner(data);
        }
        else{
            $(".effect2").css("display","block");
            $.fn.create_rolling_banner(data);
        }
    })

    let $wait = 0;
    /* Rolling banner Control */
    $.fn.create_rolling_banner = function(data){

        let $banner_ea = data.length;
        let li_img;
        $.map(data,function(name,node){
            li_img = "<li title='"+name["bname"]+"'><img src='"+name["bimg"]+"'></li>"
            $(".banners").append(li_img);
            $(".banner_disc").append("<li></li> ");
        })


        $("#rolling_disc>li").bind({
            "mouseenter":function(){
                clearTimeout($timer);
            },
            "click":function(){
                clearTimeout($timer);
                
                let $rno = $(this).index();
                let $banner_height = 534 * $rno;
                
                $("#rolling").stop().animate({
                    "top": -$banner_height + "px"
                },500);
                $("#rolling_disc>li").css("background-color","rgba(0,0,0,0.5)");
                $("#rolling_disc>li").eq($rno).css("background-color","#c3222b");
            },
            "mouseleave":function(){
                setTimeout($timer,5000);
            }
        })

        let $counts=1;
        let $rn=0;
        $.fn.stimer = function(){ 
        if($wait==0){
            $("#rolling_disc>li").css("background-color","rgba(0,0,0,0.5)");
            $rn++;
            if($rn>=$banner_ea){
                $rn=0;
            }
            $("#rolling_disc>li").eq($rn).css("background-color","#c3222b");

            if($counts<$banner_ea){
                let $banner_height = 534 * $counts;
                
                $("#rolling").stop().animate({
                    "top": -$banner_height + "px"
                },500);
                
            }
            else{
                $counts = 0;
                
                $("#rolling").stop().animate({
                    "top": 0
                },500);
            }
            $counts++;
            $timer = setTimeout($.fn.stimer,8000);
        }
        }
        $timer = setTimeout($.fn.stimer,8000);
        
        $("#roll").bind({
            "mouseenter":function(){
                $wait = 1;
                clearTimeout($timer);
            },
            "mouseleave":function(){
                $wait = 0;
                $timer = setTimeout($.fn.stimer,8000);
            }
        })
    }
    
    /* Fadein banner Control */ 
    let $banner_ea;
    $.fn.create_fade_banner = function(data){
        $banner_ea = data.length;
        let li_img;
        $.map(data,function(name,node){
            li_img = "<li title='"+name["bname"]+"'><img src='"+name["bimg"]+"'></li>"
            $(".banners").append(li_img);
            $(".banner_disc").append("<li></li> ");
        })

        $("#fade_disc>li").bind({
            "mouseenter":function(){
                clearTimeout($timer);
            },
            "click":function(){
                clearTimeout($timer);
                $("#fade_banners>li").eq($no).fadeOut();
                $("#fade_disc>li").css("background-color","black");
                $no = $(this).index();
                $("#fade_banners>li").eq($no).fadeIn();
                $("#fade_disc>li").eq($no).css("background-color","rgb(190, 0, 0)");
            },
            "mouseleave":function(){
                setTimeout($timer,5000);
            }
        })
    }

    let $timer;
    let $no = 0;
    $.fn.times = function(){
        $timer = setTimeout(function recall(){
            $("#fade_banners>li").eq($no).stop().fadeOut();
            $("#fade_disc>li").css("background-color","black");
            $no++;
            if($no>=$banner_ea){
                $no=0;
            }
            $("#fade_banners>li").eq($no).fadeIn();
            $("#fade_disc>li").eq($no).css("background-color","rgb(190, 0, 0)");
            $timer = setTimeout($.fn.times,5000);
        },5000)
    }
    
    $.fn.times();

    
    $("#fade_ribtn").click(function(){
        clearTimeout($timer);
        $("#fade_banners>li").eq($no).fadeOut();
        $("#fade_disc>li").css("background-color","black");
        $no++;
        if($no>=$banner_ea){
            $no=0;
        }
        $("#fade_banners>li").eq($no).fadeIn();
        $("#fade_disc>li").eq($no).css("background-color","rgb(190, 0, 0)");
    })
    
    $("#fade_lebtn").click(function(){
        clearTimeout($timer);
        $("#fade_banners>li").eq($no).fadeOut();
        $("#fade_disc>li").css("background-color","black");
        $no--;
        if($no<0){
            $no=$banner_ea-1;
        }
        $("#fade_banners>li").eq($no).fadeIn();
        $("#fade_disc>li").eq($no).css("background-color","rgb(190, 0, 0)");
    })

    $("#fade").bind({
        "mouseenter":function(){
            clearTimeout($timer);
            $("#fade_ribtn").stop().animate({
                "right":"12%"
            })
            $("#fade_lebtn").stop().animate({
                "left":"12%"
            })
        },
        "mouseleave":function(){
            $.fn.times();
            $("#fade_ribtn").stop().animate({
                "right":"10%"
            })
            $("#fade_lebtn").stop().animate({
                "left":"10%"
            })
        }
    });
    

})
