member_btn = (loca) => {
    if (loca == 1) {
        location.href = "./member_ship.html";
    }
    else {
        alert("준비중입니다.");
    }
}

go_login = () => {
    if (!m_frm.shop_id.value) {
        alert("아이디를 입력해주세요!");
        m_frm.shop_id.focus();
        return false;
    }
    else if (!m_frm.shop_pw.value) {
        alert("패스워드를 입력해주세요!");
        m_frm.shop_pw.focus();
        return false;
    }
    else {
        m_frm.action = "shop_loginok.php";
        m_frm.submit();
    }
}


go_nonmem = () => {

    if (!nofrm.nomember_id.value) {
        alert("주문자명을 입력해주세요!");
        nofrm.nomember_id.focus();
        return false;
    }
    else if (!nofrm.nomember_no.value) {
        alert("주문번호를 입력해주세요!");
        nofrm.nomember_no.focus();
        return false;
    }
    else if (nofrm.nomember_no.value.length < 8 || isNaN(Number(nofrm.nomember_no.value)) == true) {
        alert("올바른 주문번호를 입력해주세요!")
        return false;
    }
    else {
        nofrm.action = "shop_loginok.php";
        nofrm.submit();
    }
}

nonmember_title = () => {
    document.getElementById("nofrm").style.display =" block";
}

/* ID save cookie */
id_save = () => {
    let userid = document.getElementById("shop_id").value;
    let usercheck = document.getElementById("save_id").checked;
    if(userid && usercheck){
        document.cookie = "sp_id=" + escape(userid);
    }
    else {
        document.cookie = "sp_id=";
        document.getElementById("save_id").checked = false;
        document.getElementById("shop_id").focus();
    }
} 


/* cookie */ 
let admid = "";
let cookie_data = document.cookie.split(";");
console.log(cookie_data);
let login_data = cookie_data[1].split("sp_id=");
let datas = login_data[1];
if(datas!=""){
    if(datas==undefined){
        document.getElementById("shop_id").value = "";
    }
    else{
        document.getElementById("shop_id").value = datas;
        document.getElementById("save_id").checked = true;
    }
}
else {
    document.getElementById("shop_id").value = "";
}