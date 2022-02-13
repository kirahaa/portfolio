// 한페이지당 출력하는 목록갯수
const viewpage = 5; // 한 페이지당 5개씩
let pageno = 1; // 페이징 번호 1번

// paraget 
let getpage = decodeURI(location.search);
let search_wd = "";
if(getpage){
    let para = getpage.split(/&|=/);
    if(para[3]){ //paging
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

let notice_list = new Vue({
    el:"#notice",
    data:{
        array:[],
        ndata:[],
        paging:null,
        dataexist:2,
        stext:"",
        ea:0,
        no:0,
        totalea:0
    },
    methods:{
        go_modify(n){
            console.log(n);
            location.href="./notice_modify.html?sidx="+n;
        },
        notice_search(){
            if(!this.stext){
                alert("검색할 단어를 입력하세요!");
            }
            else {
                fsearch.submit();
            }
        },
        make_tb(data){
            console.log(data);
            this.array = data.slice(start_page,slice_page);
        },
        all_list(){
            location.href = "./admin_notice.html";
        },
        go_noticewrite(){
            location.href = "./notice_write.html";
        },
        delete_notice(){
            if(confirm("해당 데이터는 삭제시 복구 되지 않습니다.\n삭제하시겠습니까?")){
                nl_frm.action = "./notice_del.php";
                nl_frm.submit();
            }
        },
        paging_click(pageno){
            location.href = "./admin_notice.html?search="+this.stext+"&page="+pageno;
        },
        list_check(n){
            console.log(n.target.checked);

            if(n.target.checked==true){
                for(var i in this.array){
                    document.querySelectorAll(".cks")[i].checked = true;
                }
            }
            else{
                for(var i in this.array){
                    document.querySelectorAll(".cks")[i].checked = false;
                }
            }
        },
        checks(n){
            document.getElementById("ckall").checked = false;
        }
    },
    computed:{
        getAjax(){
            fetch("./admin_notice.json?v="+nos).then((response)=>{
                return response.json();
            }).then((data)=>{
                this.totalea = data.length;
                this.array = data;
                this.ea = data.length;
                this.stext = search_wd;
                notice_list.make_tb(data);
                if(data){
                    this.dataexist = 1; // tbody display
                    if(this.stext==""){
                        this.ndata = data.slice(start_page,slice_page);
                        this.paging = Math.ceil(this.ea/viewpage);
                        this.ea = this.ea - start_page;
                    }
                    else{
                        let z = "";
                        this.redata = data.filter((dt)=>{
                            z= dt.subject.indexOf(search_wd);
                            if(z != -1){
                                return dt.subject;
                            }
                        })
                        this.ea = this.redata.length;
                        this.ndata = this.redata.slice(start_page,slice_page);
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