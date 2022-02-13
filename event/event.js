$(document).ready(function(){
    var $img;
    var $data = "5000,100,200,2000,1000,500,300";
    var $result = $data.split(",");

    $("#start_btn").mouseover(function(){
        var $img = $("#start_btn>img").attr("src","./images/event_start_on.png")
    })
    $("#start_btn").mouseout(function(){
        var $img = $("#start_btn>img").attr("src","./images/event_start_off.png")
    })
    var $r = 0; //오브젝트 최초의 위치값

    $("#start_btn").click(function(){
        //횟수제한
        var $v = Number($("#ct").val());
        if($v>0){
        $v = $v -1;
        $("#ct").val($v);

        var $pc = Math.ceil(Math.random()*360);
        $r = $r + 1800;  //기본 돌아가는 횟수 5바퀴        
        $msg = $.fn.rotate($r,$pc);
        //console.log($msg);
        //결과출력
        setTimeout(function(){
            //결과 애니메이션
            $("#msg").fadeIn(800);
            //결과 메세지 출력
            $("#msg").html($result[$msg]+" 마일리지 당첨!");
        },5500)
        $("#msg").fadeOut(500);
        }
        else{
            alert("오늘 룰렛은 3회 횟수 모두 소진되었습니다.")
        }
    })

    $.fn.rotate = function($r,$pc){
        var $node=0;
        if($pc>=23 && $pc<=67){
            $node = 1;
        }
        else if($pc>=68 && $pc <=112){
            $node = 2;
        }
        else if($pc>=113 && $pc <=157){
            $node = 3;
        }
        else if($pc>=158 && $pc <=202){
            $node = 4;
        }
        else if($pc>=203 && $pc <=247){
            $node = 1;
        }
        else if($pc>=248 && $pc <=292){
            $node = 5;
        }
        else if($pc>=293 && $pc <=337){
            $node = 6;
        }
        else if($pc>=36 && $pc <=338){
            $node = 0;
        }
        else{
            $node = 0;
        }
        var $rotate = $r + $pc;
        $("#roulette").css({"transform":"rotate("+$rotate+"deg)"});
        return $node;
    }
    

})