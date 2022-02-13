let p_list = new Vue({
    el:"#pd",
    data:{
        pdcode:"",
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
        product_img1:"",
        product_img2:"",
        product_img3:"",
        product_contents1:"",
        discount:false
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
        post_newpd(){
            this.product_contents1 = CKEDITOR.instances.product_contents1.getData();
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
                alert("상품 이미지를 선택해주세요");
            }
            else if(!this.product_contents1){
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
                alert("상품 이미지를 선택해주세요");
            }
            else if(!this.product_contents1){
                alert("상품 상세설명을 입력해주세요");
            }
            else{
                pd_frm.submit();
            }
        },
        go_productlist(){
            history.go(-1);
        }
    },
    computed:{
        product_view(){
            let code = "";
            for(let i = 0; i < 8; i++){
                code += Math.floor(Math.random()*10);
            }
            this.pdcode = code;
        },
        product_view2(){
            console.log(document.getElementById("cke_product_contents1"));
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
