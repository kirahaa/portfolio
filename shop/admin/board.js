function search(){
    let stext = document.getElementById("stext").value;
    if(stext==""){
        alert("검색할 단어를 입력하세요");
        return false;
    }
    else{
        return true;
    }
}
function filters(){
    let sdata = decodeURI(location.search);
    let stext = sdata.split("stext=");
    if(stext[1]==undefined){
        document.getElementById("stext").value="";
    }
    else{
        document.getElementById("stext").value = stext[1];
    }
    let spart = stext[0].replace("?spart=","");
    const sea = document.getElementById("spart").length;
    var s;
    for(s=0;s<sea;s++){
        if(document.getElementById("spart").options[s].value==spart){
            document.getElementById("spart").options[s].selected = "selected";
        }

    }
}
function go_page(part,bname){
    switch(part){
        case 1:
        location.href ='./admin_bmodify.html?boardnm='+bname;
        break;
    }
}