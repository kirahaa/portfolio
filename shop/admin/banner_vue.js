// 배너 신규등록 파트
let vue_banner = new Vue({
    el:"#banner",
    data:{
        banner_order:"",
        hv:"banner_url",
        urls:"http://khy4018.dothome.co.kr",
        nm:"bname",
        lk:"blink",
        img:"bimg",
        mtd:"POST",
        php:"banner_input.php",
        enc:"multipart/form-data",
        file:"image/jpg, image/jpeg, image/gif, image/png, image/svg",
        bnm:"",
        blk:"",
        bimg:""
    },
    components:{

    },
    methods:{
        banner_post(){

            // alert("Test");
            if(frm.bname.value==""){
                alert("배너 명을 입력해주세요");
            }
            else if(frm.blink.value==""){
                alert("링크주소를 입력해주세요");
            }
            else if(frm.bimg.value==""){
                alert("파일을 선택해주세요");
            }
            else{
                frm.submit();
            }
        },
        banner_list(){
            history.go(-1);
        }
    },
    computed:{
        
    }
})