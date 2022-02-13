// 한페이지당 출력하는 목록갯수
const viewpage = 5; // 한 페이지당 5개씩
let pgno = 1; // 페이징 번호 1번

// 파라미터 check (페이징 번호, 검색부분)
let getpage = window.location.search;
let search_wd = "";
if(getpage){
    /* 페이지 번호 part */ 
    let psplit = getpage.split("page=");
    let searchnm = getpage.split(/&|=/);
    if(psplit){  //page parameter 값이 있고,
        if(decodeURI(psplit[1])!="undefined"){  //값이 undefined가 아닐때,
            pgno = Number(psplit[1]);  //pgno = parameter 값,
        }
    }
    if(searchnm){  // search paramter 값이 있고, 
        if(decodeURI(searchnm[1])!="undefined"){ // undefined가 아닐때,
            search_wd = decodeURI(searchnm[1]);  // search_wd는 parameter 값,
        }
        else{
            search_wd = "";
        }
    }

}

let start_page = (pgno-1) * viewpage; //0*5 = 0 부터
let slice_page = viewpage * pgno; // 5*1 5개씩 cut

let p_list  = new Vue({
    el:"#pd",
    data:{
        arrays:[],
        warrays:[], // 검색어에 따른 재배열
        nodata:false,  //리스트 목록 보여지는 형태
        ea:0, //배열 갯수
        pageing:0,  //최초 페이지 번호
        pnm:""
    },
    methods:{
        /* 페이징 번호 클릭 */
        page_number(pageno){
            location.href = './admin_product.html?pnm='+ this.pnm +'&page='+pageno;
        },
        /* 글쓰기 버튼 클릭 */
        go_newproduct(){
            location.href="./admin_newproduct.html";
        },
        /* 상품검색 버튼 클릭 */ 
        search_pdnm(){
            if(!this.pnm){
                alert("검색할 상품명을 입력해주세요");
                this.$refs.pnm.focus();
            }
            else{
                this.$refs.psearch.submit();
            }
        },
        /* 전체목록 버튼 클릭 */
        all_list(){
            location.href = "./admin_product.html";
        },
        /* 글삭제 클릭시 적용 */
        delete_prd(w){
            let pidxnum = w;
            if(confirm("해당 상품을 완전히 삭제하시겠습니까?")){
                location.href="./product_listdel.php?idxs="+pidxnum+"&callsign=pdel_sign";
            }
        },
        /* 상품 수정 페이지 이동 */ 
        view_product(pno){
            location.href = "./admin_productview.html?pidx="+pno;
        },
        /* 이미지 클릭시 팝업 */ 
        popup_img(imgsrc){
            window.open(imgsrc,"","_blank");
        }
    },
    computed:{
        getajax(){
            fetch("./admin_product.json?v="+nos).then((response)=>{
                return response.json();
            }).then((db)=>{
                this.pnm = search_wd; // 검색어 적용
                this.ea = db.length;  // 전체 배열 갯수
                if(this.ea == 0){
                    this.nodata=true; //등록된 게시물이 없을 경우
                }
                else {
                    if(this.pnm==""){
                        this.arrays = db.slice(start_page,slice_page);
                        this.pageing = Math.ceil(this.ea / viewpage);  // 개수가 남으니까 반올림!
                        // console.log(this.pageing); //2
                        this.ea = this.ea - start_page;
                    }
                    /* 검색어가 있을 경우 배열 형태 */
                    else{ 
                        let z = ""; //배열값에 맞는 단어가 있는지 없는지를 파악하는 변수
                        this.warrays = db.filter(function(data,num,all){
                            // console.log(data.productnm);
                            z = data.productnm.indexOf(search_wd);
                            if(z != -1){
                                return data.productnm;
                            }
                        });
                        this.ea = this.warrays.length;
                        this.arrays = this.warrays.slice(start_page,slice_page);
                        this.pageing = Math.ceil(this.ea / viewpage);
                        this.ea = this.ea - start_page;
                    }
                }
            }).catch((error)=>{
                console.log("data error");
            })
        }
    }
})