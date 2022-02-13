let data;
function windowck() {
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}
function fileopen(){
    if(data.readyState==XMLHttpRequest.DONE && data.status == 200){
        make_weekproduct(this.response);
    }
}
data = windowck();
data.onreadystatechange = fileopen;
data.open("GET","./admin/admin_product.json?v="+nos,true);
data.send();

function make_weekproduct(wdata){
    const warr = JSON.parse(wdata);
    
    for(var i in warr){
        // console.log(warr[i]);
        let uls = document.createElement("ul");
        let lis = document.createElement("li");
        let lis_1 = document.createElement("li");
        let lis_2 = document.createElement("li");
        let lis_3 = document.createElement("li");
        let lis_4 = document.createElement("li");
        let ss = document.createElement("s");

        let blackscreen = "<label id='goodsimg"+i+"' title='"+warr[i].productnm+"'></label><span class='black'><label><ul><li><img src='./ico/icon_heart.png'></li></ul>\
        </label><label><ul><li><img src='./ico/icon_cart.png'></li></ul></label></span>";
        
        let prd_money = warr[i].product_money.toLocaleString() + "원";
        let sale_money = warr[i].product_sales.toLocaleString() +"원";
        if(warr[i].product_sales==0){
            warr[i].product_sales="";
            lis_4.innerText= prd_money;
        }
        else {
            ss.innerText= prd_money;
            lis_4.innerText= sale_money;
        }
        
        lis_3.appendChild(ss);
        lis_2.innerText= warr[i].productnm_dtc;
        lis_1.innerText= warr[i].productnm;
        lis.setAttribute("pidx",warr[i].pidx);
        lis.setAttribute("goodsno",warr[i].goodsno);
        lis.classList.add("first");
        lis.innerHTML = blackscreen;
        uls.appendChild(lis);
        uls.appendChild(lis_1);
        uls.appendChild(lis_2);
        uls.appendChild(lis_3);
        uls.appendChild(lis_4);
        uls.classList.add('over');
        document.getElementById("week_wrap").appendChild(uls);
    }

    for(var i in warr){
        document.getElementById("goodsimg"+i).style.backgroundImage = "url('"+"./shop/"+warr[i]["product_img"]+"')";
    }

    let pd_ea = document.querySelectorAll(".first").length;
    let prds = document.querySelectorAll(".first");
    
    function mouse_over_handle(){
        this.lastChild.style.display = "flex";
    }
    function mouse_out_handle(){
        this.lastChild.style.display = "none";
    }
    function go_product_view(){
        let p = this.getAttribute("pidx");
        let g = this.getAttribute("goodsno");
        location.href = "./shop_product.html?pidx="+p+"&goodsno="+g;
    }

    /* prds event handling */
    for(var i = 0; i < pd_ea; i++){
        prds[i].addEventListener("mouseover",mouse_over_handle);
        prds[i].addEventListener("mouseout",mouse_out_handle);
        prds[i].addEventListener("click",go_product_view);
    }
    
}
