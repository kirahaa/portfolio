let p_list = new Vue({
    el:"#pd",
    data:{
        goodsno:"",
        product_nm:"",
        product_nmdtc:"",
        product_money:"",
        product_dc:"N",
        product_dcpart:"P",
        product_dcnum:"",
        product_sales:0,
        product_ea:"",
        product_img:"",
        product_option1:"",
        product_option2:"",
        product_option3:"",
        product_url:"",
        product_img1:"",
        product_img2:"",
        product_img3:"",
        product_contents1:"",
        imgview:"",
        simg1:"",
        simg2:"",
        simg3:"",
        pidxv:"",
        pv1:2,
        spv1:2,
        spv2:2,
        spv3:2,
        main_img:1
    },
    methods:{
        m_check(mp){
            if(mp==1){
                if(!this.product_money){
                    alert("소비자 가격을 입력하셔야 합니다.");
                    document.getElementsByName("product_dc")[1].checked = true;
                }
                else{
                    document.getElementsByName("product_money")[0].readOnly = true;
                }
            }
            else{
                document.getElementsByName("product_money")[0].readOnly = false;
            }
        },
        /* 수정 버튼 클릭시 */
        pmodify(){
            // console.log(pd_frm.main_img.value);
            // console.log(this.imgview);
            if(confirm("해당 상품을 수정하시겠습니까?")){
                if(this.imgview!=""){ //있으면,
                    this.main_img = 0; //hidden값 0
                }
                else{ //없으면
                    this.main_img = 1; //hidden값 1
                }
    
                if(this.main_img==0){ // 0이고, 있을떄
                    console.log(this.imgview,"있다!");
                    this.product_img=this.imgview; 
                    p_list.check_input();
                }
                else if(this.main_img==1){  //1이고, 없을때
                    console.log(this.main_img,this.imgview,"없다!!!");
                    p_list.check_input();
                }
            }
            
        },
        check_input(){
            if(!this.product_nm){
                alert("상품명을 입력해주세요");
            }
            else if(this.product_nm.length>150){
                alert("상품명은 150자 이내로 입력해주세요");
            }
            else if(!this.product_nmdtc){
                alert("간편설명을 입력해주세요")
            }
            else if(!this.product_money){
                alert("소비자 가격을 입력해주세요");
            }
            else if(isNaN(this.product_money)==true){
                alert("숫자만 입력해주세요");
            }
            else if(!this.product_dc){
                alert("상품 할인 유무를 선택해주세요");
            }
            else{
                if(this.product_dc=="Y"){
                    p_list.check_yes();
                }
                else{
                    p_list.check_no();
                }
            }
        },
        check_yes(){

            if(!this.product_dcpart){
                alert("단위를 선택해주세요");
            }
            else if(!this.product_dcnum){
                alert("할인율을 입력해주세요");
            }
            else if(!this.product_ea){
                alert("상품 수량을 입력해주세요");
            }
            else if(isNaN(this.product_ea)==true){
                alert("숫자만 입력해주세요");
            }
            else if(!this.product_img){
                alert("상품 대표 이미지를 선택해주세요!");
            }
            else if(!JSON.parse(arrays)[0]["product_contents1"]){
                alert("상품 상세설명을 입력해주세요");
            }
            else{
                pd_frm.submit();
            }
        },
        check_no(){
            if(!this.product_ea){
                alert("상품 수량을 입력해주세요");
            }
            else if(isNaN(this.product_ea)==true){
                alert("숫자만 입력해주세요");
            }
            else if(!this.product_img){
                alert("상품 대표 이미지를 선택해주세요!");
            }
            else if(!JSON.parse(arrays)[0]["product_contents1"]){
                alert("상품 상세설명을 입력해주세요");
            }
            else{
                pd_frm.submit();
            }
        },
        go_productlist(){
            history.go(-1);
        },
        img_del(img_name){
            let pidx = location.search.split("pidx=")[1];
            this.pidxv = pidx; 

            if(confirm("해당 이미지를 삭제하시겠습니까?")){
                fetch("./files_del.php?pidx="+this.pidxv+"&fieldnm="+img_name+"&tablenm=shop_product")
                .then(function(call){
                    return call.json();
                }).then(function(sign){
                    console.log(sign,img_name);
                    alert("정상적으로 삭제되었습니다");
                    p_list.pv_control(sign,img_name);
                });
            }
            
        },
        pv_control(sign,img_name){

            if(sign=="success"){
            switch(img_name){
                case "product_img":
                this.pv1 = 2;
                break;
                case "product_simg1":
                this.spv1 = 2;
                break;
                case "product_simg2":
                this.spv2 = 2;
                break;
                case "product_simg3":
                this.spv3 = 2;
                break;
                }
            }
        }
    },
    computed:{
        getData(){
            const data =JSON.parse(arrays);
            // console.log(data);
            this.goodsno=data[0]["goodsno"],
            this.product_nm=data[0]["productnm"],
            this.product_nmdtc=data[0]["productnm_dtc"],
            this.product_money=data[0]["product_money"],
            this.product_dc=data[0]["product_dc"]
            this.product_dcpart=data[0]["product_dcpart"],
            this.product_dcnum=data[0]["product_dcnum"],
            this.product_sales=data[0]["product_sales"],
            this.product_ea=data[0]["product_ea"],
            this.product_option1=data[0]["product_option1"],
            this.product_option2=data[0]["product_option2"],
            this.product_option3=data[0]['product_option3'],
            this.product_url=data[0]["product_url"]

            let pidx = location.search.split("pidx=")[1];
            this.pidxv = pidx; 
            
            if(data[0]['product_img']!=""){
                this.pv1= 1;
                this.imgview=data[0]['product_img'];
                this.main_img = 0;  //대표 이미지가 있을때,
            }
            else{
                this.pv1 = 2;
                this.main_img = 1;  //대표 이미지가 없을때,
            }

            if(data[0]['product_simg1']!=""){
                this.spv1= 1;
                this.simg1=data[0]['product_simg1'];
            }
            if(data[0]['product_simg2']!=""){
                this.spv2= 1;
                this.simg2=data[0]['product_simg2'];
            }
            if(data[0]['product_simg3']!=""){
                this.spv3= 1;
                this.simg3=data[0]['product_simg3'];
            }
            // else{
            //     this.pv1= 2;
            //     this.spv1= 2;
            //     this.spv2= 2;
            //     this.spv3= 2;
            // }
            
            
        },
        product_view2(){
            if(this.product_dc=="Y"){
                this.discount=true;
            }
            else if(this.product_dc=="N"){
                this.discount=false;
            }
        },
        product_view3(){
            let totalm = 0;
            if(this.product_dcpart=="P"){
                totalm = Math.floor(Number(this.product_money)*(1-(Number(this.product_dcnum)*0.01)));
                this.product_sales = Math.floor(totalm*0.1)*10; //영업팀이랑 회의사항 원단위 절삭 필요 ceil / round
            }
            else{
                this.product_sales = Number(this.product_money) - Number(this.product_dcnum);
            }
        }
    }
})

// $(function(){
//     $("#img_del").click(function(){
//         $.ajax({
//             url:"./files_del.php",
//             cache:false,
//             type:"GET",
//             dataType:"JSON",
//             data:{
//                 tablenm:"shop_product",
//                 pidx:$("#pidx").val(),
//                 fieldnm: $(this).attr("filenm")
//             },
//             success:function($result){
//                 if($result=="success"){
//                     console.log($result);
//                     $(".imgview").css("display","none");
//                     $("#img_del").css("display","none");
//                     $("#product_img").css("display","inline-block");
//                 }
//                 else{
//                     console.log($result);
//                 }
//             },
//             error:function(){
//                 console.log("data error");
//             }  
//         })
//     })
// })
