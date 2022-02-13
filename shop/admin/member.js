$(function () {
  $("#add_member").click(function () {
    window.open("../add_member.html", "", "width=1000 height=1000 scrollbars=auto");
  });

})

const viewpage = 5;
let pgno = 1;
let getpage = decodeURI(window.location.search);
let search_wd = "";
if (getpage) {
  let para = getpage.split(/&|=/);
  if (para[5]) {
    if (para[5] != "undefined") {
      pgno = Number(para[5]);
    }
  }
}

let start_page = (pgno - 1) * viewpage; //0*5 = 0 부터
let slice_page = viewpage * pgno; // 5*1 5개씩 cut



function search() {
  let stext_val = document.getElementById("stext").value;
  let option_val = document.getElementById("search_part").value;

  if (!stext_val) {
    alert("검색할 단어를 입력해주세요!")
    return false;
  }
  else if (!option_val) {
    alert("검색할 항목을 선택해주세요!");
    return false;
  }
  else {
    return true;
  }
}

let spart;
function filters() {
  let para_val = decodeURI(location.search);
  let stxt = para_val.split(/&|=/);
  spart = stxt[1];

  if (stxt[3] == undefined) {
    document.getElementById("stext").value = "";
  }
  else {
    document.getElementById("stext").value = stxt[3];
  }

  const sea = document.getElementById("search_part").length;


  for (var s = 0; s < sea; s++) {
    // 검색파트 자동 select
    if (document.getElementById("search_part").options[s].value == spart) {
      document.getElementById("search_part").options[s].selected = "selected";

    }
  }
}


function page_number(pno) {
  let sp = document.getElementById("search_part").value;
  let sword = document.getElementById("stext").value;
  location.href = "./admin_member.html?search_part=" + sp + "&stext=" + sword + "&page=" + pno;
}


function search_all() {
  location.href = "./admin_member.html";
}


/* GET JSON */
let jsondb;
let db;
let plus = Math.floor(Math.random() * 99999);
function ajax() {
  plus++;
  function wck() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
  }
  function opens() {
    if (db.readyState == XMLHttpRequest.DONE && db.status == 200) {
      jsondb(JSON.parse(this.response));
    }
  }
  db = wck();
  db.onreadystatechange = opens;
  db.open("GET", "../shop_members.json?v=" + plus, true);
  db.send();
}
ajax();

jsondb = function (data) {
  $(function () {
    let $data = data;
    let ea = data.length; // 전체 배열 개수
    // console.log($data);
    $("#total_ea").text(ea);  // 총 회원수

    if ($data != "") {  // json데이터가 있을 경우,
      $("#member_tableNone").css("display", "none");
      // $("#search_tableNone").css("display", "none");
      $("#member_tableList").css("display", "table-row-group");
      let $rearray = $data.slice(start_page, slice_page);



      if (document.getElementById("stext").value != "") {  //검색어가 있을 경우,
        let z = "";

        let $search_array = [];

        // console.log(spart);
        // console.log($data);
        if (spart == "sid") {

          $search_array = $data.filter((d) => {
            z = d.user_id.indexOf($("#stext").val());
            if (z != -1) {
              $("#search_tableNone").css("display", "none");
              return d.user_id;
            }
          })
        }
        else if (spart == "sname") {
          
          $search_array = $data.filter((d) => {
            z = d.user_name.indexOf($("#stext").val());
            if (z != -1) {
              $("#search_tableNone").css("display", "none");
              return d.user_name;
            }

          })
        }
        else {
          $("#search_tableNone").css("display", "table-footer-group");
        }

        ea = $search_array.length;
        $rearray = $search_array.slice(start_page, slice_page);

        $.map($search_array, function ($d, $n) {

          // 메일인증 check
          let $mail_accept = "";
          if ($search_array[$n]["mail_accept"] == "Y") {
            $mail_accept = "checked";
          }
          // 메일수신 check
          let $mail_agree = "";
          if ($search_array[$n]["mail_agree"] == "Y") {
            $mail_agree = "checked";
          }
          // sms 수신 check
          let $sms_agree = "";
          if ($search_array[$n]["sms_agree"] == "Y") {
            $sms_agree = "checked";
          }

          // 고객 그룹
          let selected = "selected";
          let select1, select2, select3, select4;
          switch ($search_array[$n]["user_group"]) {
            case "N":
              select4 = selected;
              break;
            case "S":
              select3 = selected;
              break;
            case "G":
              select2 = selected;
              break;
            case "V":
              select1 = selected;
              break;
          }

          let $word = $d["user_indate"].substring(0, 10);
          let $table_data = '<tr>\
              <td rowspan="2"><input type="checkbox" name="midx['+ $n + ']" id="midx' + $n + '" value="' + $search_array[$n]["midx"] + '" class="sub_check" ></td>\
              <td rowspan="2">'+ $d["user_id"] + '</td>\
              <td class="member__name">'+ $d["user_name"] + '</td>\
              <td colspan="6"><label for="member_idenfify1_'+ $n + '"><input type="radio" name="identify' + $n + '" id="member_identify1_' + $n + '">아이핀</label>\
              <label for="member_idenfify2_'+ $n + '"><input type="radio" name="identify' + $n + '" id="member_identify2_' + $n + '">휴대폰</label></td>\
              <td>'+ $d["user_hp"] + '</td>\
              <td> 그룹 <select name="mgroup['+ $n + ']">\
                <option value="V" '+ select1 + '>VIP</option>\
                <option value="G" '+ select2 + '>GOLD</option>\
                <option value="S" '+ select3 + '>SILVER</option>\
                <option value="N" '+ select4 + '>NORMAL</option>\
                </select>\
              </td>\
              <td>'+ $word + '</td>\
              <td rowspan="2">'+ $d["user_level"] + '</td>\
              </tr>\
              <tr>\
              <td class="member__nick">'+ $d["user_nick"] + '</td>\
              <td class="member__mailVerify"><input type="checkbox" name="mail_accept['+ $n + ']" ' + $mail_accept + ' value="Y"/></td>\
              <td><input type="checkbox" disabled/></td>\
              <td><input type="checkbox" name="mail_agree['+ $n + ']" ' + $mail_agree + ' value="Y" /></td>\
              <td><input type="checkbox" name="sms_agree['+ $n + ']" ' + $sms_agree + ' value="Y"/></td>\
              <td><input type="checkbox" disabled/></td>\
              <td><input type="checkbox" disabled/></td>\
              <td></td>\
              <td>'+ $d["user_point"] + '</td>\
              <td>'+ $word + '</td>\
              </td></tr>';
          $("#member_tableList").append($table_data);
        })

        let pn = Math.ceil(ea / viewpage);
        for (let w = 1; w <= pn; w++) {
          $("#member_page").append("<li id='pageing' onclick='page_number(" + w + ")'>" + w + "</li>");
        }


      }
      else {

        $.map($rearray, function ($d, $n) {

          // 메일인증 check
          let $mail_accept = "";
          if ($rearray[$n]["mail_accept"] == "Y") {
            $mail_accept = "checked";
          }
          // 메일수신 check
          let $mail_agree = "";
          if ($rearray[$n]["mail_agree"] == "Y") {
            $mail_agree = "checked";
          }
          // sms 수신 check
          let $sms_agree = "";
          if ($rearray[$n]["sms_agree"] == "Y") {
            $sms_agree = "checked";
          }

          // 고객 그룹
          let selected = "selected";
          let select1, select2, select3, select4;
          switch ($rearray[$n]["user_group"]) {
            case "N":
              select4 = selected;
              break;
            case "S":
              select3 = selected;
              break;
            case "G":
              select2 = selected;
              break;
            case "V":
              select1 = selected;
              break;
          }
          let $word = $d["user_indate"].substring(0, 10);
          let $table_data = '<tr>\
              <td rowspan="2"><input type="checkbox" name="midx['+ $n + ']" id="midx' + $n + '" value="' + $rearray[$n]["midx"] + '" class="sub_check" ></td>\
              <td rowspan="2">'+ $d["user_id"] + '</td>\
              <td class="member__name">'+ $d["user_name"] + '</td>\
              <td colspan="6"><label for="member_idenfify1_'+ $n + '"><input type="radio" name="identify' + $n + '" id="member_identify1_' + $n + '">아이핀</label>\
              <label for="member_idenfify2_'+ $n + '"><input type="radio" name="identify' + $n + '" id="member_identify2_' + $n + '">휴대폰</label></td>\
              <td>'+ $d["user_hp"] + '</td>\
              <td> 그룹 <select name="mgroup['+ $n + ']">\
                <option value="V" '+ select1 + '>VIP</option>\
                <option value="G" '+ select2 + '>GOLD</option>\
                <option value="S" '+ select3 + '>SILVER</option>\
                <option value="N" '+ select4 + '>NORMAL</option>\
                </select>\
              </td>\
              <td>'+ $word + '</td>\
              <td rowspan="2">'+ $d["user_level"] + '</td>\
              </tr>\
              <tr>\
              <td class="member__nick">'+ $d["user_nick"] + '</td>\
              <td class="member__mailVerify"><input type="checkbox" name="mail_accept['+ $n + ']" ' + $mail_accept + ' value="Y"/></td>\
              <td><input type="checkbox" disabled/></td>\
              <td><input type="checkbox" name="mail_agree['+ $n + ']" ' + $mail_agree + ' value="Y" /></td>\
              <td><input type="checkbox" name="sms_agree['+ $n + ']" ' + $sms_agree + ' value="Y"/></td>\
              <td><input type="checkbox" disabled/></td>\
              <td><input type="checkbox" disabled/></td>\
              <td></td>\
              <td>'+ $d["user_point"] + '</td>\
              <td>'+ $word + '</td>\
              </td></tr>';
          $("#member_tableList").append($table_data);
        })
        let pn = Math.ceil(ea / viewpage);
        for (let w = 1; w <= pn; w++) {
          $("#member_page").append("<li id='pageing' onclick='page_number(" + w + ")'>" + w + "</li>")
        }



      }


    }
    else {
      $("#member_tableNone").css("display", "table-footer-group");
      $("#search_tableNone").css("display", "none");
      $("#member_tableList").css("display", "none");
    }

    // checkbox true / false part
    let $ck_len = $(".sub_check").length;
    for (let $i = 0; $i < $ck_len; $i++) {
      $("#midx" + $i).click(function () {
        $("#all_check").prop("checked", false);
      })
    }


  });


}

// check list part
function all_list() {
  let ck_len = document.querySelectorAll('.sub_check').length;
  if (document.getElementById("all_check").checked == true) {
    let i = 0;
    do {
      document.getElementsByName("midx[" + i + "]")[0].checked = true;
      // document.mfrm["midx["+i+"]"].checked=true;
      i++;
    } while (i < ck_len);
  }
  else {
    for (let i = 0; i < ck_len; i++) {
      document.getElementsByName("midx[" + i + "]")[0].checked = false;
      // document.mfrm["midx["+i+"]"].checked=false;
    }
  }
}