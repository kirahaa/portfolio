$(function(){
    $("#start").click(function(){
        $("#dark").fadeOut(1000);
    });

    let $t=0;         //성공
    let $errorct = 5; //실패
    $("#ca_aw").click(function(){
        $errorct--;
        if($errorct==0){
            setTimeout($.fn.alerts,500,2);
        }
        else if($errorct<0){
            $errorct=0;
        }
        $("#no").attr("src","./game/no_"+$errorct+".png");
    })

    $(".aw").click(function(){
        let $ct = $(this).index()+1;
        console.log($ct);
        $(".aw:nth-of-type("+$ct+")>img").attr("src","./game/answer.gif");
        $t++;

        if($t==5){
            setTimeout($.fn.alerts,500,1);
        }
        $(this).unbind();
    })

    $.fn.alerts = function($ctpart){
        if($ctpart==1){
            alert("축하합니다~! 정답을 모두 맞추셨습니다~!");
            $("#event_agree").css("display","block");
            $("html").scrollTop(9999);  //게임 완료 후 입력 폼으로 스크롤 이동
        }
        else if($ctpart==2){
            alert("실패!");
        }
    }

    /* 우편번호 api 연결*/
    $("#addr_btn").postcodifyPopUp();


})