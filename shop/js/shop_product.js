$(function(){
    let $goods = JSON.parse(product_info);
    let $total;
    let $main_pic = $goods[0]["product_img"].replace("../","./");
    $("#goodsno").val($goods[0]["goodsno"]); //hidden val
    $("#goodname").val($goods[0]["productnm"]); //hidden val
    $("#product_img").val($main_pic);
    
    
    let $sales = $goods[0]["product_sales"];
    let $simgs = "<li id='s_img0'></li><li id='s_img1'></li><li id='s_img2'></li><li id='s_img3'></li>";
    $("#main_img").attr("src","./shop/"+$goods[0]["product_img"]);
    $("#goodno").append($goods[0]["goodsno"]);
    $("#productnm").append($goods[0]["productnm"]);
    $("#productnm_dtc").append($goods[0]["productnm_dtc"]);
    $("#sub_img").append($simgs);
    $("#s_img0").css("background-image","url("+$main_pic+")");
    console.log($goods[0]["product_contents1"]);
    $("#contents_image").append($goods[0]["product_contents1"]);
    

    for(var i = 1; i < 4; i++ ){
        $("#s_img"+i).css("background-image","url('./shop/"+$goods[0]["product_simg"+i]+"')");
    }
    
    
    if($sales==0){
        $("#saleview").css("display","none");
        $("#product_money").prepend("");
        $("#product_sales").prepend($goods[0]["product_money"].toLocaleString());
        $("#total_money").append($goods[0]["product_money"].toLocaleString()+"원")
        $total =  $goods[0]["product_money"];
        $("#price").val($goods[0]["product_money"]);
        $("#money").val("");
    }
    else {
        $("#product_money").prepend($goods[0]["product_money"].toLocaleString()+"원");
        $("#product_sales").prepend($goods[0]["product_sales"].toLocaleString());
        $("#total_money").append($goods[0]["product_sales"].toLocaleString()+"원");
        $total =  $goods[0]["product_sales"];
        $("#price").val($goods[0]["product_sales"]);
        $("#money").val($goods[0]["product_money"]);
    }

    let $option_ck = 0;
    for(var i=1; i<4;i++){
        if(!$goods[0]["product_option"+i]){
            $option_ck++;
        }
        if($option_ck>=3){
            $("#option_area").css("display","none");
        }
    }

    for(var i = 1; i < 4; i++ ){
        let $op = "<option value='"+$goods[0]["product_option"+i]+"'>"+$goods[0]["product_option"+i]+"</option>";
        $("#goods_op").append($op);
    }

    let $v=1;
    let $price = 0;
    $("#plus_btn").click(function(){
        if($v<100){
            $("#goods_ea").val($v+=1);
            $price = $v * $total;
            $("#total_money").text($price.toLocaleString()+"원");
            $("#price").val($price);
            console.log($price);
        }
    })
    $("#minus_btn").click(function(){
        if($v>1){
            $("#goods_ea").val($v-=1);
            $price = $v * $total;
            $("#total_money").text($price.toLocaleString()+"원");
            $("#price").val($price);
            console.log($price);
        }
    })
    $("#goods_ea").keyup(function(){
        $v = $(this).val();
        if($v!=0){
            $price = $v * $total;
            $("#total_money").text($price.toLocaleString()+"원");
            $("#price").val($price);
            console.log($price);
        }
    })



    /* payment */ 
    $("#go_payment").click(function(){
        if($option_ck<3 && !$("#goods_op").val()){
            alert("옵션을 선택해주세요!");
        }
        else if($("#goods_ea").val()==0){
            alert("1개이상 구매 가능합니다!");
        }
        else{
            $("#goodea").val($v); //hidden val
            $("#order").attr("action","./shop_buy.html");
            $("#order").submit();
        }
    })
    $("#go_basket").click(function(){
        if(confirm("해당 상품을 장바구니에 담으시겠습니까?")){
            alert("장바구니에 상품을 담았습니다.");
        }
    })

    /* scroll part */
    $("#goods_description>li").click(function(){
        let $index = $(this).index();

        $("#goods_description>li").css({
            "background-color":"#fafafa",
            "color":"#6a6969",
            "border-bottom":"1px solid #eee"
        })
        $("#goods_description>li").eq($index).css({
            "background-color":"white",
            "color":"#be0000",
            "border-bottom":"none"
        })

        let $ci = $("#contents_image").offset().top;
        let $dp = $("#delivery_part").offset().top;
        let $pr = $("#product_review").offset().top;
        let $pq = $("#product_qa").offset().top;


        if($index == 0) {
            $("html,body").animate({
                "scrollTop": $ci +"px"
            },500);
        }
        else if($index == 1) {
            $("html,body").animate({
                "scrollTop":$dp +"px"
            },500);
        }
        else if($index == 2) {
            $("html,body").animate({
                "scrollTop":$pr +"px"
            },500);
        }
        else if($index == 3) {
            $("html,body").animate({
                "scrollTop":$pq +"px"
            },500);
        }
    })

    /* sub image click */
    $("#sub_img>li").click(function(){
        let $bimg = $(this).css("background-image");
        if($bimg.match(/product/g)!=null){
            let $s = $bimg.split('"');
            $("#main_img").attr("src",$s[1]);
        }

    })






})

{/* <div id="prd_view" class="prd_view">
                <span>
                    <img src="./product/99765316.jpg" alt="">
                    <ul>
                        <li><img src="./product/75673073.jpg" alt=""></li>
                        <li><img src="./product/75673073.jpg" alt=""></li>
                        <li><img src="./product/75673073.jpg" alt=""></li>
                    </ul>
                </span>
                <span>
                    <ul>
                        <li>12312312</li>
                        <li><label>상품명상품명</label><label><img src="./ico/ico_share.webp" alt=""></label></li>
                        <li>상품설명</li>
                        <li>회원할인가</li>
                        <li><s>60,000</s></li>
                        <li>58,000원</li>
                        <li>배송비 2,500원</li>
                        <li>
                            <span>옵션선택</span>
                            <select name="" id="" class="goodsel1">
                                <option value="">옵션을 선택해주세요</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </li>
                        <li>
                            <span>
                                구매갯수
                            </span>
                            <select name="" id="" class="goodsel2">
                                
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </li>
                        <li><span>
                            총 상품금액
                            </span>
                            <label>
                                8,9000원
                            </label>
                        </li>
                        <li>
                            <button type="button">구매하기</button>
                            <button type="button">장바구니</button>
                        </li>
                    </ul>
                </span>
            </div> */}
