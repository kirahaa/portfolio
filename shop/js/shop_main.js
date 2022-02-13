

/* search part */
function aaa(){
    if(!search_frm.searchwd.value){
        alert("검색어를 입력하세요");
        return false;
    }
    else{
        return true;
    }
}

let search_para = decodeURI(location.search).split("searchwd=")[1];
document.getElementById("search_input").value = search_para;
if(search_para==undefined){
    document.getElementById("search_input").value = "";
}
document.getElementById("search_frm").onsubmit = aaa;
////////////////////////search_part////////////////////////////


/* login part */ 
function login_infodata(){
    if(!shop_id){
        document.getElementById("login_off").style.display = "block";
        document.getElementById("login_on").style.display = "none";
        document.getElementById("login_on2").style.display = "block";
        document.getElementById("login_on3").style.display = "none";
    }
    else {
        document.getElementById("login_off").style.display = "none";
        document.getElementById("login_on").style.display = "block";
        document.getElementById("login_on2").style.display = "none";
        document.getElementById("login_on3").style.display = "block";
        document.getElementById("member_id").innerText = shop_id;
    }
}
login_infodata();

function log_out(){
    if(confirm("로그아웃 하시겠습니까?")){
        location.href="log_out.php";
    }
}
document.getElementById("logout").addEventListener("click",log_out);