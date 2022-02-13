$(function(){
    let $w = $("#md_prd_wrap").css("width","1902px");

    let $ul_width = $("#md_prd_wrap ul").innerWidth() + 30;
    console.log($ul_width);
    let $prd_ea = $("#md_prd_wrap>ul").length;
    $("#md_prd_wrap").width($ul_width*$prd_ea);

    let $prd_timer;
    $.fn.mdtimes = function(){
        
        $("#md_prd_wrap").stop().animate({
            "left":-$ul_width + "px"
        },700,function(){
            let $copy = $("#md_prd_wrap>ul").eq(0).clone();
            $("#md_prd_wrap>ul").eq(0).remove();
            $("#md_prd_wrap").css("left","0px");
            $("#md_prd_wrap").append($copy);
        })
        $prd_timer = setTimeout($.fn.mdtimes,5000);
    };
    $prd_timer = setTimeout($.fn.mdtimes,5000);

    // 오른쪽 버튼 
    $("#prd_rbtn").bind({
        mouseenter:function(){
            clearTimeout($prd_timer);
        },
        mouseleave:function(){
            $prd_timer = setTimeout($.fn.mdtimes,5000);
        },
        click:function(){
            clearTimeout($prd_timer);
            $("#md_prd_wrap").stop().animate({
                "left":-$ul_width + "px"
            },700,function(){
                let $copy = $("#md_prd_wrap>ul").eq(0).clone();
                $("#md_prd_wrap>ul").eq(0).remove();
                $("#md_prd_wrap").css("left","0px");
                $("#md_prd_wrap").append($copy);
            })
        }
    })

    // 왼쪽 버튼
    $("#prd_lbtn").bind({
        mouseenter:function(){
            clearTimeout($prd_timer);
        },
        mouseleave:function(){
            $prd_timer = setTimeout($.fn.mdtimes,5000);
        },
        click:function(){
            clearTimeout($prd_timer);
            let $copy = $("#md_prd_wrap>ul").eq($prd_ea-1).clone();
            $("#md_prd_wrap>ul").eq($prd_ea-1).remove();
            $("#md_prd_wrap").css("left",-$ul_width+"px");
            $("#md_prd_wrap").prepend($copy);

            $("#md_prd_wrap").stop().animate({
                "left":0
            },700)
        }
    })


    /* click, go product_page */
    $("#md_prd_wrap>ul").attr("link","./shop_product.html?pidx=13&goodsno=99765316");
    $("#md_prd_wrap>ul").click(function(){
        let $link = $(this).attr("link");
        location.href = $link;
    })




})