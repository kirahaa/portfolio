let ndata = JSON.parse(notice_view);
console.log(ndata);
for(var i in ndata){
    console.log(ndata[i]["subject"]);
    document.getElementById("nsubject").innerText = ndata[i]["subject"];
    document.getElementById("nwriter").innerText = ndata[i]["writernm"];
    document.getElementById("ndate").innerText = ndata[i]["windate"].substr(0,10);
    document.getElementById("ncount").innerText = ndata[i]["wcount"];
    document.getElementById("ntext").innerHTML = ndata[i]["wtext"];
}
document.getElementById("go_list").addEventListener("click",function(){
    location.href = "./shop_noticelist.html";
})