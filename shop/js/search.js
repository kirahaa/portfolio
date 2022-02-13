let param = decodeURI( location.search );
let search_word = param.split("=")[1];
console.log(search_word);



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
    let warr = JSON.parse(wdata);
    let zcount = 0;
    console.log(warr);
    warr = warr.filter((d)=>{
        z = d.productnm.indexOf(search_word);
        console.log(z,"!!");
        if(z!=-1){
            document.getElementById("nodata").style.display = "none";
            return d.productnm;
        }
        else if(z==-1){
            zcount++;
        }
        console.log(zcount);
        if(zcount<1 || zcount==9){
            document.getElementById("nodata").style.display = "block";
        }
    })

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
        
        lis_3.append(ss);
        lis_2.innerText= warr[i].productnm_dtc;
        lis_1.innerText= warr[i].productnm;
        lis.setAttribute("pidx",warr[i].pidx);
        lis.setAttribute("goodsno",warr[i].goodsno);
        lis.classList.add("first");
        lis.innerHTML = blackscreen;
        uls.append(lis,lis_1,lis_2,lis_3,lis_4);
        uls.classList.add('over');
        document.getElementById("week_wrap").appendChild(uls) ;
    }

    for(var i in warr){
        document.getElementById("goodsimg"+i).style.backgroundImage = "url('"+"./shop/"+warr[i]["product_img"]+"')";
    }


    let prds = document.querySelectorAll(".first");
    function mouse_over_handle(n){
        let nod = Array.from(prds).indexOf(n.currentTarget);
        document.querySelectorAll(".black")[nod].style.display = "flex";
    }
    function mouse_out_handle(n){
        let nod = Array.from(prds).indexOf(n.currentTarget);
        document.querySelectorAll(".black")[nod].style.display = "none";
    }
    function go_product_view(n){
        let p = n.currentTarget.getAttribute("pidx");
        let g = n.currentTarget.getAttribute("goodsno");
        location.href="./shop_product.html?pidx="+p+"&goodsno="+g;
    }

    /* prds event handling */
    Array.from(prds).forEach(function(b,c,d){
        b.addEventListener("mouseover",mouse_over_handle);
    })
    Array.from(prds).forEach(function(b,c,d){
        b.addEventListener("mouseout",mouse_out_handle);
    })
    Array.from(prds).forEach(function(b,c,d){
        b.addEventListener("click",go_product_view);
    })
}
