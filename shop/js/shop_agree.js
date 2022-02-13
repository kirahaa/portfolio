
/* agree TEXT GET */
function agree_text(){
    var agree_text1 = new XMLHttpRequest();
    var agree_text2 = new XMLHttpRequest();
    agree_text1.open("GET","./agree/provision.txt?v=1",true);
    agree_text1.onload = function(){
        document.getElementById("agree_txt1").innerText = agree_text1.responseText;
    }
    agree_text2.open("GET","./agree/privacy.txt?v=1",true);
    agree_text2.onload = function(){
        document.getElementById("agree_txt2").innerText = agree_text2.responseText;
    }
    agree_text1.send();
    agree_text2.send();
}
agree_text()
///////////////////////////////////////////////////////////////

/* checkbox controll */
function agree_all() {
    let allck = document.getElementById("allagree").checked;
    let onoff = null;
    if (allck == true) {
        onoff = true;
    }
    else {
        onoff = false;    
    }
    for(var i = 1;i<3; i++){
        document.getElementById("agree"+i).checked = onoff;
    }
}
function agree_ne() {
    document.getElementById("allagree").checked = false;
    if (document.getElementById("agree1").checked == true && document.getElementById("agree2").checked == true) {
        document.getElementById("allagree").checked = true;
    }
}
///////////////////////////////////////////////////////////////

/* agree button click */ 
function agree_btn() {
    let agree_use = "ok";
    for (var fr = 1; fr < 3; fr++) {
        var ckoff = document.getElementById("agree" + fr).checked;
        if (ckoff == false) {
            agree_use = "no";
        }
    }
    if (agree_use == "no") {
        alert("동의항목에 체크해주세요!");
    }
    else {
        member_agree.method = "POST";
        member_agree.action = "member_join.html";
        member_agree.submit();
    }
}
