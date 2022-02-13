export let notice_write = function(){

}

export let go_noticelist = function(){
    location.href = "./admin_notice.html";
}


/* notice_write sned data */
export let send_notice = function(){
    let nottext = CKEDITOR.instances.notice_text.getData(); //id값으로 get
    if(!frm_not.notice_subject.value){
        alert("제목을 입력해주세요");
        frm_not.notice_subject.focus();
    }
    else if(!frm_not.notice_id.value){
        alert("아이디를 입력해주세요");
        frm_not.notice_id.focus();
    }
    else if(!frm_not.notice_name.value){
        alert("이름을 입력해주세요");
        frm_not.notice_name.focus();
    }
    else if(!frm_not.notice_pw.value){
        alert("비밀번호를 입력해주세요");
        frm_not.notice_pw.focus();
    }
    else if(!nottext){
        alert("내용을 입력해주세요");
        frm_not.notice_text.focus();
    }
    else{
        frm_not.action = "./notice_writeok.php";
        frm_not.submit();
    }
}

/* modify data put part */
export let put_modify_data = function(){
    const ndata = JSON.parse(notice_data);
    console.log(ndata);
    document.getElementById("sidx").value = ndata[0]["sidx"];
    document.getElementById("notice_subject").value = ndata[0]["subject"];
    document.getElementById("notice_pw").value = ndata[0]["wpass"];
    document.getElementById("notice_text").value = ndata[0]["wtext"];
}

/* modify POST */
export let modify_notice = function(){
    let nottext = CKEDITOR.instances.notice_text.getData(); //id값으로 get
    if(!frm_not.notice_subject.value){
        alert("제목을 입력해주세요");
        frm_not.notice_subject.focus();
    }
    else if(!frm_not.notice_id.value){
        alert("아이디를 입력해주세요");
        frm_not.notice_id.focus();
    }
    else if(!frm_not.notice_name.value){
        alert("이름을 입력해주세요");
        frm_not.notice_name.focus();
    }
    else if(!frm_not.notice_pw.value){
        alert("비밀번호를 입력해주세요");
        frm_not.notice_pw.focus();
    }
    else if(!nottext){
        alert("내용을 입력해주세요");
        frm_not.notice_text.focus();
    }
    else{
        frm_not.action = "./notice_modifyok.php";
        frm_not.submit();
    }
}



/* notice_write handle */
document.querySelector("#go_list").addEventListener("click",go_noticelist);
document.querySelector("#notice_input").addEventListener("click",send_notice);

/* notice_modify handle */ 
document.querySelector("#notice_modify").addEventListener("click",modify_notice);