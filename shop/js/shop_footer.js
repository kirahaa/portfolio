$(function(){
    //사업자번호 확인
    $("#pop_cpno").click(function(){
        let $cpno = 5938500737;
        // let $send_cpno = $cpno.replace(/-/g,"");
        // 예시 123-23-123456 "-"빼고 숫자만 발송
        let $urls = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no="+$cpno;
        window.open($urls,"biz","width=700, height=500,scrollbars=auto");
    })

    $("#pagetop").click(function(){
        $("html,body").animate({
            "scrollTop":0
        },500);
    })

})