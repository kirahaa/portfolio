$(function(){

    $.get("./admin/admin_notice.json?v="+nos,function(ndata){
        
    },'json')
    .done(function(ndata){
        $.fn.make_notice2(ndata);
    })
    .fail(function(){
        console.log("json_error!");
    })

    let $getpage = decodeURI(window.location.search);
    let $para = $getpage.split("?page=")[1];
    let $paging = 5;
    let $start_page = 0;
    let $slice_page =  1;
    let $pageno = 1;
    
    
    $.fn.make_notice2 = function($data){

        

        let $new_notice = $data.slice($start_page,$paging);
        let $ea = $data.length - ($paging * $start_page);  //공지사항 리스트 번호 출력
        let $notice_ea = Math.ceil($new_notice.length/$paging);  //한페이지에 대한 배열 총개수

        $.map($new_notice,function($n,$d){
            let $list = '<tr link="'+$n['sidx']+'" class="viewlink">\
            <td>'+($ea--)+'</td>\
            <td>'+$n['subject']+'</td>\
            <td>'+$n['name']+'</td>\
            <td>'+$n['windate'].substr(0,10)+'</td>\
            <td>'+$n['wcount']+'</td>\
            </tr>';
            $("#notice").append($list);
            // page number
            
        })
        for(var $i = 1; $i <= $notice_ea; $i++){
            console.log($notice_ea);
            let $page_html = '<label class="page_n">'+$i+'</label>'
            $("#notice_page").append($page_html);
        }

        $(".page_n").click(function(){
            let $index = $(this).index();
            $start_page = $index;
            location.href = "./shop_noticelist.html?page="+$start_page;
        })
        
        $(".viewlink").click(function(){
            let $idx = $(this).attr("link");
            location.href = "./shop_notice.html?sidx="+$idx;
        })
        
    }
})