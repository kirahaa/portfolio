let admid = "";  //쿠키 저장값
let cookie_data = document.cookie.split(";");  //해당 아이디값 배열로 분리
let login_data = cookie_data[0].split("adm_id=");  //해당 아이디값 확인
let datas = login_data[1];
if(datas!=""){  //쿠키값이 있을 경우
    if(datas==undefined){
        adm.a_id.value = ""; 
    }
    else{
    adm.a_id.value = datas;
    adm.a_save.checked = true;
    }
}
else{
    adm.a_id.value = "";    //undefined 사항으로 공백처리
}