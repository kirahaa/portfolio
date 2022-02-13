/* 로그인 파트 */ 
function checks(){
    if(adm.a_id.value==""){
        alert("아이디를 입력하세요");
        adm.a_id.focus();
        return false;
    }
    else if(adm.a_pw.value==""){
        alert("패스워드를 입력하세요");
        adm.a_pw.focus();
        return false;
    }
    else{
        adm.action="login_ok.php";
        return true;
    }
}
// 아이디 저장
function id_save(){
    let userid = document.getElementById("a_id").value;
    let usecheck = adm.a_save.checked;
    if(userid !="" && usecheck==true){
        //쿠키생성
        document.cookie = "adm_id=" + escape(adm.a_id.value);
    }
    else{
        document.cookie="adm_id=";  //쿠키초기화
        // alert("아이디를 입력해주세요!");
        // adm.a_save.checked = false;
        adm.a_id.focus();
    }
}

/* 폰트 크기 조절 파트 */
function fontclass(part){
    let cs = document.getElementById("listview").className;
    if(part == "1"){
        plus_cs = "section";
        document.getElementById("listview").className = plus_cs;
    }
    else{
        if(part == "2"){
            plus_cs = "font_view2";
            document.getElementById("listview").classList.remove("font_view3");
        }
        else if(part == "3"){
            plus_cs = "font_view3";
            document.getElementById("listview").classList.remove("font_view2");
        }
        document.getElementById("listview").className += " " + plus_cs;
    }
};

/* 대메뉴 파트 */
$(function(){

    $("#menu>li").click(function(){
        let $url =  $(this).attr("links");
        location.href = $url;
    })
    
})