
function print_product_data(){
    /* print data */ 
    const goodea = Number(document.getElementById("goodea").value);
    let price = Number(document.getElementById("price").value);
    const product_img = document.getElementById("product_img").value;
    const goodname = document.getElementById("goodname").value;
    const product_option = document.getElementById("product_option").value;
    document.getElementById("get_prd_img").setAttribute("src",product_img);    
    document.getElementById("get_goodname").append(goodname);
    if(product_option!=""){
        document.getElementById("get_prd_option").append("옵션 : "+product_option);
    }
    document.getElementById("get_goodea").append(goodea);
    document.getElementById("prd_price").append((price/goodea).toLocaleString()+"원");
    document.getElementById("final_price").append((price+2500).toLocaleString()+"원");
    var v = 0;
    while(v<2){
        document.getElementById("get_price"+v).append(price.toLocaleString()+"원");
        v++;
    }
    ////////print_data--->

    console.log(price);
    
    
}

print_product_data();



/* customer info check */ 
for(var i = 0; i < 4; i++){
    document.getElementById("addr"+i).addEventListener("click",function(n){
        for(var ii = 0; ii < 4; ii++){
            document.getElementsByName('addr')[ii].parentNode.style = "black";
        }
        n.path[1].style.color = "#be0000";
        let nod = Array.from(document.getElementsByName('addr')).indexOf(n.currentTarget);
        if(nod==0){
            document.getElementById("recipient_name").readOnly = true;
            document.getElementById("recipient_addr").readOnly = true;
            document.getElementById("recipient_addr1").readOnly = true;
            document.getElementById("recipient_addr2").readOnly = true;
            document.getElementById("recipient_tel").readOnly = true;
            document.getElementById("recipient_phone").readOnly = true;
            document.getElementById("recipient_name").value = document.getElementById("orderer_name").value;
            document.getElementById("recipient_addr").value = document.getElementById("orderer_addr").value;
            document.getElementById("recipient_addr1").value = document.getElementById("orderer_addr1").value;
            document.getElementById("recipient_addr2").value = document.getElementById("orderer_addr2").value;
            document.getElementById("recipient_tel").value = document.getElementById("orderer_tel").value;
            document.getElementById("recipient_phone").value = document.getElementById("orderer_phone").value;
        }
        else {
            document.getElementById("recipient_name").readOnly = false;
            document.getElementById("recipient_addr2").readOnly = false;
            document.getElementById("recipient_tel").readOnly = false;
            document.getElementById("recipient_phone").readOnly = false;
        }
    })

}


/* payment table view */ 
let payment_ck = 0;
for(var i=0; i < 3; i++){
    document.getElementById("payment"+i).addEventListener("click",function(){
        let payment_cash = document.getElementById("payment0").checked;
        if(payment_cash==true){
            document.getElementById("pay_option_view").style.display = "table-row-group";
            payment_ck = 1;
        }
        else{
            payment_ck = 0;
            document.getElementById("pay_option_view").style.display = "none";
        }
    })
}
document.getElementById("pay_agree").addEventListener("click",function(){
    document.querySelector(".pay_agree_color").style.color = "black";
})



/* submit */ 
document.getElementById("pfrm").addEventListener("submit",function(event){
    
    if(payment_ck==1 && !document.getElementById("depositor_name").value){
        alert("입금자명을 입력해주세요.");
        event.preventDefault();
    }
    else if(payment_ck==1 && !document.getElementById("deposit_bank").value ){
        alert("입금은행을 선택해주세요.");
        event.preventDefault();
    }
    else if(!document.getElementById("pay_agree").checked){
        alert("구매동의 항목에 체크하셔야 결제가 진행됩니다.");
        document.querySelector(".pay_agree_color").style.color = "#be0000";
        event.preventDefault();
    }
    else{
        document.getElementById("price").value = Number(document.getElementById("price").value)+2500;
        pfrm.action = "./shop_pay.html";
        pfrm.submit();
        // console.log("ok");
    }

})