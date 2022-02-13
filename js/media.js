const skills = [
    { "HTML": "DOCTYPE을 이해하고 디자인에 맞춰 작업이 가능합니다. 또한, name, id, class분류를 알고 있으며, Method에 대한 POST, GET에 대한 원리도 알고 있습니다. META를 이용한 SEO 작업과 Markup, Semantic Web등 다양한 요소를 구성할 수 있습니다." },
    { "CSS": "CSS의 다양한 Rule Set을 사용할 수 있으며, media 쿼리를 이용하여 반응형 웹페이지 제작이 가능합니다. 그외에 Import, Keyframe, 각종 스타일 선언 방식까지 완벽하게 알고 있으며, 수정 및 유지보수가 가능합니다." },
    { "Javascript": "함수, 메소드, 클래스, 프로토타입, 이벤트, 루프 클로져, 디바운싱 등 다양하게 응용이 가능하며, 파라미터 데이터 활용과 Back-end와의 작업 경험이 풍부합니다." },
    { "ECMA": "import와 export를 기본으로 코드를 작성하며, BOM, DOM의 확장성을 활용할 수 있습니다. Class와 Module모두 사용 가능하며, fetch를 이용한 배열 데이터를 활용 할 수 있습니다." },
    { "Jquery": "Javascript를 기본으로 하여 DOM, Node에 대한 다양한 활용 프로그램이 가능하며, 웹 속도의 효율을 고려한 Jquery엔진 커스텀을 할 수 있습니다. 배열에 대한 중급 이상의 활용 능력을 가지고 있으며, 플러그인 API활용을 할 수 있습니다." },
    { "Ajax": "동기화, 비동기화 통신이 가능하며 동적인 화면 출력 및 표시 정보와 상호작용을 할 수 있는 DOM, NODE 모두 사용이 가능합니다.기본적인 통신개념을 알고 있으며, Javascript, Jquery 모두 활용 할 수 있습니다.XML, JSON 파일에 대한 파서 개념도 있으며, send 함수를 통해 데이터 전송도 가능합니다." },
    { "Scss": "기본적으로 전처리기로 작성이 가능하며, CSS 컴파일도 할 수 있습니다. 그 외에 코드 중복을 최소화 하며 문법에 대한 작성 및 유지보수 경험도 풍부합니다. 변수, 함수 모두 구현이 가능합니다." },
    { "Vue": "Template과 Component를 사용할 수 있으며, 인스턴스 생성, 화면 부착, 갱신, 소멸 단계로 구분하여 사용할 수 있습니다. 배열 데이터를 기본으로 화면 렌더링을 하였으며, 각종 이벤트 함수를 응용할 수 있습니다." }
    // {"Git":"분산형 관리 시스템을 경험 하였으며, 프로젝트 구성 및 Push, Pull request 같은 이벤트에 반응하여 자동으로 작업(배포 등)을 경험 하였습니다. Git 기본 사용공간은 Public을 기본으로 하였습니다."},
    // {"XML & JSON":"태그와 다차원 배열 모두 경험 하였으며, MySQL Database 값에 대한 파싱을 통한 데이터 출력 지식도 습득 하였습니다."},
    // {"API":"도로명 주소, 지도, 결제 시스템 등 다양한 API 경험이 있으며,<br>웹사이트 조건 맞게 커스텀도 가능합니다."},
    // {"Responsive Web":"화면 너비에 따라 유동적으로 레이아웃을 변화 시킬 수 있으며, Cross Browsing 기술 플랫폼으로 제작할 수 있습니다."},
    // {"Etc":"Visual Studio Code 에디터를 주로 사용하였으며, FTP, Host, Webmaster-tools 등 전반적인 웹 지식을 가지고 있습니다. 그외에 관리자 페이지에 대한 적용 원리 지식도 있습니다."}
];

$.map(skills,function(a,b){
    $.map(skills[b],function(c,d){
        $("#skills>dl").eq(b).append("<dd class='skill_box'>"+c+"<span>"+d+"</span></dd>");
    })
})


let control = 0;
let box_ea = document.querySelectorAll(".main_box>ul").length;
let skills_ea = document.querySelectorAll(".skills>dl").length;

function mode_change() {

    if (control == 0) {
        document.body.style.background = "#202124";
        document.body.style.color = "white";
        document.getElementById("mode").style.transform = "rotate(360deg)";
        document.getElementById("mode").innerHTML = "<img src='./img/sun.png'>";
        for(var i = 0; i <skills_ea ; i++){
            document.querySelectorAll(".skill_box")[i].style.color = "#202124";
        }
        for (var i = 0; i < box_ea; i++) {
            document.querySelectorAll(".main_box>ul")[i].classList.add("dark_box");
        }
        control++;
    }
    else {
        document.body.style.background = "linear-gradient(-15deg, #d2feff , #fff, #a39cf2)";
        document.body.style.color = "black";
        document.getElementById("mode").style.transform = "rotate(0deg)";
        document.getElementById("mode").innerHTML = "<img src='./img/moon.png'>";
        for (var i = 0; i < box_ea; i++) {
            document.querySelectorAll(".main_box>ul")[i].classList.remove("dark_box");
        }
        control = 0;
    }
}

function contact_me(event){
    if(!cfrm.pernm.value){
        event.preventDefault();
        alert("성함을 입력해주세요");
        cfrm.pernm.focus();
    }
    else if(!cfrm.pertel.value){
        event.preventDefault();
        alert("연락처를 입력해주세요");
        cfrm.pertel.focus();
    }
    else if(!cfrm.peremail.value){
        event.preventDefault();
        alert("이메일을 입력해주세요");
        cfrm.peremail.focus();
    }
    else{
        cfrm.action = "http://lovertvtest.dothome.co.kr/portfolio/mailto.php";
        cfrm.submit();
    }
}



document.getElementById("mode").addEventListener("click", mode_change);
document.getElementById("cfrm").addEventListener("submit",contact_me);


$(function(){


    $(window).scroll(function () {

        var $sct = $(this).scrollTop();
        let $loca = $("#introduce_title").offset().top;
        
        if ($sct > $loca) {
            $("#box2").css("background-color","rgba( 255, 255, 255, 0.75 )");
        }
        else {
            $("#box2").css("background-color","transparent");
        }
    })


    let $introduce_position = $("#introduce_title").offset().top;
    $("#introbtn").click(function () {
        $("html,body").animate({
            "scrollTop": $introduce_position + "px"
        }, 500);
    })
    $("#projectbtn").click(function () {
        let $project_position = $("#projects_title").offset().top;
        $("html,body").animate({
            "scrollTop": $project_position + "px"
        }, 500);
    })
    $("#infobtn").click(function () {
        let $info_position = $("#info_title").offset().top;
        $("html,body").animate({
            "scrollTop": $info_position + "px"
        }, 600);
    })
    $("#contactbtn").click(function(){
        let $contact_title = $("#contact_title").offset().top;
        $("html,body").animate({
            "scrollTop": $contact_title + "px"
        }, 600)
    })
    

    $("#more").click(function(){
        $("html,body").animate({
            "scrollTop": $introduce_position + "px"
        }, 700);
    })


    let $ea = $(".projects>dl").length;
    for (let $i = 0; $i <= $ea; $i++) {
        $("#go_web" + $i).click(function () {
            let $link = $(this).attr("link");
            if($i==3 || $i==4 || $i==7 || $i==8){
                window.open($link, "", "width=370px height=600px");
            }
            else{
                window.open($link, "", "");
            }
        })
    }

    /* map */
    let $map_id = document.getElementById("map");
    let $loca = {
        center:new kakao.maps.LatLng(37.588365, 127.006146),
        level:6
    }
    let $map = new kakao.maps.Map($map_id,$loca);
    let $loca2 = new kakao.maps.LatLng(37.588365, 127.006146);
    let $map_print = new kakao.maps.Marker({
        position:$loca2
    })
    $map_print.setMap($map);

})