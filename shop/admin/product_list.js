/* product list Vue */
const viewpage = 3;  //3개씩 보이게
let getpage = window.location.search;
let pageno = 1;
if(getpage!=""){
    let psplit = getpage.split("page=");
    pageno = psplit[1];
}
let start_page = (pageno-1)*viewpage;
let slice_page = viewpage * pageno;
let dea;


let p_list = new Vue({
    el:"#pd",
    data:{
        arrays:"",
        products:[],
        nodata:true,
        pnm:"",
        ea:"",
        no:null,
        pagearr:null
    },
    methods:{
        delete_prd(w){
            let pidxnum = w;
            if(confirm("해당 상품을 완전히 삭제하시겠습니까?")){
                location.href="./product_listdel.php?idxs="+pidxnum+"&callsign=pdel_sign";
            }
        },
        page_number(n){
            location.href="./admin_product.html?page="+n;
        },
        go_newproduct(){
            location.href="./admin_newproduct.html";
        },
        ajax(datas,dea){
            // console.log(dea);
            for(let i in datas){
                this.products.push({
                    num:dea--,
                    code:datas[i].goodsno,
                    nm:datas[i].productnm,
                    money:datas[i].product_money.toLocaleString(),
                    sale:datas[i].product_sales.toLocaleString(),
                    img:datas[i].product_img,
                    use:datas[i].product_use,
                    pidx:datas[i].pidx
                })

            }
        },
        popup_img(imgsrc){
            window.open(imgsrc,"","_blank");
        },
        search_pdnm(){
            if(!this.pnm){
                alert("상품명을 입력해주세요");
                this.$refs.pnm.focus();
            }
            else{
                this.$refs.psearch.submit();
            }
        }

    },
    computed:{
        getajax(){
            
            fetch("./admin_product.json?v="+nos).then((response)=>{
                return response.json();
            }).then((data)=>{
                this.ea = data.length;

                dea = data.length - start_page;

                p_list.ajax(data.slice(start_page,slice_page),dea);

                if(data!=""){
                    this.nodata=false;
                }

                this.pagearr = this.ea /viewpage; //3개씩 출력하는 배열

            })
            .catch(function(){
                console.log("data error!");
            })

        },
        getparameter(){
            /* search parameter part */
            if(location.search.split("=")[1]==undefined){
                this.pnm="";
            }
            else{
                this.pnm = decodeURI(location.search.split("=")[1]);
            }
            
            let spnm = decodeURI(window.location.search).split("page=");
            if(spnm[1]!=""){
                this.pnm ="";
            }


        }
    }
})

