const pass_array = ["1","2","3","4","5","6","7","8","9","!","0","*","_","-","."];
/* Make password keyboard */
export let create_keyboard = function(){
    let arr = pass_array;
    let make_li = "";
    for(var i in arr){
        make_li = make_li + "<li>"+arr[i]+"</li>";
    }
    document.getElementById("member_key").innerHTML = make_li;
}

/* password display none block */
function display_pwbox(){
    document.getElementById("keyboard_box").style.display = "block";
}
function hide_pwbox(){
    document.getElementById("keyboard_box").style.display = "none";
}
/* keyboard click */
let pwvalue ="";
function keyboard_click(k){
    let lis = document.querySelectorAll("#member_key>li");
    let pwvalue = k.target.innerText;
    document.getElementById("mpass").value += pwvalue;
}
/* join form */
function go_join(){
    if(mem_frm.mid.value==""){
        alert("아이디를 입력해주세요");
    }
    else if(mem_frm.mpass.value==""){
        alert("패스워드를 입력해주세요");
    }
    else if(mem_frm.mname.value==""){
        alert("고객명을 입력해주세요");
    }
    else if(mem_frm.memail.value==""){
        alert("이메일을 입력해주세요");
    }
    else if(mem_frm.memail.value.match(/@/g) == null){
        alert("올바른 이메일을 입력해주세요");
    }
    else if(mem_frm.mhp.value==""){
        alert("연락처를 입력해주세요");
    }
    else if(mem_frm.mhp.value.length<=9||mem_frm.mhp.value.length>11||mem_frm.mhp.value.match(/-/g)!=null||isNaN(Number(mem_frm.mhp.value))==true){
        alert("올바른 연락처를 입력해주세요");
    }
    else if(mem_frm.mnick.value==""){
        alert("닉네임을 입력해주세요");
    }
    else{
    mem_frm.method="POST";
    mem_frm.enctype="application/x-www-form-urlencoded";
    mem_frm.action="./m_membership.php";
    mem_frm.submit();
    }
}

document.getElementById("mpass").addEventListener("click",display_pwbox);
document.getElementById("pw_ok").addEventListener("click",hide_pwbox);
document.querySelector("#member_key").addEventListener("click",keyboard_click);
document.getElementById("join_btn").addEventListener("click",go_join);