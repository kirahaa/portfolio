// submit
export let go_join = function(){
    let b1 = document.getElementById("btn1").value;
    let b2 = document.getElementById("btn2").value;
    let b3 = document.getElementById("btn3").value;
    if(b1=="Y" && b2=="Y" && b3=="Y"){
        alert("확인되었습니다.");
        location.href="http://khy4018.dothome.co.kr/portfolio/shop/m/m_member.html?ck1="+b1+"&ck2="+b2+"&ck3="+b3;
    }
    else {
        alert("약관에 모두 동의하셔야 가입이 가능합니다.");
    };
}
// btn animation on
function btn_ani(n){
    let move = null;
    let btn = document.getElementById("btn"+n);
    function ani(){
        move = move+3;
        btn.style.right=move+"px";
        btn.style.left=null;
        if(move<=40){
            window.requestAnimationFrame(ani);
        }
    }
    document.getElementById("btnbox"+n).style.backgroundColor="#a4fbd0";
    document.getElementById("btn"+n).value="Y";
    window.requestAnimationFrame(ani);
}
// btn animation off
function btn_ani2(n){
    let move = null;
    let btn = document.getElementById("btn"+n);
    function ani(){
        if(move<=38){
            window.requestAnimationFrame(ani);
        }
        move = move+3;
        btn.style.left = move+"px";
        btn.style.right=null;
    }
    document.getElementById("btnbox"+n).style.backgroundColor="rgb(70,70,70)";
    document.getElementById("btn"+n).value="N";
    window.requestAnimationFrame(ani);
}

// click handling 
let handle1=0;
document.getElementById("btn1").addEventListener("click",function(){
    if(handle1==0){
        btn_ani(1);
        handle1=1;
    }
    else{
        btn_ani2(1);
        handle1=0;
    }
})
let handle2=0;
document.getElementById("btn2").addEventListener("click",function(){
    if(handle2==0){
        btn_ani(2);
        handle2=1;
    }
    else{
        btn_ani2(2);
        handle2=0;
    }
})
let handle3=0;
document.getElementById("btn3").addEventListener("click",function(){
    if(handle3==0){
        btn_ani(3);
        handle3=1;
    }
    else{
        btn_ani2(3);
        handle3=0;
    }
})
document.getElementById("agree_btn").onclick= go_join;

