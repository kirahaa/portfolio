/* banner list vue part */
const viewpage = 5;
let pgno = 1;

let getpage = window.location.search;
let search_wd = "";
if(getpage){
    let psplit = getpage.split("page=");
    if(psplit){
        pgno = Number(psplit[1]);
    }
}

let start_page = (pgno-1) * viewpage; //0*5 = 0 부터
let slice_page = viewpage * pgno; // 5*1 5개씩 cut

let list_bn = new Vue({
    el:"#banner",
    data:{
        arrays:"",
        banners:[],
        tablenone:false,
        no:1,
        total_ea:0,
        pagearr:0,
        ea:0
    },
    methods:{
        ajax(datas){
            this.total_ea=datas.length+"개";
            for(let w in datas){
                this.banners.push({
                    idx:this.no++,
                    img:datas[w].bimg,
                    link:datas[w].blink,
                    nm:datas[w].bname,
                    date:datas[w].bindate.substr(0,10),
                    bidx:datas[w].bidx
                })
            }   
        },
        popup_img(imgsrc){
            window.open(imgsrc,"","_blank");
        },
        del_banner(bidx){
            if(confirm("해당 배너를 삭제하시겠습니까?")){
                location.href = "./banner_del.php?del_idx="+bidx;
                alert("정상적으로 삭제되었습니다.");
            }
        },
        page_number(pageno){
            location.href = './admin_banner.html?page='+pageno;
        },
        create_page(parr){
            this.ea = parr.length;
            if(this.ea==0){
                this.tablenone = true;
            }
            else{
                this.pagearr = Math.ceil(this.ea / viewpage );
                this.ea = this.ea - start_page;
            }
        }
    },
    computed:{
        getajax(){
            fetch("./admin_banner.json?v=<?=$v?>").then((response)=>{
                return response.json();
            }).then((data)=>{
                list_bn.ajax(data);
                list_bn.create_page(data);
            })
            .catch(function(error){
                console.log("data error!");
            })
        }
    }
})
