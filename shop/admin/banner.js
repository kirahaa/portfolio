// $("#banner_effect").click(function(){
//    let $banner_v= $("[name=effect]").val();
//    console.log($banner_v);
//       $.ajax({
//         type:"GET",
//         cache:false,
//         url:"banner_effect.php",
//         data:$banner_v,
//         dataType:JSON,
//         success:function(response){
//           console.log(response);
//         },
//         error:function(){
//           console.log("data error!!");
//         }
//       });
//   });


/* 대메뉴 파트 */
$(function(){
    $("#menu>li").click(function(){
        let $url =  $(this).attr("links");
        location.href = $url;
    })
})

/* 폰트 크기 조절 파트 */
function fontclass(part){
    let cs = document.getElementById("banner").className;
    if(part == "1"){
        plus_cs = "section";
        document.getElementById("banner").className = plus_cs;
    }
    else{
        if(part == "2"){
            plus_cs = "font_view2";
            document.getElementById("banner").classList.remove("font_view3");
        }
        else if(part == "3"){
            plus_cs = "font_view3";
            document.getElementById("banner").classList.remove("font_view2");
        }
        document.getElementById("banner").className += " " + plus_cs;
    }
};

/* banner effect get ajax */

function banner_effect(){
let ea = document.getElementsByName("effect").length;
let banner_v="";
for(let n=0;n<ea;n++){
    if(document.getElementsByName("effect")[n].checked==true){
        banner_v=document.getElementsByName("effect")[n].value;
    }
}
// console.log(banner_v);
let data;
function windowck(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}
function fileopen(){
    if(data.readyState==XMLHttpRequest.DONE && data.status==200){
        console.log(this.response);
        alert("정상적으로 적용되었습니다.");
    }
}
let geturl="banner_effect.php?effect="+banner_v;
data=windowck();
data.onreadystatechange = fileopen;
data.open("GET",geturl,true);
data.setRequestHeader("content-type","application/x-www-form-urlencoded");
data.send();
}

function banner_input(){
    location.href="admin_newbanner.html";
}