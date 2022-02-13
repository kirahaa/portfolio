// 한페이지당 출력하는 목록갯수
const viewpage = 10; // 한 페이지당 5개씩
let pageno = 1; // 페이징 번호 1번

// parameter check
let getpage = decodeURI(location.search);
let search_wd= "";
if(getpage){
    let para = getpage.split(/&|=/);
    if(para[3]){  //paging
        if(para[3]!="undefined"){
            pageno = Number(para[3]);
        }
    }
    if(para[1]){  //search_word
        if(para[1]!="undefined"){
            search_wd = para[1];
        }
        else{
            search_wd="";
        }
    }
}

let start_page = (pageno-1)*viewpage;
let slice_page = viewpage * pageno;


let faq_list = new Vue({
    el:"#faq",
    data:{
        array:[],
        qadata:[],
        paging:null,
        dataexist:2,
        answer:"",
        stext:"",
        totalea:0,
        no:0,
        category:"",
        catearray:[],
        catetext:"",
        vv:"Y"
    },
    methods:{
        faq_search(){
            if(!this.stext){
                alert("검색할 단어를 입력하세요!");
            }
            else {
                fsearch.submit();
            }
        },
        go_faqwrite(){
            location.href = "./faq_write.html";
        },
        show_answer(n){
            document.querySelectorAll(".answercontrol")[n].lastChild.classList.toggle('showhandle');
        },
        paging_click(pageno){
            
            location.href = "./admin_faq.html?search="+this.stext+"&page="+pageno;
            // console.log(start_page, slice_page);
            // console.log(this.qadata);
        },
        all_list(){
            location.href = "./admin_faq.html";
        },
        category_part(data){

            this.qadata = data.slice(start_page,slice_page);
            for(var f in data){
                switch(data[f]["category"]){
                    case 1:
                        data[f]["category"] = "배송문의";
                        break;

                    case 2:
                        data[f]["category"] = "반품/교환/환불";
                        break;

                    case 3:
                        data[f]["category"] = "주문/결제";
                        break;

                    case 4:
                        data[f]["category"] = "회원서비스";
                        break;

                    case 5:
                        data[f]["category"] = "안전거래";
                        break;
                }
            }
            

        },
        category_select(num){
            this.catetext = num.target.outerText;
            let cateea = document.querySelectorAll("#caul>li").length;
            for(var i=0;i<cateea;i++){
                document.querySelectorAll("#caul>li")[i].style.backgroundColor="white";
                document.querySelectorAll("#caul>li")[i].style.color="black";
            }
            if(num.target!=num.currentTarget){
                num.target.style.backgroundColor = "rgb(166, 166, 166)";
                num.target.style.color = "white";
            }

            let z ="";
            this.catearray = this.array.filter((d)=>{
                z = d.category.indexOf(this.catetext);
                if(z != -1){
                    return d.category;
                }
            })
            
            this.ea = this.catearray.length;
            this.qadata = this.catearray.slice(start_page,slice_page);
            this.paging = Math.ceil(this.ea/viewpage);
            this.ea = this.ea - start_page;
            
        },
        go_faqmodify(index){
            location.href = "./admin_faqview.html?fidx="+index;
        }
    },
    computed:{
        getAjax(){
            fetch("./admin_faq.json?v=<?=$v?>").then((response)=>{
                return response.json();
            }).then((data)=>{
                // console.log(data);
                this.array=data;
                faq_list.category_part(data);

                this.totalea = data.length;
                this.ea = data.length;  //전체 배열 갯수
                this.stext = search_wd; // 검색어 적용
                if(data){
                    this.dataexist=1 //display
                    if(this.stext==""){
                        this.qadata = data.slice(start_page,slice_page);
                        this.paging = Math.ceil(this.ea/viewpage);
                        this.ea = this.ea - start_page;
                    }
                    // 검색어 있을 경우,
                    else{
                        let z = "";
                        this.redata = data.filter((dt)=>{
                            z = dt.fqtext.indexOf(search_wd);
                            if(z != -1){
                                return dt.fqtext;
                            }
                        });
                        this.ea = this.redata.length;
                        this.qadata = this.redata.slice(start_page,slice_page);
                        this.paging = Math.ceil(this.ea/viewpage);
                        this.ea = this.ea - start_page;
                    }
                    
                }
                
            })
            .catch((error)=>{
                console.log("data error!");
            })

        }
    }
})
