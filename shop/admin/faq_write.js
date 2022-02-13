/* admin_faqview.html(faq_view.html) - 수정 */
/* admin_write.html(faq_insert.html) - 작성 */ 

// export let faqinck = function(){
//     console.log("test");
// }

/* admin_write.html(faq_insert.html) - 작성 */ 

let go_faqlist = function(){
    location.href = "./admin_faq.html";
}
let send_faq = function(){
    let qatext = CKEDITOR.instances.fatext.getData(); //id값으로 get
    
    if(!frm_faq.fcate.value){
        alert("질문 카테고리를 선택해주세요");
    }
    else if(!frm_faq.fqtext.value){
        alert("질문 내용을 입력해주세요");
    }
    else if(!qatext){
        alert("내용을 입력해주세요");
    }
    else{
        frm_faq.action = "faq_writeok.php";
        frm_faq.submit();
    }
}
document.getElementById("go_list").addEventListener("click",go_faqlist);
document.getElementById("faq_input").addEventListener("click",send_faq);

//////////////////////////////////////////////////////////////////////////


/* admin_faqview.html(faq_view.html) - 수정 */

/* 수정  -> faq_modifyok.php */  
export let faq_modify = function(){
    let qatext = CKEDITOR.instances.fatext.getData(); //id값으로 get
    if(!frm_faq.fcate.value){
        alert("질문 카테고리를 선택해주세요");
    }
    else if(!frm_faq.fqtext.value){
        alert("질문 내용을 입력해주세요");
    }
    else if(!qatext){
        alert("내용을 입력해주세요");
    }
    else{
        frm_faq.action = "./faq_modifyok.php";
        frm_faq.submit();
    }
}


/* 삭제  -> faq_delok.php */
export let faq_del = function(){
    if(confirm("해당 데이터를 삭제하시겠습니까? 삭제된 데이터는 복구되지 않습니다.")){
        let qatext = CKEDITOR.instances.fatext.getData(); //id값으로 get
        if(!frm_faq.fcate.value){
            alert("질문 카테고리를 선택해주세요");
        }
        else if(!frm_faq.fqtext.value){
            alert("질문 내용을 입력해주세요");
        }
        else if(!qatext){
            alert("내용을 입력해주세요");
        }
        else{
            frm_faq.action = "./faq_delok.php";
            frm_faq.submit();
        }
    }
}


/* parse data value input part */
export let faqinput = function(){
    let faqpara = location.href;
    document.getElementById("fidx").value = faqpara.split("=")[1]; // fidx value put


    const faqlistdata = JSON.parse(faqdata);
    document.getElementById("fcate").value = faqlistdata[0]['category'];
    document.getElementById("fqtext").value = faqlistdata[0]['fqtext'];
    document.getElementById("fatext").value = faqlistdata[0]['fatext'];
}


// document.getElementById("faq_list").addEventListener("click",faqinck);
document.querySelector("#faq_modifyok").addEventListener("click",faq_modify);
document.querySelector("#faq_delok").addEventListener("click",faq_del);
