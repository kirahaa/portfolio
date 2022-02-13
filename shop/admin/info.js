// 환경설정 체크 스크립트
function info_ok(){
    info.action = "admin_info_ok.php";
    info.submit();
    return true;
}
function use_point(){
    let point_ck = document.getElementById("check_point").checked;
    if(point_ck==true){
        document.getElementById("info_point").disabled = false;
    }
    else{
        document.getElementById("info_point").disabled = true;
        document.getElementById("info_point").value="";
    }
}

// bottom script
$(function(){
$.fn.bottom = function(){
    $.ajax({
        url:"./admin_info.json",
        cache:false,
        type:"GET",
        dataType:"JSON",
        success:function($data){
            $.fn.bottom_copyright($data);
        },
        error:function(){
            console.log("data error");
        }
    });

    $.fn.bottom_copyright = function($data){
        // console.log($data[0]);
        let $bottom_li = "<li>"+$data[0]["info_cpname"]+"</li> \
         <li>대표 : "+$data[0]["info_ceo"]+"</li> \
         <li> 사업등록번호 : <span id='info_cpno_n'>"+$data[0]["info_cpno"]+"</span> <label class='pop_cpno' id='pop_cpno'>사업자 확인</label></li> \
         <li> 통신판매업신고 : "+$data[0]["info_cn"]+"</li>";
        $("#copyright1").append($bottom_li); 
        let $bottom_li2 = "<li>개인정보관리책임자 : "+$data[0]["info_manager"]+"</li> \
        <li>관리자 이메일 : "+$data[0]["info_manager_email"]+"</li> \
        <li>주소 : ("+$data[0]["info_addr"]+") "+$data[0]["info_addrdtc"]+"</li> \
        <li>전화번호 : "+$data[0]["info_tel"]+"</li>";
        $("#copyright2").append($bottom_li2);


        $.each($data[0],function($key,$text){
            $("#"+$key).val($text);
            // console.log($data[0]["info_site_ico"]);
            if($key=="info_site_ico"){
                if($data[0][$key]!=""){
                    $("#fimg_on").css("display","block");
                    $("#fimg").css("background-image","url("+$data[0]["info_site_ico"]+")");
                    $("#fimg_off").css("display","none");
                }
            }
            else if($key == "info_point_use"){
                if($data[0][$key] == "Y"){
                    $("#check_point").attr("checked",true);
                }
            }
        })
        
        $("#fimg").click(function(){
            window.open($data[0]["info_site_ico"],"","width=200,height=200");
        })

        //사업자번호 확인
        $("#pop_cpno").click(function(){
            let $cpno = $("#info_cpno_n").text();
            let $send_cpno = $cpno.replace(/-/g,"");
            // 예시 123-23-123456 "-"빼고 숫자만 발송
            let $urls = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no="+$send_cpno;
            window.open($urls,"biz","width=700, height=500,scrollbars=auto");
        })

    };

};
$.fn.bottom();

$("#fdel").click(function(){
    let $data1 = $("#info_idx").val();
    let $data2 = $("#info_site_ico").val();
    $.ajax({
        url:"./img_del.php",
        cache:false,
        type:"POST",
        dataType:"JSON",
        data:{"idx":$data1,"delimg":$data2},
        contentType:"application/x-www-form-urlencoded",
        success:function($img_data){
            if($img_data=="success"){
                alert("정상적으로 이미지가 삭제 되었습니다.");
                window.location.reload();
            }
        },
        error:function(){
            console.log("data error");
        }
    })
})



});